(function () {
  const $ = (id) => document.getElementById(id);
  const KEY = "geoquiz_missed";

  // ---- storage (safe if blocked) ----
  const store = {
    get() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return mem; } },
    set(v) { mem = v; try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {} }
  };
  let mem = [];

  const sel = { topics: new Set(), subs: new Set(), marks: new Set() };
  let queue = [], idx = 0, got = 0, total = 0, sessionMissed = [];

  const counts = {};
  QUESTIONS.forEach((q) => (counts[q.topic] = (counts[q.topic] || 0) + 1));

  function toggle(set, v) { set.has(v) ? set.delete(v) : set.add(v); }
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function chip(label, on, off, fn) {
    const b = document.createElement("button");
    b.className = "chip" + (on ? " on" : "") + (off ? " off" : "");
    b.innerHTML = label;
    if (!off) b.onclick = fn;
    return b;
  }

  function filtered() {
    return QUESTIONS.filter((q) =>
      (!sel.topics.size || sel.topics.has(q.topic)) &&
      (!sel.subs.size || sel.subs.has(q.sub)) &&
      (!sel.marks.size || sel.marks.has(q.marks)));
  }

  function renderFilters() {
    const tc = $("topicChips"); tc.innerHTML = "";
    ["Physical", "Human"].forEach((g) => {
      TOPICS.filter((t) => t.group === g).forEach((t) => {
        const n = counts[t.id] || 0;
        tc.appendChild(chip(`${t.id} ${t.name} <small>${n ? n + " Qs" : "soon"}</small>`,
          sel.topics.has(t.id), !n, () => { toggle(sel.topics, t.id); sel.subs.clear(); renderFilters(); }));
      });
    });

    const subs = [...new Set(QUESTIONS.filter((q) => !sel.topics.size || sel.topics.has(q.topic)).map((q) => q.sub))];
    $("subWrap").classList.toggle("hidden", !sel.topics.size);
    const sc = $("subChips"); sc.innerHTML = "";
    subs.forEach((s) => sc.appendChild(chip(s, sel.subs.has(s), false, () => { toggle(sel.subs, s); renderFilters(); })));

    const mc = $("markChips"); mc.innerHTML = "";
    [2, 4, 6].forEach((m) => mc.appendChild(chip(m + " marker", sel.marks.has(m), false, () => { toggle(sel.marks, m); renderFilters(); })));

    const n = filtered().length;
    $("count").textContent = n + " question" + (n === 1 ? "" : "s") + " match";
    $("startBtn").disabled = !n;
    renderMissed();
  }

  function renderMissed() {
    const ids = store.get();
    const qs = ids.map((id) => QUESTIONS.find((q) => q.id === id)).filter(Boolean);
    $("revList").innerHTML = qs.length
      ? qs.map((q) => `<div class="rev"><b>${q.marks}m · ${q.sub}</b><br>${q.question}</div>`).join("")
      : "Nothing yet. Questions where you drop marks show up here.";
    $("practiceRev").disabled = !qs.length;
    $("clearRev").disabled = !qs.length;
  }

  function begin(list) {
    queue = shuffle(list); idx = 0; got = 0; total = 0; sessionMissed = [];
    $("filters").classList.add("hidden"); $("history").classList.add("hidden");
    $("done").classList.add("hidden"); $("quiz").classList.remove("hidden");
    showQ();
  }

  function showQ() {
    const q = queue[idx];
    const t = TOPICS.find((x) => x.id === q.topic);
    $("progress").textContent = `Question ${idx + 1} of ${queue.length}`;
    $("running").textContent = `${got} / ${total} marks so far`;
    $("barFill").style.width = (idx / queue.length) * 100 + "%";
    $("meta").innerHTML = `<span class="tag">${q.marks} marks</span><span class="tag">${t.name}</span><span class="tag">${q.sub}</span>`;
    $("qtext").textContent = q.question;
    $("answer").value = ""; $("answer").disabled = false;
    $("scheme").classList.add("hidden");
    $("revealBtn").classList.remove("hidden");
    $("nextBtn").textContent = idx === queue.length - 1 ? "Finish" : "Next";
  }

  function reveal() {
    const q = queue[idx];
    $("answer").disabled = true;
    $("revealBtn").classList.add("hidden");
    $("points").innerHTML = q.points.map((p, i) =>
      `<label class="point"><input type="checkbox" data-i="${i}"><span>${p}</span></label>`).join("");
    $("points").querySelectorAll("input").forEach((c) => (c.onchange = updateScore));
    $("scheme").classList.remove("hidden");
    updateScore();
    $("scheme").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function currentScore() {
    const q = queue[idx];
    return Math.min(q.marks, $("points").querySelectorAll("input:checked").length);
  }
  function updateScore() { $("qscore").textContent = `Your mark: ${currentScore()} / ${queue[idx].marks}`; }

  function next() {
    const q = queue[idx], s = currentScore();
    got += s; total += q.marks;
    let missed = store.get();
    if (s < q.marks) { if (!missed.includes(q.id)) missed.push(q.id); sessionMissed.push(q); }
    else missed = missed.filter((id) => id !== q.id);
    store.set(missed);
    idx++;
    idx < queue.length ? showQ() : finish();
  }

  function finish() {
    $("quiz").classList.add("hidden"); $("done").classList.remove("hidden");
    const pct = total ? Math.round((got / total) * 100) : 0;
    $("final").textContent = `${got} / ${total} marks (${pct}%)`;
    $("wrong").innerHTML = sessionMissed.length
      ? "<p class='label'>Dropped marks on</p>" + sessionMissed.map((q) => `<div class="rev"><b>${q.marks}m · ${q.sub}</b><br>${q.question}</div>`).join("")
      : "<p class='hint'>Full marks on every question. Nice.</p>";
    $("retryWrongBtn").disabled = !sessionMissed.length;
  }

  function back() {
    ["quiz", "done"].forEach((i) => $(i).classList.add("hidden"));
    $("filters").classList.remove("hidden"); $("history").classList.remove("hidden");
    renderFilters();
  }

  $("startBtn").onclick = () => begin(filtered());
  $("revealBtn").onclick = reveal;
  $("nextBtn").onclick = next;
  $("quitBtn").onclick = back;
  $("againBtn").onclick = back;
  $("retryWrongBtn").onclick = () => begin(sessionMissed);
  $("practiceRev").onclick = () => begin(store.get().map((id) => QUESTIONS.find((q) => q.id === id)).filter(Boolean));
  $("clearRev").onclick = () => { store.set([]); renderMissed(); };

  renderFilters();
})();
