export type QuizQuestion = {
  prompt: string;
  options: string[];
  answer: string;
  rationale: string;
};

export type StudyModule = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  tcoAlignment: string;
  previousSlug?: string;
  previousTitle?: string;
  concepts: {
    label: string;
    text: string;
  }[];
  comparisons: {
    title: string;
    description: string;
  }[];
  examples: {
    example: string;
    nonexample: string;
  }[];
  commonConfusions: {
    title: string;
    text: string;
  }[];
  quiz: QuizQuestion[];
};

export const masteryThreshold = 90;

export const behaviorChangeModules: Record<string, StudyModule> = {
  prompting: {
    slug: "prompting",
    title: "Prompting",
    eyebrow: "TCO 6 Behavior-Change Procedures",
    description:
      "Study response prompts, stimulus prompts, prompt dependence, and transfer of stimulus control while preserving the technical distinctions between prompt types.",
    tcoAlignment: "TCO 6 G. Behavior-Change Procedures",
    concepts: [
      {
        label: "Response prompt",
        text: "Supplemental antecedent stimulus that evokes the correct response by assisting the learner's behavior.",
      },
      {
        label: "Stimulus prompt",
        text: "Supplemental antecedent stimulus that changes the salience or features of the discriminative stimulus.",
      },
      {
        label: "Transfer of stimulus control",
        text: "The target response comes under control of the natural discriminative stimulus rather than the supplemental prompt.",
      },
    ],
    comparisons: [
      {
        title: "Response prompt vs. stimulus prompt",
        description:
          "Response prompts act on the learner's response. Stimulus prompts alter the antecedent stimulus arrangement.",
      },
      {
        title: "Prompting vs. reinforcement",
        description:
          "Prompting increases the likelihood of a correct response before behavior occurs. Reinforcement follows behavior and increases future responding.",
      },
    ],
    examples: [
      {
        example:
          "A therapist models touching the correct picture after saying, 'Touch toothbrush.'",
        nonexample:
          "A therapist delivers praise after the learner independently touches toothbrush; that is reinforcement, not a prompt.",
      },
      {
        example:
          "The correct comparison stimulus is made larger during early trials.",
        nonexample:
          "The learner guesses correctly without any supplemental antecedent assistance.",
      },
    ],
    commonConfusions: [
      {
        title: "Prompting is not the terminal goal",
        text: "Prompting should support accurate responding while arranging transfer of stimulus control to the natural discriminative stimulus.",
      },
      {
        title: "Prompt dependence",
        text: "Prompt dependence occurs when responding remains under control of the prompt rather than the relevant discriminative stimulus.",
      },
    ],
    quiz: [
      {
        prompt:
          "A therapist physically guides a learner's hand toward the correct comparison stimulus. What type of prompt is this?",
        options: ["Response prompt", "Stimulus prompt", "Extinction", "DRL"],
        answer: "Response prompt",
        rationale:
          "Physical guidance assists the learner's response, so it is a response prompt.",
      },
      {
        prompt:
          "The correct item is highlighted while other items remain unchanged. What type of prompt is being used?",
        options: ["Stimulus prompt", "Response prompt", "Punishment", "DRO"],
        answer: "Stimulus prompt",
        rationale:
          "Highlighting changes the salience of the antecedent stimulus, which makes it a stimulus prompt.",
      },
      {
        prompt:
          "What is the desired outcome of prompting in skill acquisition?",
        options: [
          "Transfer of stimulus control",
          "Permanent prompt dependence",
          "Response suppression",
          "Abolishing operation",
        ],
        answer: "Transfer of stimulus control",
        rationale:
          "Prompting should be faded so the response occurs under the natural discriminative stimulus.",
      },
    ],
  },
  "prompt-fading": {
    slug: "prompt-fading",
    title: "Prompt Fading",
    eyebrow: "TCO 6 Behavior-Change Procedures",
    description:
      "Study how prompts are systematically reduced so correct responding transfers to the relevant discriminative stimulus.",
    tcoAlignment: "TCO 6 G. Behavior-Change Procedures",
    previousSlug: "prompting",
    previousTitle: "Prompting",
    concepts: [
      {
        label: "Most-to-least prompting",
        text: "Prompts begin with more intrusive assistance and are systematically reduced across trials.",
      },
      {
        label: "Least-to-most prompting",
        text: "Prompts begin with the least intrusive assistance and increase only as needed.",
      },
      {
        label: "Time delay",
        text: "A delay is inserted between the discriminative stimulus and prompt to allow independent responding.",
      },
    ],
    comparisons: [
      {
        title: "Prompt fading vs. prompt removal",
        description:
          "Prompt fading is systematic and planned. Abrupt prompt removal can produce errors or loss of instructional control.",
      },
      {
        title: "Graduated guidance vs. time delay",
        description:
          "Graduated guidance changes physical assistance moment by moment. Time delay changes the interval before prompt delivery.",
      },
    ],
    examples: [
      {
        example:
          "A teacher moves from full physical guidance to partial physical guidance, then to a gestural prompt.",
        nonexample:
          "A teacher continues full physical guidance indefinitely after the learner can respond independently.",
      },
      {
        example:
          "A 0-second time delay shifts to a 3-second time delay after correct prompted trials.",
        nonexample:
          "A teacher waits randomly without a planned prompt-fading procedure.",
      },
    ],
    commonConfusions: [
      {
        title: "Fading is not extinction",
        text: "Prompt fading reduces supplemental antecedent assistance. Extinction withholds reinforcement for a previously reinforced response.",
      },
      {
        title: "Intrusiveness matters",
        text: "Prompt fading decisions should account for prompt intrusiveness, error patterns, and transfer of stimulus control.",
      },
    ],
    quiz: [
      {
        prompt:
          "A teacher begins with full physical guidance and later shifts to a model prompt. Which procedure is this?",
        options: [
          "Most-to-least prompting",
          "Least-to-most prompting",
          "DRO",
          "Response cost",
        ],
        answer: "Most-to-least prompting",
        rationale:
          "The procedure begins with a more intrusive prompt and fades to less intrusive prompts.",
      },
      {
        prompt:
          "A teacher waits 5 seconds after the discriminative stimulus before giving a prompt. What is this?",
        options: ["Time delay", "DRH", "Extinction burst", "Overcorrection"],
        answer: "Time delay",
        rationale:
          "Time delay inserts a planned interval before delivering the prompt.",
      },
      {
        prompt:
          "What is the primary goal of prompt fading?",
        options: [
          "Independent responding under the natural discriminative stimulus",
          "Permanent prompt dependence",
          "Reducing reinforcement",
          "Increasing response effort",
        ],
        answer: "Independent responding under the natural discriminative stimulus",
        rationale:
          "Prompt fading transfers stimulus control from the prompt to the relevant antecedent stimulus.",
      },
    ],
  },
  shaping: {
    slug: "shaping",
    title: "Shaping",
    eyebrow: "TCO 6 Behavior-Change Procedures",
    description:
      "Study differential reinforcement of successive approximations toward a terminal behavior.",
    tcoAlignment: "TCO 6 G. Behavior-Change Procedures",
    previousSlug: "prompt-fading",
    previousTitle: "Prompt Fading",
    concepts: [
      {
        label: "Successive approximations",
        text: "Responses that increasingly resemble the terminal behavior across dimensions such as topography, duration, latency, or force.",
      },
      {
        label: "Terminal behavior",
        text: "The final response form or performance criterion selected before shaping begins.",
      },
      {
        label: "Differential reinforcement",
        text: "Reinforce closer approximations while withholding reinforcement for earlier approximations.",
      },
    ],
    comparisons: [
      {
        title: "Shaping vs. chaining",
        description:
          "Shaping changes one response across successive approximations. Chaining links multiple responses into a behavior chain.",
      },
      {
        title: "Shaping vs. prompting",
        description:
          "Shaping relies on differential reinforcement of approximations. Prompting uses supplemental antecedent stimuli to evoke correct responding.",
      },
    ],
    examples: [
      {
        example:
          "Reinforce closer and closer vocal approximations until the learner says 'water.'",
        nonexample:
          "Teach each step of handwashing in sequence; that is chaining rather than shaping.",
      },
      {
        example:
          "Reinforce increasingly longer durations of seated behavior until the terminal duration is reached.",
        nonexample:
          "Deliver the same reinforcer for every response regardless of approximation quality.",
      },
    ],
    commonConfusions: [
      {
        title: "Approximation criteria must shift",
        text: "If the criterion never changes, the procedure is not shaping toward a terminal behavior.",
      },
      {
        title: "Do not skip approximations too quickly",
        text: "Criterion shifts that are too large can produce errors, extinction-induced responding, or loss of momentum.",
      },
    ],
    quiz: [
      {
        prompt:
          "A therapist reinforces closer vocal approximations to 'cookie' over time. Which procedure is this?",
        options: ["Shaping", "Chaining", "DRO", "Time-out"],
        answer: "Shaping",
        rationale:
          "The therapist differentially reinforces successive approximations toward a terminal vocal response.",
      },
      {
        prompt: "What is required before shaping begins?",
        options: [
          "A terminal behavior",
          "A token economy",
          "A punishment procedure",
          "A fixed-ratio schedule only",
        ],
        answer: "A terminal behavior",
        rationale:
          "A terminal behavior guides which approximations should contact reinforcement.",
      },
      {
        prompt:
          "Which statement best distinguishes shaping from chaining?",
        options: [
          "Shaping changes one response; chaining links multiple responses.",
          "Shaping is punishment; chaining is reinforcement.",
          "Shaping requires no reinforcement.",
          "Chaining never uses prompts.",
        ],
        answer: "Shaping changes one response; chaining links multiple responses.",
        rationale:
          "Shaping builds a response through approximations, while chaining teaches a sequence of responses.",
      },
    ],
  },
  chaining: {
    slug: "chaining",
    title: "Chaining",
    eyebrow: "TCO 6 Behavior-Change Procedures",
    description:
      "Study forward chaining, backward chaining, and total-task chaining for teaching behavior chains.",
    tcoAlignment: "TCO 6 G. Behavior-Change Procedures",
    previousSlug: "shaping",
    previousTitle: "Shaping",
    concepts: [
      {
        label: "Behavior chain",
        text: "A sequence of responses in which each response produces a stimulus change that functions as a conditioned reinforcer and discriminative stimulus for the next response.",
      },
      {
        label: "Task analysis",
        text: "Breaking a complex skill into teachable component responses in the correct sequence.",
      },
      {
        label: "Backward chaining",
        text: "Teach the final response first so completion of the chain contacts the terminal reinforcer.",
      },
    ],
    comparisons: [
      {
        title: "Forward chaining vs. backward chaining",
        description:
          "Forward chaining teaches the first step first. Backward chaining teaches the last step first.",
      },
      {
        title: "Total-task chaining vs. single-step chaining",
        description:
          "Total-task chaining teaches every step during each teaching opportunity, with prompts as needed.",
      },
    ],
    examples: [
      {
        example:
          "Teach toothbrushing by prompting each step in a task analysis and fading prompts across the chain.",
        nonexample:
          "Reinforce closer approximations to a single vocal response; that is shaping.",
      },
      {
        example:
          "Teach the final step of handwashing first, then teach earlier steps across sessions.",
        nonexample:
          "Reinforce absence of handwashing errors for an interval; that is not chaining.",
      },
    ],
    commonConfusions: [
      {
        title: "Chains require response sequences",
        text: "A single response that changes gradually is not a behavior chain.",
      },
      {
        title: "Each step has a stimulus function",
        text: "The stimulus change after each response can function as a conditioned reinforcer and discriminative stimulus for the next response.",
      },
    ],
    quiz: [
      {
        prompt:
          "Teaching the final step of a task analysis first is which chaining procedure?",
        options: [
          "Backward chaining",
          "Forward chaining",
          "Shaping",
          "DRO",
        ],
        answer: "Backward chaining",
        rationale:
          "Backward chaining begins instruction with the final response in the chain.",
      },
      {
        prompt:
          "What does a task analysis provide for chaining?",
        options: [
          "The component responses in sequence",
          "A punisher hierarchy",
          "A motivating operation only",
          "A preference assessment format",
        ],
        answer: "The component responses in sequence",
        rationale:
          "A task analysis identifies the response sequence that makes up the behavior chain.",
      },
      {
        prompt:
          "Which feature is central to a behavior chain?",
        options: [
          "Each response produces a stimulus change for the next response",
          "Only one response topography is shaped",
          "Reinforcement is never delivered",
          "All prompts are prohibited",
        ],
        answer: "Each response produces a stimulus change for the next response",
        rationale:
          "Each step produces a stimulus change that can reinforce the prior response and occasion the next response.",
      },
    ],
  },
  extinction: {
    slug: "extinction",
    title: "Extinction",
    eyebrow: "TCO 6 Behavior-Change Procedures",
    description:
      "Study withholding reinforcement for a previously reinforced response and distinguishing extinction from punishment.",
    tcoAlignment: "TCO 6 G. Behavior-Change Procedures",
    previousSlug: "chaining",
    previousTitle: "Chaining",
    concepts: [
      {
        label: "Extinction",
        text: "Withholding reinforcement for a previously reinforced response, resulting in a decrease in future responding.",
      },
      {
        label: "Extinction burst",
        text: "A temporary increase in frequency, intensity, or variability of responding after extinction begins.",
      },
      {
        label: "Function-based extinction",
        text: "The reinforcer maintaining the behavior must be identified so that reinforcer can be withheld.",
      },
    ],
    comparisons: [
      {
        title: "Extinction vs. punishment",
        description:
          "Extinction withholds the maintaining reinforcer. Punishment presents or removes a stimulus after behavior to decrease future responding.",
      },
      {
        title: "Escape extinction vs. planned ignoring",
        description:
          "Escape extinction prevents escape from maintaining behavior. Planned ignoring withholds attention-maintained reinforcement.",
      },
    ],
    examples: [
      {
        example:
          "If screaming is maintained by attention, attention is withheld following screaming while appropriate communication contacts reinforcement.",
        nonexample:
          "A reprimand follows screaming and reduces future screaming; that is punishment, not extinction.",
      },
      {
        example:
          "If task refusal is maintained by escape, tasks continue and escape no longer follows refusal.",
        nonexample:
          "The task is removed after refusal; that continues escape reinforcement.",
      },
    ],
    commonConfusions: [
      {
        title: "Extinction depends on function",
        text: "The same topography may require different extinction procedures depending on the maintaining reinforcer.",
      },
      {
        title: "Extinction burst is not failure",
        text: "A temporary increase in responding may occur after extinction begins and should be planned for ethically.",
      },
    ],
    quiz: [
      {
        prompt:
          "A response previously maintained by attention no longer produces attention. Which procedure is this?",
        options: ["Extinction", "Punishment", "Prompt fading", "DRH"],
        answer: "Extinction",
        rationale:
          "The maintaining reinforcer, attention, is withheld for the previously reinforced response.",
      },
      {
        prompt:
          "What must be known to implement extinction correctly?",
        options: [
          "The maintaining reinforcer",
          "Only the response topography",
          "The learner's age",
          "The number of staff available",
        ],
        answer: "The maintaining reinforcer",
        rationale:
          "Extinction requires withholding the reinforcer that maintains the behavior.",
      },
      {
        prompt:
          "A temporary increase in response frequency after extinction begins is called what?",
        options: [
          "Extinction burst",
          "Stimulus control",
          "Backward chaining",
          "Abolishing operation",
        ],
        answer: "Extinction burst",
        rationale:
          "An extinction burst is a temporary increase in responding after extinction begins.",
      },
    ],
  },
};

export const moduleSequence = [
  "prompting",
  "prompt-fading",
  "shaping",
  "chaining",
  "extinction",
];
