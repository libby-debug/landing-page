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
      "Goals of behavior analysis as a science",
      "Philosophical assumptions of behavior analysis",
      "Radical behaviorism and private events",
      "Behaviorism, EAB, ABA, and professional practice",
      "Dimensions of applied behavior analysis",
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
      "Behavior, response, and response class",
      "Stimulus and stimulus class",
      "Respondent and operant conditioning",
      "Positive and negative reinforcement contingencies",
      "Positive and negative punishment contingencies",
      "Automatic and socially mediated contingencies",
      "Unconditioned, conditioned, and generalized reinforcers",
      "Unconditioned, conditioned, and generalized punishers",
      "Simple schedules of reinforcement",
      "Concurrent, multiple, mixed, and chained schedules",
      "Operant and respondent extinction",
      "Stimulus control",
      "Stimulus discrimination",
      "Stimulus and response generalization",
      "Response maintenance",
      "Motivating operations",
      "Motivating operations vs stimulus control",
      "Rule-governed and contingency-shaped behavior",
      "Verbal operants",
      "Multiple control in verbal behavior",
      "Emergent relations and generative performance",
      "Behavioral momentum and response persistence",
      "Matching law and response allocation",
      "Imitation and observational learning",
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
      "Operational definitions of behavior",
      "Direct, indirect, and product measures",
      "Occurrence measures",
      "Temporal dimensions of behavior",
      "Continuous and discontinuous measurement",
      "Interval recording and time sampling",
      "Efficiency, trials to criterion, and cost-benefit analysis",
      "Validity and reliability of measurement",
      "Selecting representative measurement procedures",
      "Graphing quantitative relations",
      "Interpreting graphed data",
      "Procedural integrity measurement",
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
      "Dependent and independent variables",
      "Internal and external validity",
      "Threats to internal validity",
      "Defining features of single-case experimental designs",
      "Single-case and group design strengths",
      "Critiquing and interpreting single-case data",
      "Reversal, multiple-baseline, multielement, and changing-criterion designs",
      "Comparative, component, and parametric analyses",
      "Applying single-case experimental designs",
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
      "Core ethics principles for behavior analysts",
      "Risks of unethical behavior",
      "Developing and maintaining competence",
      "Confidential information requirements",
      "Public statements and professional representation",
      "Discontinuing services or supervision ethically",
      "Multiple relationships and conflicts of interest",
      "Interpersonal skills for professional relationships",
      "Cultural humility in professional practice",
      "Culturally responsive and inclusive services",
      "Personal biases and professional judgment",
      "Legal, regulatory, and practice requirements",
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
      "Relevant sources of assessment information",
      "Cultural variables in assessment and service delivery",
      "Skill assessments",
      "Preference assessments",
      "Descriptive assessments",
      "Functional analyses",
      "Interpreting assessment data and referrals",
      "Selecting goals and procedures from assessment data",
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
      "Positive and negative reinforcement procedures",
      "Differential reinforcement with and without extinction",
      "Time-based reinforcement schedules",
      "Conditioned reinforcement and token economies",
      "Motivating operations and discriminative stimuli in interventions",
      "Simple and conditional discrimination training",
      "Stimulus and response prompting",
      "Prompt fading",
      "Modeling procedures",
      "Instructions and rules",
      "Shaping procedures",
      "Chaining procedures",
      "Trial-based and free-operant procedures",
      "Group contingencies",
      "Stimulus and response generalization",
      "Maintenance and schedule thinning",
      "Positive and negative punishment procedures",
      "Emotional and elicited effects of behavior-change procedures",
      "Emergent relations and generative performance",
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
      "Observable and measurable intervention goals",
      "Interventions based on assessment, evidence, preferences, and contextual fit",
      "Socially valid alternative behavior selection",
      "Mitigating unwanted effects of behavior-change procedures",
      "Relapse planning and mitigation",
      "Data-based decisions about procedural integrity",
      "Data-based decisions about intervention effectiveness and modification",
      "Collaboration to support services",
    ],
  },
  {
    code: "I",
    slug: "i",
    title: "Personnel Supervision and Management",
    description:
      "Develop and enhance your supervision skill set by learning how to establish and maintain supervisory relationships, BST, and function-based approaches to supervision.",
    progress: 0,
    checklistItems: [
      "Benefits of behavior-analytic supervision",
      "Effective supervisory relationships",
      "Equity in supervision practices",
      "Supervision goals based on supervisee skills and context",
      "Culturally responsive performance management",
      "Function-based approaches to supervisee behavior",
      "Data-based decisions about supervisory effectiveness",
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
