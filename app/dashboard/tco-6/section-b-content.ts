export type VisualKind =
  | {
      type: "comparison";
      leftTitle: string;
      leftText: string;
      rightTitle: string;
      rightText: string;
      cue?: string;
    }
  | {
      type: "flow";
      prompt?: string;
      feedback?: string;
      steps: string[];
    }
  | {
      type: "quadrant";
      items: {
        title: string;
        action: string;
        effect: string;
      }[];
    }
  | {
      type: "example";
      example: string;
      nonexample: string;
    }
  | {
      type: "choice";
      prompt: string;
      choices: string[];
      answer: string;
      feedback: string;
    }
  | {
      type: "matching";
      prompt: string;
      pairs: {
        term: string;
        definition: string;
      }[];
    }
  | {
      type: "true-false";
      prompt: string;
      statement: string;
      answer: boolean;
      feedback: string;
    }
  | {
      type: "sorting";
      prompt: string;
      categories: [string, string];
      items: {
        label: string;
        category: string;
      }[];
    }
  | {
      type: "fill-blank";
      prompt: string;
      sentence: string;
      answer: string;
      feedback: string;
    }
  | {
      type: "select-all";
      prompt: string;
      choices: {
        label: string;
        correct: boolean;
      }[];
      feedback: string;
    };

export type MiniLessonContent = {
  slug: string;
  label: string;
  title: string;
  body: string[];
  visual: VisualKind;
};

export type QuestionType =
  | "multiple-choice"
  | "scenario"
  | "matching"
  | "sorting"
  | "fill-blank"
  | "select-all"
  | "true-false";

export type QuestionContent = {
  type?: QuestionType;
  prompt: string;
  choices?: string[];
  pairs?: {
    term: string;
    definition: string;
  }[];
  categories?: [string, string];
  items?: {
    label: string;
    category: string;
  }[];
  answers?: string[];
  answer: string;
  explanation: string;
};

export const sectionBMiniLessons: MiniLessonContent[] = [
  {
    slug: "behavior-response-response-class",
    label: "B.1-B.2",
    title: "Behavior, response, and response class",
    body: [
      "Behavior is [activity of a living organism] that produces measurable environmental change.",
      "A response is [one specific instance] of behavior.",
    ],
    visual: {
      type: "matching",
      prompt: "Match each term to its discrimination cue.",
      pairs: [
        {
          term: "Behavior",
          definition: "Activity of a living organism that can be measured.",
        },
        {
          term: "Response",
          definition: "One specific instance of behavior.",
        },
        {
          term: "Response class",
          definition: "Responses that share the same function or effect.",
        },
        {
          term: "Topography",
          definition: "The physical form or shape of a response.",
        },
      ],
    },
  },
  {
    slug: "environment-stimulus-stimulus-class",
    label: "B.1-B.2",
    title: "Environment, stimulus, and stimulus class",
    body: [
      "The environment is [the surrounding context] in which behavior occurs.",
      "A stimulus is [a specific aspect of the environment] that can be differentiated.",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Environment",
      leftText: "Full surrounding context",
      rightTitle: "Stimulus",
      rightText: "Specific detectable event or condition",
      cue: "Environment = larger context. Stimulus = one distinguishable part of that context.",
    },
  },
  {
    slug: "response-class-vs-stimulus-class",
    label: "B.1-B.2",
    title: "Response class vs stimulus class",
    body: [
      "A response class groups responses by [shared function].",
      "A stimulus class groups stimuli by [shared physical, temporal, or functional features].",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each example by class type.",
      categories: ["Response class", "Stimulus class"],
      items: [
        {
          label: "Saying 'help,' raising a hand, or handing over a card to get help",
          category: "Response class",
        },
        {
          label: "Different red stop signs that signal stopping",
          category: "Stimulus class",
        },
        {
          label: "Pointing, reaching, or saying 'that one' to select an item",
          category: "Response class",
        },
        {
          label: "Photos, drawings, and toy examples that all function as dogs",
          category: "Stimulus class",
        },
      ],
    },
  },
  {
    slug: "b1-b2-discrimination-check",
    label: "B.1-B.2",
    title: "Basic term discrimination",
    body: [
      "Do not confuse the [specific instance] with the broader behavior or class.",
      "Ask whether you are labeling an action, one occurrence, or a group.",
    ],
    visual: {
      type: "choice",
      prompt:
        "A learner raises her hand once after the teacher asks a question. What is that single occurrence?",
      choices: ["Response", "Response class", "Stimulus class", "Environment"],
      answer: "Response",
      feedback:
        "A response is one specific instance of behavior. A response class groups multiple responses that share a function.",
    },
  },
  {
    slug: "respondent-vs-operant",
    label: "B.3",
    title: "Respondent vs operant behavior",
    body: [
      "Respondent behavior is [elicited by antecedent stimuli].",
      "Operant behavior is [selected by consequences].",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Respondent",
      leftText: "Stimulus -> response",
      rightTitle: "Operant",
      rightText: "Behavior -> consequence",
      cue: "Respondent = triggered before behavior. Operant = shaped by what happens after behavior.",
    },
  },
  {
    slug: "respondent-conditioning",
    label: "B.3",
    title: "Respondent conditioning sequence",
    body: [
      "Respondent conditioning happens through [stimulus-stimulus pairing].",
      "A Neutral Stimulus (NS) becomes a Conditioned Stimulus (CS) [after pairing].",
    ],
    visual: {
      type: "flow",
      prompt: "What is the correct sequence in respondent conditioning?",
      steps: [
        "Neutral Stimulus (NS)",
        "Paired with Unconditioned Stimulus (US)",
        "Conditioned Stimulus (CS)",
        "Conditioned Response (CR)",
      ],
    },
  },
  {
    slug: "classical-vs-operant-conditioning",
    label: "B.3",
    title: "Classical vs operant conditioning",
    body: [
      "Classical conditioning changes [what stimulus elicits a response].",
      "Operant conditioning changes [future response frequency].",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Classical / respondent",
      leftText: "Stimulus pairing -> elicited response",
      rightTitle: "Operant",
      rightText: "Response -> consequence -> future behavior",
      cue: "Classical = stimulus pairing. Operant = consequence selection.",
    },
  },
  {
    slug: "operant-conditioning",
    label: "B.3",
    title: "Operant conditioning sequence",
    body: [
      "Operant conditioning is a [behavior-consequence relation].",
      "The consequence changes [future response frequency].",
    ],
    visual: {
      type: "matching",
      prompt: "Match each operant term to its role in the sequence.",
      pairs: [
        {
          term: "Antecedent context",
          definition: "The setting or stimulus conditions present before behavior.",
        },
        {
          term: "Response",
          definition: "The operant behavior emitted by the learner.",
        },
        {
          term: "Consequence",
          definition: "The event that follows the response.",
        },
        {
          term: "Future response frequency",
          definition: "The behavior changes over time because of its consequence.",
        },
      ],
    },
  },
  {
    slug: "pavlov-vs-skinner",
    label: "B.3",
    title: "Respondent conditioning vs operant learning",
    body: [
      "Respondent conditioning is the current term; Pavlovian conditioning is a common historical label.",
      "Respondent conditioning is based on events that come [before behavior].",
      "Operant learning is based on events that come [after behavior].",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Respondent / Pavlovian",
      leftText: "Antecedent stimulus -> elicited response",
      rightTitle: "Operant / Skinner",
      rightText: "Response -> consequence -> future behavior",
      cue: "Respondent = antecedent pairing. Operant = consequence selection.",
    },
  },
  {
    slug: "respondent-symbols",
    label: "B.3",
    title: "Respondent-conditioning abbreviations",
    body: [
      "US = Unconditioned Stimulus. UR = Unconditioned Response. NS = Neutral Stimulus.",
      "CS = Conditioned Stimulus. CR = Conditioned Response.",
    ],
    visual: {
      type: "matching",
      prompt: "Match each respondent term to its role.",
      pairs: [
        {
          term: "US (Unconditioned Stimulus)",
          definition: "Elicits a response without prior learning.",
        },
        {
          term: "UR (Unconditioned Response)",
          definition: "Unlearned response elicited by the Unconditioned Stimulus.",
        },
        {
          term: "NS (Neutral Stimulus)",
          definition: "Does not yet elicit the target response.",
        },
        {
          term: "CS (Conditioned Stimulus)",
          definition: "Elicits the Conditioned Response (CR) after pairing.",
        },
      ],
    },
  },
  {
    slug: "free-operant-vs-discrete-trial",
    label: "B.3",
    title: "Free operant vs discrete trial",
    body: [
      "Free-operant behavior can occur repeatedly without a specific trial start.",
      "Discrete-trial methods arrange [clear cued opportunities] to respond.",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each example by response arrangement.",
      categories: ["Free operant", "Discrete trial"],
      items: [
        { label: "Pressing a lever repeatedly", category: "Free operant" },
        { label: "Answering after a teacher presents a Discriminative Stimulus (SD)", category: "Discrete trial" },
        { label: "Talking freely on the playground", category: "Free operant" },
        { label: "Touching a card after 'point to dog'", category: "Discrete trial" },
      ],
    },
  },
  {
    slug: "reinforcement-increases",
    label: "B.4",
    title: "Reinforcement = behavior increases",
    body: [
      "Reinforcement is defined by [an increase in future responding].",
      "If behavior does not increase, do not call the consequence reinforcement.",
    ],
    visual: {
      type: "true-false",
      prompt: "Reinforcement check",
      statement:
        "A consequence is called reinforcement only if future responding increases.",
      answer: true,
      feedback:
        "Correct. Reinforcement is defined by its effect on future behavior, not by whether the consequence seems pleasant.",
    },
  },
  {
    slug: "positive-means-added",
    label: "B.4-B.5",
    title: "Positive = stimulus added",
    body: [
      "Positive means something is [added after the response].",
      "Positive does not mean good or preferred.",
    ],
    visual: {
      type: "fill-blank",
      prompt: "Complete the technical meaning of positive.",
      sentence: "Positive means a stimulus is ____ after the response.",
      answer: "added",
      feedback:
        "Positive means added. It does not mean good, helpful, or preferred.",
    },
  },
  {
    slug: "negative-means-removed",
    label: "B.4-B.5",
    title: "Negative = stimulus removed",
    body: [
      "Negative means something is [removed, reduced, delayed, or avoided].",
      "Negative does not mean bad or unpleasant.",
    ],
    visual: {
      type: "choice",
      prompt: "Which example shows the technical meaning of negative?",
      choices: [
        "A task demand is removed after a response.",
        "A new stimulus is added after a response.",
        "Praise is delivered after a response.",
        "A token is earned after a response.",
      ],
      answer: "A task demand is removed after a response.",
      feedback:
        "Negative means removed, reduced, delayed, or avoided. It does not mean bad or aversive.",
    },
  },
  {
    slug: "positive-reinforcement",
    label: "B.4",
    title: "Positive reinforcement",
    body: [
      "Positive reinforcement [adds a stimulus].",
      "Future behavior [increases].",
    ],
    visual: {
      type: "flow",
      prompt: "Build the positive reinforcement relation.",
      feedback:
        "Positive reinforcement means behavior is followed by adding a stimulus, and that behavior increases in the future.",
      steps: ["Response", "Stimulus added", "Behavior increases"],
    },
  },
  {
    slug: "negative-reinforcement",
    label: "B.4",
    title: "Negative reinforcement",
    body: [
      "Negative reinforcement [removes, reduces, delays, or avoids a stimulus].",
      "Future behavior [increases].",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each phrase by what happens to the stimulus.",
      categories: ["ADDS something", "REMOVES something"],
      items: [
        { label: "Task demand removed", category: "REMOVES something" },
        { label: "Noise reduced", category: "REMOVES something" },
        { label: "Token delivered", category: "ADDS something" },
        { label: "Attention provided", category: "ADDS something" },
      ],
    },
  },
  {
    slug: "punishment-decreases",
    label: "B.5",
    title: "Punishment = behavior decreases",
    body: [
      "Punishment is defined by [a decrease in future responding].",
      "If behavior does not decrease, do not call the consequence punishment.",
    ],
    visual: {
      type: "true-false",
      prompt: "Punishment check",
      statement:
        "A consequence is called punishment only if future responding decreases.",
      answer: true,
      feedback:
        "Correct. Punishment is defined by a decrease in future responding.",
    },
  },
  {
    slug: "positive-punishment",
    label: "B.5",
    title: "Positive punishment",
    body: [
      "Positive punishment [adds a stimulus].",
      "Future behavior [decreases].",
    ],
    visual: {
      type: "select-all",
      prompt: "Select all parts required for positive punishment.",
      choices: [
        { label: "A stimulus is added after the response.", correct: true },
        { label: "Future behavior decreases.", correct: true },
        { label: "Future behavior increases.", correct: false },
        { label: "A stimulus is removed after the response.", correct: false },
      ],
      feedback:
        "Positive punishment combines an added stimulus with a decrease in future behavior.",
    },
  },
  {
    slug: "negative-punishment",
    label: "B.5",
    title: "Negative punishment",
    body: [
      "Negative punishment [removes a stimulus].",
      "Future behavior [decreases].",
    ],
    visual: {
      type: "fill-blank",
      prompt: "Complete the negative punishment relation.",
      sentence:
        "Negative punishment means a stimulus is removed and future behavior ____.",
      answer: "decreases",
      feedback:
        "Negative punishment removes a stimulus, and the behavior decreases in the future.",
    },
  },
  {
    slug: "four-term-grid",
    label: "B.4-B.5",
    title: "The four consequence processes",
    body: [
      "Positive and negative describe [added vs removed].",
      "Reinforcement and punishment describe [increase vs decrease].",
    ],
    visual: {
      type: "quadrant",
      items: [
        {
          title: "Positive reinforcement",
          action: "Add stimulus",
          effect: "Behavior increases",
        },
        {
          title: "Negative reinforcement",
          action: "Remove stimulus",
          effect: "Behavior increases",
        },
        {
          title: "Positive punishment",
          action: "Add stimulus",
          effect: "Behavior decreases",
        },
        {
          title: "Negative punishment",
          action: "Remove stimulus",
          effect: "Behavior decreases",
        },
      ],
    },
  },
  {
    slug: "socially-mediated-vs-automatic",
    label: "B.6-B.8",
    title: "Socially mediated vs automatic contingencies",
    body: [
      "Socially mediated reinforcement is delivered through [another person].",
      "Automatic reinforcement is produced [directly by the response].",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each example by how reinforcement is contacted.",
      categories: ["Socially mediated", "Automatic"],
      items: [
        { label: "Adult attention follows calling out", category: "Socially mediated" },
        { label: "Access to a toy follows a request", category: "Socially mediated" },
        { label: "Hand flapping produces sensory stimulation", category: "Automatic" },
        { label: "Scratching reduces an itch", category: "Automatic" },
      ],
    },
  },
  {
    slug: "reinforcer-punisher-types",
    label: "B.6-B.8",
    title: "Unconditioned, conditioned, and generalized consequences",
    body: [
      "Unconditioned consequences do not require a learning history.",
      "Conditioned consequences acquire function through pairing; generalized conditioned consequences are paired with many reinforcers or punishers.",
    ],
    visual: {
      type: "matching",
      prompt: "Match each consequence type to its discrimination cue.",
      pairs: [
        {
          term: "Unconditioned reinforcer",
          definition: "Reinforces without prior learning, such as food when food deprivation is relevant.",
        },
        {
          term: "Conditioned reinforcer",
          definition: "Acquires reinforcing function through pairing with other reinforcers.",
        },
        {
          term: "Unconditioned punisher",
          definition: "Punishes without prior learning, such as pain from a minor injury.",
        },
        {
          term: "Generalized conditioned reinforcer",
          definition: "Conditioned reinforcer paired with many different reinforcers, such as tokens or money.",
        },
        {
          term: "Conditioned punisher",
          definition: "Acquires punishing function through pairing with other punishers.",
        },
        {
          term: "Generalized conditioned punisher",
          definition: "Conditioned punisher paired with many different punishers, such as a response-cost warning.",
        },
      ],
    },
  },
  {
    slug: "escape-vs-avoidance",
    label: "B.4 / B.6-B.8",
    title: "Escape vs avoidance",
    body: [
      "Escape ends or reduces [an ongoing aversive stimulus].",
      "Avoidance prevents or delays [an aversive stimulus before contact].",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Escape",
      leftText: "Task is present -> response -> task removed",
      rightTitle: "Avoidance",
      rightText: "Task is signaled -> response -> task delayed or prevented",
      cue: "Escape = get out of it now. Avoidance = keep it from happening.",
    },
  },
  {
    slug: "shaping-crf-intermittent",
    label: "B.4 / B.9",
    title: "Shaping and reinforcement schedules",
    body: [
      "Shaping teaches new behavior by reinforcing [successive approximations].",
      "New behavior often starts on CRF (Contingent Reinforcement), then shifts toward intermittent reinforcement.",
    ],
    visual: {
      type: "flow",
      prompt: "Order the teaching sequence for a new operant response.",
      steps: [
        "Reinforce closer approximations",
        "Use CRF (Contingent Reinforcement) while behavior is new",
        "Stabilize the response",
        "Thin to intermittent reinforcement",
      ],
    },
  },
  {
    slug: "schedule-matrix",
    label: "B.9-B.10",
    title: "Schedules of reinforcement",
    body: [
      "FI = Fixed Interval. VI = Variable Interval.",
      "FR = Fixed Ratio. VR = Variable Ratio.",
    ],
    visual: {
      type: "matching",
      prompt: "Match each schedule to its discrimination cue.",
      pairs: [
        { term: "FI (Fixed Interval)", definition: "Fixed Interval schedule." },
        { term: "VI (Variable Interval)", definition: "Variable Interval schedule." },
        { term: "FR (Fixed Ratio)", definition: "Fixed Ratio schedule." },
        { term: "VR (Variable Ratio)", definition: "Variable Ratio schedule." },
      ],
    },
  },
  {
    slug: "complex-schedules",
    label: "B.9-B.10",
    title: "Complex schedules of reinforcement",
    body: [
      "Complex schedules combine two or more basic schedules.",
      "Discriminate them by [simultaneous vs successive] and [signaled vs unsignaled].",
    ],
    visual: {
      type: "matching",
      prompt: "Match each complex schedule to its fastest cue.",
      pairs: [
        {
          term: "Concurrent schedule",
          definition: "Two or more schedules operate at the same time for choice alternatives.",
        },
        {
          term: "Multiple schedule",
          definition: "Schedules alternate, and each component has a Discriminative Stimulus (SD).",
        },
        {
          term: "Mixed schedule",
          definition: "Schedules alternate, but components do not have distinct Discriminative Stimuli.",
        },
        {
          term: "Chained schedule",
          definition: "Components occur in the same order, and each step has its own Discriminative Stimulus.",
        },
      ],
    },
  },
  {
    slug: "generalization-vs-maintenance",
    label: "B.11-B.15",
    title: "Generalization vs maintenance",
    body: [
      "Generalization means behavior occurs [across untrained people, settings, stimuli, responses, or time].",
      "Maintenance means behavior continues [after part or all of intervention is removed].",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Generalization",
      leftText: "New context, stimulus, response, or person",
      rightTitle: "Maintenance",
      rightText: "Same skill persists over time",
      cue: "Generalization = spreads. Maintenance = lasts.",
    },
  },
  {
    slug: "programming-generality",
    label: "B.11-B.15",
    title: "Programming for generality",
    body: [
      "Generalization is planned, not assumed.",
      "Use natural contingencies, multiple exemplars, common stimuli, and loose training.",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each programming tactic by its main purpose.",
      categories: ["Promotes generalization", "Promotes maintenance"],
      items: [
        { label: "Teach multiple exemplars across people and settings", category: "Promotes generalization" },
        { label: "Program common stimuli from the natural setting", category: "Promotes generalization" },
        { label: "Thin contrived reinforcement toward natural schedules", category: "Promotes maintenance" },
        { label: "Collect follow-up data after criterion is met", category: "Promotes maintenance" },
      ],
    },
  },
  {
    slug: "emergent-relations",
    label: "B.21-B.24",
    title: "Emergent relations",
    body: [
      "Emergent relations are accurate responses to [untrained stimulus-stimulus relations].",
      "Stimulus equivalence is tested through reflexivity, symmetry, and transitivity.",
    ],
    visual: {
      type: "matching",
      prompt: "Match each emergent-relation term to its cue.",
      pairs: [
        {
          term: "Reflexivity",
          definition: "A = A; matching a stimulus to itself without direct training.",
        },
        {
          term: "Symmetry",
          definition: "If A = B, then B = A emerges without direct training.",
        },
        {
          term: "Transitivity",
          definition: "If A = B and A = C, then B = C emerges without direct training.",
        },
        {
          term: "Stimulus equivalence",
          definition: "A stimulus class demonstrated by reflexivity, symmetry, and transitivity.",
        },
      ],
    },
  },
  {
    slug: "matching-law-and-momentum",
    label: "B.21-B.24",
    title: "Matching law and behavioral momentum",
    body: [
      "Matching law describes how choice responds to [relative rates of reinforcement].",
      "Behavioral momentum uses high-probability responses before a lower-probability response.",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Matching law",
      leftText: "Choice allocation follows relative reinforcement",
      rightTitle: "Behavioral momentum",
      rightText: "High-p sequence -> low-p request",
      cue: "Matching law = choice distribution. Behavioral momentum = request sequence to increase compliance.",
    },
  },
  {
    slug: "imitation-vs-observational-learning",
    label: "B.21-B.24",
    title: "Imitation vs observational learning",
    body: [
      "Imitation requires [formal similarity] between the model and the learner's response.",
      "Observational learning is broader: behavior changes after observing a model and consequences.",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Imitation",
      leftText: "Model occurs -> learner does the same form",
      rightTitle: "Observational learning",
      rightText: "Learner observes model/consequence -> behavior changes",
      cue: "Imitation = same form. Observational learning = learning from what happens to another person.",
    },
  },
  {
    slug: "sd-vs-motivating-operation",
    label: "B.16-B.17",
    title: "Discriminative Stimulus (SD) vs Motivating Operation",
    body: [
      "A Discriminative Stimulus (SD) signals [reinforcement is available for a response].",
      "A Motivating Operation changes [reinforcer value and current behavior].",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Discriminative Stimulus (SD)",
      leftText: "Signals availability",
      rightTitle: "Motivating Operation",
      rightText: "Changes value",
      cue: "SD = Discriminative Stimulus: reinforcement is available. Motivating Operation = how much the reinforcer matters now.",
    },
  },
  {
    slug: "sd-vs-sdelta",
    label: "B.11-B.15",
    title: "Discriminative Stimulus (SD) vs S-delta",
    body: [
      "A Discriminative Stimulus (SD) signals [reinforcement is available] for a response.",
      "An S-delta signals that the response [will not be reinforced].",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Discriminative Stimulus (SD)",
      leftText: "Response -> reinforcement available",
      rightTitle: "S-delta",
      rightText: "Response -> no reinforcement",
      cue: "SD = Discriminative Stimulus: reinforcement available. S-delta = reinforcement not available.",
    },
  },
  {
    slug: "three-term-contingency",
    label: "B.11-B.15",
    title: "Three-term contingency",
    body: [
      "The three-term contingency connects antecedent, response, and consequence.",
      "Read it as [Discriminative Stimulus (SD) -> R -> Sr].",
    ],
    visual: {
      type: "flow",
      prompt: "Put the three-term contingency in order.",
      steps: ["Discriminative Stimulus (SD)", "Response", "Reinforcing consequence"],
    },
  },
  {
    slug: "eo-ao-setting-events",
    label: "B.16-B.17",
    title: "Establishing Operation (EO), Abolishing Operation (AO), and setting events",
    body: [
      "An Establishing Operation (EO) increases [reinforcer value and current behavior].",
      "An Abolishing Operation (AO) decreases [reinforcer value and current behavior].",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each event by its likely effect.",
      categories: ["EO", "AO"],
      items: [
        { label: "No food since morning before snack time", category: "EO" },
        { label: "Just ate a large meal before snack time", category: "AO" },
        { label: "Long delay since attention was available", category: "EO" },
        { label: "Extended access to attention", category: "AO" },
      ],
    },
  },
  {
    slug: "verbal-behavior-foundations",
    label: "B.18-B.20",
    title: "Verbal behavior foundations",
    body: [
      "Verbal behavior is behavior reinforced through [the mediation of a listener].",
      "Classify verbal behavior by its controlling variables, not by the word alone.",
    ],
    visual: {
      type: "matching",
      prompt: "Match each verbal behavior role to its cue.",
      pairs: [
        {
          term: "Speaker",
          definition: "Emits verbal behavior such as mands, tacts, intraverbals, or autoclitics.",
        },
        {
          term: "Listener",
          definition: "Mediates reinforcement for verbal behavior and may function as an audience.",
        },
        {
          term: "Audience",
          definition: "Functions as a Discriminative Stimulus for verbal behavior.",
        },
        {
          term: "Verbal behavior",
          definition: "Behavior reinforced through listener mediation.",
        },
      ],
    },
  },
  {
    slug: "speaker-vs-listener",
    label: "B.18-B.20",
    title: "Speaker vs listener responding",
    body: [
      "Speaker behavior includes [mands, tacts, intraverbals, and other verbal operants].",
      "Listener responding is behavior controlled by another person's verbal stimulus.",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each example by role.",
      categories: ["Speaker behavior", "Listener responding"],
      items: [
        { label: "Says 'water' to get water", category: "Speaker behavior" },
        { label: "Touches the cup when told 'touch cup'", category: "Listener responding" },
        { label: "Answers 'dog' when asked 'what barks?'", category: "Speaker behavior" },
        { label: "Sits down after hearing 'sit down'", category: "Listener responding" },
      ],
    },
  },
  {
    slug: "verbal-vs-nonverbal-stimuli",
    label: "B.18-B.20",
    title: "Verbal vs nonverbal stimuli",
    body: [
      "A verbal stimulus is produced by [another person's verbal behavior].",
      "A nonverbal stimulus is an aspect of the environment not produced as verbal behavior.",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each controlling stimulus.",
      categories: ["Verbal stimulus", "Nonverbal stimulus"],
      items: [
        { label: "Someone asks, 'What is your name?'", category: "Verbal stimulus" },
        { label: "A learner sees a dog", category: "Nonverbal stimulus" },
        { label: "Printed word: cat", category: "Verbal stimulus" },
        { label: "A cold drink on the table", category: "Nonverbal stimulus" },
      ],
    },
  },
  {
    slug: "mand-vs-tact",
    label: "B.18-B.20",
    title: "Mand vs tact",
    body: [
      "A mand is controlled by [a Motivating Operation] and specific reinforcement.",
      "A tact is controlled by [a nonverbal Discriminative Stimulus] and generalized conditioned reinforcement.",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Mand",
      leftText: "Motivating Operation (MO) -> request -> specific reinforcement",
      rightTitle: "Tact",
      rightText: "Nonverbal Discriminative Stimulus (SD) -> label -> generalized conditioned reinforcement",
      cue: "Mand = wants/needs. Tact = labels/describes what is contacted.",
    },
  },
  {
    slug: "echoic-vs-intraverbal",
    label: "B.18-B.20",
    title: "Echoic vs intraverbal",
    body: [
      "An echoic has [point-to-point correspondence and formal similarity].",
      "An intraverbal is evoked by a verbal stimulus with [no point-to-point correspondence].",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Echoic",
      leftText: "Hear 'apple' -> say 'apple'",
      rightTitle: "Intraverbal",
      rightText: "Hear 'what do you eat?' -> say 'apple'",
      cue: "Echoic = repeats the verbal stimulus. Intraverbal = related verbal response, not a copy.",
    },
  },
  {
    slug: "textual-vs-transcription",
    label: "B.18-B.20",
    title: "Textual vs transcription",
    body: [
      "Textual behavior is [reading written verbal stimuli].",
      "Transcription is [writing, typing, or fingerspelling spoken verbal stimuli].",
    ],
    visual: {
      type: "matching",
      prompt: "Match each relation to its controlling variable.",
      pairs: [
        {
          term: "Textual",
          definition: "Written verbal stimulus evokes a spoken response.",
        },
        {
          term: "Transcription",
          definition: "Spoken verbal stimulus evokes a written, typed, or fingerspelled response.",
        },
        {
          term: "Copying a text",
          definition: "Written verbal stimulus evokes a written response with formal similarity.",
        },
        {
          term: "Taking dictation",
          definition: "Previous terminology often used for transcription.",
        },
      ],
    },
  },
  {
    slug: "formal-similarity-point-to-point",
    label: "B.18-B.20",
    title: "Formal similarity vs point-to-point correspondence",
    body: [
      "Point-to-point correspondence means the beginning, middle, and end of the stimulus match the response.",
      "Formal similarity means the stimulus and response [share the same sense mode and physically resemble each other].",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each verbal relation by formal similarity.",
      categories: ["Has formal similarity", "No formal similarity"],
      items: [
        { label: "Echoic", category: "Has formal similarity" },
        { label: "Copying a text", category: "Has formal similarity" },
        { label: "Textual", category: "No formal similarity" },
        { label: "Transcription", category: "No formal similarity" },
      ],
    },
  },
  {
    slug: "autoclitic-and-impure-tact",
    label: "B.18-B.20",
    title: "Autoclitic and impure tact",
    body: [
      "An autoclitic is [verbal behavior about verbal behavior].",
      "An impure tact is controlled by [both a Motivating Operation and a nonverbal stimulus].",
    ],
    visual: {
      type: "choice",
      prompt:
        "A learner says, 'The trash is full,' while looking at the trash and wanting someone to empty it. Which label is described?",
      choices: ["Impure tact", "Echoic", "Textual", "Listener responding"],
      answer: "Impure tact",
      feedback:
        "An impure tact has both tact control from a nonverbal stimulus and mand control from a Motivating Operation.",
    },
  },
  {
    slug: "multiple-control",
    label: "B.18-B.20",
    title: "Multiple control",
    body: [
      "Convergent multiple control occurs when [one response is controlled by more than one variable].",
      "Divergent multiple control occurs when [one variable strengthens many responses].",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Convergent",
      leftText: "Many controls -> one response",
      rightTitle: "Divergent",
      rightText: "One control -> many responses",
      cue: "Convergent = variables converge on one response. Divergent = one variable spreads to many responses.",
    },
  },
  {
    slug: "thematic-prompts-audience-control",
    label: "B.18-B.20",
    title: "Thematic prompts and audience control",
    body: [
      "A thematic prompt evokes a response through [the meaning or topic relation].",
      "Audience control occurs when a listener or audience functions as a Discriminative Stimulus (SD) for verbal behavior.",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each example by controlling variable.",
      categories: ["Thematic prompt", "Audience control"],
      items: [
        { label: "Hearing 'peanut butter and...' evokes 'jelly'", category: "Thematic prompt" },
        { label: "Describing a weekend differently to peers than to parents", category: "Audience control" },
        { label: "Hearing 'up' evokes 'down'", category: "Thematic prompt" },
        { label: "Using technical ABA terms with a supervisor but simpler wording with a new caregiver", category: "Audience control" },
      ],
    },
  },
  {
    slug: "rule-governed-verbal-behavior",
    label: "B.18-B.20",
    title: "Rule-governed verbal behavior",
    body: [
      "Rule-governed behavior is controlled by [verbal descriptions of contingencies].",
      "Contingency-shaped behavior is shaped directly by contact with consequences.",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Rule-governed",
      leftText: "Verbal rule -> behavior",
      rightTitle: "Contingency-shaped",
      rightText: "Direct consequence history -> behavior",
      cue: "Rule-governed = controlled by verbal statements. Contingency-shaped = learned through direct contact.",
    },
  },
  {
    slug: "extinction-vs-punishment",
    label: "B.11 / B.5",
    title: "Extinction vs punishment",
    body: [
      "Extinction withholds [the maintaining reinforcer].",
      "Punishment adds or removes [a consequence that decreases behavior].",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Extinction",
      leftText: "No maintaining reinforcer",
      rightTitle: "Punishment",
      rightText: "Added/removed consequence decreases behavior",
      cue: "Extinction = reinforcer no longer follows. Punishment = consequence reduces future responding.",
    },
  },
  {
    slug: "operant-vs-respondent-extinction",
    label: "B.11",
    title: "Operant extinction vs respondent extinction",
    body: [
      "Operant extinction withholds [the reinforcer that previously followed behavior].",
      "Respondent extinction presents the Conditioned Stimulus (CS) without the Unconditioned Stimulus (US).",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Operant extinction",
      leftText: "Response no longer produces maintaining reinforcer",
      rightTitle: "Respondent extinction",
      rightText: "Conditioned Stimulus (CS) occurs without Unconditioned Stimulus (US)",
      cue: "Operant extinction = consequence relation changes. Respondent extinction = stimulus-stimulus pairing is discontinued.",
    },
  },
  {
    slug: "extinction-cautions",
    label: "B.11",
    title: "Extinction cautions",
    body: [
      "Extinction can produce [extinction bursts].",
      "Previously reduced behavior may reappear through spontaneous recovery.",
    ],
    visual: {
      type: "select-all",
      prompt: "Select cautions to plan for when using extinction.",
      choices: [
        { label: "Extinction burst", correct: true },
        { label: "Spontaneous recovery", correct: true },
        { label: "Immediate permanent elimination", correct: false },
        { label: "No need to identify the maintaining reinforcer", correct: false },
      ],
      feedback:
        "Extinction requires identifying and withholding the maintaining reinforcer, plus planning for bursts and spontaneous recovery.",
    },
  },
  {
    slug: "example-nonexample",
    label: "B.3-B.5",
    title: "Example vs nonexample check",
    body: [
      "Classify consequences by [their effect on future behavior].",
      "Preferred or unpleasant does not decide the technical term.",
    ],
    visual: {
      type: "sorting",
      prompt: "Classify each scenario by whether the technical label fits.",
      categories: ["Technical label fits", "Technical label does not fit"],
      items: [
        {
          label:
            "Help follows a mand, and manding increases: positive reinforcement.",
          category: "Technical label fits",
        },
        {
          label:
            "Praise follows hand raising, but hand raising does not increase: reinforcement.",
          category: "Technical label does not fit",
        },
        {
          label:
            "A token is removed, and calling out decreases: negative punishment.",
          category: "Technical label fits",
        },
        {
          label:
            "A reprimand is added, and behavior increases: positive punishment.",
          category: "Technical label does not fit",
        },
      ],
    },
  },
];

export const sectionBPracticeQuestions: QuestionContent[] = [
  {
    type: "matching",
    prompt: "Match each term to it's definition.",
    pairs: [
      {
        term: "Behavior",
        definition: "Measurable activity of a living organism.",
      },
      {
        term: "Response",
        definition: "A specific instance of behavior.",
      },
      {
        term: "Stimulus",
        definition: "A specific detectable aspect of the environment.",
      },
      {
        term: "Environment",
        definition: "The broader surrounding context in which behavior occurs.",
      },
    ],
    answer: "All terms matched correctly",
    explanation:
      "Behavior is the measurable activity. A response is one instance. A stimulus is a specific part of the broader environment.",
  },
  {
    type: "sorting",
    prompt: "Sort the examples by whether they describe a response class or stimulus class.",
    categories: ["Response class", "Stimulus class"],
    items: [
      {
        label: "Saying 'break,' signing break, and handing over a break card",
        category: "Response class",
      },
      {
        label: "Different worksheets that all signal math work",
        category: "Stimulus class",
      },
      {
        label: "Pointing, reaching, and saying 'that' to request an item",
        category: "Response class",
      },
      {
        label: "Different people who all function as instructors",
        category: "Stimulus class",
      },
    ],
    answer: "All class examples sorted correctly",
    explanation:
      "Response classes group responses by shared function. Stimulus classes group stimuli by shared physical, temporal, or functional properties.",
  },
  {
    type: "scenario",
    prompt:
      "During observation, a learner claps once. The observer records that one clap. Which term is described?",
    choices: ["Response", "Response class", "Stimulus class", "Motivating Operation"],
    answer: "Response",
    explanation:
      "A response is a specific instance of behavior. The broader behavior or response class would include more than one occurrence or form.",
  },
  {
    type: "scenario",
    prompt:
      "A learner can lead an adult's hand to soda, point to a soda picture, or say 'soda.' Each response produces soda. What is being demonstrated?",
    choices: ["Response class", "Stimulus class", "Respondent class", "Setting event"],
    answer: "Response class",
    explanation:
      "The forms look different, but they share the same function: accessing soda. That makes them members of a response class.",
  },
  {
    type: "scenario",
    prompt:
      "A picture of a dog, a toy dog, a cartoon dog, and a stuffed dog all occasion the learner saying 'dog.' What is the best label?",
    choices: ["Stimulus class", "Response class", "Operant extinction", "Negative reinforcement"],
    answer: "Stimulus class",
    explanation:
      "These are different stimuli that evoke the same response because they share relevant physical or functional features.",
  },
  {
    type: "fill-blank",
    prompt:
      "Complete the definition: a stimulus is a specific aspect of the ____.",
    answer: "environment",
    explanation:
      "A stimulus is a specific detectable aspect of the environment that can be differentiated from other aspects.",
  },
  {
    prompt:
      "A learner completes a math worksheet, and the teacher removes the remaining problems. In future sessions, worksheet completion increases. Which process is demonstrated?",
    choices: [
      "Positive reinforcement",
      "Negative reinforcement",
      "Positive punishment",
      "Negative punishment",
    ],
    answer: "Negative reinforcement",
    explanation:
      "The response increases, so it is reinforcement. The remaining problems are removed after the response, so it is negative reinforcement.",
  },
  {
    prompt:
      "A child touches a hot pan, pain follows immediately, and touching hot pans decreases. Which process is the best fit?",
    choices: [
      "Respondent conditioning",
      "Positive punishment",
      "Negative reinforcement",
      "Positive reinforcement",
    ],
    answer: "Positive punishment",
    explanation:
      "A stimulus is added after the response and future responding decreases. That is positive punishment.",
  },
  {
    prompt:
      "A neutral tone is repeatedly paired with an air puff. Later, the tone alone elicits blinking. Which type of conditioning is this?",
    choices: [
      "Operant conditioning",
      "Respondent conditioning",
      "Negative punishment",
      "Positive reinforcement",
    ],
    answer: "Respondent conditioning",
    explanation:
      "The tone becomes a Conditioned Stimulus that elicits a Conditioned Response. This is respondent conditioning.",
  },
  {
    prompt:
      "A student loses access to a tablet after throwing materials, and throwing materials decreases over time. Which process is demonstrated?",
    choices: [
      "Negative punishment",
      "Negative reinforcement",
      "Positive punishment",
      "Positive reinforcement",
    ],
    answer: "Negative punishment",
    explanation:
      "A stimulus is removed after the response and future responding decreases. That is negative punishment.",
  },
  {
    type: "matching",
    prompt: "Match each concept to its key distinction.",
    pairs: [
      {
        term: "Positive reinforcement",
        definition: "Stimulus added, behavior increases.",
      },
      {
        term: "Negative reinforcement",
        definition: "Stimulus removed, behavior increases.",
      },
      {
        term: "Positive punishment",
        definition: "Stimulus added, behavior decreases.",
      },
      {
        term: "Negative punishment",
        definition: "Stimulus removed, behavior decreases.",
      },
    ],
    answer: "All consequence processes matched correctly",
    explanation:
      "Positive and negative describe whether the stimulus is added or removed. Reinforcement and punishment describe whether behavior increases or decreases.",
  },
  {
    type: "sorting",
    prompt: "Sort each example by whether the consequence is socially mediated or automatic.",
    categories: ["Socially mediated", "Automatic"],
    items: [
      { label: "Adult attention follows calling out", category: "Socially mediated" },
      { label: "Access to a toy follows a request", category: "Socially mediated" },
      { label: "Hand flapping produces sensory stimulation", category: "Automatic" },
      { label: "Scratching reduces an itch", category: "Automatic" },
    ],
    answer: "All socially mediated and automatic examples sorted correctly",
    explanation:
      "Socially mediated contingencies require another person to deliver the consequence. Automatic contingencies are produced directly by the response.",
  },
  {
    type: "matching",
    prompt: "Match each reinforcer or punisher type to its definition.",
    pairs: [
      {
        term: "Unconditioned reinforcer",
        definition: "Functions as a reinforcer without prior learning.",
      },
      {
        term: "Conditioned reinforcer",
        definition: "Acquires reinforcing function through pairing.",
      },
      {
        term: "Unconditioned punisher",
        definition: "Functions as a punisher without prior learning.",
      },
      {
        term: "Generalized conditioned reinforcer",
        definition: "Conditioned reinforcer paired with many reinforcers.",
      },
      {
        term: "Conditioned punisher",
        definition: "Acquires punishing function through pairing.",
      },
      {
        term: "Generalized conditioned punisher",
        definition: "Conditioned punisher paired with many punishers.",
      },
    ],
    answer: "All reinforcer and punisher types matched correctly",
    explanation:
      "Unconditioned consequences do not require learning. Conditioned consequences acquire function through pairing. Generalized conditioned consequences are paired with many reinforcers or punishers.",
  },
  {
    type: "scenario",
    prompt:
      "Tokens can be exchanged for snacks, activities, attention, and other backup reinforcers. Which label is described?",
    choices: [
      "Generalized conditioned reinforcer",
      "Unconditioned reinforcer",
      "Unconditioned punisher",
      "S-delta",
    ],
    answer: "Generalized conditioned reinforcer",
    explanation:
      "A generalized conditioned reinforcer is paired with many different reinforcers, which helps it remain effective across Motivating Operations.",
  },
  {
    type: "scenario",
    prompt:
      "A neutral buzzer is repeatedly paired with response cost. Later, the buzzer alone decreases future responding. Which label is described?",
    choices: [
      "Conditioned punisher",
      "Unconditioned punisher",
      "Generalized conditioned reinforcer",
      "Positive reinforcement",
    ],
    answer: "Conditioned punisher",
    explanation:
      "The buzzer acquired punishing function through pairing, so it is a Conditioned punisher.",
  },
  {
    type: "scenario",
    prompt:
      "Math problems are already on the desk. The learner completes one problem, the teacher removes the rest, and completing problems increases. Which discrimination is described?",
    choices: ["Escape", "Avoidance", "Positive reinforcement", "Respondent extinction"],
    answer: "Escape",
    explanation:
      "Escape ends or reduces an ongoing aversive stimulus. The task was present, then it was removed after the response.",
  },
  {
    type: "scenario",
    prompt:
      "A worksheet folder signals math is about to start. The learner asks for a break before the worksheet is presented, the worksheet is delayed, and break requests increase. Which discrimination is described?",
    choices: ["Avoidance", "Escape", "Positive punishment", "Respondent conditioning"],
    answer: "Avoidance",
    explanation:
      "Avoidance prevents or delays contact with an aversive stimulus before it is contacted.",
  },
  {
    type: "sorting",
    prompt: "Sort each phrase by what controls the behavior.",
    categories: ["Respondent", "Operant"],
    items: [
      { label: "Elicited by antecedent stimuli", category: "Respondent" },
      { label: "Selected by consequences", category: "Operant" },
      { label: "Stimulus-stimulus pairing", category: "Respondent" },
      { label: "Behavior-consequence relation", category: "Operant" },
    ],
    answer: "All respondent and operant descriptions sorted correctly",
    explanation:
      "Respondent behavior is elicited by antecedent stimuli. Operant behavior is selected by consequences.",
  },
  {
    type: "matching",
    prompt: "Match each respondent-conditioning symbol to its role.",
    pairs: [
      {
        term: "US (Unconditioned Stimulus)",
        definition: "Stimulus that elicits a response without prior learning.",
      },
      {
        term: "UR (Unconditioned Response)",
        definition: "Unlearned response elicited by the Unconditioned Stimulus.",
      },
      {
        term: "NS (Neutral Stimulus)",
        definition: "Stimulus that does not yet elicit the target response.",
      },
      {
        term: "CS (Conditioned Stimulus)",
        definition: "Stimulus that elicits a learned Conditioned Response.",
      },
    ],
    answer: "All respondent-conditioning symbols matched correctly",
    explanation:
      "The Neutral Stimulus (NS) becomes a Conditioned Stimulus (CS) after pairing with an Unconditioned Stimulus (US). The Conditioned Stimulus (CS) then elicits the Conditioned Response (CR).",
  },
  {
    type: "scenario",
    prompt:
      "A green traffic light signals that continuing to drive will contact reinforcement for moving with traffic. In this context, the green light functions as what?",
    choices: ["Discriminative Stimulus (SD)", "S-delta", "Abolishing Operation (AO)", "Unconditioned Response (UR)"],
    answer: "Discriminative Stimulus (SD)",
    explanation:
      "A Discriminative Stimulus (SD) signals that reinforcement is available for a response in its presence.",
  },
  {
    type: "scenario",
    prompt:
      "A red traffic light signals that continuing to drive will not contact reinforcement and may contact punishment. For continuing to drive, the red light is best described as what?",
    choices: ["S-delta", "Discriminative Stimulus (SD)", "Conditioned reinforcer", "CRF (Contingent Reinforcement)"],
    answer: "S-delta",
    explanation:
      "An S-delta signals that a response will not be reinforced in its presence.",
  },
  {
    type: "sorting",
    prompt: "Sort each schedule by what controls reinforcement availability.",
    categories: ["Time based", "Response based"],
    items: [
      { label: "FI (Fixed Interval)", category: "Time based" },
      { label: "VI (Variable Interval)", category: "Time based" },
      { label: "FR (Fixed Ratio)", category: "Response based" },
      { label: "VR (Variable Ratio)", category: "Response based" },
    ],
    answer: "All schedules sorted correctly",
    explanation:
      "Interval schedules are time based. Ratio schedules are response based.",
  },
  {
    type: "matching",
    prompt: "Match each complex schedule to its definition.",
    pairs: [
      {
        term: "Concurrent schedule",
        definition: "Two or more schedules are available at the same time for different response options.",
      },
      {
        term: "Multiple schedule",
        definition: "Components alternate, and each component has a correlated Discriminative Stimulus.",
      },
      {
        term: "Mixed schedule",
        definition: "Components alternate without a correlated Discriminative Stimulus.",
      },
      {
        term: "Chained schedule",
        definition: "Components occur in the same order; each component has a correlated Discriminative Stimulus.",
      },
    ],
    answer: "All complex schedules matched correctly",
    explanation:
      "Concurrent schedules are simultaneous choice arrangements. Multiple and mixed schedules alternate; multiple is signaled and mixed is not. Chained schedules are successive and signaled.",
  },
  {
    type: "scenario",
    prompt:
      "A learner can work on math for tokens or read for points at the same time. Each option has its own schedule of reinforcement. Which schedule is described?",
    choices: ["Concurrent schedule", "Multiple schedule", "Mixed schedule", "Chained schedule"],
    answer: "Concurrent schedule",
    explanation:
      "Concurrent schedules involve two or more schedules operating simultaneously for choice alternatives.",
  },
  {
    type: "scenario",
    prompt:
      "A green card signals FR work, and a blue card signals FI work. The components alternate. Which schedule is described?",
    choices: ["Multiple schedule", "Mixed schedule", "Concurrent schedule", "Tandem schedule"],
    answer: "Multiple schedule",
    explanation:
      "A multiple schedule alternates two or more basic schedules, and each component is correlated with a Discriminative Stimulus.",
  },
  {
    type: "scenario",
    prompt:
      "A learner completes worksheet steps in the same order: first copy, then solve, then check. Each step signals the next component and eventual reinforcement. Which schedule is described?",
    choices: ["Chained schedule", "Mixed schedule", "Concurrent schedule", "Variable Ratio"],
    answer: "Chained schedule",
    explanation:
      "A chained schedule has successive components that occur in the same order, with each component correlated with a Discriminative Stimulus.",
  },
  {
    type: "fill-blank",
    prompt:
      "Complete the definition: Shaping teaches new behavior by reinforcing successive ____.",
    answer: "approximations",
    explanation:
      "Shaping uses differential reinforcement of successive approximations toward a terminal response.",
  },
  {
    type: "select-all",
    prompt: "Select all cautions commonly associated with extinction.",
    choices: [
      "Extinction burst",
      "Spontaneous recovery",
      "Need to identify the maintaining reinforcer",
      "Immediate permanent behavior elimination",
    ],
    answers: [
      "Extinction burst",
      "Spontaneous recovery",
      "Need to identify the maintaining reinforcer",
    ],
    answer:
      "Extinction burst; spontaneous recovery; need to identify the maintaining reinforcer",
    explanation:
      "Extinction requires withholding the maintaining reinforcer and planning for extinction bursts and spontaneous recovery.",
  },
  {
    type: "scenario",
    prompt:
      "A learner has not eaten since breakfast, and food-maintained manding increases near 5 p.m. Which concept best explains the increased value of food?",
    choices: [
      "Establishing Operation (EO)",
      "S-delta",
      "Response cost",
      "Conditioned Response (CR)",
    ],
    answer: "Establishing Operation (EO)",
    explanation:
      "An Establishing Operation (EO) increases reinforcer value and evokes behavior that has produced that reinforcer.",
  },
  {
    type: "matching",
    prompt:
      "In this scenario, match each part to its role: a learner skipped breakfast, sees the cafeteria open sign, says 'snack please,' and receives a snack.",
    pairs: [
      {
        term: "Motivating Operation (MO)",
        definition: "Skipped breakfast increases the value of food.",
      },
      {
        term: "Discriminative Stimulus (SD)",
        definition: "The cafeteria open sign signals snack is available.",
      },
      {
        term: "Behavior",
        definition: "The learner says 'snack please.'",
      },
      {
        term: "Consequence",
        definition: "The learner receives a snack.",
      },
    ],
    answer: "All MO, SD, behavior, and consequence components matched correctly",
    explanation:
      "A Motivating Operation changes reinforcer value. A Discriminative Stimulus signals availability for a response. The behavior is the response, and the consequence follows it.",
  },
  {
    type: "sorting",
    prompt: "Sort each statement by whether it describes a Motivating Operation or a Discriminative Stimulus.",
    categories: ["Motivating Operation", "Discriminative Stimulus"],
    items: [
      { label: "Changes the current value of attention", category: "Motivating Operation" },
      { label: "Signals that hand raising will contact teacher attention", category: "Discriminative Stimulus" },
      { label: "Food deprivation increases the value of food", category: "Motivating Operation" },
      { label: "A vending machine light signals snacks can be purchased", category: "Discriminative Stimulus" },
    ],
    answer: "All Motivating Operation and Discriminative Stimulus statements sorted correctly",
    explanation:
      "Motivating Operations alter value and evoke or abate behavior. Discriminative Stimuli signal whether reinforcement is available for a response.",
  },
  {
    type: "scenario",
    prompt:
      "A tantrum previously produced adult attention. During extinction, adults withhold attention after tantrums, and tantrums decrease over time. What type of extinction is this?",
    choices: ["Operant extinction", "Respondent extinction", "Negative punishment", "Abolishing Operation (AO)"],
    answer: "Operant extinction",
    explanation:
      "Operant extinction occurs when the reinforcer that previously followed a response no longer follows that response.",
  },
  {
    type: "scenario",
    prompt:
      "A tone was paired with an air puff and came to elicit blinking. Later, the tone is repeatedly presented without the air puff, and blinking decreases. What type of extinction is this?",
    choices: ["Respondent extinction", "Operant extinction", "Negative reinforcement", "Discriminative Stimulus (SD)"],
    answer: "Respondent extinction",
    explanation:
      "Respondent extinction occurs when the Conditioned Stimulus (CS) is presented without the Unconditioned Stimulus (US), weakening the Conditioned Response (CR).",
  },
  {
    type: "sorting",
    prompt: "Sort each example by whether it shows generalization or maintenance.",
    categories: ["Generalization", "Maintenance"],
    items: [
      { label: "Uses the same mand with a new instructor", category: "Generalization" },
      { label: "Still uses the skill three months after teaching ended", category: "Maintenance" },
      { label: "Reads trained words in a new classroom", category: "Generalization" },
      { label: "Continues hand raising after prompts are faded", category: "Maintenance" },
    ],
    answer: "All generalization and maintenance examples sorted correctly",
    explanation:
      "Generalization means behavior occurs across new conditions. Maintenance means behavior persists over time after intervention is reduced or removed.",
  },
  {
    type: "select-all",
    prompt: "Select all tactics that program for generalization.",
    choices: [
      "Teach multiple exemplars",
      "Program common stimuli",
      "Train loosely by varying noncritical stimuli",
      "Teach only one example in one setting and assume transfer",
    ],
    answers: [
      "Teach multiple exemplars",
      "Program common stimuli",
      "Train loosely by varying noncritical stimuli",
    ],
    answer: "Teach multiple exemplars; program common stimuli; train loosely",
    explanation:
      "Generalization should be programmed. Multiple exemplars, common stimuli, and loose training help behavior contact relevant conditions beyond the original teaching context.",
  },
  {
    type: "matching",
    prompt: "Match each emergent relation to its example.",
    pairs: [
      {
        term: "Reflexivity",
        definition: "Selects A when shown A without direct training.",
      },
      {
        term: "Symmetry",
        definition: "After A = B is trained, B = A emerges.",
      },
      {
        term: "Transitivity",
        definition: "After A = B and A = C are trained, B = C emerges.",
      },
      {
        term: "Stimulus equivalence",
        definition: "Reflexivity, symmetry, and transitivity are demonstrated.",
      },
    ],
    answer: "All emergent relations matched correctly",
    explanation:
      "Emergent relations are untrained stimulus-stimulus relations that appear after teaching related relations.",
  },
  {
    type: "scenario",
    prompt:
      "During free choice, a learner allocates most responding to the option that has produced the higher relative rate of reinforcement. Which concept best explains this pattern?",
    choices: ["Matching law", "Behavioral momentum", "Stimulus equivalence", "Maintenance"],
    answer: "Matching law",
    explanation:
      "Matching law describes how behavior is distributed among alternatives according to relative rates of reinforcement.",
  },
  {
    type: "scenario",
    prompt:
      "A teacher gives three easy high-probability requests, reinforces compliance, then presents a harder low-probability request. Which procedure is being used?",
    choices: ["Behavioral momentum", "Matching law", "Mixed schedule", "Stimulus generalization"],
    answer: "Behavioral momentum",
    explanation:
      "Behavioral momentum uses a high-probability request sequence before a lower-probability request to increase compliance.",
  },
  {
    type: "scenario",
    prompt:
      "A therapist claps twice, and the learner immediately claps twice with the same movement form. Which concept is described?",
    choices: ["Imitation", "Observational learning", "Transitivity", "Maintenance"],
    answer: "Imitation",
    explanation:
      "Imitation requires the model and response to have formal similarity, and the model must evoke the learner's response.",
  },
  {
    type: "scenario",
    prompt:
      "A learner watches a peer receive tokens for organizing materials, then later organizes materials without directly copying the peer's exact movements. Which concept is broader and more precise?",
    choices: ["Observational learning", "Imitation", "Reflexivity", "Mixed schedule"],
    answer: "Observational learning",
    explanation:
      "Observational learning is broader than imitation because behavior can change after observing a model and consequences without matching the exact response form.",
  },
  {
    type: "matching",
    prompt: "Match each verbal operant to its primary controlling variable.",
    pairs: [
      {
        term: "Mand",
        definition: "Motivating Operation plus specific reinforcement.",
      },
      {
        term: "Tact",
        definition: "Nonverbal Discriminative Stimulus plus generalized conditioned reinforcement.",
      },
      {
        term: "Echoic",
        definition: "Verbal Discriminative Stimulus with point-to-point correspondence and formal similarity.",
      },
      {
        term: "Intraverbal",
        definition: "Verbal Discriminative Stimulus with no point-to-point correspondence.",
      },
    ],
    answer: "All verbal operants matched to controlling variables",
    explanation:
      "Verbal operants are discriminated by antecedent control, point-to-point correspondence, formal similarity, and type of reinforcement.",
  },
  {
    type: "sorting",
    prompt: "Sort each scenario by verbal operant.",
    categories: ["Mand", "Tact"],
    items: [
      { label: "Says 'juice' because thirsty and receives juice", category: "Mand" },
      { label: "Sees a dog and says 'dog'", category: "Tact" },
      { label: "Asks 'help please' during a difficult task", category: "Mand" },
      { label: "Looks at a red ball and says 'red ball'", category: "Tact" },
    ],
    answer: "All mand and tact examples sorted correctly",
    explanation:
      "Mand control comes from a Motivating Operation and specific reinforcement. Tact control comes from a nonverbal Discriminative Stimulus and generalized conditioned reinforcement.",
  },
  {
    type: "scenario",
    prompt:
      "A teacher says, 'Say cookie,' and the learner says, 'cookie.' Which verbal operant is demonstrated?",
    choices: ["Echoic", "Intraverbal", "Textual", "Transcription"],
    answer: "Echoic",
    explanation:
      "An echoic is evoked by a verbal stimulus and has point-to-point correspondence and formal similarity with that stimulus.",
  },
  {
    type: "scenario",
    prompt:
      "A teacher asks, 'What do you drink?' and the learner says, 'water.' There is no point-to-point correspondence. Which verbal operant is demonstrated?",
    choices: ["Intraverbal", "Echoic", "Copying a text", "Listener responding"],
    answer: "Intraverbal",
    explanation:
      "An intraverbal is evoked by a verbal stimulus but does not have point-to-point correspondence with that stimulus.",
  },
  {
    type: "sorting",
    prompt: "Sort each relation by whether it has formal similarity.",
    categories: ["Formal similarity", "No formal similarity"],
    items: [
      { label: "Echoic", category: "Formal similarity" },
      { label: "Copying a text", category: "Formal similarity" },
      { label: "Textual", category: "No formal similarity" },
      { label: "Transcription", category: "No formal similarity" },
    ],
    answer: "All formal-similarity examples sorted correctly",
    explanation:
      "Echoic and copying a text have formal similarity. Textual and transcription have point-to-point correspondence but no formal similarity.",
  },
  {
    type: "scenario",
    prompt:
      "A learner reads the printed word 'cat' aloud as 'cat.' Which verbal operant is demonstrated?",
    choices: ["Textual", "Transcription", "Echoic", "Tact"],
    answer: "Textual",
    explanation:
      "Textual behavior is evoked by a written verbal stimulus and produces a spoken response with point-to-point correspondence but no formal similarity.",
  },
  {
    type: "scenario",
    prompt:
      "A teacher says 'cat,' and the learner writes c-a-t. Which verbal operant is demonstrated?",
    choices: ["Transcription", "Textual", "Tact", "Intraverbal"],
    answer: "Transcription",
    explanation:
      "Transcription occurs when a spoken verbal stimulus evokes a written, typed, or fingerspelled response.",
  },
  {
    type: "scenario",
    prompt:
      "A learner touches the picture of a shoe after hearing 'touch shoe.' Which classification is described?",
    choices: ["Listener responding", "Mand", "Tact", "Autoclitic"],
    answer: "Listener responding",
    explanation:
      "Listener responding is behavior controlled by another person's verbal stimulus. It is not a speaker verbal operant.",
  },
  {
    type: "select-all",
    prompt: "Select all statements that correctly describe multiple control.",
    choices: [
      "Convergent multiple control means one response is controlled by more than one variable.",
      "Divergent multiple control means one antecedent variable can strengthen many responses.",
      "Multiple control means every response has only one controlling variable.",
      "Impure tacts can involve multiple control.",
    ],
    answers: [
      "Convergent multiple control means one response is controlled by more than one variable.",
      "Divergent multiple control means one antecedent variable can strengthen many responses.",
      "Impure tacts can involve multiple control.",
    ],
    answer:
      "Convergent multiple control, divergent multiple control, and impure tact multiple control are correct.",
    explanation:
      "Multiple control is common in verbal behavior. One response may have several controlling variables, or one variable may strengthen many responses.",
  },
  {
    type: "fill-blank",
    prompt:
      "Complete the definition: An autoclitic is verbal behavior about ____ behavior.",
    answer: "verbal",
    explanation:
      "An autoclitic is verbal behavior about verbal behavior, such as modifying, qualifying, or describing another verbal response.",
  },
  {
    type: "scenario",
    prompt:
      "A learner says, 'I think it is probably a dog.' The words 'I think' and 'probably' modify the strength or conditions of the response. Which relation is involved?",
    choices: ["Autoclitic", "Echoic", "Textual", "Listener responding"],
    answer: "Autoclitic",
    explanation:
      "Autoclitic verbal behavior modifies or comments on other verbal behavior.",
  },
  {
    type: "scenario",
    prompt:
      "A learner says 'jelly' after hearing 'peanut butter and...' Which controlling variable is most directly involved?",
    choices: ["Thematic prompt", "Audience control", "Transcription", "Formal similarity"],
    answer: "Thematic prompt",
    explanation:
      "A thematic prompt evokes a related response through meaning or topic relation rather than point-to-point copying.",
  },
  {
    type: "scenario",
    prompt:
      "A student describes the same event differently to peers than to parents because each audience has a different reinforcement history. What is this?",
    choices: ["Audience control", "Transcription", "Point-to-point correspondence", "Textual behavior"],
    answer: "Audience control",
    explanation:
      "An audience can function as a Discriminative Stimulus that evokes different verbal behavior based on reinforcement history.",
  },
  {
    type: "sorting",
    prompt: "Sort each example by behavioral control.",
    categories: ["Rule-governed", "Contingency-shaped"],
    items: [
      { label: "Follows 'wear goggles because chemicals can splash'", category: "Rule-governed" },
      { label: "Touches a hot pan once and avoids touching hot pans later", category: "Contingency-shaped" },
      { label: "Completes steps after reading written instructions", category: "Rule-governed" },
      { label: "Presses harder after only hard presses produce reinforcement", category: "Contingency-shaped" },
    ],
    answer: "All rule-governed and contingency-shaped examples sorted correctly",
    explanation:
      "Rule-governed behavior is controlled by verbal descriptions of contingencies. Contingency-shaped behavior is shaped by direct contact with consequences.",
  },
];

export const sectionBMasteryQuestions: QuestionContent[] = [
  {
    prompt:
      "Which statement best distinguishes behavior from response?",
    choices: [
      "Behavior is measurable activity of an organism; a response is one specific instance of behavior.",
      "Behavior is always private; a response is always public.",
      "Behavior is a stimulus; a response is an environment.",
      "Behavior only occurs after reinforcement; a response only occurs after punishment.",
    ],
    answer:
      "Behavior is measurable activity of an organism; a response is one specific instance of behavior.",
    explanation:
      "The terminology list defines behavior broadly as measurable organism activity. A response is one specific instance of a behavior.",
  },
  {
    type: "scenario",
    prompt:
      "A BCBA groups saying 'help,' handing over a help card, and raising a hand because all produce assistance. What is being described?",
    choices: ["Response class", "Stimulus class", "Abolishing Operation (AO)", "Respondent behavior"],
    answer: "Response class",
    explanation:
      "A response class includes responses that share a common function or effect, even if their forms differ.",
  },
  {
    type: "scenario",
    prompt:
      "A BCBA identifies the classroom lights as the specific environmental event occasioning eye shielding. Which statement describes this?",
    choices: [
      "The lights are a stimulus within the broader environment.",
      "The lights are a response class.",
      "The environment is one specific stimulus only.",
      "A response is the same thing as a stimulus.",
    ],
    answer: "The lights are a stimulus within the broader environment.",
    explanation:
      "A stimulus is a distinguishable aspect of the broader environment. Stimulus and environment are related, but they are not identical.",
  },
  {
    type: "scenario",
    prompt:
      "A clinician groups photos, toy versions, cartoons, and stuffed examples of dogs because all occasion the learner saying 'dog.' Which concept is described?",
    choices: ["Stimulus class", "Response class", "Response cost", "Operant extinction"],
    answer: "Stimulus class",
    explanation:
      "A stimulus class includes stimuli that share physical, temporal, or functional features and occasion similar responding.",
  },
  {
    type: "scenario",
    prompt:
      "A learner can tap a card, sign, or say a word to request the same item. The forms differ, but each produces the same reinforcer. Which concept is described?",
    choices: ["Response class", "Stimulus class", "Conditioned Stimulus (CS)", "Abolishing Operation (AO)"],
    answer: "Response class",
    explanation:
      "A response class groups different response topographies by shared function or effect.",
  },
  {
    prompt:
      "Which statement best distinguishes respondent behavior from operant behavior?",
    choices: [
      "Respondent behavior is elicited by antecedent stimuli; operant behavior is selected by consequences.",
      "Respondent behavior is always voluntary; operant behavior is always reflexive.",
      "Respondent behavior requires reinforcement; operant behavior requires stimulus pairing.",
      "Respondent behavior only involves punishment; operant behavior only involves reinforcement.",
    ],
    answer:
      "Respondent behavior is elicited by antecedent stimuli; operant behavior is selected by consequences.",
    explanation:
      "Respondent behavior is elicited. Operant behavior is selected and maintained by consequences.",
  },
  {
    prompt:
      "A learner says 'mand for break,' receives a break, and manding for a break increases. Which process is demonstrated?",
    choices: [
      "Negative reinforcement",
      "Positive punishment",
      "Respondent conditioning",
      "Negative punishment",
    ],
    answer: "Negative reinforcement",
    explanation:
      "The response increases because task demands are removed or delayed after the mand. That is negative reinforcement.",
  },
  {
    prompt:
      "A teacher gives descriptive praise after hand raising, and hand raising increases. Which process is demonstrated?",
    choices: [
      "Positive reinforcement",
      "Negative reinforcement",
      "Positive punishment",
      "Negative punishment",
    ],
    answer: "Positive reinforcement",
    explanation:
      "Praise is added after the response and future hand raising increases. That is positive reinforcement.",
  },
  {
    prompt:
      "A response produces added correction, and that response decreases in future similar conditions. Which process is demonstrated?",
    choices: [
      "Positive punishment",
      "Negative punishment",
      "Positive reinforcement",
      "Negative reinforcement",
    ],
    answer: "Positive punishment",
    explanation:
      "A stimulus is added after the response and future responding decreases. That is positive punishment.",
  },
  {
    prompt:
      "Why is it incorrect to label a consequence as reinforcement before seeing its effect on future behavior?",
    choices: [
      "Reinforcement is defined by an increase in future responding.",
      "Reinforcement is defined by whether the stimulus is preferred.",
      "Reinforcement is any consequence delivered by an adult.",
      "Reinforcement only occurs with edible items.",
    ],
    answer: "Reinforcement is defined by an increase in future responding.",
    explanation:
      "A consequence is reinforcement only if it increases future frequency of similar responses under similar conditions.",
  },
  {
    type: "fill-blank",
    prompt:
      "Complete the statement: Negative means a stimulus is removed, reduced, delayed, or ____.",
    answer: "avoided",
    explanation:
      "Negative refers to removal, reduction, delay, or avoidance of a stimulus. It does not mean bad.",
  },
  {
    type: "scenario",
    prompt: "Which scenario is the best example of positive punishment?",
    choices: [
      "A reprimand is delivered after calling out, and calling out decreases.",
      "A token is removed after calling out, and calling out decreases.",
      "Praise is delivered after hand raising, and hand raising increases.",
      "Noise is removed after task completion, and task completion increases.",
    ],
    answer: "A reprimand is delivered after calling out, and calling out decreases.",
    explanation:
      "Positive punishment requires an added stimulus after the response and a decrease in future responding.",
  },
  {
    type: "scenario",
    prompt:
      "A learner leaves the table after a task is presented. The task is removed, and leaving the table increases when tasks are present. Which consequence relation is described?",
    choices: ["Negative reinforcement through escape", "Negative punishment", "Respondent extinction", "Positive reinforcement"],
    answer: "Negative reinforcement through escape",
    explanation:
      "The response increases because an ongoing aversive stimulus is removed. That is negative reinforcement through escape.",
  },
  {
    type: "scenario",
    prompt:
      "A learner asks for a break when a timer signals math will start soon. Math is delayed, and asking for a break increases. Which relation is described?",
    choices: ["Negative reinforcement through avoidance", "Positive punishment", "Respondent conditioning", "S-delta"],
    answer: "Negative reinforcement through avoidance",
    explanation:
      "The response increases because contact with the aversive stimulus is delayed or prevented before it occurs.",
  },
  {
    type: "sorting",
    prompt: "Sort each reinforcement example by how the consequence is contacted.",
    categories: ["Socially mediated", "Automatic"],
    items: [
      { label: "A peer laughs after joking", category: "Socially mediated" },
      { label: "A teacher gives access to a preferred activity after a mand", category: "Socially mediated" },
      { label: "Rocking produces vestibular stimulation", category: "Automatic" },
      { label: "Rubbing a sore spot reduces discomfort", category: "Automatic" },
    ],
    answer: "All reinforcement examples sorted correctly",
    explanation:
      "Socially mediated consequences are delivered by another person. Automatic consequences are produced directly by the response.",
  },
  {
    type: "matching",
    prompt: "Match each consequence classification to the best example.",
    pairs: [
      {
        term: "Unconditioned reinforcer",
        definition: "Food functions as reinforcement when food deprivation is relevant.",
      },
      {
        term: "Conditioned reinforcer",
        definition: "A click sound increases behavior after repeated pairing with treats.",
      },
      {
        term: "Unconditioned punisher",
        definition: "Pain from touching a hot surface decreases similar touching without prior learning.",
      },
      {
        term: "Generalized conditioned reinforcer",
        definition: "Tokens increase behavior after pairing with many backup reinforcers.",
      },
      {
        term: "Conditioned punisher",
        definition: "A warning tone decreases behavior after repeated pairing with loss of tokens.",
      },
      {
        term: "Generalized conditioned punisher",
        definition: "A response-cost warning decreases behavior after pairing with many punishers.",
      },
    ],
    answer: "All consequence classifications matched correctly",
    explanation:
      "Classify consequences by learning history and effect: unconditioned does not require learning, conditioned requires pairing, and generalized conditioned consequences are paired with many reinforcers or punishers.",
  },
  {
    type: "scenario",
    prompt:
      "Which option best differentiates these concepts?",
    choices: [
      "An Establishing Operation changes reinforcer value; a Discriminative Stimulus signals availability; reinforcement increases future behavior.",
      "A Discriminative Stimulus changes reinforcer value; punishment always means something bad happened.",
      "A response class groups stimuli; a stimulus class groups response topographies.",
      "Respondent extinction withholds the maintaining reinforcer after an operant response.",
    ],
    answer:
      "An Establishing Operation changes reinforcer value; a Discriminative Stimulus signals availability; reinforcement increases future behavior.",
    explanation:
      "This option correctly separates Motivating Operation effects, stimulus control, and the behavior-increasing effect required for reinforcement.",
  },
  {
    type: "scenario",
    prompt:
      "A neutral tone is paired with an air puff several times. Later, the tone alone elicits blinking. What is the tone after pairing?",
    choices: [
      "Conditioned Stimulus (CS)",
      "Unconditioned Stimulus (US)",
      "S-delta",
      "Negative reinforcer",
    ],
    answer: "Conditioned Stimulus (CS)",
    explanation:
      "After pairing, the formerly Neutral Stimulus (NS) becomes a Conditioned Stimulus (CS) that elicits a Conditioned Response (CR).",
  },
  {
    type: "matching",
    prompt: "Match each stimulus-control term to its definition.",
    pairs: [
      {
        term: "SD (Discriminative Stimulus)",
        definition: "Signals reinforcement is available for a response.",
      },
      {
        term: "S-delta",
        definition: "Signals the response will not be reinforced.",
      },
      {
        term: "Setting event",
        definition: "Contextual variable that alters antecedent effects.",
      },
      {
        term: "Motivating Operation",
        definition: "Changes reinforcer value and current behavior.",
      },
    ],
    answer: "All stimulus-control and motivating-operation terms matched correctly",
    explanation:
      "A Discriminative Stimulus (SD) signals availability of reinforcement. An S-delta signals nonavailability of reinforcement. A Motivating Operation (MO) changes value; setting events alter how antecedents function.",
  },
  {
    type: "matching",
    prompt:
      "A learner is thirsty, sees a water fountain, presses the button, and drinks water. Match each part of the scenario.",
    pairs: [
      {
        term: "Motivating Operation (MO)",
        definition: "Thirst increases the value of water.",
      },
      {
        term: "Discriminative Stimulus (SD)",
        definition: "The visible fountain signals water is available.",
      },
      {
        term: "Behavior",
        definition: "Presses the fountain button.",
      },
      {
        term: "Consequence",
        definition: "Drinks water.",
      },
    ],
    answer: "All MO, SD, behavior, and consequence examples matched correctly",
    explanation:
      "The Motivating Operation changes value, the Discriminative Stimulus signals availability, the behavior is emitted, and the consequence follows.",
  },
  {
    type: "scenario",
    prompt:
      "A behavior maintained by attention no longer produces attention, and the behavior decreases. Which process is described?",
    choices: ["Operant extinction", "Respondent extinction", "Negative punishment", "Abolishing Operation (AO)"],
    answer: "Operant extinction",
    explanation:
      "Operant extinction withholds the reinforcer that previously followed and maintained the response.",
  },
  {
    type: "scenario",
    prompt:
      "A Conditioned Stimulus (CS) is repeatedly presented without the Unconditioned Stimulus (US), and the Conditioned Response (CR) weakens. Which process is described?",
    choices: ["Respondent extinction", "Operant extinction", "Positive punishment", "Stimulus generalization"],
    answer: "Respondent extinction",
    explanation:
      "Respondent extinction discontinues the stimulus-stimulus pairing by presenting the Conditioned Stimulus without the Unconditioned Stimulus.",
  },
  {
    type: "sorting",
    prompt: "Sort the schedule examples.",
    categories: ["Fixed", "Variable"],
    items: [
      { label: "Reinforcement after exactly 10 responses", category: "Fixed" },
      { label: "Reinforcement after an average of 10 responses", category: "Variable" },
      { label: "Reinforcement after exactly 5 minutes", category: "Fixed" },
      { label: "Reinforcement after an average of 5 minutes", category: "Variable" },
    ],
    answer: "All schedule examples sorted correctly",
    explanation:
      "Fixed schedules use constant requirements. Variable schedules vary around an average requirement.",
  },
  {
    type: "matching",
    prompt: "Match each complex schedule to its critical distinction.",
    pairs: [
      {
        term: "Concurrent schedule",
        definition: "Simultaneous schedules for different response alternatives.",
      },
      {
        term: "Multiple schedule",
        definition: "Alternating schedules with distinct Discriminative Stimuli.",
      },
      {
        term: "Mixed schedule",
        definition: "Alternating schedules without distinct Discriminative Stimuli.",
      },
      {
        term: "Chained schedule",
        definition: "Successive schedules in the same order with distinct Discriminative Stimuli.",
      },
    ],
    answer: "All complex schedules matched correctly",
    explanation:
      "Use simultaneous vs successive and signaled vs unsignaled to discriminate concurrent, multiple, mixed, and chained schedules.",
  },
  {
    type: "scenario",
    prompt:
      "A red light signals one reinforcement schedule, and a green light signals another. The schedules alternate across components. Which schedule is described?",
    choices: ["Multiple schedule", "Mixed schedule", "Concurrent schedule", "Chained schedule"],
    answer: "Multiple schedule",
    explanation:
      "A multiple schedule alternates components, and each component has a correlated Discriminative Stimulus.",
  },
  {
    type: "scenario",
    prompt:
      "Two schedules alternate unpredictably, but there is no signal showing which component is active. Which schedule is described?",
    choices: ["Mixed schedule", "Multiple schedule", "Concurrent schedule", "Chained schedule"],
    answer: "Mixed schedule",
    explanation:
      "A mixed schedule is like a multiple schedule except the active component is not signaled by a distinct Discriminative Stimulus.",
  },
  {
    type: "scenario",
    prompt:
      "A new skill is reinforced after every correct response until responding is stable. Which schedule is being used?",
    choices: [
      "CRF (Contingent Reinforcement)",
      "VI (Variable Interval)",
      "Extinction",
      "S-delta",
    ],
    answer: "CRF (Contingent Reinforcement)",
    explanation:
      "CRF (Contingent Reinforcement) reinforces each correct response and is often used when teaching new behavior.",
  },
  {
    type: "scenario",
    prompt:
      "A substitute teacher changes the classroom context, and teacher prompts no longer occasion the usual on-task behavior. Which concept best captures this contextual effect?",
    choices: [
      "Setting event",
      "Unconditioned Response (UR)",
      "FR (Fixed Ratio) schedule",
      "Positive punishment",
    ],
    answer: "Setting event",
    explanation:
      "A setting event is a contextual or environmental variable that can alter the effect of antecedent events.",
  },
  {
    type: "sorting",
    prompt: "Sort each example by the best concept.",
    categories: ["Generalization", "Maintenance"],
    items: [
      { label: "Skill occurs with a new caregiver", category: "Generalization" },
      { label: "Skill continues after reinforcement is thinned", category: "Maintenance" },
      { label: "Learner uses a response with new materials", category: "Generalization" },
      { label: "Learner still performs the target behavior after prompts are removed", category: "Maintenance" },
    ],
    answer: "All generalization and maintenance examples sorted correctly",
    explanation:
      "Generalization describes spread across new conditions. Maintenance describes persistence over time after teaching supports are reduced.",
  },
  {
    type: "scenario",
    prompt:
      "A learner was taught to ask for help with one teacher, then asks for help with a different teacher without direct training. Which type of behavior change is described?",
    choices: ["Generalization", "Maintenance", "Matching law", "Behavioral momentum"],
    answer: "Generalization",
    explanation:
      "The response occurred under a new person or condition, so this is generalization.",
  },
  {
    type: "scenario",
    prompt:
      "A learner continues using a communication response six weeks after prompts and contrived reinforcement are faded. Which concept is described?",
    choices: ["Maintenance", "Generalization", "Reflexivity", "Mixed schedule"],
    answer: "Maintenance",
    explanation:
      "Maintenance is continued performance after part or all of the intervention has been removed or after time has passed.",
  },
  {
    type: "matching",
    prompt: "Match each emergent relation to the untrained relation being tested.",
    pairs: [
      {
        term: "Reflexivity",
        definition: "A learner matches A to A without training.",
      },
      {
        term: "Symmetry",
        definition: "After A = B is taught, the learner demonstrates B = A.",
      },
      {
        term: "Transitivity",
        definition: "After A = B and A = C are taught, the learner demonstrates B = C.",
      },
      {
        term: "Stimulus equivalence",
        definition: "Reflexivity, symmetry, and transitivity are all demonstrated.",
      },
    ],
    answer: "All emergent relations matched correctly",
    explanation:
      "Emergent relations are untrained stimulus-stimulus relations that appear after training related relations.",
  },
  {
    type: "scenario",
    prompt:
      "A learner chooses between two tasks. Most responding shifts toward the task that has produced the higher relative rate of reinforcement. Which concept is described?",
    choices: ["Matching law", "Behavioral momentum", "Stimulus equivalence", "Maintenance"],
    answer: "Matching law",
    explanation:
      "Matching law describes how behavior is allocated across alternatives based on relative reinforcement rates.",
  },
  {
    type: "scenario",
    prompt:
      "A teacher rapidly presents several mastered requests before presenting a difficult request to increase compliance. Which concept is described?",
    choices: ["Behavioral momentum", "Matching law", "Generalization", "Multiple schedule"],
    answer: "Behavioral momentum",
    explanation:
      "Behavioral momentum uses a high-probability request sequence before a low-probability request.",
  },
  {
    type: "scenario",
    prompt:
      "A model touches head, and the learner immediately touches head with the same movement. Which concept is described?",
    choices: ["Imitation", "Observational learning", "Transitivity", "Chained schedule"],
    answer: "Imitation",
    explanation:
      "Imitation requires formal similarity between the model and learner response, with the model controlling the response.",
  },
  {
    type: "scenario",
    prompt:
      "A learner watches another student earn reinforcement for checking work, then begins checking work later without copying the exact movement. Which concept is broader?",
    choices: ["Observational learning", "Imitation", "Reflexivity", "Maintenance"],
    answer: "Observational learning",
    explanation:
      "Observational learning can occur after watching a model and consequences; it does not require the exact formal similarity required for imitation.",
  },
  {
    type: "scenario",
    prompt:
      "A learner has not had attention for several minutes, says 'look at me,' and receives adult attention. Which verbal operant is described?",
    choices: ["Mand", "Tact", "Echoic", "Textual"],
    answer: "Mand",
    explanation:
      "The response is controlled by a Motivating Operation and followed by specific reinforcement, so it is a mand.",
  },
  {
    type: "scenario",
    prompt:
      "A learner sees a plane overhead and says 'plane.' The response produces social acknowledgment. Which verbal operant is described?",
    choices: ["Tact", "Mand", "Intraverbal", "Transcription"],
    answer: "Tact",
    explanation:
      "A tact is evoked by a nonverbal Discriminative Stimulus and maintained by generalized conditioned reinforcement.",
  },
  {
    type: "matching",
    prompt: "Match each verbal relation to point-to-point and formal similarity status.",
    pairs: [
      {
        term: "Echoic",
        definition: "Point-to-point correspondence and formal similarity.",
      },
      {
        term: "Intraverbal",
        definition: "No point-to-point correspondence.",
      },
      {
        term: "Textual",
        definition: "Point-to-point correspondence without formal similarity.",
      },
      {
        term: "Transcription",
        definition: "Spoken verbal stimulus to written response; point-to-point without formal similarity.",
      },
    ],
    answer: "All verbal relations matched correctly",
    explanation:
      "Point-to-point correspondence and formal similarity are critical for discriminating echoic, intraverbal, textual, and transcription.",
  },
  {
    type: "scenario",
    prompt:
      "A learner answers 'four' when asked, 'What is two plus two?' Which verbal operant is demonstrated?",
    choices: ["Intraverbal", "Echoic", "Mand", "Copying a text"],
    answer: "Intraverbal",
    explanation:
      "The response is evoked by a verbal stimulus and does not have point-to-point correspondence with the question.",
  },
  {
    type: "scenario",
    prompt:
      "A child writes 'dog' while looking at the printed word dog. Which verbal relation is described?",
    choices: ["Copying a text", "Transcription", "Textual", "Intraverbal"],
    answer: "Copying a text",
    explanation:
      "Copying a text has point-to-point correspondence and formal similarity between the written verbal stimulus and written response.",
  },
  {
    type: "scenario",
    prompt: "Which is the best example of listener responding rather than speaker behavior?",
    choices: [
      "Touching the cup after hearing 'touch cup'",
      "Saying 'cookie' to request a cookie",
      "Labeling a car when seeing a car",
      "Answering 'red' when asked 'what color is it?'",
    ],
    answer: "Touching the cup after hearing 'touch cup'",
    explanation:
      "Listener responding is behavior controlled by another person's verbal stimulus. Manding, tacting, and intraverbal responding are speaker verbal operants.",
  },
  {
    type: "sorting",
    prompt: "Sort each example by multiple-control type.",
    categories: ["Convergent", "Divergent"],
    items: [
      { label: "Seeing a dog plus hearing 'what animal barks?' evokes 'dog'", category: "Convergent" },
      { label: "The word 'dog' evokes 'bark,' 'pet,' and 'leash'", category: "Divergent" },
      { label: "A Motivating Operation plus a visible item evokes 'cookie'", category: "Convergent" },
      { label: "A picture of a beach evokes 'sand,' 'ocean,' and 'vacation'", category: "Divergent" },
    ],
    answer: "All multiple-control examples sorted correctly",
    explanation:
      "Convergent multiple control means more than one variable controls one response. Divergent multiple control means one variable strengthens many responses.",
  },
  {
    type: "scenario",
    prompt:
      "A learner says 'It might be a mand' while discussing their own answer. Which verbal relation best captures the phrase 'might be'?",
    choices: ["Autoclitic", "Mand", "Echoic", "Textual"],
    answer: "Autoclitic",
    explanation:
      "The phrase modifies the speaker's own verbal behavior, so it is autoclitic.",
  },
  {
    type: "scenario",
    prompt:
      "A parent says, 'If you finish your homework, then you can play outside,' and the child completes homework before contacting the outdoor-play consequence. Which behavior is most likely involved?",
    choices: [
      "Rule-governed behavior",
      "Respondent extinction",
      "Automatic punishment",
      "Copying a text",
    ],
    answer: "Rule-governed behavior",
    explanation:
      "Rule-governed behavior is controlled by a verbal description of a contingency rather than only direct shaping by consequences.",
  },
];
