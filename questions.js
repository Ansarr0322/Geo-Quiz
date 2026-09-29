// ============================================================
// AQA A-level Geography (7037) question bank
// ------------------------------------------------------------
// HOW TO ADD QUESTIONS: copy any block in QUESTIONS, change the
// fields, and make sure `topic` matches an id in TOPICS below.
//   marks   : 2, 4 or 6
//   sub     : the sub-topic name (free text, shown as a filter)
//   points  : the mark scheme, one string per creditable point
// ============================================================

const TOPICS = [
  // Physical geography
  { id: "3.1.1", group: "Physical", name: "Water and carbon cycles" },
  { id: "3.1.2", group: "Physical", name: "Hot desert systems and landscapes" },
  { id: "3.1.3", group: "Physical", name: "Coastal systems and landscapes" },
  { id: "3.1.4", group: "Physical", name: "Glacial systems and landscapes" },
  { id: "3.1.5", group: "Physical", name: "Hazards" },
  { id: "3.1.6", group: "Physical", name: "Ecosystems under stress" },
  // Human geography
  { id: "3.2.1", group: "Human", name: "Global systems and global governance" },
  { id: "3.2.2", group: "Human", name: "Changing places" },
  { id: "3.2.3", group: "Human", name: "Contemporary urban environments" },
  { id: "3.2.4", group: "Human", name: "Population and the environment" },
  { id: "3.2.5", group: "Human", name: "Resource security" }
];

const QUESTIONS = [
  // ---------------- HAZARDS (3.1.5) ----------------
  {
    id: "h-01", topic: "3.1.5", sub: "What is a hazard", marks: 2,
    question: "Outline what is meant by a 'natural hazard'.",
    points: [
      "A natural event (physical process) that is perceived as a threat",
      "Has the potential to cause loss of life, injury or damage to property/livelihoods"
    ]
  },
  {
    id: "h-02", topic: "3.1.5", sub: "Plate tectonics", marks: 2,
    question: "Describe what happens at a constructive (divergent) plate margin.",
    points: [
      "Two plates move apart / diverge",
      "Magma rises through the gap and cools to form new crust",
      "Example features: mid-ocean ridge, rift valley, shallow earthquakes, gentle basaltic volcanoes"
    ]
  },
  {
    id: "h-03", topic: "3.1.5", sub: "Plate tectonics", marks: 4,
    question: "Explain how slab pull and ridge push help to move tectonic plates.",
    points: [
      "Slab pull: at a subduction zone the older, cold, dense oceanic plate sinks into the mantle",
      "...its weight pulls the rest of the plate along behind it",
      "Ridge push: new crust at a ridge is hot and elevated (higher than the surrounding ocean floor)",
      "...gravity makes it slide down and away from the ridge, pushing the plate outwards",
      "(Credit) slab pull is generally seen as the stronger of the two forces"
    ]
  },
  {
    id: "h-04", topic: "3.1.5", sub: "Volcanic hazards", marks: 6,
    question: "Explain why volcanic eruptions at destructive plate margins are often more explosive than those at constructive plate margins.",
    points: [
      "Destructive: oceanic plate subducts, water in the plate lowers the melting point so magma forms and rises",
      "Destructive magma is andesitic/rhyolitic: high silica content, so very viscous (thick, sticky)",
      "Viscous magma blocks the vent and traps gas; pressure builds until it erupts violently",
      "Results in explosive eruptions, ash clouds, pyroclastic flows, and steep-sided composite cones",
      "Constructive: magma is basaltic, low silica, low viscosity (runny)",
      "Gas escapes easily, so eruptions are gentle/effusive with lava flows, forming shield volcanoes",
      "Clear comparison linking silica/viscosity/gas to eruption style (for full marks)"
    ]
  },
  {
    id: "h-05", topic: "3.1.5", sub: "Hazard perception and response", marks: 4,
    question: "Explain how people's perception of a hazard can vary.",
    points: [
      "Past experience: people who have lived through an event may see the risk as higher (or become fatalistic)",
      "Wealth: richer people can afford to adjust/move/insure; poorer people have fewer choices",
      "Education/knowledge: awareness of the risk and of what to do changes how serious it seems",
      "Culture/religion/beliefs: some accept hazards as fate or 'acts of God' (fatalism)",
      "Other valid factors: age, health, gender, media coverage, distance from the hazard"
    ]
  },

  // ---------------- POPULATION (3.2.4) ----------------
  {
    id: "p-01", topic: "3.2.4", sub: "Population and resources", marks: 2,
    question: "Explain what is meant by 'overpopulation'.",
    points: [
      "Too many people for the resources (food, water, energy, jobs) available in an area",
      "So the standard of living falls / resources cannot be supported sustainably"
    ]
  },
  {
    id: "p-02", topic: "3.2.4", sub: "Demographic transition", marks: 4,
    question: "Explain two reasons why the death rate falls in Stage 2 of the Demographic Transition Model.",
    points: [
      "Reason 1 stated: e.g. improved medical care / vaccinations",
      "...developed: fewer deaths from infectious disease, lower infant mortality",
      "Reason 2 stated: e.g. better sanitation and clean water supply",
      "...developed: fewer water-borne diseases such as cholera and typhoid",
      "Alternative reasons: improved food supply/farming, better health education, less famine"
    ]
  },
  {
    id: "p-03", topic: "3.2.4", sub: "Population and resources", marks: 6,
    question: "Assess the view that population growth will inevitably lead to food shortages.",
    points: [
      "Malthus: population grows geometrically, food supply only arithmetically, so population outstrips food",
      "Positive checks (famine, disease, war) would then reduce population",
      "Support: food insecurity/famine persists in some places, e.g. parts of Sub-Saharan Africa",
      "Boserup: population growth stimulates innovation and intensification of farming ('necessity is the mother of invention')",
      "Evidence against: Green Revolution (HYV seeds, fertiliser, irrigation) raised yields greatly",
      "Enough food is produced globally; shortages are often due to distribution, poverty, conflict, or climate rather than numbers",
      "A judgement/conclusion that weighs the two views (needed for the top mark band)"
    ]
  }
];
