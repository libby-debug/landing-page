import type { MiniLessonContent, QuestionContent } from "./section-b-content";
import {
  sectionBMasteryQuestions,
  sectionBMiniLessons,
  sectionBPracticeQuestions,
} from "./section-b-content";

type ModuleContent = {
  miniLessons: MiniLessonContent[];
  practiceQuestions: QuestionContent[];
  masteryQuestions: QuestionContent[];
};

const sectionAMiniLessons: MiniLessonContent[] = [
  {
    slug: "description-prediction-control",
    label: "A.1",
    title: "Goals of behavior analysis",
    body: [
      "Description identifies [what behavior is happening].",
      "Prediction and control show [orderly relations with environmental variables].",
    ],
    visual: {
      type: "flow",
      prompt: "Put the goals in the order behavior analysts build understanding.",
      steps: ["Description", "Prediction", "Control"],
    },
  },
  {
    slug: "philosophical-assumptions",
    label: "A.2",
    title: "Philosophical assumptions",
    body: [
      "Determinism means behavior is [lawful].",
      "Empiricism means decisions are based on [objective observation].",
    ],
    visual: {
      type: "matching",
      prompt: "Match each assumption to the discrimination cue.",
      pairs: [
        { term: "Determinism", definition: "Behavior is lawful." },
        { term: "Empiricism", definition: "Use objective observation." },
        { term: "Parsimony", definition: "Try the simplest adequate explanation first." },
        { term: "Pragmatism", definition: "Ask whether the explanation works." },
      ],
    },
  },
  {
    slug: "radical-behaviorism",
    label: "A.3",
    title: "Radical behaviorism",
    body: [
      "Radical behaviorism includes [public and private events].",
      "Private events are behavior to be explained, not mental causes outside behavior analysis.",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Public behavior",
      leftText: "Observable by others",
      rightTitle: "Private events",
      rightText: "Accessible mainly to the person",
      cue: "Radical behaviorism includes both, but still analyzes behavior-environment relations.",
    },
  },
  {
    slug: "aba-dimensions",
    label: "A.5",
    title: "Dimensions of ABA",
    body: [
      "Applied means the behavior is [socially significant].",
      "Analytic means the data show [experimental control].",
    ],
    visual: {
      type: "select-all",
      prompt: "Select dimensions that describe ABA work.",
      choices: [
        { label: "Applied", correct: true },
        { label: "Analytic", correct: true },
        { label: "Technological", correct: true },
        { label: "Speculative", correct: false },
      ],
      feedback:
        "ABA is applied, behavioral, analytic, technological, conceptually systematic, effective, and generality-focused.",
    },
  },
];

const sectionCMiniLessons: MiniLessonContent[] = [
  {
    slug: "operational-definitions",
    label: "C.1",
    title: "Operational definitions",
    body: [
      "An operational definition describes behavior in [observable and measurable terms].",
      "It tells observers exactly what counts and what does not count.",
    ],
    visual: {
      type: "example",
      example: "Counts: hand contacts peer with force.",
      nonexample: "Does not count: being aggressive.",
    },
  },
  {
    slug: "direct-indirect-product",
    label: "C.2",
    title: "Direct, indirect, and product measures",
    body: [
      "Direct measurement observes [the behavior as it occurs].",
      "Product measurement records [an outcome behavior leaves behind].",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort the measurement examples.",
      categories: ["Direct measure", "Product measure"],
      items: [
        { label: "Count hand raises during class", category: "Direct measure" },
        { label: "Score completed math problems", category: "Product measure" },
        { label: "Time how long crying lasts", category: "Direct measure" },
        { label: "Count worksheets turned in", category: "Product measure" },
      ],
    },
  },
  {
    slug: "continuous-discontinuous",
    label: "C.5-C.7",
    title: "Continuous vs discontinuous measurement",
    body: [
      "Continuous measurement captures [every response or response dimension].",
      "Discontinuous measurement samples behavior during intervals.",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Continuous",
      leftText: "Frequency, duration, latency, IRT",
      rightTitle: "Discontinuous",
      rightText: "Partial interval, whole interval, momentary time sampling",
      cue: "Continuous = most complete record. Discontinuous = sample of behavior.",
    },
  },
  {
    slug: "graph-interpretation",
    label: "C.10-C.12",
    title: "Graph interpretation",
    body: [
      "Visual analysis focuses on [level, trend, variability, immediacy, overlap, and consistency].",
      "Interpret data before changing intervention procedures.",
    ],
    visual: {
      type: "choice",
      prompt: "Which feature asks whether data changed right after intervention began?",
      choices: ["Immediacy of effect", "Measurement validity", "IRT", "Trials to criterion"],
      answer: "Immediacy of effect",
      feedback:
        "Immediacy of effect compares data right before and right after a condition change.",
    },
  },
];

const sectionDMiniLessons: MiniLessonContent[] = [
  {
    slug: "independent-dependent-variable",
    label: "D.1",
    title: "Independent vs dependent variable",
    body: [
      "The independent variable is [what the analyst changes].",
      "The dependent variable is [the behavior being measured].",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Independent variable",
      leftText: "Intervention or condition",
      rightTitle: "Dependent variable",
      rightText: "Measured behavior",
      cue: "IV = changed by analyst. DV = measured behavior.",
    },
  },
  {
    slug: "validity-threats",
    label: "D.2-D.3",
    title: "Internal validity",
    body: [
      "Internal validity means behavior change is due to [the independent variable].",
      "Threats are alternative explanations for the change.",
    ],
    visual: {
      type: "true-false",
      prompt: "Validity check",
      statement:
        "A strong design reduces alternative explanations for behavior change.",
      answer: true,
      feedback:
        "Correct. Experimental control requires ruling out plausible alternative explanations.",
    },
  },
  {
    slug: "single-subject-design",
    label: "D.4-D.7",
    title: "Single-subject design logic",
    body: [
      "Single-subject design evaluates [individual behavior over repeated measurement].",
      "Experimental control is shown through prediction, verification, and replication.",
    ],
    visual: {
      type: "flow",
      prompt: "Order the logic used to demonstrate experimental control.",
      steps: ["Prediction", "Verification", "Replication"],
    },
  },
  {
    slug: "design-comparisons",
    label: "D.7",
    title: "Design discrimination",
    body: [
      "Reversal designs show control by [turning intervention on and off].",
      "Multiple baseline designs show control by [staggering intervention across tiers].",
    ],
    visual: {
      type: "matching",
      prompt: "Match each design to its fastest cue.",
      pairs: [
        { term: "Reversal", definition: "Return to baseline or previous condition." },
        { term: "Multiple baseline", definition: "Stagger intervention across tiers." },
        { term: "Multielement", definition: "Rapidly alternate conditions." },
        { term: "Changing criterion", definition: "Stepwise shifts in performance criterion." },
      ],
    },
  },
];

const sectionEMiniLessons: MiniLessonContent[] = [
  {
    slug: "ethical-principles",
    label: "E.1-E.3",
    title: "Core ethical principles",
    body: [
      "Ethical practice protects [client dignity, welfare, and autonomy].",
      "Competence means practicing within training, supervision, and experience.",
    ],
    visual: {
      type: "select-all",
      prompt: "Select ethical decision anchors.",
      choices: [
        { label: "Client welfare", correct: true },
        { label: "Scope of competence", correct: true },
        { label: "Data and documentation", correct: true },
        { label: "Convenience over risk", correct: false },
      ],
      feedback:
        "Ethical decisions prioritize client welfare, competence, data, consent, and applicable requirements.",
    },
  },
  {
    slug: "confidentiality",
    label: "E.4-E.5",
    title: "Confidentiality and public statements",
    body: [
      "Confidentiality protects [client-identifying information].",
      "Public statements must be accurate and not misleading.",
    ],
    visual: {
      type: "choice",
      prompt: "Which action best protects confidentiality?",
      choices: [
        "Share only the minimum necessary information with authorized people.",
        "Discuss a client case in a public hallway without names.",
        "Post a de-identified client video without consent.",
        "Use client details in marketing if outcomes were positive.",
      ],
      answer:
        "Share only the minimum necessary information with authorized people.",
      feedback:
        "Confidentiality requires authorized access, minimum necessary disclosure, and care with identifying details.",
    },
  },
  {
    slug: "boundaries-culture",
    label: "E.6-E.11",
    title: "Boundaries and cultural humility",
    body: [
      "Professional boundaries reduce [conflicts of interest].",
      "Cultural humility requires ongoing self-reflection and responsiveness.",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Boundary issue",
      leftText: "Role conflict or impaired objectivity",
      rightTitle: "Cultural humility",
      rightText: "Client-centered responsiveness",
      cue: "Boundaries protect judgment. Cultural humility improves fit and respect.",
    },
  },
];

const sectionFMiniLessons: MiniLessonContent[] = [
  {
    slug: "assessment-sources",
    label: "F.1-F.2",
    title: "Assessment sources",
    body: [
      "Records, interviews, and direct observation answer different questions.",
      "Assessment should include [cultural variables and context].",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each assessment source.",
      categories: ["Indirect", "Direct"],
      items: [
        { label: "Caregiver interview", category: "Indirect" },
        { label: "ABC observation", category: "Direct" },
        { label: "Record review", category: "Indirect" },
        { label: "Functional analysis session", category: "Direct" },
      ],
    },
  },
  {
    slug: "preference-assessment",
    label: "F.3-F.6",
    title: "Preference assessment",
    body: [
      "Preference assessment identifies stimuli that may function as reinforcers.",
      "A reinforcer is confirmed only by [increased future responding].",
    ],
    visual: {
      type: "matching",
      prompt: "Match preference assessment formats to their cues.",
      pairs: [
        { term: "Paired stimulus", definition: "Choose between two items at a time." },
        { term: "MSWO", definition: "Choose from an array, then remove selected item." },
        { term: "Free operant", definition: "Observe allocation of time with items." },
      ],
    },
  },
  {
    slug: "functional-assessment-analysis",
    label: "F.3-F.8",
    title: "Functional assessment vs functional analysis",
    body: [
      "Functional assessment gathers information about [behavior-environment relations].",
      "Functional analysis manipulates conditions to test behavioral function.",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Descriptive assessment",
      leftText: "Observe natural events",
      rightTitle: "Functional analysis",
      rightText: "Manipulate conditions",
      cue: "Descriptive = observe correlations. Functional analysis = test function experimentally.",
    },
  },
  {
    slug: "socially-significant-goals",
    label: "F.7-F.8",
    title: "Socially significant goals",
    body: [
      "Goals should improve [meaningful outcomes for the client].",
      "Prioritize skills that affect safety, independence, access, or quality of life.",
    ],
    visual: {
      type: "choice",
      prompt: "Which goal is most socially significant?",
      choices: [
        "Teach a functional mand that reduces unsafe escape-maintained behavior.",
        "Teach a rote response because it is easy to graph.",
        "Select a goal because materials are already printed.",
        "Prioritize a behavior without caregiver or client context.",
      ],
      answer:
        "Teach a functional mand that reduces unsafe escape-maintained behavior.",
      feedback:
        "Socially significant goals matter in the learner's everyday life and match assessment results.",
    },
  },
];

const sectionGMiniLessons: MiniLessonContent[] = [
  {
    slug: "differential-reinforcement",
    label: "G.1-G.4",
    title: "Differential reinforcement",
    body: [
      "Differential reinforcement reinforces [one response pattern] while another response pattern contacts extinction or less reinforcement.",
      "The discrimination cue is what response, rate, or absence produces reinforcement.",
    ],
    visual: {
      type: "matching",
      prompt: "Match each differential reinforcement procedure to its criterion.",
      pairs: [
        { term: "DRA", definition: "Alternative behavior produces reinforcement." },
        { term: "DRI", definition: "Incompatible behavior produces reinforcement." },
        { term: "DRO", definition: "Absence of target behavior produces reinforcement." },
        { term: "DRL", definition: "Lower rate produces reinforcement." },
        { term: "DRH", definition: "Higher rate produces reinforcement." },
      ],
    },
  },
  {
    slug: "prompting-and-fading",
    label: "G.5-G.10",
    title: "Prompting and fading",
    body: [
      "Prompts increase the likelihood of a correct response.",
      "Prompt fading transfers control to [the natural SD].",
    ],
    visual: {
      type: "flow",
      prompt: "Order a prompt fading sequence.",
      steps: ["Natural SD", "Prompt if needed", "Correct response", "Fade prompt"],
    },
  },
  {
    slug: "shaping-and-chaining",
    label: "G.11-G.14",
    title: "Shaping vs chaining",
    body: [
      "Shaping reinforces [successive approximations of one response].",
      "Chaining teaches [a sequence of responses].",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Shaping",
      leftText: "One response changes form",
      rightTitle: "Chaining",
      rightText: "Multiple steps link together",
      cue: "Shaping = closer approximations. Chaining = task-analysis steps.",
    },
  },
  {
    slug: "punishment-safeguards",
    label: "G.15-G.19",
    title: "Punishment safeguards",
    body: [
      "Punishment procedures require [ethical safeguards and function-based alternatives].",
      "Use reinforcement-based procedures and data-based review whenever possible.",
    ],
    visual: {
      type: "select-all",
      prompt: "Select safeguards for punishment procedures.",
      choices: [
        { label: "Functional assessment", correct: true },
        { label: "Reinforcement for alternative behavior", correct: true },
        { label: "Ongoing data review", correct: true },
        { label: "Use because it works quickly without consent", correct: false },
      ],
      feedback:
        "Punishment requires strong safeguards, consent, monitoring, and reinforcement-based alternatives.",
    },
  },
];

const sectionHMiniLessons: MiniLessonContent[] = [
  {
    slug: "function-based-intervention",
    label: "H.1-H.3",
    title: "Function-based intervention",
    body: [
      "Function-based intervention matches procedures to [why behavior is maintained].",
      "Alternative behavior should access the same reinforcer more appropriately.",
    ],
    visual: {
      type: "flow",
      prompt: "Order function-based intervention planning.",
      steps: ["Identify function", "Select alternative behavior", "Teach response", "Reinforce replacement"],
    },
  },
  {
    slug: "alternative-behavior",
    label: "H.1-H.3",
    title: "Alternative behavior selection",
    body: [
      "A strong alternative behavior is [efficient, effective, and acceptable].",
      "It should be easier than problem behavior at first.",
    ],
    visual: {
      type: "select-all",
      prompt: "Select features of a good alternative behavior.",
      choices: [
        { label: "Contacts the same reinforcer", correct: true },
        { label: "Is easy enough to use", correct: true },
        { label: "Can be reinforced immediately", correct: true },
        { label: "Requires more effort than problem behavior", correct: false },
      ],
      feedback:
        "Alternative behavior should be efficient, effective, acceptable, and matched to function.",
    },
  },
  {
    slug: "treatment-integrity",
    label: "H.6-H.8",
    title: "Treatment integrity and effectiveness",
    body: [
      "Treatment integrity asks whether procedures were implemented as planned.",
      "Effectiveness asks whether [client behavior changed meaningfully].",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Integrity",
      leftText: "Was the plan implemented correctly?",
      rightTitle: "Effectiveness",
      rightText: "Did behavior improve?",
      cue: "Integrity = implementation. Effectiveness = outcome.",
    },
  },
];

const sectionIMiniLessons: MiniLessonContent[] = [
  {
    slug: "supervision-relationship",
    label: "I.1-I.3",
    title: "Supervision foundations",
    body: [
      "Effective supervision depends on [clear expectations and a supportive relationship].",
      "Equity means supervision systems are fair, responsive, and data-informed.",
    ],
    visual: {
      type: "choice",
      prompt: "Which practice best supports effective supervision?",
      choices: [
        "Set observable goals and review data with the supervisee.",
        "Give vague feedback only when problems become serious.",
        "Assume the same barriers affect every supervisee.",
        "Avoid documenting performance expectations.",
      ],
      answer: "Set observable goals and review data with the supervisee.",
      feedback:
        "Supervision should use clear expectations, direct observation, data, and supportive feedback.",
    },
  },
  {
    slug: "bst",
    label: "I.4-I.5",
    title: "Behavioral skills training",
    body: [
      "BST teaches skills using [instructions, modeling, rehearsal, and feedback].",
      "It is active training, not just telling someone what to do.",
    ],
    visual: {
      type: "flow",
      prompt: "Order the BST components.",
      steps: ["Instructions", "Modeling", "Rehearsal", "Feedback"],
    },
  },
  {
    slug: "function-based-supervision",
    label: "I.6-I.7",
    title: "Function-based supervision",
    body: [
      "Supervisee performance problems can be affected by [antecedents and consequences].",
      "Analyze barriers before selecting a performance management strategy.",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Skill deficit",
      leftText: "Needs training and rehearsal",
      rightTitle: "Performance deficit",
      rightText: "Needs antecedent/consequence support",
      cue: "Skill deficit = cannot do it yet. Performance deficit = can do it but does not under current conditions.",
    },
  },
];

const moduleContent: Record<string, ModuleContent> = {
  a: {
    miniLessons: sectionAMiniLessons,
    practiceQuestions: [
      {
        type: "matching",
        prompt: "Match each philosophical assumption to its discrimination cue.",
        pairs: [
          { term: "Selectionism", definition: "Behavior is shaped across consequences and history." },
          { term: "Empiricism", definition: "Knowledge comes from objective observation." },
          { term: "Parsimony", definition: "Start with the simplest adequate explanation." },
        ],
        answer: "All terms matched to their correct cues",
        explanation:
          "These assumptions guide behavior analysts toward environmental, observable, and useful explanations.",
      },
      {
        type: "scenario",
        prompt:
          "A BCBA says a client's self-talk is behavior that can be analyzed, but it should not be treated as a hidden mental cause. Which perspective is this?",
        choices: ["Radical behaviorism", "Methodological behaviorism", "Cognitive psychology", "Structuralism"],
        answer: "Radical behaviorism",
        explanation:
          "Radical behaviorism includes private events while still explaining behavior through behavior-environment relations.",
      },
      {
        type: "sorting",
        prompt: "Sort each ABA dimension cue.",
        categories: ["Applied", "Technological"],
        items: [
          { label: "Targets socially significant behavior", category: "Applied" },
          { label: "Procedures are written clearly enough to replicate", category: "Technological" },
          { label: "Improves client quality of life", category: "Applied" },
          { label: "Uses precise implementation steps", category: "Technological" },
        ],
        answer: "All cues sorted correctly",
        explanation:
          "Applied focuses on social significance. Technological focuses on clear, replicable procedures.",
      },
    ],
    masteryQuestions: [
      {
        prompt: "Which answer best states the goals of behavior analysis?",
        choices: [
          "Description, prediction, and control of behavior",
          "Diagnosis, insight, and personality change",
          "Memory, cognition, and emotion",
          "Interviewing, labeling, and counseling",
        ],
        answer: "Description, prediction, and control of behavior",
        explanation:
          "Behavior analysis aims to describe, predict, and control behavior through lawful environmental relations.",
      },
      {
        type: "fill-blank",
        prompt: "Complete the cue: Empiricism means decisions are based on ____.",
        answer: "observation",
        explanation:
          "Empiricism means relying on objective observation and data rather than opinion or assumption.",
      },
      {
        type: "scenario",
        prompt:
          "A treatment goal is important to the learner and family, data show the intervention caused change, and procedures are written clearly. Which dimensions are represented?",
        choices: [
          "Applied, analytic, and technological",
          "Parsimony, determinism, and pragmatism",
          "Indirect, product, and temporal",
          "Escape, attention, and automatic",
        ],
        answer: "Applied, analytic, and technological",
        explanation:
          "Applied means socially significant, analytic means demonstrated control, and technological means clearly described.",
      },
    ],
  },
  b: {
    miniLessons: sectionBMiniLessons,
    practiceQuestions: sectionBPracticeQuestions,
    masteryQuestions: sectionBMasteryQuestions,
  },
  c: {
    miniLessons: sectionCMiniLessons,
    practiceQuestions: [
      {
        type: "scenario",
        prompt:
          "An observer records every instance of hand raising during circle time. What type of measurement is this?",
        choices: ["Direct continuous measurement", "Indirect assessment", "Product measurement", "Momentary time sampling"],
        answer: "Direct continuous measurement",
        explanation:
          "The observer records the behavior as it occurs and captures each response.",
      },
      {
        type: "sorting",
        prompt: "Sort each measure by category.",
        categories: ["Temporal dimension", "Occurrence measure"],
        items: [
          { label: "Duration", category: "Temporal dimension" },
          { label: "Latency", category: "Temporal dimension" },
          { label: "Frequency", category: "Occurrence measure" },
          { label: "Count", category: "Occurrence measure" },
        ],
        answer: "All measurement types sorted correctly",
        explanation:
          "Duration, latency, and IRT are temporal measures. Frequency and count measure occurrence.",
      },
      {
        type: "fill-blank",
        prompt: "Complete the definition: An operational definition must be observable and ____.",
        answer: "measurable",
        explanation:
          "Operational definitions make data collection consistent by specifying observable and measurable behavior.",
      },
    ],
    masteryQuestions: [
      {
        prompt:
          "A teacher estimates that a learner was off task 'a lot' during math. What is the biggest measurement problem?",
        choices: [
          "The measure is not operational or precise.",
          "The measure is continuous and direct.",
          "The measure captures every response.",
          "The measure is a valid product measure.",
        ],
        answer: "The measure is not operational or precise.",
        explanation:
          "A vague estimate does not define what counted or provide reliable measurement.",
      },
      {
        type: "matching",
        prompt: "Match each graph feature to the question it answers.",
        pairs: [
          { term: "Level", definition: "How high or low are the data?" },
          { term: "Trend", definition: "What direction are data moving?" },
          { term: "Variability", definition: "How much do data bounce around?" },
        ],
        answer: "All graph features matched correctly",
        explanation:
          "Visual analysis uses level, trend, variability, immediacy, overlap, and consistency across phases.",
      },
      {
        type: "scenario",
        prompt:
          "A BCBA scores completed worksheets after class instead of observing responses during class. What kind of measure is this?",
        choices: ["Product measure", "Momentary time sampling", "Latency", "Interresponse time"],
        answer: "Product measure",
        explanation:
          "A product measure records an outcome produced by behavior rather than the behavior as it occurs.",
      },
    ],
  },
  d: {
    miniLessons: sectionDMiniLessons,
    practiceQuestions: [
      {
        type: "scenario",
        prompt:
          "A BCBA introduces an intervention and measures aggression each session. Which is the dependent variable?",
        choices: ["Aggression", "The intervention", "The therapist", "The phase label"],
        answer: "Aggression",
        explanation:
          "The dependent variable is the behavior being measured.",
      },
      {
        type: "matching",
        prompt: "Match each single-subject design to its cue.",
        pairs: [
          { term: "Reversal", definition: "Baseline and intervention conditions repeat." },
          { term: "Multiple baseline", definition: "Intervention starts at different times across tiers." },
          { term: "Multielement", definition: "Conditions alternate rapidly." },
          { term: "Changing criterion", definition: "Criteria change step by step." },
        ],
        answer: "All designs matched correctly",
        explanation:
          "Design discrimination depends on how experimental control is demonstrated.",
      },
      {
        type: "true-false",
        prompt:
          "True or false: internal validity is strengthened when alternative explanations are ruled out.",
        choices: ["True", "False"],
        answer: "True",
        explanation:
          "Internal validity is strengthened when alternative explanations are ruled out.",
      },
    ],
    masteryQuestions: [
      {
        prompt:
          "Which design is usually best when behavior is unlikely to reverse ethically or practically?",
        choices: ["Multiple baseline design", "ABAB reversal design", "Withdrawal design", "Brief reversal only"],
        answer: "Multiple baseline design",
        explanation:
          "Multiple baseline designs can demonstrate control without withdrawing an effective intervention.",
      },
      {
        type: "scenario",
        prompt:
          "A treatment effect appears only when intervention is introduced across three settings at staggered times. What does this show?",
        choices: ["Experimental control", "Measurement drift", "A history threat only", "No functional relation"],
        answer: "Experimental control",
        explanation:
          "Staggered behavior change across tiers supports a functional relation in a multiple baseline design.",
      },
      {
        type: "fill-blank",
        prompt: "Complete the cue: IV is changed by the analyst; DV is the behavior being ____.",
        answer: "measured",
        explanation:
          "The dependent variable is the measured behavior that may change as a function of the independent variable.",
      },
    ],
  },
  e: {
    miniLessons: sectionEMiniLessons,
    practiceQuestions: [
      {
        type: "scenario",
        prompt:
          "A BCBA is asked to treat a behavior outside their training and experience. What should they do first?",
        choices: [
          "Seek supervision, training, or refer as appropriate.",
          "Accept because all behavior plans are similar.",
          "Use a procedure from social media.",
          "Proceed if the family signs a form.",
        ],
        answer: "Seek supervision, training, or refer as appropriate.",
        explanation:
          "Maintaining competence means practicing within training and obtaining support or referrals when needed.",
      },
      {
        type: "select-all",
        prompt: "Select actions that support confidentiality.",
        choices: [
          "Use minimum necessary disclosure.",
          "Share information only with authorization or legal permission.",
          "Protect identifying details in documentation.",
          "Discuss cases in public if names are removed.",
        ],
        answers: [
          "Use minimum necessary disclosure.",
          "Share information only with authorization or legal permission.",
          "Protect identifying details in documentation.",
        ],
        answer: "Minimum necessary, authorized sharing, and protected identifying details",
        explanation:
          "Confidentiality includes protecting identifying information and limiting disclosure.",
      },
      {
        type: "fill-blank",
        prompt: "Complete the cue: Cultural humility requires ongoing self-____.",
        answer: "reflection",
        explanation:
          "Cultural humility involves ongoing self-reflection, learning, and responsiveness to the client context.",
      },
    ],
    masteryQuestions: [
      {
        prompt:
          "A BCBA advertises guaranteed outcomes for every learner. What is the ethical concern?",
        choices: [
          "The public statement may be misleading.",
          "The statement is required for informed consent.",
          "The statement improves analytic control.",
          "The statement is acceptable if prices are listed.",
        ],
        answer: "The public statement may be misleading.",
        explanation:
          "Public statements must be accurate and not misleading; guaranteed outcomes are not appropriate.",
      },
      {
        type: "scenario",
        prompt:
          "A dual relationship could impair objectivity. Which action best protects the client?",
        choices: [
          "Identify the risk and manage or avoid the multiple relationship.",
          "Continue without documentation.",
          "Ask the client to ignore the issue.",
          "Use less data so the relationship feels natural.",
        ],
        answer:
          "Identify the risk and manage or avoid the multiple relationship.",
        explanation:
          "Multiple relationships require careful management because they can impair objectivity and client welfare.",
      },
      {
        type: "matching",
        prompt: "Match each ethics term to its cue.",
        pairs: [
          { term: "Competence", definition: "Practice within training and experience." },
          { term: "Confidentiality", definition: "Protect identifying information." },
          { term: "Cultural humility", definition: "Ongoing self-reflection and responsiveness." },
        ],
        answer: "All ethics terms matched correctly",
        explanation:
          "These cues help discriminate common ethics concepts on exam scenarios.",
      },
    ],
  },
  f: {
    miniLessons: sectionFMiniLessons,
    practiceQuestions: [
      {
        type: "scenario",
        prompt:
          "A BCBA interviews caregivers and reviews records before observing behavior. What type of assessment information is being gathered first?",
        choices: ["Indirect assessment", "Functional analysis", "Continuous measurement", "Treatment integrity"],
        answer: "Indirect assessment",
        explanation:
          "Interviews and record reviews are indirect sources because they do not directly observe behavior as it occurs.",
      },
      {
        type: "matching",
        prompt: "Match the function cue to the maintaining reinforcer.",
        pairs: [
          { term: "Attention", definition: "Social interaction follows behavior." },
          { term: "Escape", definition: "Demands are removed or delayed." },
          { term: "Tangible", definition: "Access to items or activities follows behavior." },
          { term: "Automatic", definition: "Sensory consequences are produced directly." },
        ],
        answer: "All functions matched correctly",
        explanation:
          "Behavioral function is identified by the maintaining consequence, not by response topography alone.",
      },
      {
        type: "sorting",
        prompt: "Sort the assessment examples.",
        categories: ["Preference assessment", "Functional analysis"],
        items: [
          { label: "MSWO array", category: "Preference assessment" },
          { label: "Paired stimulus choices", category: "Preference assessment" },
          { label: "Attention condition", category: "Functional analysis" },
          { label: "Escape condition", category: "Functional analysis" },
        ],
        answer: "All assessment examples sorted correctly",
        explanation:
          "Preference assessments identify likely reinforcers; functional analysis tests behavioral function.",
      },
    ],
    masteryQuestions: [
      {
        prompt:
          "Which statement best distinguishes descriptive assessment from functional analysis?",
        choices: [
          "Descriptive assessment observes natural events; functional analysis manipulates conditions.",
          "Descriptive assessment proves function; functional analysis only interviews caregivers.",
          "Descriptive assessment is always direct; functional analysis is always indirect.",
          "Descriptive assessment replaces the need for data.",
        ],
        answer:
          "Descriptive assessment observes natural events; functional analysis manipulates conditions.",
        explanation:
          "Descriptive assessment can show correlations. Functional analysis experimentally tests function.",
      },
      {
        type: "scenario",
        prompt:
          "A learner repeatedly selects the same item during MSWO, then responses increase when that item follows behavior. What has been shown?",
        choices: [
          "The item may be a reinforcer because it increased behavior.",
          "Preference alone proves reinforcement.",
          "The item is an SD.",
          "The item is a punisher because it was selected.",
        ],
        answer: "The item may be a reinforcer because it increased behavior.",
        explanation:
          "Preference assessment identifies candidates; a reinforcer is demonstrated by increased responding.",
      },
      {
        type: "fill-blank",
        prompt: "Complete the cue: Functional analysis tests function by manipulating ____.",
        answer: "conditions",
        explanation:
          "Functional analysis manipulates antecedent and consequence conditions to test behavioral function.",
      },
    ],
  },
  g: {
    miniLessons: sectionGMiniLessons,
    practiceQuestions: [
      {
        type: "matching",
        prompt: "Match each differential reinforcement procedure to its cue.",
        pairs: [
          { term: "DRA", definition: "Alternative behavior reinforced." },
          { term: "DRI", definition: "Incompatible behavior reinforced." },
          { term: "DRO", definition: "Absence of target behavior reinforced." },
          { term: "DRL", definition: "Lower rate reinforced." },
          { term: "DRH", definition: "Higher rate reinforced." },
        ],
        answer: "All differential reinforcement procedures matched correctly",
        explanation:
          "The key discrimination is what response pattern contacts reinforcement.",
      },
      {
        type: "scenario",
        prompt:
          "A learner receives reinforcement for asking for help instead of tearing worksheets. Which procedure is most precise?",
        choices: ["DRA", "DRO", "DRL", "DRH"],
        answer: "DRA",
        explanation:
          "An alternative behavior, asking for help, produces reinforcement.",
      },
      {
        type: "sorting",
        prompt: "Sort shaping and chaining examples.",
        categories: ["Shaping", "Chaining"],
        items: [
          { label: "Reinforce closer approximations of a word", category: "Shaping" },
          { label: "Teach steps of handwashing", category: "Chaining" },
          { label: "Gradually require clearer articulation", category: "Shaping" },
          { label: "Link task-analysis steps", category: "Chaining" },
        ],
        answer: "All examples sorted correctly",
        explanation:
          "Shaping changes one response form; chaining links multiple responses in a sequence.",
      },
    ],
    masteryQuestions: [
      {
        prompt:
          "Which definition is correct for DRO?",
        choices: [
          "Reinforcement is given contingent upon the absence of the target behavior.",
          "Reinforcement is given for an incompatible behavior.",
          "Reinforcement is given when rates are higher than criterion.",
          "Reinforcement is given for any prompted response.",
        ],
        answer:
          "Reinforcement is given contingent upon the absence of the target behavior.",
        explanation:
          "DRO reinforces the absence of the target behavior for a specified interval or moment.",
      },
      {
        type: "scenario",
        prompt:
          "A prompt is gradually reduced until the learner responds to the natural SD. What procedure is this?",
        choices: ["Prompt fading", "Response cost", "DRO", "Functional analysis"],
        answer: "Prompt fading",
        explanation:
          "Prompt fading transfers stimulus control from the prompt to the natural SD.",
      },
      {
        type: "fill-blank",
        prompt: "Complete the cue: Shaping reinforces successive ____.",
        answer: "approximations",
        explanation:
          "Shaping reinforces successive approximations toward a terminal response.",
      },
    ],
  },
  h: {
    miniLessons: sectionHMiniLessons,
    practiceQuestions: [
      {
        type: "scenario",
        prompt:
          "A behavior is maintained by escape. The BCBA teaches a break mand and reinforces it immediately. What principle guides this plan?",
        choices: ["Function-based intervention", "Noncontingent punishment", "Indirect measurement", "Multiple baseline"],
        answer: "Function-based intervention",
        explanation:
          "The alternative behavior accesses the same functional reinforcer as the problem behavior.",
      },
      {
        type: "select-all",
        prompt: "Select features of a strong replacement behavior.",
        choices: [
          "Efficient",
          "Effective",
          "Acceptable",
          "Harder than problem behavior",
        ],
        answers: ["Efficient", "Effective", "Acceptable"],
        answer: "Efficient, effective, and acceptable",
        explanation:
          "Replacement behavior should be easier and contact reinforcement reliably, especially early in intervention.",
      },
      {
        type: "matching",
        prompt: "Match implementation terms to their cues.",
        pairs: [
          { term: "Treatment integrity", definition: "Plan implemented as written." },
          { term: "Effectiveness", definition: "Behavior changes meaningfully." },
          { term: "Relapse planning", definition: "Prepare for recurrence of behavior." },
        ],
        answer: "All implementation terms matched correctly",
        explanation:
          "Data-based decisions require knowing whether the plan was implemented and whether behavior improved.",
      },
    ],
    masteryQuestions: [
      {
        prompt:
          "A replacement behavior should usually produce which consequence?",
        choices: [
          "The same functional reinforcer maintaining problem behavior",
          "A completely unrelated reinforcer",
          "Punishment for the problem behavior only",
          "No reinforcement until mastery",
        ],
        answer: "The same functional reinforcer maintaining problem behavior",
        explanation:
          "Functionally equivalent replacement behavior competes with problem behavior by accessing the same reinforcer.",
      },
      {
        type: "scenario",
        prompt:
          "Data show no improvement, and integrity data show staff implemented only half the procedure. What should be addressed first?",
        choices: ["Treatment integrity", "Changing the definition of mastery", "Ignoring the data", "Removing all reinforcement"],
        answer: "Treatment integrity",
        explanation:
          "If implementation is weak, effectiveness data may not reflect the procedure as designed.",
      },
      {
        type: "fill-blank",
        prompt: "Complete the cue: Integrity asks whether the intervention was implemented as ____.",
        answer: "planned",
        explanation:
          "Treatment integrity measures whether procedures were implemented as planned or written.",
      },
    ],
  },
  i: {
    miniLessons: sectionIMiniLessons,
    practiceQuestions: [
      {
        type: "matching",
        prompt: "Match BST components to their cues.",
        pairs: [
          { term: "Instructions", definition: "Tell what to do." },
          { term: "Modeling", definition: "Show what to do." },
          { term: "Rehearsal", definition: "Practice the skill." },
          { term: "Feedback", definition: "Describe correct and incorrect performance." },
        ],
        answer: "All BST components matched correctly",
        explanation:
          "BST is active training with instructions, modeling, rehearsal, and feedback.",
      },
      {
        type: "scenario",
        prompt:
          "A supervisee knows how to run preference assessments but does not do them because materials are unavailable. What is the best cue?",
        choices: ["Performance deficit", "Skill deficit", "Respondent extinction", "Negative punishment"],
        answer: "Performance deficit",
        explanation:
          "The supervisee can perform the skill, but environmental conditions interfere with performance.",
      },
      {
        type: "sorting",
        prompt: "Sort each support by deficit type.",
        categories: ["Skill deficit", "Performance deficit"],
        items: [
          { label: "Model the procedure", category: "Skill deficit" },
          { label: "Arrange materials before session", category: "Performance deficit" },
          { label: "Rehearse with feedback", category: "Skill deficit" },
          { label: "Add prompts in the work setting", category: "Performance deficit" },
        ],
        answer: "All supervision supports sorted correctly",
        explanation:
          "Skill deficits need training. Performance deficits need antecedent and consequence supports.",
      },
    ],
    masteryQuestions: [
      {
        prompt: "Which sequence best represents behavioral skills training?",
        choices: [
          "Instructions, modeling, rehearsal, feedback",
          "Interview, diagnosis, insight, discharge",
          "Baseline, reversal, withdrawal, maintenance",
          "Prompting, extinction, punishment, fading",
        ],
        answer: "Instructions, modeling, rehearsal, feedback",
        explanation:
          "BST uses instructions, modeling, rehearsal, and feedback to build performance.",
      },
      {
        type: "scenario",
        prompt:
          "A supervisor observes implementation, graphs performance data, and changes supports based on results. What is being evaluated?",
        choices: ["Supervision efficacy", "A preference assessment", "Stimulus equivalence", "Respondent conditioning"],
        answer: "Supervision efficacy",
        explanation:
          "Supervision should be evaluated with data on supervisee performance and client-related outcomes when relevant.",
      },
      {
        type: "fill-blank",
        prompt: "Complete the cue: Function-based supervision analyzes antecedents and ____ for supervisee behavior.",
        answer: "consequences",
        explanation:
          "Function-based supervision uses behavior-environment relations to improve supervisee performance.",
      },
    ],
  },
};

export function getModuleContent(sectionSlug: string) {
  return moduleContent[sectionSlug] ?? {
    miniLessons: [],
    practiceQuestions: [],
    masteryQuestions: [],
  };
}
