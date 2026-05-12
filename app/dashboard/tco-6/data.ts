export const masteryThreshold = 100;

export type MasteryStatus = "Not Started" | "In Progress" | "Mastered";

export type ContentMapModule = {
  name: string;
  contentType: string;
  keyConcepts: string;
};

export type TcoSection = {
  code: "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I";
  slug: string;
  title: string;
  description: string;
  progress: number;
  checklistItems: string[];
  contentMapModules: ContentMapModule[];
};

export const tcoSections: TcoSection[] = [
  {
    code: "A",
    slug: "a",
    title: "Behaviorism and Philosophical Foundations",
    description:
      "Build the philosophical foundation for behavior analysis, including goals, assumptions, radical behaviorism, and the dimensions of ABA.",
    progress: 0,
    checklistItems: [
      "A.1. Identify goals of behavior analysis (description, prediction, control).",
      "A.2. Explain philosophical assumptions (selectionism, determinism, empiricism, parsimony, pragmatism).",
      "A.3. Explain behavior from the perspective of radical behaviorism.",
      "A.4. Distinguish among behaviorism, EAB, ABA, and professional practice.",
      "A.5. Identify and describe dimensions of ABA.",
    ],
    contentMapModules: [],
  },
  {
    code: "B",
    slug: "b",
    title: "Concepts and Principles",
    description:
      "Discriminate core behavior-analytic concepts including stimulus control, motivating operations, positive and negative reinforcement, positive and negative punishment, extinction, verbal behavior, and schedules of reinforcement.",
    progress: 35,
    checklistItems: [
      "B.1-B.2. Distinguish behavior, response, response class, stimulus, and stimulus class.",
      "B.3-B.5. Distinguish respondent/operant conditioning and positive/negative reinforcement and punishment.",
      "B.6-B.8. Distinguish automatic vs. socially mediated contingencies and unconditioned/conditioned/generalized reinforcers and punishers.",
      "B.9-B.10. Identify simple and complex (concurrent, multiple, mixed, chained) schedules of reinforcement.",
      "B.11-B.15. Distinguish operant/respondent extinction, stimulus control, discrimination, generalization, and maintenance.",
      "B.16-B.17. Identify Motivating Operations (MOs) and distinguish them from stimulus control.",
      "B.18-B.20. Distinguish rule-governed vs. contingency-shaped behavior and identify verbal operants and multiple control.",
      "B.21-B.24. Identify emergent relations, behavioral momentum, the matching law, and imitation vs. observational learning.",
    ],
    contentMapModules: [
      {
        name: "Differential Reinforcement",
        contentType: "Visual Comparison",
        keyConcepts: "DRA, DRI, DRO, DRL, DRH",
      },
      {
        name: "Schedules of Reinforcement",
        contentType: "Animated Visual",
        keyConcepts: "FR, VR, FI, VI",
      },
      {
        name: "Verbal Behavior",
        contentType: "Comparison Table",
        keyConcepts: "Mand, Tact, Echoic, Intraverbal",
      },
    ],
  },
  {
    code: "C",
    slug: "c",
    title: "Measurement, Data Display, and Interpretation",
    description:
      "Practice operational definitions, measurement procedures, graphing, data interpretation, and procedural integrity.",
    progress: 20,
    checklistItems: [
      "C.1-C.2. Create operational definitions and distinguish direct/indirect/product measures.",
      "C.3-C.4. Measure occurrence and temporal dimensions (duration, latency, IRT).",
      "C.5-C.7. Distinguish continuous/discontinuous measurement and measure efficiency (trials to criterion).",
      "C.8-C.9. Evaluate validity/reliability and select measurement procedures.",
      "C.10-C.12. Graph data, interpret graphs, and measure procedural integrity.",
    ],
    contentMapModules: [
      {
        name: "Operational Definitions",
        contentType: "Examples/Nonexamples",
        keyConcepts: "Observable, measurable behavior",
      },
    ],
  },
  {
    code: "D",
    slug: "d",
    title: "Experimental Design",
    description:
      "Analyze variables, validity, threats to validity, single-case design logic, and visual analysis of experimental control.",
    progress: 15,
    checklistItems: [
      "D.1-D.3. Distinguish variables, validity (internal/external), and threats to validity.",
      "D.4-D.6. Identify single-case design features/strengths and interpret single-case data.",
      "D.7. Distinguish reversal, multiple-baseline, multielement, and changing-criterion designs.",
      "D.8-D.9. Conduct comparative, component, and parametric analyses and apply designs.",
    ],
    contentMapModules: [
      {
        name: "ABA Reversal Design",
        contentType: "Graph Analysis",
        keyConcepts: "ABA, reversal, experimental control",
      },
      {
        name: "Alternating Treatments Design",
        contentType: "Graph Analysis",
        keyConcepts: "Multielement design",
      },
      {
        name: "Multiple Baseline Design",
        contentType: "Graph Analysis",
        keyConcepts: "Baseline logic",
      },
      {
        name: "Changing Criterion Design",
        contentType: "Graph Analysis",
        keyConcepts: "Criterion shifts",
      },
    ],
  },
  {
    code: "E",
    slug: "e",
    title: "Ethical and Professional Issues",
    description:
      "Review ethical principles, confidentiality, competence, professional boundaries, cultural humility, and legal requirements.",
    progress: 0,
    checklistItems: [
      "E.1-E.3. Apply core ethical principles, identify risks of unethical behavior, and maintain competence.",
      "E.4-E.5. Comply with confidentiality and public statement requirements.",
      "E.6-E.7. Manage service discontinuation and multiple relationships.",
      "E.8-E.11. Use professional interpersonal skills, cultural humility, and identify personal biases.",
      "E.12. Comply with legal, regulatory, and licensure requirements.",
    ],
    contentMapModules: [],
  },
  {
    code: "F",
    slug: "f",
    title: "Behavior Assessment",
    description:
      "Prepare for skills assessment, preference assessment, descriptive assessment, functional analysis, and socially significant goal selection.",
    progress: 45,
    checklistItems: [
      "F.1-F.2. Review records and integrate cultural variables into assessment.",
      "F.3-F.6. Design/evaluate assessments for skills, preferences, descriptive data, and functional analyses.",
      "F.7-F.8. Interpret data to determine service needs and prioritize socially significant goals.",
    ],
    contentMapModules: [
      {
        name: "Preference Assessments",
        contentType: "Decision Tree",
        keyConcepts: "MSWO, MSW, Paired Stimulus",
      },
      {
        name: "Functions of Behavior",
        contentType: "Function Comparison",
        keyConcepts: "Attention, Escape, Tangible, Automatic",
      },
      {
        name: "Functional Behavior Assessment",
        contentType: "Hierarchy Visual",
        keyConcepts: "Direct vs indirect assessment",
      },
    ],
  },
  {
    code: "G",
    slug: "g",
    title: "Behavior-Change Procedures",
    description:
      "Study reinforcement, differential reinforcement, token economies, MOs/SDs, discrimination training, prompting, shaping, chaining, punishment, and maintenance.",
    progress: 70,
    checklistItems: [
      "G.1-G.4. Design reinforcement, differential reinforcement (DRA, DRO, etc.), time-based schedules, and token economies.",
      "G.5-G.10. Incorporate MOs/SDs, discrimination training, prompting/fading, modeling, and rules.",
      "G.11-G.14. Use shaping, chaining, trial-based/free-operant procedures, and group contingencies.",
      "G.15-G.19. Promote generalization, maintenance, punishment procedures, and emergent relations.",
    ],
    contentMapModules: [
      {
        name: "Token Economies",
        contentType: "Template Builder",
        keyConcepts: "Tokens, reinforcement systems",
      },
      {
        name: "Punishment Procedures",
        contentType: "Hierarchy & Ethics Chart",
        keyConcepts: "Timeout, response cost, overcorrection",
      },
      {
        name: "Behavior Intervention Plans",
        contentType: "Flowchart",
        keyConcepts: "Target behavior, replacement behavior",
      },
    ],
  },
  {
    code: "H",
    slug: "h",
    title: "Selecting and Implementing Interventions",
    description:
      "Connect assessment results to measurable goals, evidence-based interventions, alternative behaviors, integrity, effectiveness, and collaboration.",
    progress: 10,
    checklistItems: [
      "H.1-H.3. Develop measurable goals, recommend evidence-based interventions, and select alternative behaviors.",
      "H.4-H.5. Mitigate unwanted effects of procedures and plan for relapse.",
      "H.6-H.8. Make data-based decisions on integrity/effectiveness and collaborate with others.",
    ],
    contentMapModules: [],
  },
  {
    code: "I",
    slug: "i",
    title: "Personnel Supervision and Management",
    description:
      "Develop supervision systems using relationships, equity, supervision goals, BST, function-based approaches, and efficacy evaluation.",
    progress: 0,
    checklistItems: [
      "I.1-I.3. Identify supervision benefits, establish relationships, and promote equity.",
      "I.4-I.5. Select supervision goals and apply performance management (BST).",
      "I.6-I.7. Use function-based approaches to improve supervisee behavior and evaluate efficacy.",
    ],
    contentMapModules: [],
  },
];

export function getTcoSection(slug: string) {
  return tcoSections.find((section) => section.slug === slug);
}

export function getMasteryStatus(progress: number): MasteryStatus {
  if (progress >= masteryThreshold) {
    return "Mastered";
  }

  if (progress > 0) {
    return "In Progress";
  }

  return "Not Started";
}
