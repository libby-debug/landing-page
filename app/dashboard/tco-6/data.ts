export const masteryThreshold = 90;
export const miniLessonMasteryThreshold = 100;

export type MasteryStatus = "Not Started" | "In Progress" | "Mastered";

export type TcoSection = {
  code: "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I";
  slug: string;
  title: string;
  description: string;
  progress: number;
  checklistItems: string[];
};

export const tcoSections: TcoSection[] = [
  {
    code: "A",
    slug: "a",
    title: "Behaviorism and Philosophical Foundations",
    description:
      "Build your knowledge of the foundations of applied behavior analysis by learning the goals and philosophical assumptions of ABA, radical behaviorism, EAB vs. ABA, and the seven dimensions of ABA.",
    progress: 0,
    checklistItems: [
      "A.1. Identify the goals of behavior analysis as a science (i.e., description, prediction, control).",
      "A.2. Explain the philosophical assumptions underlying the science of behavior analysis (e.g., selectionism, determinism, empiricism, parsimony, pragmatism).",
      "A.3. Explain behavior from the perspective of radical behaviorism.",
      "A.4. Distinguish among behaviorism, the experimental analysis of behavior, applied behavior analysis, and professional practice guided by the science of behavior analysis.",
      "A.5. Identify and describe dimensions of applied behavior analysis.",
    ],
  },
  {
    code: "B",
    slug: "b",
    title: "Concepts and Principles",
    description:
      "Discriminate between core behavior-analytic concepts including motivating operations, stimulus control, positive and negative reinforcement, positive and negative punishment, extinction, verbal behavior, and schedules of reinforcement.",
    progress: 0,
    checklistItems: [
      "B.1. Identify and distinguish among behavior, response, and response class.",
      "B.2. Identify and distinguish between stimulus and stimulus class.",
      "B.3. Identify and distinguish between respondent and operant conditioning.",
      "B.4. Identify and distinguish between positive and negative reinforcement contingencies.",
      "B.5. Identify and distinguish between positive and negative punishment contingencies.",
      "B.6. Identify and distinguish between automatic and socially mediated contingencies.",
      "B.7. Identify and distinguish among unconditioned, conditioned, and generalized reinforcers.",
      "B.8. Identify and distinguish among unconditioned, conditioned, and generalized punishers.",
      "B.9. Identify and distinguish among simple schedules of reinforcement.",
      "B.10. Identify and distinguish among concurrent, multiple, mixed, and chained schedules of reinforcement.",
      "B.11. Identify and distinguish between operant and respondent extinction as operations and processes.",
      "B.12. Identify examples of stimulus control.",
      "B.13. Identify examples of stimulus discrimination.",
      "B.14. Identify and distinguish between stimulus and response generalization.",
      "B.15. Identify examples of response maintenance.",
      "B.16. Identify examples of motivating operations.",
      "B.17. Distinguish between motivating operations and stimulus control.",
      "B.18. Identify and distinguish between rule-governed and contingency-shaped behavior.",
      "B.19. Identify and distinguish among verbal operants.",
      "B.20. Identify the role of multiple control in verbal behavior.",
      "B.21. Identify examples of processes that promote emergent relations and generative performance.",
      "B.22. Identify ways behavioral momentum can be used to understand response persistence.",
      "B.23. Identify ways the matching law can be used to interpret response allocation.",
      "B.24. Identify and distinguish between imitation and observational learning.",
    ],
  },
  {
    code: "C",
    slug: "c",
    title: "Measurement, Data Display, and Interpretation",
    description:
      "Practice operational definitions, measurement procedures, graphing, data interpretation, and procedural integrity.",
    progress: 0,
    checklistItems: [
      "C.1. Create operational definitions of behavior.",
      "C.2. Distinguish among direct, indirect, and product measures of behavior.",
      "C.3. Measure occurrence.",
      "C.4. Measure temporal dimensions of behavior (e.g., duration, latency, interresponse time).",
      "C.5. Distinguish between continuous and discontinuous measurement procedures.",
      "C.6. Design and apply discontinuous measurement procedures (e.g., interval recording, time sampling).",
      "C.7. Measure efficiency (e.g., trials to criterion, cost-benefit analysis, training duration).",
      "C.8. Evaluate the validity and reliability of measurement procedures.",
      "C.9. Select a measurement procedure to obtain representative data that accounts for the critical dimension of the behavior and environmental constraints.",
      "C.10. Graph data to communicate relevant quantitative relations (e.g., equal-interval graphs, bar graphs, cumulative records).",
      "C.11. Interpret graphed data.",
      "C.12. Select a measurement procedure to obtain representative procedural integrity data that accounts for relevant dimensions (e.g., accuracy, dosage) and environmental constraints.",
    ],
  },
  {
    code: "D",
    slug: "d",
    title: "Experimental Design",
    description:
      "Understand types of variables, threats to validity, external vs. internal validity, and single-case design.",
    progress: 0,
    checklistItems: [
      "D.1. Distinguish between dependent and independent variables.",
      "D.2. Distinguish between internal and external validity.",
      "D.3. Identify threats to internal validity (e.g., history, maturation).",
      "D.4. Identify the defining features of single-case experimental designs (e.g., individuals serve as their own controls, repeated measures, prediction, verification, replication).",
      "D.5. Identify the relative strengths of single-case experimental designs and group designs.",
      "D.6. Critique and interpret data from single-case experimental designs.",
      "D.7. Distinguish among reversal, multiple-baseline, multielement, and changing-criterion designs.",
      "D.8. Identify rationales for conducting comparative, component, and parametric analyses.",
      "D.9. Apply single-case experimental designs.",
    ],
  },
  {
    code: "E",
    slug: "e",
    title: "Ethical and Professional Issues",
    description:
      "Apply BACB ethics, professional boundaries, informed consent, confidentiality, supervision ethics, and culturally responsive decision making.",
    progress: 0,
    checklistItems: [
      "E.1. Identify and apply core principles underlying the ethics codes for BACB certificants (e.g., benefit others; treat others with compassion, dignity, and respect; behave with integrity).",
      "E.2. Identify the risks to oneself, others, and the profession as a result of engaging in unethical behavior.",
      "E.3. Develop and maintain competence by engaging in professional development activities (e.g., read literature, seek consultation, establish mentors).",
      "E.4. Identify and comply with requirements for collecting, using, protecting, and disclosing confidential information.",
      "E.5. Identify and comply with requirements for making public statements about professional activities (e.g., social media activity; misrepresentation of professional credentials, behavior analysis, and service outcomes).",
      "E.6. Identify the conditions under which services or supervision should be discontinued and apply steps that should be taken when transitioning clients and supervisees to another professional.",
      "E.7. Identify types of and risks associated with multiple relationships, and how to mitigate those risks when they are unavoidable.",
      "E.8. Identify and apply interpersonal and other skills (e.g., accepting feedback, listening actively, seeking input, collaborating) to establish and maintain professional relationships.",
      "E.9. Engage in cultural humility in service delivery and professional relationships.",
      "E.10. Apply culturally responsive and inclusive service and supervision activities.",
      "E.11. Identify personal biases and how they might interfere with professional activity.",
      "E.12. Identify and apply the legal, regulatory, and practice requirements (e.g., licensure, jurisprudence, funding, certification) relevant to the delivery of behavior-analytic services.",
    ],
  },
  {
    code: "F",
    slug: "f",
    title: "Behavior Assessment",
    description:
      "Assess socially significant behavior using operational definitions, indirect and descriptive assessment, functional analysis, preference assessment, skill assessment, and ethical interpretation.",
    progress: 0,
    checklistItems: [
      "F.1. Identify relevant sources of information in records and from clients, caregivers, and other professionals.",
      "F.2. Identify cultural variables that could affect assessment and service delivery.",
      "F.3. Design and evaluate skill assessments.",
      "F.4. Design and evaluate preference assessments.",
      "F.5. Design and evaluate descriptive assessments.",
      "F.6. Design and evaluate functional analyses.",
      "F.7. Interpret assessment data to determine the need for behavior-analytic services and referrals.",
      "F.8. Select intervention goals and procedures based on assessment data.",
    ],
  },
  {
    code: "G",
    slug: "g",
    title: "Behavior-Change Procedures",
    description:
      "Study reinforcement, differential reinforcement, token economies, Motivating Operation (MO) effects, Discriminative Stimulus (SD) arrangements, discrimination training, prompting, shaping, chaining, punishment, and maintenance.",
    progress: 0,
    checklistItems: [
      "G.1. Design and evaluate positive and negative reinforcement procedures.",
      "G.2. Design and evaluate differential reinforcement procedures with and without extinction.",
      "G.3. Design and evaluate time-based reinforcement schedules.",
      "G.4. Design and evaluate conditioned reinforcement procedures, including token economies.",
      "G.5. Incorporate motivating operations and discriminative stimuli into behavior-change procedures.",
      "G.6. Design and evaluate simple and conditional discrimination training procedures.",
      "G.7. Design and evaluate stimulus and response prompting procedures.",
      "G.8. Design and evaluate prompt fading procedures.",
      "G.9. Design and evaluate modeling procedures.",
      "G.10. Design and evaluate instructions and rules.",
      "G.11. Design and evaluate shaping procedures.",
      "G.12. Design and evaluate chaining procedures.",
      "G.13. Design and evaluate trial-based and free-operant procedures.",
      "G.14. Design and evaluate group contingency procedures.",
      "G.15. Design and evaluate procedures to promote stimulus and response generalization.",
      "G.16. Design and evaluate maintenance and schedule thinning procedures.",
      "G.17. Design and evaluate positive and negative punishment procedures.",
      "G.18. Identify and mitigate emotional and elicited effects of behavior-change procedures.",
      "G.19. Design and evaluate procedures to promote emergent relations and generative performance.",
    ],
  },
  {
    code: "H",
    slug: "h",
    title: "Selecting and Implementing Interventions",
    description:
      "Connect assessment results to measurable goals, evidence-based interventions, alternative behaviors, integrity, effectiveness, and collaboration.",
    progress: 0,
    checklistItems: [
      "H.1. Develop intervention goals in observable and measurable terms.",
      "H.2. Identify and recommend interventions based on assessment results, scientific evidence, client preferences, and contextual fit.",
      "H.3. Select socially valid alternative behavior to establish or increase when decreasing target behavior.",
      "H.4. Mitigate unwanted effects of reinforcement, extinction, and punishment procedures.",
      "H.5. Plan for and mitigate relapse.",
      "H.6. Make data-based decisions about procedural integrity.",
      "H.7. Make data-based decisions about intervention effectiveness and modification.",
      "H.8. Collaborate with others to support services.",
    ],
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
