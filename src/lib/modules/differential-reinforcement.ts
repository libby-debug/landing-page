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

export type LessonScenario = {
  title: string;
  scenario: string;
  why: string;
};

export type VisualLessonDetails = {
  targetLabel: string;
  targetBehavior: string;
  reinforcementLabel: string;
  reinforcementCriterion: string;
  whatGetsReinforced: string;
  visualExamples: LessonScenario[];
  examples: LessonScenario[];
  nonexamples: LessonScenario[];
};

export type ConfusionPair = {
  title: string;
  leftLabel: string;
  leftText: string;
  rightLabel: string;
  rightText: string;
  checkPrompt: string;
  checkAnswer: string;
  rationale: string;
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

export function getNextProcedureSlug(procedureSlug: string) {
  const currentIndex = differentialReinforcementProcedures.findIndex(
    (procedure) => procedure.slug === procedureSlug,
  );

  return differentialReinforcementProcedures[currentIndex + 1]?.slug;
}

export function getProcedureLessonDetails(
  procedure: DifferentialReinforcementProcedure,
): VisualLessonDetails {
  const details: Record<string, VisualLessonDetails> = {
    dra: {
      targetLabel: "Target behavior",
      targetBehavior: "Screaming to escape instructional demands",
      reinforcementLabel: "Alternative behavior",
      reinforcementCriterion:
        "Requesting a break using speech, picture exchange, or another taught communication response",
      whatGetsReinforced:
        "The alternative behavior that can access the same reinforcer as the behavior targeted for decrease.",
      visualExamples: [
        {
          title: "Escape-maintained behavior",
          scenario:
            "Task refusal no longer produces a break. Saying 'Break please' produces a short break.",
          why: "The communicative alternative contacts the same reinforcer that previously maintained refusal.",
        },
        {
          title: "Attention-maintained behavior",
          scenario:
            "Calling out is placed on extinction while raising a hand receives teacher attention.",
          why: "The reinforced response is an appropriate alternative for accessing attention.",
        },
        {
          title: "Access-maintained behavior",
          scenario:
            "Grabbing materials no longer works. Requesting the item appropriately is reinforced.",
          why: "The alternative response replaces the target behavior for the same access function.",
        },
      ],
      examples: [
        {
          title: "Functional communication",
          scenario:
            "Reinforce manding for help instead of yelling during difficult work.",
          why: "A specific alternative response is reinforced, and it can serve the same escape or assistance function.",
        },
        {
          title: "Appropriate attention request",
          scenario:
            "Reinforce tapping a card that says 'talk to me' instead of hitting for attention.",
          why: "The alternative response is specified and produces the maintaining reinforcer.",
        },
        {
          title: "Requesting access",
          scenario:
            "Reinforce asking for the tablet instead of grabbing it from another learner.",
          why: "Asking is an alternative behavior that can replace grabbing.",
        },
      ],
      nonexamples: [
        {
          title: "Absence only",
          scenario: "Deliver reinforcement if aggression does not occur for 5 minutes.",
          why: "That is DRO because reinforcement depends on absence, not a specific alternative response.",
        },
        {
          title: "Incompatible only",
          scenario: "Reinforce hands in pockets when touching walls is targeted.",
          why: "That is DRI because the response is physically incompatible with the target behavior.",
        },
        {
          title: "No replacement specified",
          scenario: "Reinforce any quiet behavior after a tantrum stops.",
          why: "A specific alternative response has not been selected or taught.",
        },
      ],
    },
    dro: {
      targetLabel: "Target behavior",
      targetBehavior: "Aggression during a 5-minute interval",
      reinforcementLabel: "Reinforcement requirement",
      reinforcementCriterion:
        "Zero occurrences of aggression for the entire interval",
      whatGetsReinforced:
        "The absence of the target behavior during a specified interval.",
      visualExamples: [
        {
          title: "Whole-interval DRO",
          scenario:
            "Reinforcement is delivered only if no aggression occurs for the full 5-minute interval.",
          why: "The contingency is based on zero target responses during the interval.",
        },
        {
          title: "Momentary DRO",
          scenario:
            "At the timer beep, reinforcement is delivered if hand biting is not occurring at that moment.",
          why: "The target behavior is absent at the check moment.",
        },
        {
          title: "Resetting DRO",
          scenario:
            "If disruption occurs, the interval resets and reinforcement is delayed until a full interval without disruption.",
          why: "The target behavior must be absent for the specified interval.",
        },
      ],
      examples: [
        {
          title: "No elopement interval",
          scenario:
            "Deliver reinforcement when elopement does not occur for 2 minutes.",
          why: "Reinforcement depends on absence of elopement.",
        },
        {
          title: "No property destruction",
          scenario:
            "Deliver reinforcement when no property destruction occurs during independent work.",
          why: "No specific alternative response is required; absence is the criterion.",
        },
        {
          title: "No spitting",
          scenario:
            "Deliver reinforcement when spitting does not occur during a short interval.",
          why: "The learner contacts reinforcement for zero occurrences of the target behavior.",
        },
      ],
      nonexamples: [
        {
          title: "Requesting a break",
          scenario:
            "Reinforce saying 'Break please' instead of falling to the floor.",
          why: "That is DRA because a specific alternative behavior is reinforced.",
        },
        {
          title: "Hands folded",
          scenario:
            "Reinforce hands folded when grabbing materials is targeted.",
          why: "That is DRI when the response is incompatible with grabbing.",
        },
        {
          title: "Reduced call-outs",
          scenario:
            "Reinforce five or fewer call-outs during group instruction.",
          why: "That is DRL because some responding is permitted at a lower rate.",
        },
      ],
    },
    dri: {
      targetLabel: "Target behavior",
      targetBehavior: "Touching walls in the hallway",
      reinforcementLabel: "Incompatible behavior",
      reinforcementCriterion: "Keeping both hands in pockets while walking",
      whatGetsReinforced:
        "A behavior that cannot physically occur at the same time as the behavior targeted for decrease.",
      visualExamples: [
        {
          title: "Hands occupied",
          scenario:
            "Hands in pockets are reinforced while wall touching is targeted.",
          why: "The two responses cannot occur simultaneously.",
        },
        {
          title: "Seated response",
          scenario:
            "Sitting in a chair is reinforced when leaving the seat is targeted.",
          why: "Sitting and leaving the seat are incompatible at the same moment.",
        },
        {
          title: "Mouth closed",
          scenario: "Mouth closed is reinforced when spitting is targeted.",
          why: "The incompatible response prevents the target response topography.",
        },
      ],
      examples: [
        {
          title: "Hands folded",
          scenario:
            "Reinforce hands folded on the desk when grabbing peers' materials is targeted.",
          why: "Hands folded cannot occur at the same time as grabbing materials.",
        },
        {
          title: "Walking with hands in pockets",
          scenario:
            "Reinforce walking with hands in pockets when touching walls is targeted.",
          why: "The reinforced response is physically incompatible with wall touching.",
        },
        {
          title: "Sitting during circle",
          scenario:
            "Reinforce sitting on the carpet when running around the room is targeted.",
          why: "Sitting and running are incompatible responses.",
        },
      ],
      nonexamples: [
        {
          title: "Asking for attention",
          scenario: "Reinforce asking for attention instead of calling out.",
          why: "That may be DRA, but asking is not necessarily incompatible with calling out.",
        },
        {
          title: "No disruption interval",
          scenario: "Deliver reinforcement when no disruption occurs for 3 minutes.",
          why: "That is DRO because reinforcement depends on absence across an interval.",
        },
        {
          title: "Fewer interruptions",
          scenario: "Reinforce two or fewer interruptions during a lesson.",
          why: "That is DRL because the target behavior can still occur at a lower rate.",
        },
      ],
    },
    drl: {
      targetLabel: "Target behavior",
      targetBehavior: "Calling out 20 times during class",
      reinforcementLabel: "Low-rate criterion",
      reinforcementCriterion: "Eight or fewer call-outs during class",
      whatGetsReinforced:
        "Lower rates of a behavior when the behavior is acceptable at reduced frequency.",
      visualExamples: [
        {
          title: "Full-session DRL",
          scenario:
            "Reinforcement is delivered if call-outs remain below a session criterion.",
          why: "The behavior may still occur, but only at a lower rate.",
        },
        {
          title: "Interval DRL",
          scenario:
            "Reinforcement is delivered when no more than two questions occur in each 10-minute interval.",
          why: "The contingency reduces rate without requiring zero responding.",
        },
        {
          title: "Spaced-responding DRL",
          scenario:
            "Reinforcement follows responses only when enough time has passed since the previous response.",
          why: "The goal is to space responses and reduce overall rate.",
        },
      ],
      examples: [
        {
          title: "Lower rate of hand raising",
          scenario:
            "Reinforce raising a hand three or fewer times during a 20-minute lesson.",
          why: "Some hand raising remains acceptable at a reduced rate.",
        },
        {
          title: "Reduced repetitive questions",
          scenario:
            "Reinforce asking five or fewer repetitive questions during a session.",
          why: "The behavior is not eliminated; it is reduced to an acceptable rate.",
        },
        {
          title: "Spaced requests",
          scenario:
            "Reinforce requests only when at least 2 minutes have passed since the prior request.",
          why: "Spacing responses is a DRL arrangement.",
        },
      ],
      nonexamples: [
        {
          title: "Zero interruptions",
          scenario: "Reinforce no interruptions for 10 minutes.",
          why: "That is DRO because zero occurrences are required.",
        },
        {
          title: "More correct responses",
          scenario: "Reinforce 20 or more math facts completed in 5 minutes.",
          why: "That is DRH because the goal is higher response rate.",
        },
        {
          title: "Functional communication",
          scenario: "Reinforce requesting a break instead of refusing work.",
          why: "That is DRA because a specific alternative response is reinforced.",
        },
      ],
    },
    drh: {
      targetLabel: "Desired behavior",
      targetBehavior: "Completing 8 math facts in 5 minutes",
      reinforcementLabel: "High-rate criterion",
      reinforcementCriterion: "Completing at least 20 math facts in 5 minutes",
      whatGetsReinforced:
        "Higher rates of a desired behavior when increasing response frequency is the goal.",
      visualExamples: [
        {
          title: "Fluency practice",
          scenario:
            "Reinforcement is delivered for completing at least 20 math facts in 5 minutes.",
          why: "The contingency requires responding above a high-rate criterion.",
        },
        {
          title: "Increased mands",
          scenario:
            "Reinforcement is delivered for at least 10 independent mands during snack.",
          why: "The goal is to increase rate of an appropriate behavior.",
        },
        {
          title: "Task completion",
          scenario:
            "Reinforcement follows six or more independent tasks completed per session.",
          why: "The criterion selects a higher response rate than baseline.",
        },
      ],
      examples: [
        {
          title: "More independent responses",
          scenario:
            "Reinforce 15 or more correct responses during fluency practice.",
          why: "Reinforcement depends on high-rate responding.",
        },
        {
          title: "More social initiations",
          scenario:
            "Reinforce four or more peer initiations during recess.",
          why: "The intervention increases rate of a desired behavior.",
        },
        {
          title: "More completed tasks",
          scenario:
            "Reinforce completing six or more independent tasks per session.",
          why: "A higher rate of task completion contacts reinforcement.",
        },
      ],
      nonexamples: [
        {
          title: "Fewer interruptions",
          scenario: "Reinforce three or fewer interruptions during a lesson.",
          why: "That is DRL because reinforcement depends on a lower rate.",
        },
        {
          title: "No aggression",
          scenario: "Reinforce zero aggression during a 5-minute interval.",
          why: "That is DRO because reinforcement depends on absence of the target behavior.",
        },
        {
          title: "Hands in pockets",
          scenario: "Reinforce hands in pockets instead of wall touching.",
          why: "That is DRI when the response is incompatible with the target behavior.",
        },
      ],
    },
  };

  return details[procedure.slug];
}

export function getConfusionPairs(
  procedure: DifferentialReinforcementProcedure,
): ConfusionPair[] {
  return [
    {
      title: `${procedure.abbreviation} anchor`,
      leftLabel: procedure.abbreviation,
      leftText: procedure.rule,
      rightLabel: "Common error",
      rightText: procedure.confusion,
      checkPrompt: `What must you verify before labeling a scenario ${procedure.abbreviation}?`,
      checkAnswer: procedure.discrimination,
      rationale: procedure.discrimination,
    },
    {
      title: "DRA vs. DRI",
      leftLabel: "DRA",
      leftText:
        "Reinforce an alternative behavior. The alternative behavior does not have to be physically incompatible with the target behavior.",
      rightLabel: "DRI",
      rightText:
        "Reinforce an incompatible behavior that cannot occur at the same time as the target behavior.",
      checkPrompt:
        "If asking for help replaces yelling but yelling could still occur, which procedure is more precise?",
      checkAnswer: "DRA",
      rationale:
        "Asking for help is an alternative response, but it is not necessarily physically incompatible with yelling.",
    },
    {
      title: "DRO vs. DRL",
      leftLabel: "DRO",
      leftText:
        "Reinforce the absence of the target behavior during a specified interval.",
      rightLabel: "DRL",
      rightText:
        "Reinforce a lower rate of behavior when some responding remains acceptable.",
      checkPrompt:
        "If reinforcement is delivered for three or fewer call-outs, which procedure is more precise?",
      checkAnswer: "DRL",
      rationale:
        "Three or fewer call-outs allows some responding, so the arrangement is DRL rather than DRO.",
    },
    {
      title: "DRL vs. DRH",
      leftLabel: "DRL",
      leftText:
        "Use DRL to decrease response rate without requiring zero occurrences.",
      rightLabel: "DRH",
      rightText:
        "Use DRH to increase response rate above a specified criterion.",
      checkPrompt:
        "If reinforcement is delivered for at least 20 completed math facts, which procedure is more precise?",
      checkAnswer: "DRH",
      rationale:
        "The learner contacts reinforcement for a higher rate of behavior, so the arrangement is DRH.",
    },
  ];
}
