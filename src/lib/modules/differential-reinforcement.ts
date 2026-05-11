export type LessonStepSlug =
  | "visual-comparison"
  | "discrimination-practice"
  | "examples"
  | "common-confusions"
  | "mastery-quiz";

export type QuizQuestion = {
  prompt: string;
  options: string[];
  answer: string;
  rationale: string;
};

export type DifferentialReinforcementProcedure = {
  slug: string;
  abbreviation: string;
  name: string;
  rule: string;
  example: string;
  nonexample: string;
  confusion: string;
  discrimination: string;
  color: string;
  border: string;
  bg: string;
  quiz: QuizQuestion[];
};

export const masteryThreshold = 90;

export const lessonSteps: {
  slug: LessonStepSlug;
  title: string;
  label: string;
  description: string;
}[] = [
  {
    slug: "visual-comparison",
    title: "Visual Comparison",
    label: "Visual",
    description: "Compare the reinforcement rule before practicing scenarios.",
  },
  {
    slug: "discrimination-practice",
    title: "Discrimination Practice",
    label: "Discriminate",
    description: "Separate the selected procedure from related procedures.",
  },
  {
    slug: "examples",
    title: "Examples and Nonexamples",
    label: "Examples",
    description: "Study applied scenarios and nonexamples side by side.",
  },
  {
    slug: "common-confusions",
    title: "Common Confusions",
    label: "Confusions",
    description: "Review the exact technical distinctions that drive errors.",
  },
  {
    slug: "mastery-quiz",
    title: "Mastery Quiz",
    label: "Quiz",
    description: "Answer scenario questions and save mastery at 90% or higher.",
  },
];

export const differentialReinforcementProcedures: DifferentialReinforcementProcedure[] = [
  {
    slug: "dra",
    abbreviation: "DRA",
    name: "Differential Reinforcement of Alternative Behavior",
    rule: "Reinforce an alternative behavior that serves the same function as the behavior targeted for decrease.",
    example:
      "Reinforce requesting a break instead of engaging in escape-maintained problem behavior.",
    nonexample:
      "Reinforcing any quiet behavior without confirming that it is an alternative response for the same function.",
    confusion:
      "DRA is commonly confused with DRI. DRA requires an alternative behavior; DRI requires an incompatible behavior.",
    discrimination:
      "Ask whether a specific alternative response is being reinforced and whether that response serves the same function as the behavior targeted for decrease.",
    color: "text-blue-600",
    border: "border-blue-200",
    bg: "bg-blue-50",
    quiz: [
      {
        prompt:
          "A learner screams to escape tasks. Staff teach and reinforce saying, 'Break please,' while no longer allowing screaming to produce escape. Which procedure is represented?",
        options: ["DRA", "DRO", "DRL", "DRH"],
        answer: "DRA",
        rationale:
          "DRA reinforces a specific alternative behavior that can serve the same function as the behavior targeted for decrease.",
      },
      {
        prompt: "Which feature is required for DRA?",
        options: [
          "A specific alternative behavior is reinforced",
          "Zero occurrences are required for an interval",
          "Only high response rates contact reinforcement",
          "Only physically incompatible responses qualify",
        ],
        answer: "A specific alternative behavior is reinforced",
        rationale:
          "DRA requires reinforcement for an alternative response, while DRO reinforces absence of the target behavior.",
      },
      {
        prompt:
          "Why is reinforcing any quiet behavior without a functionally equivalent replacement response not a strong example of DRA?",
        options: [
          "The alternative response and function have not been specified",
          "DRA never uses reinforcement",
          "DRA requires a low-rate criterion",
          "The target behavior must increase first",
        ],
        answer: "The alternative response and function have not been specified",
        rationale:
          "DRA depends on selecting and reinforcing a specific alternative response, ideally one that contacts the same reinforcer.",
      },
    ],
  },
  {
    slug: "dro",
    abbreviation: "DRO",
    name: "Differential Reinforcement of Other Behavior",
    rule: "Reinforce the absence of the target behavior during a specified interval.",
    example:
      "Deliver reinforcement when aggression does not occur for a 5-minute interval.",
    nonexample:
      "Reinforcing a specific replacement response; that arrangement is DRA, not DRO.",
    confusion:
      "DRO does not teach a specific alternative response unless another teaching procedure is added.",
    discrimination:
      "Ask whether reinforcement depends on the absence of the target behavior for an interval, rather than a specific replacement response.",
    color: "text-purple-600",
    border: "border-purple-200",
    bg: "bg-purple-50",
    quiz: [
      {
        prompt:
          "A learner receives reinforcement when no aggression occurs for 5 minutes. Which procedure is represented?",
        options: ["DRO", "DRA", "DRI", "DRH"],
        answer: "DRO",
        rationale:
          "DRO reinforces the absence of the target behavior during a specified interval.",
      },
      {
        prompt: "What is the major limitation of DRO when used alone?",
        options: [
          "It does not teach a specific alternative response",
          "It always increases response rate",
          "It requires an incompatible behavior",
          "It cannot include reinforcement",
        ],
        answer: "It does not teach a specific alternative response",
        rationale:
          "DRO can reduce behavior by reinforcing its absence, but it does not automatically teach what the learner should do instead.",
      },
      {
        prompt: "Which scenario is not DRO?",
        options: [
          "Reinforcing functional communication after task presentation",
          "Reinforcing no elopement for a 2-minute interval",
          "Reinforcing no disruption during independent work",
          "Reinforcing intervals without hand biting",
        ],
        answer: "Reinforcing functional communication after task presentation",
        rationale:
          "Reinforcing functional communication is a specific alternative response, making the arrangement closer to DRA.",
      },
    ],
  },
  {
    slug: "dri",
    abbreviation: "DRI",
    name: "Differential Reinforcement of Incompatible Behavior",
    rule: "Reinforce a behavior that cannot occur at the same time as the behavior targeted for decrease.",
    example:
      "Reinforce hands folded on the desk when hand-flapping is the behavior targeted for decrease.",
    nonexample:
      "Reinforcing a behavior that can occur at the same time as the target behavior.",
    confusion:
      "DRI is a subtype of DRA when the alternative response is physically incompatible with the target behavior.",
    discrimination:
      "Ask whether the reinforced behavior and target behavior are physically impossible to emit at the same time.",
    color: "text-pink-600",
    border: "border-pink-200",
    bg: "bg-pink-50",
    quiz: [
      {
        prompt:
          "A learner is reinforced for keeping both hands in pockets when scratching is the behavior targeted for decrease. Which procedure is represented?",
        options: ["DRI", "DRA", "DRO", "DRL"],
        answer: "DRI",
        rationale:
          "Hands in pockets is incompatible with scratching because both responses cannot occur simultaneously.",
      },
      {
        prompt: "What makes DRI different from broader DRA?",
        options: [
          "The alternative behavior is incompatible with the target behavior",
          "The target behavior must be absent for a timed interval",
          "Only lower rates are reinforced",
          "The maintaining reinforcer is never considered",
        ],
        answer: "The alternative behavior is incompatible with the target behavior",
        rationale:
          "DRI is a subtype of DRA in which the alternative response cannot occur at the same time as the target behavior.",
      },
      {
        prompt: "Which is a nonexample of DRI?",
        options: [
          "Reinforcing asking for attention when calling out can still occur",
          "Reinforcing sitting when leaving the seat is targeted",
          "Reinforcing hands folded when grabbing materials is targeted",
          "Reinforcing mouth closed when spitting is targeted",
        ],
        answer: "Reinforcing asking for attention when calling out can still occur",
        rationale:
          "Asking for attention may be an alternative response, but it is not necessarily physically incompatible with calling out.",
      },
    ],
  },
  {
    slug: "drl",
    abbreviation: "DRL",
    name: "Differential Reinforcement of Low Rates of Behavior",
    rule: "Reinforce lower rates of a behavior when the behavior is acceptable at reduced frequency.",
    example:
      "Reinforce raising a hand three or fewer times during a 20-minute lesson.",
    nonexample:
      "Reinforcing zero instances of the behavior; that is closer to DRO than DRL.",
    confusion:
      "DRL is not used when the behavior must be eliminated completely.",
    discrimination:
      "Ask whether the goal is a reduced but still acceptable rate, not zero responding.",
    color: "text-green-600",
    border: "border-green-200",
    bg: "bg-green-50",
    quiz: [
      {
        prompt:
          "A teacher reinforces hand raising when it occurs three or fewer times during a 20-minute lesson. Which procedure is represented?",
        options: ["DRL", "DRO", "DRH", "DRI"],
        answer: "DRL",
        rationale:
          "DRL reinforces lower rates of behavior when some level of the behavior remains acceptable.",
      },
      {
        prompt: "When is DRL inappropriate?",
        options: [
          "When the behavior must be eliminated completely",
          "When the behavior occurs too often",
          "When the behavior is acceptable at a lower rate",
          "When rate is the relevant response dimension",
        ],
        answer: "When the behavior must be eliminated completely",
        rationale:
          "DRL is designed to reduce response rate, not eliminate the behavior entirely.",
      },
      {
        prompt: "Which scenario is closer to DRO than DRL?",
        options: [
          "Reinforcing zero instances of interruption for 10 minutes",
          "Reinforcing five or fewer comments during group",
          "Reinforcing lower rates of repetitive question asking",
          "Reinforcing reduced hand raising while still allowing some responses",
        ],
        answer: "Reinforcing zero instances of interruption for 10 minutes",
        rationale:
          "A zero-occurrence interval is characteristic of DRO, while DRL allows reduced rates of responding.",
      },
    ],
  },
  {
    slug: "drh",
    abbreviation: "DRH",
    name: "Differential Reinforcement of High Rates of Behavior",
    rule: "Reinforce higher rates of a behavior when increasing response frequency is the goal.",
    example:
      "Reinforce completing at least 20 math facts during a 5-minute timing.",
    nonexample:
      "Reinforcing fewer responses than baseline; that is not DRH.",
    confusion:
      "DRH increases behavior. DRL decreases response rate without requiring zero responding.",
    discrimination:
      "Ask whether reinforcement depends on exceeding a high-rate criterion for a desired behavior.",
    color: "text-orange-600",
    border: "border-orange-200",
    bg: "bg-orange-50",
    quiz: [
      {
        prompt:
          "A learner earns reinforcement for completing at least 20 math facts in 5 minutes. Which procedure is represented?",
        options: ["DRH", "DRL", "DRO", "DRA"],
        answer: "DRH",
        rationale:
          "DRH reinforces higher rates of a desired behavior when increasing frequency is the goal.",
      },
      {
        prompt: "Which distinction separates DRH from DRL?",
        options: [
          "DRH increases response rate; DRL decreases response rate",
          "DRH reinforces absence; DRL reinforces incompatible behavior",
          "DRH never uses a rate criterion",
          "DRL is always punishment",
        ],
        answer: "DRH increases response rate; DRL decreases response rate",
        rationale:
          "DRH and DRL both involve rate, but DRH increases rate while DRL decreases rate.",
      },
      {
        prompt: "Which scenario is not DRH?",
        options: [
          "Reinforcing three or fewer interruptions during a lesson",
          "Reinforcing 15 or more correct responses during fluency practice",
          "Reinforcing increased manding across a session",
          "Reinforcing higher rates of independent task completion",
        ],
        answer: "Reinforcing three or fewer interruptions during a lesson",
        rationale:
          "Reinforcing a reduced rate is DRL, not DRH.",
      },
    ],
  },
];

export const tcoAlignment = [
  "G.1 Reinforcement procedures",
  "G.2 Differential reinforcement procedures with and without extinction",
  "G.3 Time-based reinforcement schedules",
  "G.4 Conditioned reinforcers",
];

export const moduleConfusions = [
  {
    title: "DRA vs. DRI",
    text: "DRA reinforces an alternative behavior. DRI reinforces an incompatible behavior that cannot occur simultaneously with the target behavior.",
  },
  {
    title: "DRO vs. DRA",
    text: "DRO reinforces the absence of the target behavior. DRA reinforces a specific alternative response.",
  },
  {
    title: "DRL vs. DRO",
    text: "DRL reduces the rate of a behavior. DRO reinforces intervals with zero occurrences of the target behavior.",
  },
  {
    title: "DRH vs. DRL",
    text: "DRH increases response rate. DRL decreases response rate while allowing the behavior to continue at an acceptable level.",
  },
];

export function getProcedure(slug: string) {
  return differentialReinforcementProcedures.find(
    (procedure) => procedure.slug === slug,
  );
}

export function getLessonStep(slug: string) {
  return lessonSteps.find((step) => step.slug === slug);
}

export function getStepHref(procedureSlug: string, stepSlug: LessonStepSlug) {
  return `/modules/differential-reinforcement/${procedureSlug}/${stepSlug}`;
}
