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

function replaceSortingPracticeQuestions(questions: QuestionContent[]) {
  return questions.map((question) => {
    if (question.type !== "sorting" || !question.items?.length) {
      return question;
    }

    return {
      type: "matching" as const,
      prompt: "Match each item to the correct category.",
      pairs: question.items.map((item) => ({
        term: item.label,
        definition: item.category,
      })),
      answer: question.answer,
      explanation: question.explanation,
    };
  });
}

const sectionAMiniLessons: MiniLessonContent[] = [
  {
    slug: "what-is-behavior-analysis",
    label: "A1",
    title: "What Is Behavior Analysis?",
    body: [
      "Behavior analysis studies [behavior-environment relations].",
      "Its goals are description, prediction, and control.",
    ],
    visual: {
      type: "choice",
      prompt: "Which statement best reflects behavior analysis?",
      choices: [
        "Behavior is studied in relation to environmental events.",
        "Behavior is explained by personality traits first.",
        "Behavior is understood mainly through diagnostic labels.",
        "Behavior changes are assumed without measurement.",
      ],
      answer: "Behavior is studied in relation to environmental events.",
      hint:
        "Look for observable behavior and its relation to environmental variables.",
      feedback:
        "Behavior analysis focuses on [relations between behavior and environment].",
    },
  },
  {
    slug: "prediction-vs-control",
    label: "A2",
    title: "Prediction vs Control",
    body: [
      "Prediction means behavior reliably changes with [other events].",
      "Control means manipulating a variable produces [behavior change].",
    ],
    visual: {
      type: "matching",
      prompt: "Match each goal to its discrimination cue.",
      pairs: [
        { term: "Description", definition: "Measures what behavior occurs." },
        { term: "Prediction", definition: "Shows behavior covaries with another event." },
        { term: "Control", definition: "Shows behavior changes when a variable is manipulated." },
      ],
    },
  },
  {
    slug: "determinism",
    label: "A3",
    title: "Determinism",
    body: [
      "Determinism assumes behavior is [lawful].",
      "Behavior is not treated as random or uncaused.",
    ],
    visual: {
      type: "choice",
      prompt: "Which statement best reflects determinism?",
      choices: [
        "Behavior occurs in lawful relations with variables.",
        "Behavior is random until a diagnosis is assigned.",
        "Behavior is caused only by internal traits.",
        "Behavior should be explained without environmental variables.",
      ],
      answer: "Behavior occurs in lawful relations with variables.",
      hint:
        "Determinism asks whether behavior has orderly relations rather than random causes.",
      feedback:
        "Determinism means behavior is [lawful] and can be studied scientifically.",
    },
  },
  {
    slug: "selectionism",
    label: "A4",
    title: "Selectionism",
    body: [
      "Selectionism explains behavior through [selection by consequences across history].",
      "Responses that contact effective consequences become more likely.",
    ],
    visual: {
      type: "fill-blank",
      prompt: "Complete the selectionism cue.",
      sentence: "Selectionism emphasizes selection by ____ across history.",
      answer: "consequences",
      feedback:
        "Selectionism emphasizes [selection by consequences] across phylogenic, ontogenic, and cultural histories.",
    },
  },
  {
    slug: "empiricism",
    label: "A5",
    title: "Empiricism",
    body: [
      "Empiricism relies on [objective observation and data].",
      "It protects decision-making from opinion alone.",
    ],
    visual: {
      type: "choice",
      prompt: "Which action best reflects empiricism?",
      choices: [
        "Collect direct data before changing a treatment decision.",
        "Assume the intervention works because it sounds reasonable.",
        "Use the most complex explanation first.",
        "Ignore observation when caregiver reports are available.",
      ],
      answer: "Collect direct data before changing a treatment decision.",
      hint:
        "Empiricism is about objective observation and data-based decisions.",
      feedback:
        "Empiricism means conclusions are based on [objective observation and data].",
    },
  },
  {
    slug: "parsimony",
    label: "A6",
    title: "Parsimony",
    body: [
      "Parsimony starts with [the simplest adequate explanation].",
      "Complex explanations are considered only when simpler ones are insufficient.",
    ],
    visual: {
      type: "choice",
      prompt: "Which statement best reflects parsimony?",
      choices: [
        "Check simple environmental explanations before complex ones.",
        "Choose the explanation with the most technical words.",
        "Use mentalistic explanations before observing contingencies.",
        "Avoid revising explanations after new data appear.",
      ],
      answer: "Check simple environmental explanations before complex ones.",
      hint:
        "Parsimony means the simplest explanation that adequately fits the facts.",
      feedback:
        "Parsimony means beginning with [the simplest adequate explanation].",
    },
  },
  {
    slug: "pragmatism",
    label: "A7",
    title: "Pragmatism",
    body: [
      "Pragmatism asks whether an explanation [works in practice].",
      "Useful explanations help prediction and effective action.",
    ],
    visual: {
      type: "true-false",
      prompt: "Pragmatism check",
      statement:
        "A pragmatic explanation is useful when it helps prediction, action, and effective behavior change.",
      answer: true,
      feedback:
        "Pragmatism evaluates whether an explanation is [useful for effective action].",
    },
  },
  {
    slug: "radical-behaviorism",
    label: "A8",
    title: "Radical Behaviorism",
    body: [
      "Radical behaviorism analyzes [public behavior and private events].",
      "It keeps explanation within behavior-environment relations.",
    ],
    visual: {
      type: "choice",
      prompt: "Which statement best reflects radical behaviorism?",
      choices: [
        "Private events can be analyzed as behavior.",
        "Private events should be ignored because they are not real.",
        "Only public behavior belongs in behavior analysis.",
        "Thoughts explain behavior outside environmental relations.",
      ],
      answer: "Private events can be analyzed as behavior.",
      hint:
        "Radical behaviorism includes private events, but does not treat them as nonbehavioral causes.",
      feedback:
        "Radical behaviorism includes [private events] as behavior to be explained.",
    },
  },
  {
    slug: "private-events",
    label: "A9",
    title: "Private Events",
    body: [
      "Private events are [accessible mainly to the person experiencing them].",
      "They are behavior to be explained, not explanatory shortcuts.",
    ],
    visual: {
      type: "matching",
      prompt: "Match each event to its access cue.",
      pairs: [
        { term: "Public behavior", definition: "Observable by others." },
        { term: "Private event", definition: "Accessible mainly to the person." },
        { term: "Behavior-analytic explanation", definition: "Stays within behavior-environment relations." },
      ],
    },
  },
  {
    slug: "mentalism-vs-behaviorism",
    label: "A10",
    title: "Mentalism vs Behaviorism",
    body: [
      "Mentalism explains behavior by [hypothetical inner causes].",
      "Behaviorism explains behavior through [behavior-environment relations].",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each statement by explanatory style.",
      categories: ["Mentalism", "Behaviorism"],
      items: [
        { label: "He aggressed because of an inner drive.", category: "Mentalism" },
        { label: "Aggression contacted escape from demands.", category: "Behaviorism" },
        { label: "She completed work after reinforcement increased.", category: "Behaviorism" },
        { label: "She completed work because of willpower.", category: "Mentalism" },
      ],
    },
  },
  {
    slug: "experimental-analysis-of-behavior",
    label: "A11",
    title: "Experimental Analysis of Behavior (EAB)",
    body: [
      "EAB is the [basic research] branch of behavior analysis.",
      "It identifies principles under controlled conditions.",
    ],
    visual: {
      type: "choice",
      prompt: "Which activity best represents EAB?",
      choices: [
        "Studying schedules of reinforcement in a laboratory preparation.",
        "Writing an insurance-funded treatment plan.",
        "Training caregivers to implement a home program.",
        "Selecting a socially significant school goal.",
      ],
      answer: "Studying schedules of reinforcement in a laboratory preparation.",
      hint:
        "EAB is basic research on behavioral principles, not service delivery.",
      feedback:
        "EAB studies [basic behavioral principles] under controlled conditions.",
    },
  },
  {
    slug: "applied-behavior-analysis",
    label: "A12",
    title: "Applied Behavior Analysis (ABA)",
    body: [
      "Applied Behavior Analysis (ABA) applies behavioral principles to [socially significant behavior].",
      "ABA is analytic, data-based, and intervention-focused.",
    ],
    visual: {
      type: "choice",
      prompt: "Which example best represents ABA?",
      choices: [
        "Using reinforcement procedures to increase functional communication at school.",
        "Studying behavior principles without an applied goal.",
        "Explaining behavior with a personality label.",
        "Describing behavior without measuring change.",
      ],
      answer:
        "Using reinforcement procedures to increase functional communication at school.",
      hint:
        "ABA applies principles to socially significant behavior and measures behavior change.",
      feedback:
        "ABA applies behavior principles to [socially significant behavior].",
    },
  },
  {
    slug: "dimensions-of-aba",
    label: "A13",
    title: "What Are the 7 Dimensions of ABA?",
    body: [
      "The 7 dimensions define [high-quality ABA practice].",
      "They help distinguish behavior-analytic work from vague intervention claims.",
    ],
    visual: {
      type: "select-all",
      prompt: "Select ABA dimensions.",
      choices: [
        { label: "Applied", correct: true },
        { label: "Behavioral", correct: true },
        { label: "Analytic", correct: true },
        { label: "Speculative", correct: false },
      ],
      feedback:
        "ABA is applied, behavioral, analytic, technological, conceptually systematic, effective, and generality-focused.",
    },
  },
  {
    slug: "applied-dimension",
    label: "A14",
    title: "Applied",
    body: [
      "Applied means the target has [social importance].",
      "Exam trap: an intervention can be measured well but still target a trivial behavior.",
    ],
    visual: {
      type: "choice",
      prompt: "Which example best reflects the applied dimension?",
      choices: [
        "Teaching safe street crossing because it increases independence.",
        "Measuring pencil taps because they are easy to count.",
        "Using a graph to show experimental control.",
        "Writing procedures in replicable detail.",
      ],
      answer: "Teaching safe street crossing because it increases independence.",
      hint:
        "Applied is about whether the behavior matters in the person's life.",
      feedback:
        "Applied means the behavior is [socially significant] for the learner or stakeholders.",
    },
  },
  {
    slug: "behavioral-dimension",
    label: "A15",
    title: "Behavioral",
    body: [
      "Behavioral means the target is [observable and measurable behavior].",
      "Exam trap: an important goal is not behavioral unless the response is defined.",
    ],
    visual: {
      type: "choice",
      prompt: "Which target best meets the behavioral dimension?",
      choices: [
        "Initiates a mand by saying, signing, or selecting a picture within 5 seconds.",
        "Becomes more confident during group work.",
        "Improves attitude toward peers.",
        "Understands classroom routines.",
      ],
      answer:
        "Initiates a mand by saying, signing, or selecting a picture within 5 seconds.",
      hint:
        "Behavioral requires observable and measurable responding, not a broad internal state.",
      feedback:
        "Behavioral means the target is [observable and measurable].",
    },
  },
  {
    slug: "analytic-dimension",
    label: "A16",
    title: "Analytic",
    body: [
      "Analytic means data show [experimental control].",
      "The analyst demonstrates that the intervention, not chance, produced behavior change.",
    ],
    visual: {
      type: "choice",
      prompt: "Which statement best reflects the analytic dimension?",
      choices: [
        "Behavior changes when the intervention is introduced and replicates across phases.",
        "The behavior is important to the family.",
        "The procedure is written in detailed steps.",
        "The intervention produced a small but noticeable change.",
      ],
      answer:
        "Behavior changes when the intervention is introduced and replicates across phases.",
      hint:
        "Analytic is about demonstrating a functional relation or experimental control.",
      feedback:
        "Analytic means data demonstrate [experimental control] over behavior.",
    },
  },
  {
    slug: "technological-dimension",
    label: "A17",
    title: "Technological",
    body: [
      "Technological means procedures are [clear enough to replicate].",
      "A reader should know exactly what to do.",
    ],
    visual: {
      type: "select-all",
      prompt: "Select statements that show a technological procedure.",
      choices: [
        { label: "The protocol specifies the prompt, response, consequence, and timing.", correct: true },
        { label: "A second therapist can implement it from the written description.", correct: true },
        { label: "The behavior is important to the learner.", correct: false },
        { label: "The procedure is based on reinforcement principles.", correct: false },
      ],
      feedback:
        "Technological means procedures are [complete and replicable].",
    },
  },
  {
    slug: "conceptually-systematic-dimension",
    label: "A18",
    title: "Conceptually Systematic",
    body: [
      "Conceptually systematic means procedures are linked to [behavior-analytic principles].",
      "Exam trap: a procedure can be technological but not conceptually systematic if no principle is identified.",
    ],
    visual: {
      type: "choice",
      prompt: "Which statement best shows conceptually systematic practice?",
      choices: [
        "The plan uses differential reinforcement and explains how reinforcement changes future responding.",
        "The plan says to use the worksheet because it is popular.",
        "The plan lists steps but no behavioral principle.",
        "The plan targets a socially important behavior.",
      ],
      answer:
        "The plan uses differential reinforcement and explains how reinforcement changes future responding.",
      hint:
        "Conceptually systematic asks whether procedures are tied to behavior-analytic principles.",
      feedback:
        "Conceptually systematic means the procedure is linked to [behavior-analytic principles].",
    },
  },
  {
    slug: "effective-dimension",
    label: "A19",
    title: "Effective",
    body: [
      "Effective means behavior change is [large enough to matter].",
      "A statistically neat change is not enough if it does not improve the learner's life.",
    ],
    visual: {
      type: "choice",
      prompt: "Which example best reflects effective intervention?",
      choices: [
        "Tantrums decrease from 15 per day to 1 per week and family routines improve.",
        "Tantrums decrease from 15 per day to 14 per day.",
        "The procedure is written clearly.",
        "The skill occurs with a new teacher after training.",
      ],
      answer:
        "Tantrums decrease from 15 per day to 1 per week and family routines improve.",
      hint:
        "Effective asks whether the behavior change is meaningful in size or practical value.",
      feedback:
        "Effective means behavior change is [meaningful and practical].",
    },
  },
  {
    slug: "generality-dimension",
    label: "A20",
    title: "Generality",
    body: [
      "Generality means behavior change [maintains or transfers].",
      "It can occur across time, settings, people, or related behaviors.",
    ],
    visual: {
      type: "choice",
      prompt: "Which example best reflects generality?",
      choices: [
        "A learner uses the skill at school, home, and with a new caregiver.",
        "The skill improves only during teaching sessions.",
        "The target behavior is socially important.",
        "The protocol is detailed enough to replicate.",
      ],
      answer:
        "A learner uses the skill at school, home, and with a new caregiver.",
      hint:
        "Generality asks whether behavior change extends beyond the original teaching condition.",
      feedback:
        "Generality means behavior change [maintains or transfers across conditions].",
    },
  },
  {
    slug: "applied-vs-behavioral",
    label: "A21",
    title: "Applied vs Behavioral",
    body: [
      "Applied means the goal is [socially significant].",
      "Behavioral means the target is [observable and measurable behavior].",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Applied",
      leftText: "Socially significant goal",
      rightTitle: "Behavioral",
      rightText: "Observable and measurable target",
      cue: "Applied = why the target matters. Behavioral = what is measured.",
    },
  },
  {
    slug: "analytic-vs-technological",
    label: "A22",
    title: "Analytic vs Technological",
    body: [
      "Analytic means data show [experimental control].",
      "Technological means procedures are [clear enough to replicate].",
    ],
    visual: {
      type: "matching",
      prompt: "Match each dimension to its cue.",
      pairs: [
        { term: "Analytic", definition: "Data demonstrate experimental control." },
        { term: "Technological", definition: "Procedures are clear enough to replicate." },
        { term: "Applied", definition: "The target behavior is socially significant." },
      ],
    },
  },
  {
    slug: "technological-vs-conceptually-systematic",
    label: "A23",
    title: "Technological vs Conceptually Systematic",
    body: [
      "Technological asks whether procedures are [replicable].",
      "Conceptually systematic asks whether procedures are [principle-based].",
    ],
    visual: {
      type: "matching",
      prompt: "Match each dimension to its discrimination cue.",
      pairs: [
        { term: "Technological", definition: "Procedure is clear enough to replicate." },
        { term: "Conceptually systematic", definition: "Procedure is linked to behavior-analytic principles." },
      ],
    },
  },
  {
    slug: "effective-vs-generality",
    label: "A24",
    title: "Effective vs Generality",
    body: [
      "Effective means behavior change is [large enough to matter].",
      "Generality means behavior change [maintains or transfers].",
    ],
    visual: {
      type: "choice",
      prompt: "A skill maintains after intervention ends and occurs at home. Which dimension is most directly shown?",
      choices: ["Generality", "Effective", "Analytic", "Behavioral"],
      answer: "Generality",
      hint:
        "Focus on whether behavior change lasts or transfers beyond the original setting.",
      feedback:
        "Generality means behavior change [maintains over time or transfers across conditions].",
    },
  },
  {
    slug: "dimension-discrimination-practice",
    label: "A25",
    title: "Dimension Discrimination Practice",
    body: [
      "Dimension questions often use similar wording.",
      "Ask what the example is testing: importance, measurement, control, replication, principle, magnitude, or transfer.",
    ],
    visual: {
      type: "matching",
      prompt: "Match each dimension to the fastest discrimination cue.",
      pairs: [
        { term: "Applied", definition: "Social significance." },
        { term: "Behavioral", definition: "Observable and measurable behavior." },
        { term: "Analytic", definition: "Experimental control." },
        { term: "Generality", definition: "Maintenance or transfer." },
      ],
    },
  },
];

const sectionCExpandedMiniLessons: MiniLessonContent[] = [
  {
    slug: "operational-definitions-and-measurement",
    label: "C1",
    title: "Operational Definitions and Measurement",
    body: [
      "An operational definition describes behavior in [observable and measurable terms].",
      "Measurement starts by saying exactly what counts and what does not count.",
    ],
    visual: {
      type: "example",
      example: "Counts: hand contacts peer with force during instruction.",
      nonexample: "Does not count: being aggressive or upset.",
    },
  },
  {
    slug: "direct-indirect-permanent-product",
    label: "C2",
    title: "Direct, Indirect, and Permanent Product Measurement",
    body: [
      "Direct measurement observes [the behavior as it occurs].",
      "Permanent product measurement records [a lasting outcome behavior leaves behind].",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort the measurement examples.",
      categories: ["Direct measure", "Permanent product"],
      items: [
        { label: "Count hand raises during class", category: "Direct measure" },
        { label: "Score completed math problems after class", category: "Permanent product" },
        { label: "Time how long crying lasts", category: "Direct measure" },
        { label: "Count worksheets turned in", category: "Permanent product" },
      ],
    },
  },
  {
    slug: "frequency-rate-duration",
    label: "C3",
    title: "Frequency, Rate, and Duration",
    body: [
      "Frequency counts [how many responses occurred].",
      "Rate adds [time] to the count; Duration measures [how long behavior lasts].",
    ],
    visual: {
      type: "matching",
      prompt: "Match each continuous measure to its cue.",
      pairs: [
        { term: "Frequency", definition: "Number of responses." },
        { term: "Rate", definition: "Responses per unit of time." },
        { term: "Duration", definition: "How long behavior lasts." },
      ],
    },
  },
  {
    slug: "latency-vs-irt",
    label: "C4",
    title: "Latency vs IRT",
    body: [
      "Latency measures [time from stimulus to response].",
      "Interresponse time (IRT) measures [time between two responses].",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Latency",
      leftText: "Instruction -> time -> first response",
      rightTitle: "IRT",
      rightText: "Response -> time -> next response",
      cue: "Latency starts after an antecedent. IRT starts after a response.",
    },
  },
  {
    slug: "continuous-measurement-procedures",
    label: "C5",
    title: "Continuous Measurement Procedures",
    body: [
      "Continuous measurement attempts to capture [every response or response dimension].",
      "Use it when the response can be counted or timed accurately.",
    ],
    visual: {
      type: "select-all",
      prompt: "Select continuous measurement procedures.",
      choices: [
        { label: "Frequency", correct: true },
        { label: "Duration", correct: true },
        { label: "Latency", correct: true },
        { label: "Partial interval recording", correct: false },
      ],
      feedback:
        "Frequency, duration, latency, and IRT are continuous measures. Interval recording samples behavior.",
    },
  },
  {
    slug: "discontinuous-measurement-procedures",
    label: "C6",
    title: "Discontinuous Measurement Procedures",
    body: [
      "Discontinuous measurement samples behavior during [observation intervals].",
      "It may overestimate or underestimate behavior depending on the procedure.",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Whole interval",
      leftText: "Behavior must occur for the entire interval",
      rightTitle: "Partial interval",
      rightText: "Behavior occurs at any time during the interval",
      cue: "Whole interval can underestimate. Partial interval can overestimate.",
    },
  },
  {
    slug: "momentary-time-sampling",
    label: "C7",
    title: "Momentary Time Sampling",
    body: [
      "Momentary time sampling records whether behavior occurs [at the instant the interval ends].",
      "It is useful when continuous observation is impractical.",
    ],
    visual: {
      type: "choice",
      prompt:
        "A timer beeps every 2 minutes, and the observer records whether the learner is on task at that exact moment. Which procedure is used?",
      choices: ["Momentary time sampling", "Whole interval recording", "Partial interval recording", "Frequency"],
      answer: "Momentary time sampling",
      hint:
        "Look for recording only at a specific moment, not throughout the whole interval.",
      feedback:
        "Momentary time sampling scores behavior only at the observation moment.",
    },
  },
  {
    slug: "trial-by-trial-recording",
    label: "C8",
    title: "Trial-by-Trial Recording",
    body: [
      "Trial-by-trial recording scores [whether each teaching trial is correct or incorrect].",
      "It is common for discrete trial instruction and skill acquisition data.",
    ],
    visual: {
      type: "flow",
      prompt: "Put the trial-by-trial data path in order.",
      steps: ["Present trial", "Record response accuracy", "Calculate percent correct"],
      feedback:
        "Trial-by-trial recording tracks performance across individual teaching opportunities.",
    },
  },
  {
    slug: "percentage-and-ratio",
    label: "C9",
    title: "Percentage and Ratio Measures",
    body: [
      "Percentage shows [part divided by whole times 100].",
      "Ratio compares [one quantity to another quantity].",
    ],
    visual: {
      type: "fill-blank",
      prompt: "Complete the percentage formula.",
      sentence: "Percentage = number correct divided by total opportunities times ____.",
      answer: "100",
      feedback:
        "Percentage converts part-to-whole performance into a value out of 100.",
    },
  },
  {
    slug: "ioa-purpose",
    label: "C10",
    title: "Interobserver Agreement (IOA)",
    body: [
      "Interobserver agreement (IOA) compares [two observers' records of the same event].",
      "High IOA supports confidence in measurement, but it does not prove validity.",
    ],
    visual: {
      type: "choice",
      prompt: "What is the best reason to collect IOA?",
      choices: [
        "To evaluate consistency between observers",
        "To prove the intervention caused behavior change",
        "To replace operational definitions",
        "To show generalization occurred",
      ],
      answer: "To evaluate consistency between observers",
      hint: "IOA is about agreement in measurement, not experimental control.",
      feedback:
        "IOA evaluates consistency between observers' data records.",
    },
  },
  {
    slug: "count-ioa",
    label: "C11",
    title: "Count IOA: Total, Exact, and Mean Count-per-Interval",
    body: [
      "Total count IOA compares [overall counts].",
      "Exact count-per-interval IOA requires [the same count in each interval].",
    ],
    visual: {
      type: "matching",
      prompt: "Match each count IOA method to its cue.",
      pairs: [
        { term: "Total count IOA", definition: "Smaller total count divided by larger total count." },
        { term: "Exact count-per-interval IOA", definition: "Intervals with identical counts divided by total intervals." },
        { term: "Mean count-per-interval IOA", definition: "Average agreement across intervals." },
      ],
    },
  },
  {
    slug: "duration-ioa",
    label: "C12",
    title: "Duration IOA",
    body: [
      "Total duration IOA compares [total time recorded by each observer].",
      "Mean duration-per-occurrence IOA compares [duration agreement for each occurrence].",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Total duration IOA",
      leftText: "Total shorter duration / total longer duration",
      rightTitle: "Mean duration IOA",
      rightText: "Agreement for each occurrence, then averaged",
      cue: "Use duration IOA when the response dimension is time.",
    },
  },
  {
    slug: "trial-by-trial-ioa",
    label: "C13",
    title: "Trial-by-Trial IOA",
    body: [
      "Trial-by-trial IOA compares observer agreement [for each trial].",
      "It fits discrete opportunities such as correct or incorrect teaching trials.",
    ],
    visual: {
      type: "fill-blank",
      prompt: "Complete the IOA cue.",
      sentence: "Trial-by-trial IOA divides agreements by total ____.",
      answer: "trials",
      feedback:
        "Trial-by-trial IOA compares observer records across individual trials.",
    },
  },
  {
    slug: "graph-types",
    label: "C14",
    title: "Graph Types and Data Display",
    body: [
      "Line graphs show [behavior over time].",
      "Bar graphs compare [summaries across conditions or categories].",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each display by its best use.",
      categories: ["Line graph", "Bar graph"],
      items: [
        { label: "Daily rate of aggression across sessions", category: "Line graph" },
        { label: "Total responses by setting", category: "Bar graph" },
        { label: "Duration across baseline and intervention sessions", category: "Line graph" },
        { label: "Average score for three groups", category: "Bar graph" },
      ],
    },
  },
  {
    slug: "visual-analysis-level-trend-variability",
    label: "C15",
    title: "Level, Trend, and Variability",
    body: [
      "Level asks [how high or low] data are.",
      "Trend asks [direction]; variability asks [how much data fluctuate].",
    ],
    visual: {
      type: "graph",
      graphId: "reversal-aba",
      graphTitle: "Visual analysis cue",
      phases: [
        { label: "Level", detail: "How high or low?", tone: "blue" },
        { label: "Trend", detail: "Upward, downward, or flat?", tone: "purple" },
        { label: "Variability", detail: "Stable or bouncing?", tone: "teal" },
      ],
      prompt:
        "Which visual analysis feature asks whether the data path is moving upward, downward, or flat?",
      choices: ["Trend", "Level", "Overlap", "Trial-by-trial IOA"],
      answer: "Trend",
      hint: "Think about direction across sessions.",
      feedback: "Trend describes the direction of the data path.",
    },
  },
  {
    slug: "immediacy-overlap-functional-relation",
    label: "C16",
    title: "Immediacy, Overlap, and Functional Relation",
    body: [
      "Immediacy asks whether behavior changes [right after a condition change].",
      "A functional relation is supported when behavior changes with [systematic manipulation of the independent variable].",
    ],
    visual: {
      type: "graph",
      graphId: "reversal-pvr",
      graphTitle: "Functional relation cue",
      phases: [
        { label: "Baseline", detail: "Prediction from baseline data.", tone: "blue" },
        { label: "Intervention", detail: "Immediate behavior change.", tone: "green" },
        { label: "Return", detail: "Verification when condition changes.", tone: "teal" },
      ],
      prompt: "Which feature strengthens evidence of a functional relation?",
      choices: [
        "Repeated behavior change when conditions change",
        "One data point higher than baseline",
        "A colorful graph title",
        "A longer session name",
      ],
      answer: "Repeated behavior change when conditions change",
      hint: "Look for replicated change tied to condition changes.",
      feedback:
        "A functional relation is supported when behavior changes predictably with the independent variable.",
    },
  },
  {
    slug: "baseline-intervention-maintenance-generalization",
    label: "C17",
    title: "Baseline, Intervention, Maintenance, and Generalization Data",
    body: [
      "Baseline data support [prediction before intervention].",
      "Maintenance and generalization data show whether behavior change [continues or transfers].",
    ],
    visual: {
      type: "matching",
      prompt: "Match each data phase to its cue.",
      pairs: [
        { term: "Baseline", definition: "Data before intervention." },
        { term: "Intervention", definition: "Data after the independent variable is introduced." },
        { term: "Maintenance", definition: "Behavior continues after teaching or intervention changes." },
        { term: "Generalization", definition: "Behavior transfers across people, settings, behaviors, or time." },
      ],
    },
  },
  {
    slug: "single-subject-design-basics",
    label: "C18",
    title: "Single-Subject Design Basics",
    body: [
      "Single-subject designs use repeated measurement to evaluate [individual behavior change].",
      "Experimental control is shown when data patterns change with experimental conditions.",
    ],
    visual: {
      type: "select-all",
      prompt: "Select design features that help demonstrate experimental control.",
      choices: [
        { label: "Repeated measurement", correct: true },
        { label: "Clear phase changes or design logic", correct: true },
        { label: "Only one pretest and one posttest", correct: false },
        { label: "Behavior change linked to the independent variable", correct: true },
      ],
      feedback:
        "Single-subject designs rely on repeated measurement and systematic condition changes.",
    },
  },
  {
    slug: "single-subject-design-types",
    label: "C19",
    title: "Reversal, Multiple Baseline, Alternating Treatments, and Changing Criterion",
    body: [
      "Each single-subject design shows experimental control through [a different data pattern].",
      "Choose the design that fits the behavior, ethics, and intervention question.",
    ],
    visual: {
      type: "matching",
      prompt: "Match each design to its visual logic.",
      pairs: [
        { term: "Reversal Design", definition: "Behavior changes as conditions repeat or withdraw." },
        { term: "Multiple Baseline Design", definition: "Behavior changes after staggered intervention across tiers." },
        { term: "Alternating Treatments / Multielement Design", definition: "Rapid alternation creates separated data paths." },
        { term: "Changing Criterion Design", definition: "Behavior tracks stepwise criterion changes." },
      ],
    },
  },
  {
    slug: "data-based-decision-making",
    label: "C20",
    title: "Data-Based Decision Making",
    body: [
      "Data-based decisions require matching the decision to [the data pattern].",
      "Stable improvement may support continuing; no effect may support revising the intervention.",
    ],
    visual: {
      type: "choice",
      prompt:
        "Baseline is stable, intervention begins, and behavior does not change across several sessions. What is the best data-based decision?",
      choices: [
        "Review and adjust the intervention plan",
        "Declare a functional relation",
        "Ignore the data because intervention has started",
        "Switch to percentage IOA",
      ],
      answer: "Review and adjust the intervention plan",
      hint: "Ask whether the data pattern shows behavior change after intervention.",
      feedback:
        "Data-based decision making uses the observed pattern to continue, revise, or investigate conditions.",
    },
  },
];

const sectionCPracticeQuestions: QuestionContent[] = [
  {
    type: "matching",
    prompt: "Match each continuous measure to its best use.",
    pairs: [
      { term: "Frequency", definition: "Count each response." },
      { term: "Rate", definition: "Count responses per unit of time." },
      { term: "Duration", definition: "Measure how long behavior lasts." },
      { term: "Latency", definition: "Measure time from stimulus to response." },
      { term: "IRT", definition: "Measure time between two responses." },
    ],
    answer: "All continuous measures matched correctly",
    explanation:
      "Continuous measures capture response occurrence or temporal dimensions directly.",
    hint:
      "Separate counting responses from measuring time before, during, or between responses.",
  },
  {
    type: "scenario",
    prompt:
      "A BCBA counts 24 vocal disruptions during a 30-minute observation and reports 0.8 disruptions per minute. Which measure is reported?",
    choices: ["Rate", "Frequency", "Duration", "Latency"],
    answer: "Rate",
    explanation:
      "Rate is count per unit of time. The count was converted to disruptions per minute.",
    hint: "Look for a count divided by observation time.",
  },
  {
    type: "scenario",
    prompt:
      "A therapist records the time from the instruction 'start work' to the learner's first pencil mark. Which measure is used?",
    choices: ["Latency", "IRT", "Duration", "Whole interval recording"],
    answer: "Latency",
    explanation:
      "Latency measures elapsed time from an antecedent stimulus to the beginning of the response.",
    hint: "Ask whether timing begins after a stimulus or after a previous response.",
  },
  {
    type: "scenario",
    prompt:
      "An observer records whether aggression occurred at any point during each 10-second interval. Which procedure is used?",
    choices: ["Partial interval recording", "Whole interval recording", "Momentary time sampling", "Trial-by-trial recording"],
    answer: "Partial interval recording",
    explanation:
      "Partial interval recording scores an interval if behavior occurs at any time during the interval.",
    hint: "Look for any occurrence within the interval.",
  },
  {
    type: "scenario",
    prompt:
      "An observer records on-task behavior only if it occurs for the entire 1-minute interval. Which procedure is used?",
    choices: ["Whole interval recording", "Partial interval recording", "Momentary time sampling", "Frequency"],
    answer: "Whole interval recording",
    explanation:
      "Whole interval recording requires behavior to occur across the full interval.",
    hint: "Look for the entire interval requirement.",
  },
  {
    type: "select-all",
    prompt: "Select all statements that correctly describe discontinuous measurement.",
    choices: [
      "It samples behavior during intervals.",
      "Partial interval recording can overestimate behavior.",
      "Whole interval recording can underestimate behavior.",
      "It always captures every response.",
    ],
    answers: [
      "It samples behavior during intervals.",
      "Partial interval recording can overestimate behavior.",
      "Whole interval recording can underestimate behavior.",
    ],
    answer:
      "Discontinuous measurement samples behavior and can overestimate or underestimate depending on the procedure.",
    explanation:
      "Discontinuous procedures sample behavior. Partial interval can overestimate, and whole interval can underestimate.",
    hint:
      "Think about whether the method captures every response or samples intervals.",
  },
  {
    type: "fill-blank",
    prompt:
      "Complete the cue: Interresponse time measures time between two ____.",
    answer: "responses",
    explanation:
      "IRT measures elapsed time between two consecutive responses.",
    hint: "IRT begins after one response and ends at the next one.",
  },
  {
    type: "matching",
    prompt: "Match each IOA method to the data it fits best.",
    pairs: [
      { term: "Exact count IOA", definition: "Interval-by-interval count agreement." },
      { term: "Mean count-per-interval IOA", definition: "Average count agreement across intervals." },
      { term: "Total duration IOA", definition: "Agreement on total time behavior occurred." },
      { term: "Trial-by-trial IOA", definition: "Agreement across discrete teaching trials." },
    ],
    answer: "All IOA methods matched correctly",
    explanation:
      "IOA method selection depends on the response dimension and data collection system.",
    hint:
      "Match count data to count IOA, duration data to duration IOA, and trial data to trial-by-trial IOA.",
  },
  {
    type: "scenario",
    prompt:
      "Observer A records 18 responses and Observer B records 20 responses during the same session. Which count IOA formula is most directly used for total count IOA?",
    choices: ["18 divided by 20", "20 divided by 18", "18 plus 20", "Exact interval agreements divided by intervals"],
    answer: "18 divided by 20",
    explanation:
      "Total count IOA divides the smaller count by the larger count and multiplies by 100.",
    hint:
      "For total count IOA, compare the smaller total count to the larger total count.",
  },
  {
    type: "scenario",
    graphId: "reversal-aba",
    prompt:
      "Baseline data are high and stable. Intervention starts and behavior immediately drops to a lower, stable level with little overlap. Which interpretation is strongest?",
    choices: ["Clear intervention effect", "No functional relation", "High variability blocks interpretation", "Only external validity is shown"],
    answer: "Clear intervention effect",
    explanation:
      "A clear level change with immediacy and low overlap supports an intervention effect.",
    hint:
      "Compare level, immediacy, overlap, and stability across the phase change.",
  },
  {
    type: "scenario",
    graphId: "multiple-baseline-settings",
    prompt:
      "Behavior changes only after intervention is introduced at staggered times across settings. Which design is represented?",
    choices: ["Multiple Baseline Design", "Reversal Design", "Changing Criterion Design", "Alternating Treatments / Multielement Design"],
    answer: "Multiple Baseline Design",
    explanation:
      "Multiple Baseline Designs show behavior change after staggered intervention across tiers.",
    hint:
      "Look for staggered intervention rather than withdrawal or rapid alternation.",
  },
  {
    type: "scenario",
    graphId: "alternating-standard",
    prompt:
      "Two interventions are rapidly alternated, and one data path is consistently higher than the other. Which design feature is being evaluated?",
    choices: ["Differentiated data paths", "Criterion tracking", "Return to baseline", "Exact count IOA"],
    answer: "Differentiated data paths",
    explanation:
      "Alternating Treatments / Multielement Designs compare conditions through rapid alternation and separated data paths.",
    hint:
      "Focus on rapid alternation and whether the paths separate by condition.",
  },
  {
    type: "scenario",
    graphId: "changing-criterion-on-task",
    prompt:
      "On-task duration increases each time the criterion line increases. Which graph feature supports experimental control?",
    choices: ["Behavior tracks criterion shifts", "Behavior reverses after withdrawal", "All tiers change at once", "Data paths overlap completely"],
    answer: "Behavior tracks criterion shifts",
    explanation:
      "Changing Criterion Designs show control when behavior shifts with each criterion change.",
    hint:
      "Look for behavior moving step-by-step with the criterion line.",
  },
  {
    type: "scenario",
    graphId: "reversal-pvr",
    prompt:
      "A graph shows baseline responding, behavior change during intervention, return toward baseline when the intervention is withdrawn, and behavior change again when intervention returns. What is the strongest interpretation?",
    choices: [
      "Prediction, verification, and replication strengthen experimental control",
      "Only external validity is demonstrated",
      "A single phase change is enough to demonstrate control",
      "IOA has replaced the need for repeated measurement",
    ],
    answer:
      "Prediction, verification, and replication strengthen experimental control",
    explanation:
      "Experimental control is strengthened when baseline prediction is tested, verified by withdrawal or return, and replicated when the independent variable is reintroduced.",
    hint:
      "Look for repeated behavior change tied to condition changes, not one isolated improvement.",
  },
  {
    type: "scenario",
    graphId: "multiple-baseline-settings",
    prompt:
      "Across three settings, behavior changes only after the intervention begins in each setting while untreated settings remain near baseline. What does this pattern support?",
    choices: [
      "Experimental control through staggered intervention",
      "A history threat affecting all settings at once",
      "Treatment withdrawal as the required control tactic",
      "Momentary time sampling as the dependent variable",
    ],
    answer: "Experimental control through staggered intervention",
    explanation:
      "A staggered pattern supports experimental control when each tier changes only after the independent variable is introduced.",
    hint:
      "Compare when each tier changes relative to when intervention begins in that tier.",
  },
  {
    type: "matching",
    prompt: "Match each graph interpretation cue.",
    pairs: [
      { term: "Level", definition: "How high or low the data are." },
      { term: "Trend", definition: "Direction of the data path." },
      { term: "Variability", definition: "How much data fluctuate." },
      { term: "Immediacy of effect", definition: "Change right after a condition changes." },
    ],
    answer: "Graph interpretation cues matched correctly",
    explanation:
      "Visual analysis inspects level, trend, variability, immediacy, overlap, and consistency.",
    hint:
      "Ask what each cue tells you to inspect in the graph.",
  },
  {
    type: "select-all",
    prompt: "Select all features that strengthen evidence for a functional relation.",
    choices: [
      "Repeated behavior change when the independent variable changes",
      "Low overlap between baseline and intervention data",
      "Immediate change after phase change",
      "A single improved data point with no replication",
    ],
    answers: [
      "Repeated behavior change when the independent variable changes",
      "Low overlap between baseline and intervention data",
      "Immediate change after phase change",
    ],
    answer:
      "Repeated condition-linked change, low overlap, and immediacy strengthen evidence for a functional relation.",
    explanation:
      "Functional relation identification relies on replicated, condition-linked behavior change and visual analysis features.",
    hint:
      "Look for replicated change tied to the independent variable, not one isolated data point.",
  },
  {
    type: "scenario",
    graphId: "alternating-standard",
    prompt:
      "Two rapidly alternated conditions produce consistently separated data paths with little overlap. Which visual-analysis conclusion is best supported?",
    choices: [
      "One condition is associated with a different level of responding",
      "Behavior is maintained only because baseline was withdrawn",
      "The criterion line controlled the behavior step by step",
      "The data show generalization across settings",
    ],
    answer: "One condition is associated with a different level of responding",
    explanation:
      "In Alternating Treatments / Multielement Designs, separated data paths with low overlap support a condition-linked difference in responding.",
    hint:
      "Focus on level separation and overlap across rapidly alternated conditions.",
  },
  {
    type: "scenario",
    prompt:
      "A skill remains at criterion three weeks after intervention is faded. Which data type is being evaluated?",
    choices: ["Maintenance", "Baseline", "Latency", "Exact count IOA"],
    answer: "Maintenance",
    explanation:
      "Maintenance data show whether behavior change continues after teaching or intervention conditions change.",
    hint:
      "Think about behavior continuing over time after teaching conditions change.",
  },
  {
    type: "scenario",
    prompt:
      "A learner uses the trained communication response with a new teacher in a new classroom. Which data type is most relevant?",
    choices: ["Generalization", "Duration IOA", "Baseline prediction", "Momentary time sampling"],
    answer: "Generalization",
    explanation:
      "Generalization data show transfer across people, settings, behaviors, or time.",
    hint:
      "Look for transfer beyond the original teaching condition.",
  },
];

const sectionCMasteryQuestions: QuestionContent[] = [
  {
    type: "scenario",
    prompt:
      "A BCBA wants to measure how many times a learner leaves their seat during a 20-minute work period. Which measure is most direct?",
    choices: ["Frequency", "Duration", "Latency", "Momentary time sampling"],
    answer: "Frequency",
    explanation:
      "Frequency counts the number of responses during an observation.",
  },
  {
    type: "scenario",
    prompt:
      "A BCBA reports that a learner emitted 15 responses in 5 minutes. Which measure is needed to compare this session to a 10-minute session?",
    choices: ["Rate", "Frequency only", "Latency", "Whole interval recording"],
    answer: "Rate",
    explanation:
      "Rate controls for observation time by reporting responses per unit of time.",
  },
  {
    type: "scenario",
    prompt: "Which option best differentiates latency and IRT?",
    choices: [
      "Latency is time from stimulus to response; IRT is time between responses.",
      "Latency counts responses; IRT records permanent products.",
      "Latency samples intervals; IRT records whether behavior occurred at the interval end.",
      "Latency measures observer agreement; IRT measures experimental control.",
    ],
    answer:
      "Latency is time from stimulus to response; IRT is time between responses.",
    explanation:
      "Latency begins after an antecedent stimulus. IRT begins after a response and ends at the next response.",
  },
  {
    type: "scenario",
    prompt:
      "A completed worksheet is scored after class to measure independent work. Which measurement procedure is used?",
    choices: ["Permanent product", "Momentary time sampling", "IRT", "Partial interval recording"],
    answer: "Permanent product",
    explanation:
      "Permanent product measurement records an outcome behavior leaves behind.",
  },
  {
    type: "scenario",
    prompt:
      "Which discontinuous procedure is most likely to overestimate behavior?",
    choices: ["Partial interval recording", "Whole interval recording", "Total duration recording", "Frequency recording"],
    answer: "Partial interval recording",
    explanation:
      "Partial interval recording can overestimate behavior because any occurrence scores the interval.",
  },
  {
    type: "scenario",
    prompt:
      "Which discontinuous procedure is most likely to underestimate behavior?",
    choices: ["Whole interval recording", "Partial interval recording", "Frequency recording", "Total count IOA"],
    answer: "Whole interval recording",
    explanation:
      "Whole interval recording can underestimate behavior because behavior must occur for the entire interval.",
  },
  {
    type: "scenario",
    prompt:
      "An observer records whether behavior is occurring exactly when the timer beeps. Which procedure is used?",
    choices: ["Momentary time sampling", "Whole interval recording", "Partial interval recording", "Rate"],
    answer: "Momentary time sampling",
    explanation:
      "Momentary time sampling records behavior at the observation moment.",
  },
  {
    type: "scenario",
    prompt:
      "Two observers record the same discrete teaching trials as correct or incorrect. Which IOA method best fits?",
    choices: ["Trial-by-trial IOA", "Total duration IOA", "Mean duration IOA", "Total count IOA"],
    answer: "Trial-by-trial IOA",
    explanation:
      "Trial-by-trial IOA evaluates agreement across discrete trial records.",
  },
  {
    type: "scenario",
    prompt:
      "Two observers collect counts in each interval, and the BCBA wants agreement only when both observers recorded the same count for an interval. Which IOA method fits?",
    choices: ["Exact count-per-interval IOA", "Total count IOA", "Total duration IOA", "Trial-by-trial IOA"],
    answer: "Exact count-per-interval IOA",
    explanation:
      "Exact count-per-interval IOA counts intervals in which observers recorded exactly the same count.",
  },
  {
    type: "scenario",
    prompt:
      "Two observers measure how long tantrums last across a session. Which IOA family fits the response dimension?",
    choices: ["Duration IOA", "Count IOA", "Trial-by-trial IOA", "Percentage IOA only"],
    answer: "Duration IOA",
    explanation:
      "Duration IOA is used when observers record how long behavior lasts.",
  },
  {
    type: "scenario",
    graphId: "reversal-aba",
    prompt:
      "In a graph, data shift from high baseline levels to low intervention levels immediately after the phase change, with little overlap. Which visual analysis feature is most directly described?",
    choices: ["Immediacy of effect", "Generalization", "Total count IOA", "Momentary time sampling"],
    answer: "Immediacy of effect",
    explanation:
      "Immediacy of effect evaluates whether behavior changes right after a condition change.",
  },
  {
    type: "scenario",
    graphId: "reversal-pvr",
    prompt:
      "Which option best supports a functional relation in a single-subject graph?",
    choices: [
      "Behavior changes repeatedly when the independent variable changes.",
      "Behavior improves once without replication.",
      "The y-axis has a clinical label.",
      "The graph contains three colors.",
    ],
    answer: "Behavior changes repeatedly when the independent variable changes.",
    explanation:
      "Functional relation identification requires replicated, condition-linked behavior change.",
  },
  {
    type: "scenario",
    graphId: "multiple-baseline-participants",
    prompt:
      "A graph shows three participants with intervention introduced at different sessions. Each participant changes only after intervention begins. Which design is shown?",
    choices: ["Multiple Baseline Design", "Reversal Design", "Changing Criterion Design", "Alternating Treatments / Multielement Design"],
    answer: "Multiple Baseline Design",
    explanation:
      "Multiple Baseline Designs use staggered intervention across participants, settings, or behaviors.",
  },
  {
    type: "scenario",
    graphId: "alternating-standard",
    prompt:
      "A graph rapidly alternates Intervention A and Intervention B and shows separated data paths. Which design is shown?",
    choices: ["Alternating Treatments / Multielement Design", "Multiple Baseline Design", "Withdrawal Design", "Changing Criterion Design"],
    answer: "Alternating Treatments / Multielement Design",
    explanation:
      "Alternating Treatments / Multielement Designs compare rapidly alternated conditions through differentiated data paths.",
  },
  {
    type: "scenario",
    graphId: "changing-criterion-on-task",
    prompt:
      "A learner's behavior changes stepwise each time the performance criterion changes. Which design is shown?",
    choices: ["Changing Criterion Design", "Multiple Baseline Design", "Reversal Design", "Alternating Treatments / Multielement Design"],
    answer: "Changing Criterion Design",
    explanation:
      "Changing Criterion Designs show control when behavior tracks criterion shifts.",
  },
  {
    type: "scenario",
    graphId: "reversal-pvr",
    prompt:
      "Which statement best describes how experimental control is demonstrated in this kind of single-subject graph?",
    choices: [
      "Behavior changes when the independent variable is introduced, withdrawn or changed, and reintroduced.",
      "The title names the design, so the effect is experimentally controlled.",
      "One improved data point after intervention is enough to rule out alternative explanations.",
      "The same intervention is used with a group average instead of repeated measurement.",
    ],
    answer:
      "Behavior changes when the independent variable is introduced, withdrawn or changed, and reintroduced.",
    explanation:
      "Experimental control is demonstrated when behavior changes systematically with manipulation of the independent variable across repeated comparisons.",
  },
  {
    type: "scenario",
    graphId: "multiple-baseline-participants",
    prompt:
      "Which pattern most strongly supports experimental control when withdrawal is not appropriate?",
    choices: [
      "Staggered intervention with behavior change only after intervention begins in each tier",
      "All participants improve before intervention begins",
      "Only one participant is measured before and after intervention",
      "Behavior changes in every tier at the same calendar time",
    ],
    answer:
      "Staggered intervention with behavior change only after intervention begins in each tier",
    explanation:
      "Staggered intervention reduces threats to validity because untreated tiers continue to serve as comparisons until intervention is introduced.",
  },
  {
    type: "scenario",
    graphId: "alternating-standard",
    prompt:
      "Which visual-analysis feature best supports a condition difference in a rapidly alternated design?",
    choices: [
      "Consistent separation between data paths with low overlap",
      "A return to baseline after every intervention session",
      "The same criterion line across all phases",
      "Only one data point in each condition",
    ],
    answer: "Consistent separation between data paths with low overlap",
    explanation:
      "Alternating Treatments / Multielement Designs rely on differentiation between rapidly alternated data paths.",
  },
  {
    type: "scenario",
    prompt:
      "A newly taught mand continues after programmed teaching sessions end. Which interpretation is most relevant?",
    choices: ["Maintenance", "Baseline", "Variability", "Exact count IOA"],
    answer: "Maintenance",
    explanation:
      "Maintenance means behavior continues after intervention or teaching conditions change.",
  },
  {
    type: "scenario",
    prompt:
      "A learner uses a skill with a different therapist and in a different room. Which interpretation is most relevant?",
    choices: ["Generalization", "Latency", "Permanent product", "Instrumentation"],
    answer: "Generalization",
    explanation:
      "Generalization means behavior occurs across people, settings, behaviors, or time beyond original conditions.",
  },
  {
    prompt:
      "Which option best describes trend during Visual Analysis of Graphs?",
    choices: [
      "The direction of the data path across sessions",
      "How high or low the data are within a phase",
      "The amount of overlap between adjacent phases",
      "Agreement between two observers' records",
    ],
    answer: "The direction of the data path across sessions",
    explanation:
      "Trend describes whether data move upward, downward, or remain flat.",
  },
  {
    prompt:
      "Which option best describes level during Visual Analysis of Graphs?",
    choices: [
      "How high or low the data are within a phase",
      "The direction of the data path over time",
      "Whether behavior occurs in a new setting",
      "Whether observers recorded the same count",
    ],
    answer: "How high or low the data are within a phase",
    explanation:
      "Level describes the vertical value of data within a phase.",
  },
  {
    prompt:
      "Which statement best describes a functional relation?",
    choices: [
      "Behavior changes systematically with manipulation of the independent variable.",
      "Behavior changes once after a preferred item is delivered.",
      "Two observers agree on measurement during one session.",
      "A skill appears in a new setting after teaching.",
    ],
    answer:
      "Behavior changes systematically with manipulation of the independent variable.",
    explanation:
      "A functional relation is supported when behavior changes systematically with manipulation of the independent variable.",
  },
];

const sectionDMiniLessons: MiniLessonContent[] = [
  {
    slug: "single-case-design-measures",
    label: "D1",
    title: "What Single-Case Experimental Design Measures",
    body: [
      "Single-case experimental design measures [individual behavior over time].",
      "The dependent variable is [the measured behavior]; the independent variable is [the condition changed by the analyst].",
    ],
    visual: {
      type: "choice",
      prompt: "Which pair correctly identifies the core components?",
      choices: [
        "Dependent variable = measured behavior; independent variable = condition changed by the analyst",
        "Dependent variable = treatment package; independent variable = behavior counted after treatment",
        "Dependent variable = phase label; independent variable = participant diagnosis",
        "Dependent variable = graph title; independent variable = session number",
      ],
      answer:
        "Dependent variable = measured behavior; independent variable = condition changed by the analyst",
      hint:
        "Ask what is [being measured] and what the analyst [intentionally changes].",
      feedback:
        "Single-case experimental design evaluates [repeated measurement of behavior] as conditions are changed.",
    },
  },
  {
    slug: "baseline-intervention-phase-lines",
    label: "D2",
    title: "Baseline, Intervention, and Phase Change Lines",
    body: [
      "Baseline shows [prediction] before the intervention is introduced.",
      "Phase change lines mark [when experimental conditions change].",
    ],
    visual: {
      type: "graph",
      graphId: "withdrawal-beginner",
      graphTitle: "Baseline to intervention to withdrawal",
      phases: [
        { label: "Baseline", detail: "[Data before intervention].", tone: "blue" },
        { label: "Intervention", detail: "[Condition changed by the analyst].", tone: "green" },
        { label: "Withdrawal", detail: "[Intervention is removed].", tone: "teal" },
      ],
      cue: "Note: phase change lines [separate experimental conditions].",
      prompt: "What does a phase change line tell the learner to inspect?",
      choices: [
        "Whether behavior changes when the experimental condition changes",
        "Whether the y-axis label is written in clinical language",
        "Whether sessions were conducted by the same observer",
        "Whether the graph uses enough colors",
      ],
      answer: "Whether behavior changes when the experimental condition changes",
      hint:
        "Look [immediately before and after the line] and ask what condition changed.",
      feedback:
        "Phase change lines focus visual analysis on [behavior change across experimental conditions].",
    },
  },
  {
    slug: "reversal-vs-withdrawal",
    label: "D3",
    title: "Reversal vs Withdrawal Designs",
    body: [
      "Reversal Designs compare [repeated baseline and intervention conditions].",
      "Withdrawal Designs [remove or reduce intervention] to test whether behavior changes with the condition.",
    ],
    visual: {
      type: "graph",
      graphId: "withdrawal-problem-behavior",
      graphTitle: "Withdrawal pattern for problem behavior",
      phases: [
        { label: "A1 - Baseline", detail: "[High baseline] problem behavior.", tone: "teal" },
        { label: "B1 - Intervention", detail: "[Low behavior] during intervention.", tone: "green" },
        { label: "A2 - Withdrawal", detail: "Behavior increases [after withdrawal].", tone: "teal" },
        { label: "B2 - Intervention", detail: "Behavior decreases [when intervention returns].", tone: "green" },
      ],
      cue: "Note: the key test is whether behavior changes when the condition is [removed and reintroduced].",
      prompt: "Which feature is required for withdrawal logic?",
      choices: [
        "Behavior changes when intervention is removed or reduced",
        "Intervention starts at different times across tiers",
        "Two treatments alternate rapidly in the same phase",
        "Behavior follows a gradually changing criterion line",
      ],
      answer: "Behavior changes when intervention is removed or reduced",
      hint: "Focus on what happens after the independent variable is [removed].",
      feedback:
        "Withdrawal logic is supported when behavior shifts [after treatment is removed] and shifts again [when treatment returns].",
    },
  },
  {
    slug: "ab-aba-abab-logic",
    label: "D4",
    title: "A-B, A-B-A, and A-B-A-B Logic",
    body: [
      "A-B shows [baseline followed by intervention], but it does not replicate the effect.",
      "A-B-A and A-B-A-B add [return or reintroduction phases] to strengthen experimental control.",
    ],
    visual: {
      type: "graph",
      graphId: "reversal-positive-attention",
      graphTitle: "A-B-A-B with Positive Attention",
      phases: [
        { label: "A - Baseline", detail: "Low study behavior in baseline.", tone: "blue" },
        { label: "B - Positive Attention", detail: "Study behavior increases with Positive Attention.", tone: "green" },
        { label: "A - Baseline", detail: "Study behavior decreases when attention is removed.", tone: "blue" },
        { label: "B - Positive Attention", detail: "Study behavior increases when attention returns.", tone: "green" },
      ],
      cue: "Note: A-B-A-B demonstrates a [repeated effect across condition changes].",
      prompt: "Why is A-B-A-B stronger than A-B?",
      choices: [
        "A-B-A-B replicates behavior change after reintroducing the intervention",
        "A-B-A-B has fewer data points and fewer phase changes",
        "A-B-A-B avoids baseline measurement",
        "A-B-A-B is the same as a multiple baseline design",
      ],
      answer: "A-B-A-B replicates behavior change after reintroducing the intervention",
      hint: "Look for whether the intervention effect occurs [more than once].",
      feedback:
        "A-B-A-B strengthens control by showing behavior changes with [withdrawal and reintroduction] of the intervention.",
    },
  },
  {
    slug: "prediction-verification-replication",
    label: "D5",
    title: "Withdrawal Design",
    body: [
      "Prediction uses baseline data to estimate [future responding without intervention].",
      "Verification and replication test [whether behavior changes with condition changes].",
    ],
    visual: {
      type: "graph",
      graphId: "reversal-pvr",
      graphTitle: "Withdrawal Design",
      phases: [
        { label: "Prediction", detail: "A1 predicts [baseline responding].", tone: "blue" },
        { label: "Verification", detail: "A2 tests [the baseline prediction again].", tone: "teal" },
        { label: "Replication", detail: "B2 reproduces [the intervention effect].", tone: "green" },
      ],
      cue: "Note: prediction, verification, and replication are [core logic for experimental control].",
      prompt: "What indicates replication in a reversal or withdrawal design?",
      choices: [
        "The behavior changes again when intervention is reintroduced",
        "The first baseline has stable data only",
        "The y-axis label changes between phases",
        "The graph includes three participants",
      ],
      answer: "The behavior changes again when intervention is reintroduced",
      hint: "Replication means the effect is [reproduced], not just seen once.",
      feedback:
        "Replication is shown when the intervention effect [occurs again] after the intervention is reintroduced.",
    },
  },
  {
    slug: "multiple-baseline-participants",
    label: "D6",
    title: "Multiple Baseline Across Participants",
    body: [
      "Across participants means the same intervention is staggered across [different learners].",
      "Each participant should change [only after intervention begins for that participant].",
    ],
    visual: {
      type: "graph",
      graphId: "multiple-baseline-participants",
      graphTitle: "Staggered intervention across participants",
      phases: [
        { label: "Participant 1", detail: "Earliest intervention and earliest behavior change.", tone: "green" },
        { label: "Participant 2", detail: "Later intervention and later behavior change.", tone: "purple" },
        { label: "Participant 3", detail: "Latest intervention and latest behavior change.", tone: "teal" },
      ],
      cue: "Note: staggered change across participants supports [experimental control].",
      prompt: "What graph feature shows staggered intervention?",
      choices: [
        "Intervention begins at different sessions across participants",
        "All participants change before intervention begins",
        "Treatment is withdrawn and reintroduced for one participant",
        "Two treatments alternate rapidly within each session",
      ],
      answer: "Intervention begins at different sessions across participants",
      hint: "Compare the [timing of phase changes] across tiers.",
      feedback:
        "A Multiple Baseline Across Participants design staggers intervention across learners and expects behavior change [only after each learner receives intervention].",
    },
  },
  {
    slug: "multiple-baseline-settings",
    label: "D7",
    title: "Multiple Baseline Across Settings",
    body: [
      "Across settings means intervention is staggered across [different environments].",
      "Behavior should improve in each setting [only after intervention begins there].",
    ],
    visual: {
      type: "graph",
      graphId: "multiple-baseline-settings",
      graphTitle: "Staggered intervention across settings",
      phases: [
        { label: "General Education", detail: "Intervention begins first.", tone: "green" },
        { label: "Playground", detail: "Intervention begins later.", tone: "purple" },
        { label: "Small Group", detail: "Intervention begins last.", tone: "teal" },
      ],
      cue: "Note: unchanged baselines in untreated settings help [rule out coincidental change].",
      prompt: "What threat to validity is reduced by staggering intervention across settings?",
      choices: [
        "History threat affecting all settings at the same time",
        "Poor marker selection in a multielement graph",
        "Too many criterion lines in a Changing Criterion Design",
        "Lack of formal similarity in imitation",
      ],
      answer: "History threat affecting all settings at the same time",
      hint:
        "Think about whether all settings would change together if an [outside event] caused the change.",
      feedback:
        "Staggering intervention helps rule out alternative explanations because untreated settings should [remain stable until intervention starts].",
    },
  },
  {
    slug: "multiple-baseline-behaviors",
    label: "D8",
    title: "Multiple Baseline Across Behaviors",
    body: [
      "Across behaviors means intervention is staggered across [different response classes or skills].",
      "Untreated behaviors [remain in baseline] while treated behaviors change.",
    ],
    visual: {
      type: "graph",
      graphId: "multiple-baseline-problem-behavior",
      graphTitle: "Staggered change across behavior tiers",
      phases: [
        { label: "Behavior 1", detail: "Changes after early intervention.", tone: "green" },
        { label: "Behavior 2", detail: "Changes after middle intervention.", tone: "purple" },
        { label: "Behavior 3", detail: "Changes after late intervention.", tone: "teal" },
      ],
      cue: "Note: each behavior serves as [a comparison for the others].",
      prompt: "Which pattern supports control across behaviors?",
      choices: [
        "Each behavior changes only after intervention is applied to that behavior",
        "All behaviors change before any intervention starts",
        "The same behavior reverses in one A-B-A-B sequence",
        "Two treatments alternate within each behavior tier",
      ],
      answer: "Each behavior changes only after intervention is applied to that behavior",
      hint:
        "Look for whether untreated behaviors [stay stable] while treated behavior changes.",
      feedback:
        "Across-behaviors control is shown when each behavior changes [only after its own intervention phase begins].",
    },
  },
  {
    slug: "alternating-multielement",
    label: "D9",
    title: "Alternating Treatments / Multielement Designs",
    body: [
      "Alternating Treatments / Multielement Designs compare conditions through [rapid alternation].",
      "Experimental control is shown by [differentiated data paths].",
    ],
    visual: {
      type: "graph",
      graphId: "alternating-standard",
      graphTitle: "Rapid alternation with separated data paths",
      phases: [
        { label: "Rapid alternation", detail: "Conditions [switch frequently].", tone: "blue" },
        { label: "Data separation", detail: "One data path [consistently differs].", tone: "purple" },
        { label: "Low overlap", detail: "Conditions are [visually distinct].", tone: "green" },
      ],
      cue: "Note: rapid alternation is [the key graph cue].",
      prompt: "What graph feature shows rapid alternation in a multielement design?",
      choices: [
        "Different condition markers appear in close succession across sessions",
        "Only one intervention starts after a long baseline",
        "A criterion line increases every two sessions",
        "The intervention is removed and reintroduced",
      ],
      answer: "Different condition markers appear in close succession across sessions",
      hint:
        "Look for condition changes occurring [quickly] rather than phase by phase.",
      feedback:
        "Multielement graphs show rapid alternation by plotting [different condition markers close together] across sessions.",
    },
  },
  {
    slug: "adapted-alternating-treatments",
    label: "D10",
    title: "Adapted Alternating Treatments",
    body: [
      "Adapted Alternating Treatments compare interventions across [different but equivalent response sets].",
      "A control set can help show change is [tied to the intervention].",
    ],
    visual: {
      type: "graph",
      graphId: "alternating-academic-skills",
      graphTitle: "Academic skill sets",
      phases: [
        { label: "Control set", detail: "Remains flat without intervention.", tone: "blue" },
        { label: "Intervention A", detail: "Improves gradually.", tone: "purple" },
        { label: "Intervention B", detail: "Improves more quickly.", tone: "teal" },
      ],
      cue: "Note: compare [equivalent sets], not the same response under alternating conditions.",
      prompt: "What distinguishes Adapted Alternating Treatments from standard Alternating Treatments?",
      choices: [
        "Different but equivalent response sets are assigned to different interventions",
        "Intervention is always withdrawn to verify the baseline prediction",
        "Intervention is staggered across three participants",
        "Behavior must follow decreasing criterion lines",
      ],
      answer:
        "Different but equivalent response sets are assigned to different interventions",
      hint:
        "Focus on whether the same behavior is alternated or [different equivalent response sets] are compared.",
      feedback:
        "Adapted Alternating Treatments Designs compare interventions across [equivalent response sets], often with a control set.",
    },
  },
  {
    slug: "changing-criterion-components",
    label: "D11",
    title: "Changing Criterion Design Components",
    body: [
      "Changing Criterion Designs require [baseline, stepwise criteria, and behavior tracking each criterion].",
      "The criterion must be [achievable] and close enough to shape performance gradually.",
    ],
    visual: {
      type: "graph",
      graphId: "changing-criterion-on-task",
      graphTitle: "Increasing on-task duration",
      phases: [
        { label: "Baseline", detail: "Stable responding before criteria.", tone: "blue" },
        { label: "Criteria", detail: "Horizontal criterion lines change by phase.", tone: "teal" },
        { label: "Tracking", detail: "Data follow each criterion shift.", tone: "green" },
      ],
      cue: "Note: criterion lines are [part of the analysis], not decoration.",
      prompt: "What are the components of a Changing Criterion Design?",
      choices: [
        "Baseline, successive criterion levels, and behavior tracking each criterion",
        "Three participants with intervention at staggered times",
        "Two treatments rapidly alternated with distinct markers",
        "A single A-B comparison without replication",
      ],
      answer:
        "Baseline, successive criterion levels, and behavior tracking each criterion",
      hint:
        "Look for criterion lines and whether behavior [follows each new requirement].",
      feedback:
        "Changing Criterion Designs require [sequential criteria] and data that change with each criterion shift.",
    },
  },
  {
    slug: "increasing-decreasing-criteria",
    label: "D12",
    title: "Increasing vs Decreasing Criteria",
    body: [
      "Criteria can [increase behavior], such as on-task duration.",
      "Criteria can also [decrease behavior], such as cigarettes per day or problem behavior.",
    ],
    visual: {
      type: "graph",
      graphId: "changing-criterion-smoking",
      graphTitle: "Decreasing criterion steps",
      phases: [
        { label: "High baseline", detail: "Initial level is elevated.", tone: "teal" },
        { label: "Lower criteria", detail: "Criterion lines decrease.", tone: "purple" },
        { label: "Tracking", detail: "Data follow decreasing steps.", tone: "green" },
      ],
      cue: "Note: direction depends on the [socially significant behavior-change goal].",
      prompt: "Which feature shows a decreasing criterion design?",
      choices: [
        "Criterion lines step downward and behavior follows the lower levels",
        "Behavior reverses only after treatment is withdrawn",
        "All tiers change at the same session",
        "Two interventions alternate without phase lines",
      ],
      answer:
        "Criterion lines step downward and behavior follows the lower levels",
      hint:
        "Compare the [direction of the criterion line] to the direction of desired behavior change.",
      feedback:
        "A decreasing Changing Criterion Design shows criterion lines [stepping downward] with behavior tracking those lower levels.",
    },
  },
  {
    slug: "visual-analysis-level-trend-variability",
    label: "D13",
    title: "Visual Analysis: Level, Trend, Variability",
    body: [
      "Level asks [how high or low] the data are.",
      "Trend asks [direction]; variability asks [how much data fluctuate].",
    ],
    visual: {
      type: "graph",
      graphId: "reversal-aba",
      graphTitle: "Level, trend, and variability",
      phases: [
        { label: "Level", detail: "[How high or low] are the data?", tone: "blue" },
        { label: "Trend", detail: "What [direction] are data moving?", tone: "purple" },
        { label: "Variability", detail: "How much do data [bounce around]?", tone: "teal" },
      ],
      cue: "Note: analyze [within-phase patterns] before comparing across phases.",
      prompt: "Which visual analysis component asks whether data are moving upward, downward, or flat?",
      choices: ["Trend", "Level", "Variability", "Overlap"],
      answer: "Trend",
      hint: "Think about [direction across time], not how high the data are.",
      feedback:
        "Trend describes the [direction of the data path] within or across phases.",
    },
  },
  {
    slug: "visual-analysis-immediacy-overlap-consistency",
    label: "D14",
    title: "Visual Analysis: Immediacy, Overlap, Consistency",
    body: [
      "Immediacy asks whether change occurs [right after a phase change].",
      "Overlap and consistency help judge whether the effect is [clear and replicated].",
    ],
    visual: {
      type: "graph",
      graphId: "reversal-pvr",
      graphTitle: "Immediate change and replicated effect",
      phases: [
        { label: "Immediacy", detail: "Change [right after phase change].", tone: "green" },
        { label: "Overlap", detail: "How much phases [share the same data range].", tone: "teal" },
        { label: "Consistency", detail: "Similar phases show [similar patterns].", tone: "purple" },
      ],
      cue: "Note: strong effects usually show [immediacy, low overlap, and consistency] across similar phases.",
      prompt: "Which feature asks whether data changed right after intervention began?",
      choices: [
        "Immediacy of effect",
        "Variability",
        "External validity",
        "Treatment integrity",
      ],
      answer: "Immediacy of effect",
      hint: "Look at the data [immediately before and after] a phase change line.",
      feedback:
        "Immediacy of effect evaluates whether behavior changes [promptly after a condition change].",
    },
  },
  {
    slug: "experimental-control",
    label: "D15",
    title: "Experimental Control",
    body: [
      "Experimental control means [behavior changes when and only when the independent variable changes].",
      "The design should reduce [plausible alternative explanations].",
    ],
    visual: {
      type: "choice",
      prompt: "What shows experimental control across single-case designs?",
      choices: [
        "Repeated, predictable behavior change linked to changes in the independent variable",
        "One improved data point after an intervention starts",
        "A graph with a large title and several colors",
        "A posttest score higher than a pretest score",
      ],
      answer:
        "Repeated, predictable behavior change linked to changes in the independent variable",
      hint:
        "Look for a pattern that [rules out coincidence], not just one data change.",
      feedback:
        "Experimental control is demonstrated by [replicated behavior change] tied to manipulation of the independent variable.",
    },
  },
  {
    slug: "internal-vs-external-validity",
    label: "D16",
    title: "Internal Validity vs External Validity",
    body: [
      "Internal validity asks whether [the independent variable caused the change].",
      "External validity asks whether findings [generalize across people, settings, behaviors, or time].",
    ],
    visual: {
      type: "choice",
      prompt: "Which statement best differentiates Internal vs External Validity?",
      choices: [
        "Internal validity concerns causal control; external validity concerns generality",
        "Internal validity concerns diagnosis; external validity concerns graph labels",
        "Internal validity applies only to group designs; external validity applies only to single-case designs",
        "Internal validity and external validity mean the same thing",
      ],
      answer:
        "Internal validity concerns causal control; external validity concerns generality",
      hint:
        "Ask whether the issue is [causation inside the study] or [generality beyond it].",
      feedback:
        "Internal validity is about [ruling out alternative explanations]; external validity is about [generality of findings].",
    },
  },
  {
    slug: "threats-to-validity",
    label: "D17",
    title: "Threats to Validity",
    body: [
      "Threats to Validity are [alternative explanations] for behavior change.",
      "Common threats include [history, maturation, instrumentation, testing, attrition, and sequence effects].",
    ],
    visual: {
      type: "choice",
      prompt:
        "A school-wide reinforcement program starts on the same day as the intervention. Which threat is most relevant?",
      choices: ["History", "Maturation", "Instrumentation", "External validity"],
      answer: "History",
      hint:
        "Identify whether an [outside event] occurred at the same time as the intervention.",
      feedback:
        "History threats are [outside events] that may explain behavior change apart from the independent variable.",
    },
  },
  {
    slug: "choosing-best-design",
    label: "D18",
    title: "Choosing the Best Design",
    body: [
      "Choose the design based on [behavior reversibility, ethics, measurement, and treatment goals].",
      "The best design fits [the clinical question] and can demonstrate experimental control.",
    ],
    visual: {
      type: "choice",
      prompt:
        "A behavior cannot ethically be returned to baseline once it improves. Which design is often best?",
      choices: [
        "Multiple Baseline Design",
        "Withdrawal Design",
        "A-B-A-B Reversal Design",
        "Simple A-B Design only",
      ],
      answer: "Multiple Baseline Design",
      hint:
        "Choose a design that can show control [without removing an effective intervention].",
      feedback:
        "Multiple Baseline Designs are often useful when withdrawing an effective intervention would be [unethical or impractical].",
    },
  },
];

const sectionDVariablesAndValidityMiniLessons: MiniLessonContent[] = [
  {
    slug: "variables-in-single-case-design",
    label: "D.1",
    title: "Variables in Single-Case Design",
    body: [
      "A variable is [an event or condition that can change].",
      "Single-case designs test whether behavior changes as [environmental variables change].",
    ],
    visual: {
      type: "matching",
      prompt: "Match each variable term to its discrimination cue.",
      pairs: [
        { term: "Independent variable", definition: "The intervention or condition changed by the analyst." },
        { term: "Dependent variable", definition: "The measured behavior or behavior product." },
        { term: "Extraneous variable", definition: "An outside variable that may affect responding." },
        { term: "Confounding variable", definition: "An uncontrolled variable that varies with the independent variable." },
      ],
    },
  },
  {
    slug: "independent-vs-dependent-variable",
    label: "D.1",
    title: "Independent vs Dependent Variables",
    body: [
      "The independent variable is [changed by the analyst].",
      "The dependent variable is [measured as behavior changes].",
    ],
    visual: {
      type: "choice",
      prompt:
        "A BCBA changes the schedule of reinforcement and measures out-of-seat behavior. Which pair is correct?",
      choices: [
        "Independent variable = schedule of reinforcement; dependent variable = out-of-seat behavior",
        "Independent variable = out-of-seat behavior; dependent variable = schedule of reinforcement",
        "Independent variable = classroom; dependent variable = phase label",
        "Independent variable = observer; dependent variable = graph title",
      ],
      answer:
        "Independent variable = schedule of reinforcement; dependent variable = out-of-seat behavior",
      hint:
        "Identify what the analyst [manipulates], then identify the behavior [measured on the graph].",
      feedback:
        "The analyst [manipulates the independent variable] and [measures the dependent variable].",
    },
  },
  {
    slug: "confounding-and-extraneous-variables",
    label: "D.2-D.3",
    title: "Confounding and Extraneous Variables",
    body: [
      "Extraneous variables are [outside events that can influence data].",
      "A confounding variable [changes with the independent variable] and weakens causal interpretation.",
    ],
    visual: {
      type: "choice",
      prompt:
        "Intervention starts the same day the teacher begins a new classroom-wide reward system. What is the main concern?",
      choices: [
        "A confounding variable may explain the behavior change",
        "The dependent variable is irreversible",
        "The graph shows external validity",
        "The criterion is changing too slowly",
      ],
      answer: "A confounding variable may explain the behavior change",
      hint:
        "Ask whether another event changed [at the same time as the independent variable].",
      feedback:
        "A variable that changes with the independent variable can [confound interpretation] of the treatment effect.",
    },
  },
  {
    slug: "internal-validity-causal-control",
    label: "D.2-D.3",
    title: "Internal Validity",
    body: [
      "Internal validity asks whether [the independent variable caused the behavior change].",
      "Strong designs [rule out plausible alternative explanations].",
    ],
    visual: {
      type: "graph",
      graphId: "reversal-pvr",
      graphTitle: "Internal validity cue",
      phases: [
        { label: "Prediction", detail: "Baseline predicts [continued responding].", tone: "blue" },
        { label: "Verification", detail: "Return to baseline [tests the prediction].", tone: "teal" },
        { label: "Replication", detail: "Reintroduction [repeats the effect].", tone: "green" },
      ],
      cue: "Note: internal validity improves when behavior [repeatedly changes with the independent variable].",
      prompt: "Which pattern best supports internal validity?",
      choices: [
        "Behavior changes repeatedly when the independent variable changes",
        "Behavior changes once after a single A-B comparison",
        "The graph includes many colors and labels",
        "The study uses a socially important behavior only",
      ],
      answer: "Behavior changes repeatedly when the independent variable changes",
      hint:
        "Look for a [repeated relation] between condition changes and behavior changes.",
      feedback:
        "Internal validity is strengthened when the design shows [repeated, predictable behavior change] tied to the independent variable.",
    },
  },
  {
    slug: "external-validity-generality",
    label: "D.2-D.3",
    title: "External Validity",
    body: [
      "External validity asks whether findings [generalize beyond the original case].",
      "Generality may be evaluated across [learners, settings, behaviors, materials, and time].",
    ],
    visual: {
      type: "choice",
      prompt: "Which question is about external validity?",
      choices: [
        "Will the effect occur with other learners, settings, or behaviors?",
        "Did the independent variable cause the behavior change in this graph?",
        "Was the dependent variable counted with duration or frequency?",
        "Did the phase change line occur at Session 8?",
      ],
      answer: "Will the effect occur with other learners, settings, or behaviors?",
      hint:
        "Separate [causation within the study] from [generality beyond the original conditions].",
      feedback:
        "External validity concerns [generality of findings] beyond the original participant, setting, behavior, or time.",
    },
  },
  {
    slug: "validity-threats-exam-traps",
    label: "D.2-D.3",
    title: "Threats to Validity",
    body: [
      "Threats to validity are [alternative explanations] for behavior change.",
      "Common exam traps include [history, maturation, instrumentation, testing, attrition, and sequence effects].",
    ],
    visual: {
      type: "matching",
      prompt: "Match each threat to the cue that identifies it.",
      pairs: [
        { term: "History", definition: "An outside event occurs during the study." },
        { term: "Maturation", definition: "Natural change over time may explain improvement." },
        { term: "Instrumentation", definition: "Measurement or observer rules change." },
        { term: "Sequence effect", definition: "An earlier condition influences responding in a later condition." },
      ],
    },
  },
  {
    slug: "history-maturation-instrumentation",
    label: "D.2-D.3",
    title: "History, Maturation, and Instrumentation",
    body: [
      "History is [an outside event] that may explain behavior change.",
      "Maturation is [natural change over time]; instrumentation is [measurement change].",
    ],
    visual: {
      type: "choice",
      prompt:
        "A learner improves during a semester while no clear phase change occurred. Which threat should be considered first?",
      choices: [
        "Maturation",
        "External validity",
        "Component analysis",
        "Alternating Treatments / Multielement Design",
      ],
      answer: "Maturation",
      hint:
        "Look for [gradual change over time] rather than an outside event or measurement change.",
      feedback:
        "Maturation is a threat when [natural development or passage of time] may explain behavior change.",
    },
  },
  {
    slug: "sequence-effects-in-designs",
    label: "D.2-D.3",
    title: "Sequence Effects",
    body: [
      "A sequence effect occurs when [an earlier condition influences responding in a later condition].",
      "This is a common exam trap in [rapidly compared or repeated treatment conditions].",
    ],
    visual: {
      type: "choice",
      prompt:
        "A reprimand condition is ineffective before water mist, but effective after water mist. What issue should be considered?",
      choices: [
        "Sequence effect",
        "External validity",
        "Dependent variable",
        "Multiple Baseline Design across settings",
      ],
      answer: "Sequence effect",
      hint:
        "Ask whether exposure to one condition changed [how the learner responded in a later condition].",
      feedback:
        "A sequence effect means [the order of conditions] may influence responding and complicate interpretation.",
    },
  },
];

const sectionDAnalysisApplicationMiniLessons: MiniLessonContent[] = [
  {
    slug: "comparative-analysis",
    label: "D.8-D.9",
    title: "Comparative Analysis",
    body: [
      "Comparative analysis evaluates [which condition or intervention produces better outcomes].",
      "Alternating Treatments / Multielement Designs often support rapid comparisons.",
    ],
    visual: {
      type: "graph",
      graphId: "alternating-standard",
      graphTitle: "Comparing interventions",
      phases: [
        { label: "Intervention A", detail: "One condition produces [one data path].", tone: "blue" },
        { label: "Intervention B", detail: "Another condition produces [a second data path].", tone: "teal" },
        { label: "Comparison", detail: "Separation helps identify [the stronger option].", tone: "green" },
      ],
      cue: "Note: comparative analysis asks [which intervention performs better], not whether one package component is necessary.",
      prompt: "What is the main purpose of comparative analysis?",
      choices: [
        "Compare the effects of two or more conditions or interventions",
        "Identify only the active parts inside one treatment package",
        "Test only different amounts of one independent variable",
        "Show generalization across settings without comparing treatments",
      ],
      answer: "Compare the effects of two or more conditions or interventions",
      hint:
        "Look for a question about [which condition works better].",
      feedback:
        "Comparative analysis is used to compare [the relative effects of conditions or interventions].",
    },
  },
  {
    slug: "component-analysis",
    label: "D.8-D.9",
    title: "Component Analysis",
    body: [
      "Component analysis asks [which parts of a treatment package are necessary].",
      "It compares the full package with components [added, removed, or isolated].",
    ],
    visual: {
      type: "choice",
      prompt:
        "A teacher uses Step 1 alone, Steps 1 and 2, and then Steps 1, 2, and 3 to see which parts improve behavior. Which analysis is this?",
      choices: [
        "Component analysis",
        "Parametric analysis",
        "Multiple Baseline Design across settings",
        "Changing Criterion Design",
      ],
      answer: "Component analysis",
      hint:
        "Ask whether the question is about the [active parts of a treatment package].",
      feedback:
        "Component analysis identifies which intervention elements are [necessary, sufficient, efficient, or effective].",
    },
  },
  {
    slug: "parametric-analysis",
    label: "D.8-D.9",
    title: "Parametric Analysis",
    body: [
      "Parametric analysis asks [how much of one independent variable works best].",
      "It compares [different values] such as duration, magnitude, intensity, or frequency.",
    ],
    visual: {
      type: "choice",
      prompt:
        "A BCBA compares 1-minute, 3-minute, and 5-minute breaks while keeping the rest of the procedure constant. Which analysis is this?",
      choices: [
        "Parametric analysis",
        "Component analysis",
        "Withdrawal Design",
        "External validity analysis",
      ],
      answer: "Parametric analysis",
      hint:
        "Ask whether [one variable] is varied by amount, duration, magnitude, intensity, or frequency.",
      feedback:
        "Parametric analysis evaluates the relative effects of [different values of one independent variable].",
    },
  },
  {
    slug: "component-vs-parametric-analysis",
    label: "D.8-D.9",
    title: "Component vs Parametric Analysis",
    body: [
      "Component analysis asks [which part matters].",
      "Parametric analysis asks [how much of one part matters].",
    ],
    visual: {
      type: "choice",
      prompt: "Which discrimination cue is most accurate?",
      choices: [
        "Component = which treatment element; parametric = what value of one variable",
        "Component = external validity; parametric = internal validity",
        "Component = staggered tiers; parametric = withdrawal phase",
        "Component and parametric analysis are identical",
      ],
      answer:
        "Component = which treatment element; parametric = what value of one variable",
      hint:
        "Compare whether the analyst is changing [parts of a package] or [values of one variable].",
      feedback:
        "The exam trap is mixing up [parts of a package] with [different values of a single independent variable].",
    },
  },
  {
    slug: "applying-best-design",
    label: "D.8-D.9",
    title: "Choosing and Applying the Best Design",
    body: [
      "Design choice depends on [reversibility, ethics, speed of comparison, and the research question].",
      "Applied settings also require [safety, consent, staff support, and feasible implementation].",
    ],
    visual: {
      type: "choice",
      prompt:
        "A BCBA must compare three intervention packages quickly without withdrawing treatment. Which design is most appropriate?",
      choices: [
        "Alternating Treatments / Multielement Design",
        "Simple A-B Design",
        "Changing Criterion Design",
        "Withdrawal Design",
      ],
      answer: "Alternating Treatments / Multielement Design",
      hint:
        "Choose the design that compares conditions quickly [without requiring treatment withdrawal].",
      feedback:
        "Alternating Treatments / Multielement Designs support [rapid comparison] and do not require withdrawal of treatment.",
    },
  },
  {
    slug: "applied-design-constraints",
    label: "D.8-D.9",
    title: "Applied Design Constraints",
    body: [
      "Applied design choices must [protect participants and fit the setting].",
      "Safety, consent, health, administrative support, and staff support can affect [whether a design is appropriate].",
    ],
    visual: {
      type: "select-all",
      prompt: "Select applied-setting factors to plan before systematic manipulation.",
      choices: [
        { label: "Safety and health of participants", correct: true },
        { label: "Consent from the person or legal guardian", correct: true },
        { label: "Administrative and staff support", correct: true },
        { label: "Ignoring feasibility until after data collection", correct: false },
      ],
      feedback:
        "Applied single-case designs must be scientifically useful and responsible in the actual service setting.",
    },
  },
  {
    slug: "design-choice-question",
    label: "D.8-D.9",
    title: "Match the Design to the Question",
    body: [
      "Choose the design by asking [what the analyst needs to demonstrate].",
      "Rapid comparison, active components, parameter values, and treatment withdrawal answer [different questions].",
    ],
    visual: {
      type: "choice",
      prompt:
        "Which question points most directly to component analysis?",
      choices: [
        "Which elements of this treatment package are necessary?",
        "Which value of one reinforcer magnitude works best?",
        "Will this effect generalize to a new setting?",
        "Can behavior reverse when treatment is withdrawn?",
      ],
      answer: "Which elements of this treatment package are necessary?",
      hint:
        "Look for a question about [parts of a package], not values of one variable or generality.",
      feedback:
        "Component analysis asks which elements of a treatment package are [active, necessary, sufficient, or efficient].",
    },
  },
];

const sectionEMiniLessons: MiniLessonContent[] = [
  {
    slug: "repeatability",
    label: "E.1",
    title: "Repeatability",
    body: [
      "Repeatability means behavior can occur [more than once].",
      "Use repeatability when the measurement question is about [how many responses occurred].",
    ],
    visual: {
      type: "choice",
      prompt: "Which example best fits repeatability?",
      choices: [
        "A learner raises a hand 12 times during group instruction",
        "A tantrum lasts 9 minutes",
        "A learner begins work 20 seconds after an instruction",
        "A graph shows a delayed effect after intervention",
      ],
      answer: "A learner raises a hand 12 times during group instruction",
      hint:
        "Repeatability is about whether behavior can be counted as separate occurrences.",
      feedback:
        "Repeatability supports count-based measures because behavior can occur [again and again].",
    },
  },
  {
    slug: "temporal-locus",
    label: "E.1",
    title: "Temporal Locus",
    body: [
      "Temporal locus refers to [when behavior occurs] in time.",
      "Latency and Interresponse Time (IRT) both use temporal locus, but they start from [different events].",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Latency",
      leftText: "Time from [stimulus to response]",
      rightTitle: "IRT",
      rightText: "Time from [response to response]",
      cue: "Temporal locus tells you where the timing starts and ends.",
    },
  },
  {
    slug: "temporal-extent",
    label: "E.1",
    title: "Temporal Extent",
    body: [
      "Temporal extent means behavior occupies [an amount of time].",
      "Duration measures time from [response onset to response offset].",
    ],
    visual: {
      type: "fill-blank",
      prompt: "Complete the duration cue.",
      sentence: "Duration measures time from response onset to response ____.",
      answer: "offset",
      feedback:
        "Duration is temporal extent: time from [response onset to response offset].",
    },
  },
  {
    slug: "countability",
    label: "E.1",
    title: "Countability",
    body: [
      "Countability requires a clear response definition with [discrete beginnings and endings].",
      "If observers cannot tell when one response ends and another begins, count data may be weak.",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each target by countability.",
      categories: ["Countable", "Needs clearer definition"],
      items: [
        { label: "Each completed worksheet problem", category: "Countable" },
        { label: "Being off task", category: "Needs clearer definition" },
        { label: "Each instance of hand raising above shoulder", category: "Countable" },
        { label: "Acting upset", category: "Needs clearer definition" },
      ],
    },
  },
  {
    slug: "dimensional-quantities",
    label: "E.1",
    title: "Dimensional Quantities",
    body: [
      "Dimensional quantities describe measurable features of behavior.",
      "The core quantities are [repeatability], [temporal locus], and [temporal extent].",
    ],
    visual: {
      type: "select-all",
      prompt: "Select dimensional quantities of behavior.",
      choices: [
        { label: "Repeatability", correct: true },
        { label: "Temporal locus", correct: true },
        { label: "Temporal extent", correct: true },
        { label: "Client preference", correct: false },
      ],
      feedback:
        "Dimensional quantities include [repeatability], [temporal locus], and [temporal extent]. Client preference may guide goals, but it is not a dimensional quantity.",
    },
  },
  {
    slug: "measurable-vs-nonmeasurable",
    label: "E.1",
    title: "Measurable vs Non-Measurable Behavior",
    body: [
      "Measurable behavior is observable enough for consistent recording.",
      "Non-measurable labels need operational definitions before data collection.",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each statement by measurement quality.",
      categories: ["Measurable", "Needs definition"],
      items: [
        { label: "Raises hand above shoulder", category: "Measurable" },
        { label: "Is disrespectful", category: "Needs definition" },
        { label: "Leaves seat with both feet outside the desk area", category: "Measurable" },
        { label: "Has a bad attitude", category: "Needs definition" },
      ],
    },
  },
  {
    slug: "frequency-vs-rate",
    label: "E.2",
    title: "Frequency vs Rate",
    body: [
      "Frequency is [count only].",
      "Rate is [count per unit of time].",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Frequency",
      leftText: "How many times behavior occurred",
      rightTitle: "Rate",
      rightText: "How many responses [per time unit]",
      cue: "Frequency = [count]. Rate = [count divided by observation time].",
    },
  },
  {
    slug: "duration",
    label: "E.2",
    title: "Duration",
    body: [
      "Duration measures time from [response onset to response offset].",
      "Use duration when the clinical question asks [how long behavior lasts].",
    ],
    visual: {
      type: "choice",
      prompt: "Which scenario calls for duration recording?",
      choices: [
        "A BCBA measures how long crying lasts after denial of a request",
        "A BCBA counts each hand raise during circle time",
        "A BCBA records time from instruction to first response",
        "A BCBA records whether behavior occurs at interval endpoints",
      ],
      answer: "A BCBA measures how long crying lasts after denial of a request",
      hint:
        "Look for a response that has a beginning, an ending, and a clinically important length.",
      feedback:
        "Duration fits when the question is [how long the response continues].",
    },
  },
  {
    slug: "latency",
    label: "E.2",
    title: "Latency",
    body: [
      "Latency measures time from [stimulus or instruction to response onset].",
      "Use latency when speed of response after an antecedent matters.",
    ],
    visual: {
      type: "flow",
      prompt: "Order the latency timeline.",
      steps: [
        "Discriminative Stimulus (SD) or instruction occurs",
        "Timer starts",
        "Response begins",
        "Timer stops",
      ],
      feedback:
        "Latency begins with [the antecedent event] and ends when the response begins.",
    },
  },
  {
    slug: "interresponse-time",
    label: "E.2",
    title: "Interresponse Time",
    body: [
      "Interresponse Time (IRT) measures time [between consecutive responses].",
      "IRT starts after one response and ends when [the next response begins].",
    ],
    visual: {
      type: "matching",
      prompt: "Match each temporal measure to its starting cue.",
      pairs: [
        { term: "Duration", definition: "Starts when the response begins." },
        { term: "Latency", definition: "Starts when the stimulus or instruction occurs." },
        { term: "Interresponse Time (IRT)", definition: "Starts after one response and ends at the next response." },
      ],
    },
  },
  {
    slug: "percentage-correct",
    label: "E.2",
    title: "Percentage Correct",
    body: [
      "Percentage correct converts performance into [correct responses divided by opportunities].",
      "Use it when the number of opportunities is clear and comparable.",
    ],
    visual: {
      type: "choice",
      prompt: "A learner answers 18 of 20 tact trials correctly. Which measure best summarizes performance?",
      choices: ["Percentage correct", "Latency", "Partial interval recording", "Duration"],
      answer: "Percentage correct",
      hint:
        "Look for correct responses compared with total opportunities.",
      feedback:
        "Percentage correct is [correct responses divided by total opportunities] multiplied by 100.",
    },
  },
  {
    slug: "trials-to-criterion",
    label: "E.2",
    title: "Trials to Criterion",
    body: [
      "Trials to criterion measures [how many learning opportunities] are needed to meet a performance standard.",
      "It is useful when comparing acquisition efficiency across skills or teaching procedures.",
    ],
    visual: {
      type: "fill-blank",
      prompt: "Complete the discrimination cue.",
      sentence: "Trials to criterion asks how many trials are needed to reach ____.",
      answer: "criterion",
      feedback:
        "Trials to criterion focuses on [efficiency of acquisition], not just current accuracy.",
    },
  },
  {
    slug: "continuous-measurement-selection",
    label: "E.2",
    title: "Choosing Continuous Measurement",
    body: [
      "Continuous measurement records every occurrence during observation.",
      "Select the measure that matches [the behavior dimension of interest].",
    ],
    visual: {
      type: "choice",
      prompt: "A BCBA needs to know whether time from demand to compliance decreases. Which measure fits best?",
      choices: ["Latency", "Duration", "Frequency", "Whole interval recording"],
      answer: "Latency",
      hint:
        "Ask whether the question is about count, time until behavior starts, or how long behavior continues.",
      feedback:
        "Latency measures time from [antecedent event to response onset].",
    },
  },
  {
    slug: "partial-interval",
    label: "E.3",
    title: "Partial Interval Recording",
    body: [
      "Partial interval scores an interval if behavior occurs [at any time].",
      "Partial interval recording tends to [overestimate] behavior.",
    ],
    visual: {
      type: "choice",
      prompt: "Which scoring rule describes partial interval recording?",
      choices: [
        "Score the interval if behavior occurs at any time",
        "Score only if behavior occurs for the entire interval",
        "Score only at the exact end of the interval",
        "Count every response during the session",
      ],
      answer: "Score the interval if behavior occurs at any time",
      hint:
        "Partial interval asks whether behavior happened at least once during the interval.",
      feedback:
        "Partial interval uses the [any occurrence] rule and can [overestimate] behavior.",
    },
  },
  {
    slug: "whole-interval",
    label: "E.3",
    title: "Whole Interval Recording",
    body: [
      "Whole interval scores an interval only if behavior occurs [for the entire interval].",
      "Whole interval recording tends to [underestimate] behavior.",
    ],
    visual: {
      type: "choice",
      prompt: "Which scoring rule describes whole interval recording?",
      choices: [
        "Score only if behavior occurs for the entire interval",
        "Score if behavior occurs at any time",
        "Score only at the exact interval endpoint",
        "Count every response separately",
      ],
      answer: "Score only if behavior occurs for the entire interval",
      hint:
        "Whole interval requires behavior to be present throughout the interval.",
      feedback:
        "Whole interval uses the [entire interval] rule and can [underestimate] behavior.",
    },
  },
  {
    slug: "partial-vs-whole-interval",
    label: "E.3",
    title: "Partial vs Whole Interval",
    body: [
      "Partial interval asks whether behavior occurred [at all].",
      "Whole interval asks whether behavior occurred [the whole time].",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Partial interval",
      leftText: "Tends to [overestimate] behavior",
      rightTitle: "Whole interval",
      rightText: "Tends to [underestimate] behavior",
      cue: "Partial = [any occurrence]. Whole = [entire interval].",
    },
  },
  {
    slug: "momentary-time-sampling",
    label: "E.3",
    title: "Momentary Time Sampling",
    body: [
      "Momentary time sampling records whether behavior occurs [at the end of an interval].",
      "It samples a moment instead of scoring the whole interval.",
    ],
    visual: {
      type: "flow",
      prompt: "Order the momentary time sampling sequence.",
      steps: [
        "Interval begins",
        "Wait until the interval endpoint",
        "Look at that exact moment",
        "Score whether behavior is occurring",
      ],
      feedback:
        "Momentary time sampling scores behavior [only at the interval endpoint].",
    },
  },
  {
    slug: "placheck",
    label: "E.3",
    title: "PLACHECK",
    body: [
      "PLACHECK records [how many people are engaged at a moment].",
      "It is a group measurement system, not a count of every individual response.",
    ],
    visual: {
      type: "choice",
      prompt: "Which scenario is the best fit for PLACHECK?",
      choices: [
        "A teacher records how many students are engaged when the timer sounds",
        "A therapist counts every mand during a session",
        "A BCBA times how long screaming lasts",
        "An RBT records time from instruction to compliance",
      ],
      answer: "A teacher records how many students are engaged when the timer sounds",
      hint:
        "Look for group engagement scored at a moment.",
      feedback:
        "PLACHECK measures [group engagement at a moment].",
    },
  },
  {
    slug: "discontinuous-measurement-discrimination",
    label: "E.3",
    title: "Discontinuous Measurement Discrimination",
    body: [
      "Discontinuous systems sample behavior instead of capturing every response.",
      "The key discrimination is [when the interval is scored].",
    ],
    visual: {
      type: "matching",
      prompt: "Match each discontinuous system to its best cue.",
      pairs: [
        { term: "Momentary time sampling", definition: "Score behavior at [the interval endpoint]." },
        { term: "PLACHECK", definition: "Count [individuals engaged at a moment]." },
        { term: "Partial interval", definition: "Score [any occurrence] during the interval." },
        { term: "Whole interval", definition: "Score behavior across [the entire interval]." },
      ],
    },
  },
  {
    slug: "choosing-measurement-systems",
    label: "E.2-E.3",
    title: "Choosing Correct Measurement Systems",
    body: [
      "Choose measurement from the clinical question, not from habit.",
      "Ask whether you need [count], [time], [interval samples], or [a lasting product].",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each scenario by the best measurement family.",
      categories: ["Continuous or product", "Discontinuous"],
      items: [
        { label: "How many bites of food occurred", category: "Continuous or product" },
        { label: "Whether engagement occurred at each interval endpoint", category: "Discontinuous" },
        { label: "How long elopement lasted", category: "Continuous or product" },
        { label: "Whether behavior happened at any time in each interval", category: "Discontinuous" },
      ],
    },
  },
  {
    slug: "permanent-product-recording",
    label: "E.4",
    title: "Permanent Product Recording",
    body: [
      "Permanent product recording measures [lasting environmental effects] of behavior.",
      "Direct observation is not required when [the product clearly represents the behavior].",
    ],
    visual: {
      type: "example",
      example: "Counting completed math problems after independent work.",
      nonexample: "Estimating time on task without observing or having a product.",
    },
  },
  {
    slug: "permanent-product-limits",
    label: "E.4",
    title: "Permanent Product Limits",
    body: [
      "Permanent products are efficient when the product is [durable and clearly linked to behavior].",
      "They are weak when [someone else could have produced or altered the product].",
    ],
    visual: {
      type: "select-all",
      prompt: "Select permanent product examples.",
      choices: [
        { label: "Number of worksheets completed", correct: true },
        { label: "Trash bags filled after cleaning", correct: true },
        { label: "Minutes from instruction to first response", correct: false },
        { label: "Correctly assembled kits remaining after a task", correct: true },
      ],
      feedback:
        "Permanent products are [lasting outcomes] that can be measured [after behavior occurs].",
    },
  },
  {
    slug: "ioa-methods",
    label: "E.5",
    title: "IOA Methods",
    body: [
      "Interobserver agreement (IOA) estimates [agreement between independent observers].",
      "Choose IOA based on the data system: count, duration, interval, or trial data.",
    ],
    visual: {
      type: "matching",
      prompt: "Match each IOA method to the data type.",
      pairs: [
        { term: "Exact count IOA", definition: "Interval-by-interval count agreement." },
        { term: "Total duration IOA", definition: "Agreement on total time behavior occurred." },
        { term: "Mean duration-per-occurrence IOA", definition: "Agreement on average duration per response." },
        { term: "Trial-by-trial IOA", definition: "Agreement across discrete trials." },
      ],
    },
  },
  {
    slug: "graph-components",
    label: "E.5",
    title: "Graph Components",
    body: [
      "Line graphs show repeated measurement across time.",
      "Axes, data points, data paths, phase change lines, condition labels, and legends help interpret [patterns across time].",
    ],
    visual: {
      type: "matching",
      prompt: "Match each graph component to its function.",
      pairs: [
        { term: "X-axis", definition: "[Sessions or time]." },
        { term: "Y-axis", definition: "[Measured behavior value]." },
        { term: "Data path", definition: "Line connecting data points [within a condition]." },
        { term: "Phase change line", definition: "Vertical line showing [a condition change]." },
      ],
    },
  },
  {
    slug: "graph-construction",
    label: "E.5",
    title: "Graph Construction",
    body: [
      "A clear graph shows [what was measured] and [when conditions changed].",
      "Construction features include axes, data points, data paths, condition labels, phase change lines, and legends.",
    ],
    visual: {
      type: "select-all",
      prompt: "Select features needed for clear graph construction.",
      choices: [
        { label: "Labeled x-axis and y-axis", correct: true },
        { label: "Data points connected within the same condition", correct: true },
        { label: "Phase change lines when conditions change", correct: true },
        { label: "A title that gives away the answer to a mastery question", correct: false },
      ],
      feedback:
        "Graph construction should make [measurement and condition changes] clear without adding misleading labels.",
    },
  },
  {
    slug: "data-display-types",
    label: "E.5",
    title: "Data Display Types",
    body: [
      "Different displays answer different questions.",
      "Line graphs show [repeated behavior data]; bar graphs summarize [categories].",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each display by best use.",
      categories: ["Repeated data over time", "Summary or category comparison"],
      items: [
        { label: "Line graph", category: "Repeated data over time" },
        { label: "Cumulative record", category: "Repeated data over time" },
        { label: "Bar graph", category: "Summary or category comparison" },
        { label: "Mean correct responses by condition", category: "Summary or category comparison" },
      ],
    },
  },
  {
    slug: "level",
    label: "E.6",
    title: "Level",
    body: [
      "Level is the [vertical position] of data.",
      "Compare level within and across phases to judge behavior change.",
    ],
    visual: {
      type: "graph",
      graphTitle: "Level",
      phases: [
        { label: "Low level", detail: "Data cluster [lower] on the y-axis.", tone: "blue" },
        { label: "High level", detail: "Data cluster [higher] on the y-axis.", tone: "teal" },
        { label: "Compare phases", detail: "Ask whether level changes after the condition change.", tone: "purple" },
      ],
      graphId: "reversal-positive-attention",
      prompt: "Which cue best describes level?",
      choices: [
        "The vertical position of the data",
        "The overall direction of the data path",
        "How much data bounce session to session",
        "How quickly data change after the phase line",
      ],
      answer: "The vertical position of the data",
      hint:
        "Level is about where data sit on the y-axis.",
      feedback:
        "Level means the [vertical position] of the data.",
    },
  },
  {
    slug: "trend",
    label: "E.6",
    title: "Trend",
    body: [
      "Trend is the [overall direction], and variability is [how much data fluctuate].",
      "Trend may be increasing, decreasing, zero, or variable.",
    ],
    visual: {
      type: "graph",
      graphTitle: "Trend",
      phases: [
        { label: "Increasing", detail: "Data move [upward] over time.", tone: "blue" },
        { label: "Decreasing", detail: "Data move [downward] over time.", tone: "teal" },
        { label: "Zero trend", detail: "Data remain [flat] over time.", tone: "purple" },
      ],
      graphId: "changing-criterion-increasing",
      prompt: "Which visual-analysis feature describes the direction of the data path?",
      choices: ["Trend", "Level", "Variability", "Legend"],
      answer: "Trend",
      hint:
        "Look for whether the data path moves upward, downward, or stays flat.",
      feedback:
        "Trend describes the [overall direction] of the data path.",
    },
  },
  {
    slug: "variability",
    label: "E.6",
    title: "Variability",
    body: [
      "Variability is [how much data fluctuate] around a level or trend.",
      "High variability can weaken confidence in a treatment effect.",
    ],
    visual: {
      type: "choice",
      prompt: "Which pattern shows high variability?",
      choices: [
        "Data bounce widely up and down across sessions",
        "Data stay tightly clustered near the same value",
        "Data shift immediately after intervention starts",
        "A data path has a clear condition label",
      ],
      answer: "Data bounce widely up and down across sessions",
      hint:
        "Variability is about how much the data fluctuate.",
      feedback:
        "Variability means [how much data fluctuate] from session to session.",
    },
  },
  {
    slug: "level-trend-variability",
    label: "E.6",
    title: "Level, Trend, and Variability",
    body: [
      "Level, trend, and variability are read together during visual analysis.",
      "Separate [vertical position], [direction], and [bounce] before judging effect.",
    ],
    visual: {
      type: "graph",
      graphTitle: "Visual Analysis Components",
      phases: [
        { label: "Level", detail: "Vertical position of data.", tone: "blue" },
        { label: "Trend", detail: "[Overall direction] of data.", tone: "teal" },
        { label: "Variability", detail: "[How much data fluctuate].", tone: "purple" },
        { label: "Immediacy", detail: "Speed of change [after condition change].", tone: "green" },
      ],
      graphId: "reversal-aba",
      prompt: "Which visual-analysis feature describes the overall direction of the data path?",
      choices: ["Trend", "Level", "Variability", "Legend"],
      answer: "Trend",
      hint:
        "Look for whether the data path moves upward, downward, or stays flat over time.",
      feedback:
        "Trend describes the [overall direction] of data across sessions.",
    },
  },
  {
    slug: "immediacy-of-effect",
    label: "E.6",
    title: "Immediacy of Effect",
    body: [
      "Immediate behavior change occurs [quickly after a condition change].",
      "Strong immediacy means the data shift right after the phase change line.",
    ],
    visual: {
      type: "graph",
      graphTitle: "Immediacy of Effect",
      phases: [
        { label: "Before change", detail: "Inspect data just before the phase line.", tone: "blue" },
        { label: "Phase line", detail: "Condition changes here.", tone: "purple" },
        { label: "After change", detail: "Inspect data just after the phase line.", tone: "teal" },
      ],
      graphId: "reversal-aba",
      prompt: "Where do you look to judge immediacy of effect?",
      choices: [
        "Data immediately before and after the phase change line",
        "Only the first baseline data point",
        "Only the graph legend",
        "Only the final session in the graph",
      ],
      answer: "Data immediately before and after the phase change line",
      hint:
        "Immediacy is about what happens right around the condition change.",
      feedback:
        "Immediacy of effect evaluates data [right before and right after] the phase change line.",
    },
  },
  {
    slug: "immediate-vs-delayed-change",
    label: "E.6",
    title: "Immediate vs Delayed Change",
    body: [
      "Immediate behavior change occurs [right after a condition change].",
      "Delayed change means the data shift [only after additional sessions].",
    ],
    visual: {
      type: "graph",
      graphTitle: "Interpreting Treatment Effects",
      phases: [
        { label: "Baseline", detail: "Data before intervention.", tone: "blue" },
        { label: "Condition change", detail: "Intervention begins.", tone: "purple" },
        { label: "Effect", detail: "Data shift [after the condition change].", tone: "teal" },
        { label: "Decision", detail: "Interpret [level, trend, and variability].", tone: "green" },
      ],
      graphId: "reversal-positive-attention",
      prompt: "What best supports an immediate treatment effect?",
      choices: [
        "A clear data shift right after the phase change line",
        "A label above the graph",
        "High variability before baseline begins",
        "A legend with multiple symbols",
      ],
      answer: "A clear data shift right after the phase change line",
      hint:
        "Focus on what happens to the data [immediately after the condition changes].",
      feedback:
        "Immediacy of effect evaluates [how quickly data change] after a condition change.",
    },
  },
  {
    slug: "data-based-decision-making",
    label: "E.7",
    title: "Data-Based Decision Making",
    body: [
      "Decisions should follow the data pattern, not preference alone.",
      "Level, trend, and variability guide whether to [continue, modify, terminate, or collect more data].",
    ],
    visual: {
      type: "choice",
      prompt: "Baseline is variable and intervention data overlap heavily with baseline. What is the best next decision?",
      choices: [
        "Collect more data or modify the measurement/intervention plan.",
        "Declare a functional relation immediately.",
        "Terminate services because variability proves success.",
        "Ignore baseline and use the most recent data point only.",
      ],
      answer: "Collect more data or modify the measurement/intervention plan.",
      hint:
        "Heavy overlap and variability [weaken confidence] in a treatment effect.",
      feedback:
        "Data-based decisions consider [level, trend, variability, overlap, and immediacy] before changing course.",
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
      prompt: "Match preference assessment formats to their definitions.",
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
      "The key distinction is what response, rate, or absence produces reinforcement.",
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
      "Prompt fading transfers control to [the natural Discriminative Stimulus (SD)].",
    ],
    visual: {
      type: "flow",
      prompt: "Order a prompt fading sequence.",
      steps: ["Natural Discriminative Stimulus (SD)", "Prompt if needed", "Correct response", "Fade prompt"],
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
          { term: "Selectionism", definition: "Behavior is selected by consequences across history." },
          { term: "Determinism", definition: "Behavior occurs in lawful relations." },
          { term: "Empiricism", definition: "Knowledge comes from objective observation and data." },
          { term: "Parsimony", definition: "Begin with the simplest adequate explanation." },
        ],
        answer: "All terms matched to their definitions",
        explanation:
          "Philosophical assumptions guide behavior analysts toward lawful, data-based, and useful explanations.",
        hint:
          "Separate history of consequences, lawfulness, observation, and simplest adequate explanation.",
      },
      {
        type: "scenario",
        prompt:
          "A BCBA says a client's self-talk is behavior that can be analyzed, but it should not be treated as a hidden mental cause. Which perspective is this?",
        choices: ["Radical behaviorism", "Methodological behaviorism", "Cognitive psychology", "Structuralism"],
        answer: "Radical behaviorism",
        explanation:
          "Radical behaviorism includes private events while still explaining behavior through behavior-environment relations.",
        hint:
          "Ask whether private events are included while the explanation still stays inside behavior-environment relations.",
      },
      {
        type: "scenario",
        prompt:
          "A behavior analyst observes that aggression reliably occurs after difficult demands but does not yet manipulate any variables. Which goal has been reached?",
        choices: ["Prediction", "Control", "Technological", "Generality"],
        answer: "Prediction",
        explanation:
          "Prediction is shown when behavior reliably covaries with another event. Control requires manipulating a variable and producing behavior change.",
        hint:
          "Ask whether the analyst only sees a reliable relation or has changed a variable to demonstrate an effect.",
      },
      {
        type: "select-all",
        prompt:
          "Select all examples that best represent the technological dimension.",
        choices: [
          "A written protocol defines each prompt, response, and consequence.",
          "A second BCBA can replicate the procedure from the written steps.",
          "The target behavior is important to the family.",
          "A graph shows behavior changed after intervention.",
        ],
        answers: [
          "A written protocol defines each prompt, response, and consequence.",
          "A second BCBA can replicate the procedure from the written steps.",
        ],
        answer: "A written protocol defines each prompt, response, and consequence.",
        explanation:
          "Technological means procedures are described clearly and completely enough for replication.",
        hint:
          "Look for clear procedural description and replication, not social importance or experimental control.",
      },
      {
        type: "fill-blank",
        prompt:
          "Complete the statement: The analytic dimension is shown when data demonstrate experimental ____.",
        answer: "control",
        explanation:
          "Analytic means the data demonstrate experimental control over the behavior.",
        hint:
          "Think about evidence that the intervention, rather than another variable, produced the behavior change.",
      },
      {
        type: "scenario",
        prompt:
          "A program reduces self-injury in the clinic, and the behavior change maintains at home with caregivers after training. Which dimension is most directly represented?",
        choices: ["Generality", "Behavioral", "Parsimony", "Empiricism"],
        answer: "Generality",
        explanation:
          "Generality means behavior change lasts over time, appears in other environments, or spreads to related behaviors.",
        hint:
          "Ask whether the change remains useful beyond the original teaching conditions.",
      },
      {
        type: "scenario",
        prompt:
          "A team chooses handwashing because it affects health and independence, then defines the exact responses to measure. Which pair best differentiates these decisions?",
        choices: [
          "Applied = social importance; Behavioral = observable and measurable response",
          "Analytic = social importance; Technological = observable and measurable response",
          "Behavioral = social importance; Applied = experimental control",
          "Generality = social importance; Effective = observable and measurable response",
        ],
        answer:
          "Applied = social importance; Behavioral = observable and measurable response",
        explanation:
          "Applied asks whether the target is socially significant. Behavioral asks whether the target response is observable and measurable.",
        hint:
          "Separate why the target matters from whether the response can be directly observed and measured.",
      },
      {
        type: "scenario",
        prompt:
          "A protocol says, 'Provide help as needed and reward good behavior.' A second therapist cannot implement it consistently. Which dimension is weakest?",
        choices: [
          "Technological",
          "Effective",
          "Generality",
          "Applied",
        ],
        answer: "Technological",
        explanation:
          "Technological requires procedures to be described completely enough that another person can replicate them.",
        hint:
          "Ask whether another person could implement the procedure consistently from the written steps.",
      },
      {
        type: "select-all",
        prompt:
          "Select all statements that show the conceptually systematic dimension.",
        choices: [
          "The intervention uses differential reinforcement and explains the reinforcement contingency.",
          "The treatment package is described in terms of motivating operation and stimulus control when relevant.",
          "The behavior is important to the family.",
          "The skill generalizes to a new setting.",
        ],
        answers: [
          "The intervention uses differential reinforcement and explains the reinforcement contingency.",
          "The treatment package is described in terms of motivating operation and stimulus control when relevant.",
        ],
        answer:
          "The intervention uses differential reinforcement and explains the reinforcement contingency.",
        explanation:
          "Conceptually systematic means procedures are linked to behavior-analytic principles, not just described as a list of steps.",
        hint:
          "Ask whether the rationale connects the procedure to behavior-change principles instead of only naming outcomes.",
      },
      {
        type: "matching",
        prompt:
          "Match each commonly confused dimension pair to its discrimination cue.",
        pairs: [
          {
            term: "Analytic vs Technological",
            definition:
              "Experimental control vs procedures clear enough to replicate.",
          },
          {
            term: "Effective vs Generality",
            definition:
              "Meaningful behavior change vs maintenance or transfer.",
          },
          {
            term: "Technological vs Conceptually Systematic",
            definition:
              "Replicable procedure vs procedure linked to behavioral principles.",
          },
          {
            term: "Applied vs Behavioral",
            definition:
              "Social significance vs observable and measurable target.",
          },
        ],
        answer: "All dimension pairs matched to their discrimination cues",
        explanation:
          "Dimension discrimination depends on identifying the critical feature in the scenario: importance, measurement, control, replication, principle, magnitude, or transfer.",
        hint:
          "Focus on the one feature each pair is contrasting, not whether the example sounds generally behavior-analytic.",
      },
      {
        type: "fill-blank",
        prompt:
          "Complete the cue: Effective asks whether the behavior change is large enough to ____.",
        answer: "matter",
        explanation:
          "Effective means the behavior change is large enough to matter in the learner's life or service context.",
        hint:
          "Compare visible behavior change with whether that change is large enough to be useful in everyday life.",
      },
      {
        type: "scenario",
        prompt:
          "A procedure reduces out-of-seat behavior during one teaching session, but the response returns the next day and does not occur in other settings. Which dimension still needs stronger evidence?",
        choices: [
          "Generality",
          "Behavioral",
          "Technological",
          "Conceptually systematic",
        ],
        answer: "Generality",
        explanation:
          "Generality requires behavior change to maintain over time, transfer across settings or people, or spread to related behaviors.",
        hint:
          "Ask whether the change continues or appears outside the original teaching condition.",
      },
    ],
    masteryQuestions: [
      {
        prompt:
          "A BCBA measures elopement, identifies when it is most likely, then changes antecedents and consequences to reduce it. Which sequence best describes the goals of behavior analysis?",
        choices: [
          "Description, prediction, and control of behavior",
          "Diagnosis, insight, and personality change",
          "Memory, cognition, and emotion",
          "Interviewing, labeling, and counseling",
        ],
        answer: "Description, prediction, and control of behavior",
        explanation:
          "Behavior analysis aims to describe, predict, and control behavior through lawful environmental relations.",
        hint:
          "Look for measuring behavior, identifying reliable relations, and then changing variables.",
      },
      {
        type: "scenario",
        prompt:
          "A supervisor rejects an explanation based only on opinion and asks for direct observation and data. Which philosophical assumption is emphasized?",
        choices: ["Empiricism", "Selectionism", "Parsimony", "Pragmatism"],
        answer: "Empiricism",
        explanation:
          "Empiricism means relying on objective observation and data rather than opinion or assumption.",
        hint:
          "Focus on data and observation rather than usefulness, simplicity, or history of consequences.",
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
        hint:
          "Map each phrase: social importance, demonstrated control, and clearly written procedures.",
      },
      {
        type: "scenario",
        prompt:
          "A BCBA explains hand flapping by first considering current antecedents and consequences rather than assuming a complex internal cause. Which assumption best fits?",
        choices: ["Parsimony", "Mentalism", "Structuralism", "Methodological behaviorism"],
        answer: "Parsimony",
        explanation:
          "Parsimony means starting with the simplest adequate explanation before adding more complex explanations.",
        hint:
          "Look for the simplest adequate explanation before moving to more complex accounts.",
      },
      {
        type: "scenario",
        prompt:
          "A learner privately repeats, 'I can do this,' before starting work. Which statement best aligns with radical behaviorism?",
        choices: [
          "The private event is behavior that can be analyzed, but it is not treated as an outside mental cause.",
          "The private event must be ignored because it cannot be observed by others.",
          "The private event explains behavior without environmental analysis.",
          "The private event is not part of behavior analysis.",
        ],
        answer:
          "The private event is behavior that can be analyzed, but it is not treated as an outside mental cause.",
        explanation:
          "Radical behaviorism includes private events as behavior to be explained within behavior-environment relations.",
        hint:
          "Choose the option that includes private events without making them nonbehavioral causes.",
      },
      {
        type: "scenario",
        prompt:
          "A researcher studies reinforcement schedules in a laboratory to identify basic behavioral principles. Which area is best described?",
        choices: [
          "Experimental Analysis of Behavior (EAB)",
          "Professional behavior-analytic practice",
          "Applied Behavior Analysis (ABA)",
          "A service delivery model only",
        ],
        answer: "Experimental Analysis of Behavior (EAB)",
        explanation:
          "EAB is the basic research branch that studies behavioral principles, often in controlled laboratory arrangements.",
        hint:
          "Separate basic research on principles from applied intervention for socially significant behavior.",
      },
      {
        type: "scenario",
        prompt:
          "A school program targets reading fluency, defines responses precisely, links procedures to reinforcement, and produces meaningful improvement. Which set best matches ABA dimensions?",
        choices: [
          "Applied, behavioral, conceptually systematic, and effective",
          "Determinism, parsimony, pragmatism, and philosophic doubt",
          "Indirect, discontinuous, valid, and reliable",
          "Respondent, operant, discriminated, and generalized",
        ],
        answer: "Applied, behavioral, conceptually systematic, and effective",
        explanation:
          "The example includes social significance, observable behavior, procedures linked to principles, and meaningful behavior change.",
        hint:
          "Look for ABA dimensions rather than philosophical assumptions or measurement terms.",
      },
      {
        type: "scenario",
        prompt:
          "A clinic targets a learner's ability to request a break because it reduces dangerous elopement risk and increases independence. Which dimension is most directly shown by selecting this target?",
        choices: [
          "Applied",
          "Behavioral",
          "Technological",
          "Analytic",
        ],
        answer: "Applied",
        explanation:
          "Applied means the target behavior is socially significant for the learner or stakeholders.",
        hint:
          "Focus on why this target was selected and whether it matters in the learner's life.",
      },
      {
        type: "scenario",
        prompt:
          "A report says the learner will 'be respectful.' Which revision best improves the behavioral dimension?",
        choices: [
          "The learner says 'excuse me' before interrupting during 80% of observed opportunities.",
          "The learner develops better character during group instruction.",
          "The learner understands why respect is important.",
          "The learner feels more connected to classmates.",
        ],
        answer:
          "The learner says 'excuse me' before interrupting during 80% of observed opportunities.",
        explanation:
          "Behavioral targets must be observable and measurable, not broad labels or inferred states.",
        hint:
          "Choose the option that describes a response someone could observe and count.",
      },
      {
        type: "scenario",
        prompt:
          "A behavior change occurs only when the intervention is introduced, reverses when it is withdrawn, and improves again when reintroduced. Which dimension is most directly demonstrated?",
        choices: [
          "Analytic",
          "Generality",
          "Technological",
          "Conceptually systematic",
        ],
        answer: "Analytic",
        explanation:
          "Analytic means the data demonstrate experimental control or a functional relation between intervention and behavior.",
        hint:
          "Look for evidence that the intervention, not another variable, produced the behavior change.",
      },
      {
        type: "scenario",
        prompt:
          "A written intervention includes exact prompting steps, response definitions, reinforcement schedule, error correction, and data collection procedures. Which dimension is most directly represented?",
        choices: [
          "Technological",
          "Applied",
          "Effective",
          "Generality",
        ],
        answer: "Technological",
        explanation:
          "Technological means procedures are described clearly and completely enough for replication.",
        hint:
          "Focus on whether another trained person could implement the procedure from the description.",
      },
      {
        type: "scenario",
        prompt:
          "A plan says to withhold reinforcement following problem behavior and reinforce functional communication because extinction and differential reinforcement alter future responding. Which dimension is most directly shown?",
        choices: [
          "Conceptually systematic",
          "Behavioral",
          "Applied",
          "Generality",
        ],
        answer: "Conceptually systematic",
        explanation:
          "Conceptually systematic means procedures are explicitly linked to behavior-analytic principles.",
        hint:
          "Look for whether the procedure is connected to behavioral principles rather than just written clearly.",
      },
      {
        type: "scenario",
        prompt:
          "A learner's manding increases from 1 independent mand per day to 35 per day, allowing access to breaks and materials without problem behavior. Which dimension is most directly shown?",
        choices: [
          "Effective",
          "Generality",
          "Technological",
          "Parsimony",
        ],
        answer: "Effective",
        explanation:
          "Effective means behavior change is meaningful and practical, not merely detectable.",
        hint:
          "Focus on the size and practical importance of the behavior change.",
      },
      {
        type: "scenario",
        prompt:
          "A learner uses the same functional communication response with a parent, teacher, and after-school provider 3 weeks after teaching ends. Which dimension is most directly shown?",
        choices: [
          "Generality",
          "Analytic",
          "Empiricism",
          "Behavioral",
        ],
        answer: "Generality",
        explanation:
          "Generality means behavior change maintains over time or transfers across people, settings, materials, or related behaviors.",
        hint:
          "Look for maintenance and transfer after the original teaching condition.",
      },
      {
        type: "scenario",
        prompt:
          "An intervention is socially important, produces meaningful change, and generalizes, but the written procedure is too vague for another clinician to replicate. Which dimension is missing?",
        choices: [
          "Technological",
          "Applied",
          "Effective",
          "Generality",
        ],
        answer: "Technological",
        explanation:
          "The technological dimension is missing because the procedure is not described clearly enough for replication.",
        hint:
          "Identify the dimension related to procedural clarity rather than importance, outcome size, or transfer.",
      },
    ],
  },
  b: {
    miniLessons: sectionBMiniLessons,
    practiceQuestions: sectionBPracticeQuestions,
    masteryQuestions: sectionBMasteryQuestions,
  },
  c: {
    miniLessons: sectionCExpandedMiniLessons,
    practiceQuestions: sectionCPracticeQuestions,
    masteryQuestions: sectionCMasteryQuestions,
  },
  d: {
    miniLessons: [
      ...sectionDVariablesAndValidityMiniLessons,
      ...sectionDMiniLessons,
      ...sectionDAnalysisApplicationMiniLessons,
    ],
    practiceQuestions: [
      {
        type: "matching",
        prompt: "Match each design to the graph pattern that shows experimental control.",
        pairs: [
          { term: "Reversal Designs", definition: "Behavior changes when baseline and intervention conditions repeat." },
          { term: "Multiple Baseline Designs", definition: "Behavior changes only after staggered intervention across tiers." },
          { term: "Alternating Treatments / Multielement Designs", definition: "Rapidly alternated conditions produce separated data paths." },
          { term: "Changing Criterion Designs", definition: "Behavior follows stepwise changes in the performance criterion." },
        ],
        answer: "All design graph patterns matched correctly",
        explanation:
          "Each single-case design demonstrates experimental control through a different visual pattern.",
      },
      {
        type: "scenario",
        prompt:
          "A hand-raising intervention is introduced, withdrawn, and then reintroduced. Hand raising changes with each condition change. Which design is described?",
        choices: ["Reversal Design", "Multiple Baseline Design", "Changing Criterion Design", "Alternating Treatments / Multielement Design"],
        answer: "Reversal Design",
        explanation:
          "A Reversal Design demonstrates control by [repeatedly comparing baseline and intervention conditions].",
      },
      {
        type: "select-all",
        prompt: "Select graph features used in Visual Analysis of Graphs.",
        choices: [
          "Level",
          "Trend",
          "Variability",
          "Immediacy of effect",
          "Participant diagnosis",
          "Overlap",
          "Consistency across similar phases",
        ],
        answers: [
          "Level",
          "Trend",
          "Variability",
          "Immediacy of effect",
          "Overlap",
          "Consistency across similar phases",
        ],
        answer: "Level, trend, variability, immediacy, overlap, and consistency",
        explanation:
          "Visual Analysis of Graphs examines [level, trend, variability, immediacy of effect, overlap, and consistency] across similar phases.",
      },
      {
        type: "matching",
        prompt: "Match each validity term to its discrimination cue.",
        pairs: [
          { term: "Internal validity", definition: "The independent variable caused the behavior change." },
          { term: "External validity", definition: "The finding generalizes beyond the original conditions." },
          { term: "History threat", definition: "An outside event may explain behavior change." },
          { term: "Instrumentation threat", definition: "Measurement or observer changes may explain behavior change." },
        ],
        answer: "All validity terms matched correctly",
        explanation:
          "Validity questions ask whether the design [rules out alternative explanations] and whether findings [generalize].",
      },
      {
        type: "true-false",
        prompt:
          "True or false: a Multiple Baseline Design can be useful when withdrawing an effective intervention would be unethical or impractical.",
        choices: ["True", "False"],
        answer: "True",
        explanation:
          "Multiple Baseline Designs can demonstrate control [without withdrawing intervention].",
      },
      {
        type: "fill-blank",
        prompt:
          "Complete the graph-interpretation cue: In a Changing Criterion Design, behavior should track the changing ____.",
        answer: "criterion",
        explanation:
          "In Changing Criterion Designs, behavior should shift with each new criterion level.",
      },
      {
        type: "scenario",
        graphId: "reversal-positive-attention",
        prompt:
          "Study behavior increases during Positive Attention, decreases when attention is removed, and increases again when Positive Attention returns. Which graph feature shows replication?",
        choices: [
          "The second increase during the reintroduced Positive Attention phase",
          "The first low baseline phase only",
          "The x-axis label Sessions",
          "The return to baseline before the first intervention",
        ],
        answer:
          "The second increase during the reintroduced Positive Attention phase",
        explanation:
          "Replication occurs when the intervention effect is [reproduced after reintroduction].",
      },
      {
        type: "scenario",
        graphId: "reversal-pvr",
        prompt:
          "In the withdrawal design graph, which feature verifies the original baseline prediction?",
        choices: [
          "Behavior returns toward baseline during A2 Withdrawal/Return to Baseline",
          "The B1 Intervention phase starts after A1",
          "The y-axis uses correct responses",
          "The final data point is the highest point",
        ],
        answer:
          "Behavior returns toward baseline during A2 Withdrawal/Return to Baseline",
        explanation:
          "Verification is supported when responding [returns toward the predicted baseline pattern] after withdrawal.",
      },
      {
        type: "scenario",
        graphId: "multiple-baseline-settings",
        prompt:
          "What graph feature shows staggered intervention in the multiple baseline across settings example?",
        choices: [
          "Intervention begins at different sessions across settings",
          "All settings change at the same session",
          "One rapidly alternated data path separates from another",
          "A criterion line changes every two sessions",
        ],
        answer: "Intervention begins at different sessions across settings",
        explanation:
          "Staggered intervention is shown when each tier receives intervention [at a different time].",
      },
      {
        type: "scenario",
        graphId: "multiple-baseline-problem-behavior",
        prompt:
          "In the decreasing problem behavior graph, what pattern supports experimental control?",
        choices: [
          "Problem behavior decreases only after intervention begins in each tier",
          "Problem behavior decreases in all tiers before intervention",
          "All tiers have the same phase-change session",
          "The graph uses a single A-B-A sequence",
        ],
        answer:
          "Problem behavior decreases only after intervention begins in each tier",
        explanation:
          "A multiple baseline demonstrates control when each tier changes [only after intervention is applied to that tier].",
      },
      {
        type: "scenario",
        graphId: "alternating-academic-skills",
        prompt:
          "Which feature best identifies the adapted alternating treatments graph for academic skills?",
        choices: [
          "Separate word sets are compared while the control set remains flat",
          "Treatment is withdrawn to verify prediction",
          "A single criterion changes step by step",
          "The same behavior changes at staggered times across participants",
        ],
        answer:
          "Separate word sets are compared while the control set remains flat",
        explanation:
          "Adapted alternating treatments designs compare [different but equivalent response sets] across conditions.",
      },
      {
        type: "scenario",
        graphId: "multielement-functional-analysis",
        prompt:
          "In the multielement functional analysis graph, what visual feature suggests a differentiated condition?",
        choices: [
          "One condition consistently produces the highest responding",
          "All conditions overlap completely",
          "Responding changes only after a staggered phase line",
          "Behavior follows horizontal criterion lines",
        ],
        answer: "One condition consistently produces the highest responding",
        explanation:
          "A differentiated functional analysis pattern shows [higher responding in one test condition] relative to control or other conditions.",
      },
      {
        type: "scenario",
        graphId: "changing-criterion-smoking",
        prompt:
          "Which feature supports a Changing Criterion Design in the smoking reduction graph?",
        choices: [
          "Daily cigarettes follow each decreasing criterion line",
          "Two interventions alternate rapidly in every phase",
          "Three participants change at staggered times",
          "Treatment is withdrawn and reintroduced",
        ],
        answer: "Daily cigarettes follow each decreasing criterion line",
        explanation:
          "Changing Criterion Designs show control when behavior [tracks each new criterion].",
      },
      {
        type: "scenario",
        graphId: "changing-criterion-stacked",
        prompt:
          "In the percent-of-days criterion-met graph, what does the stacked panel format emphasize?",
        choices: [
          "Each criterion panel improves after its criterion is introduced",
          "The same treatment is withdrawn in each panel",
          "A control condition remains higher than test conditions",
          "Baseline and intervention rapidly alternate every session",
        ],
        answer: "Each criterion panel improves after its criterion is introduced",
        explanation:
          "The stacked panels show performance increasing [in relation to each introduced criterion].",
      },
      {
        type: "scenario",
        graphId: "withdrawal-problem-behavior",
        prompt:
          "What phase pattern identifies the withdrawal graph for problem behavior?",
        choices: [
          "High in A1, low in B1, high in A2, low in B2",
          "Three tiers change at staggered times",
          "One intervention line is always above another",
          "Behavior follows progressively higher criterion lines",
        ],
        answer: "High in A1, low in B1, high in A2, low in B2",
        explanation:
          "A Withdrawal Design shows behavior changing when the intervention is [removed and reintroduced].",
      },
      {
        type: "scenario",
        graphId: "withdrawal-aba",
        prompt:
          "In the simple A-B-A withdrawal graph, what happens when treatment is removed?",
        choices: [
          "Behavior returns toward the baseline pattern",
          "Behavior changes only in a different participant",
          "Condition lines alternate every session",
          "A new criterion line is added",
        ],
        answer: "Behavior returns toward the baseline pattern",
        explanation:
          "Withdrawal logic is supported when behavior moves [back toward baseline] after treatment is removed.",
      },
      {
        type: "scenario",
        graphId: "withdrawal-beginner",
        prompt:
          "Which design identification cue is most important in the beginner withdrawal graph?",
        choices: [
          "Baseline, intervention introduced, then intervention withdrawn",
          "Staggered intervention across three tiers",
          "Four functional analysis conditions",
          "A criterion line that changes across phases",
        ],
        answer: "Baseline, intervention introduced, then intervention withdrawn",
        explanation:
          "The beginner withdrawal graph shows the essential [A-B-A sequence].",
      },
      {
        type: "scenario",
        prompt:
          "A graph shows two interventions alternated every session. Data for one condition stay consistently higher than data for the other condition with little overlap. What visual pattern matters most?",
        choices: ["Differentiated data paths", "Stable baseline only", "Stepwise criterion changes", "Delayed tiers"],
        answer: "Differentiated data paths",
        explanation:
          "Alternating Treatments / Multielement Designs rely on [clear separation] between rapidly alternated conditions.",
      },
      {
        type: "scenario",
        prompt:
          "A behavior improves during intervention, but a new school-wide reinforcement program began on the same day. What concern should the learner identify?",
        choices: ["History threat", "External validity", "Changing criterion control", "Treatment integrity success"],
        answer: "History threat",
        explanation:
          "A history threat is [an outside event] that could explain the behavior change.",
      },
      {
        type: "matching",
        prompt: "Match each variable term to its role in a single-case design.",
        pairs: [
          { term: "Independent variable", definition: "The intervention or condition manipulated by the analyst." },
          { term: "Dependent variable", definition: "The behavior or behavior product measured repeatedly." },
          { term: "Extraneous variable", definition: "An outside variable that may influence data." },
          { term: "Confounding variable", definition: "An uncontrolled variable that changes along with the independent variable." },
        ],
        answer: "All variable terms matched correctly",
        explanation:
          "Variable discrimination starts with what is [manipulated], what is [measured], and what else could explain behavior change.",
      },
      {
        type: "scenario",
        prompt:
          "A BCBA changes the token schedule and measures punctual arrival to scheduled activities. What is the dependent variable?",
        choices: [
          "Punctual arrival to scheduled activities",
          "The token schedule",
          "The phase label",
          "The classroom where sessions occur",
        ],
        answer: "Punctual arrival to scheduled activities",
        explanation:
          "The dependent variable is [the behavior or behavior product being measured].",
      },
      {
        type: "scenario",
        prompt:
          "A treatment begins the same week a learner starts a new medication. Behavior improves during treatment. What should the BCBA consider?",
        choices: [
          "The medication change may be an extraneous or confounding variable",
          "The graph automatically demonstrates external validity",
          "The dependent variable caused the independent variable",
          "The design is a Changing Criterion Design",
        ],
        answer:
          "The medication change may be an extraneous or confounding variable",
        explanation:
          "Events that occur with or outside the intervention can weaken confidence that [the independent variable caused behavior change].",
      },
      {
        type: "select-all",
        prompt: "Select applied-setting factors that should be managed during systematic manipulations.",
        choices: [
          "Administrative and staff support",
          "Safety and health of participants",
          "Consent from the person or legal guardian",
          "Ignoring implementation barriers so the design stays pure",
        ],
        answers: [
          "Administrative and staff support",
          "Safety and health of participants",
          "Consent from the person or legal guardian",
        ],
        answer:
          "Administrative and staff support, safety and health, and consent",
        explanation:
          "Applied design selection must [protect participants] and account for the supports needed to implement procedures responsibly.",
      },
      {
        type: "scenario",
        graphId: "multiple-baseline-settings",
        prompt:
          "Baseline starts in a pre-vocational program, morning academic class, and afternoon social skills group. Treatment begins in each setting at different times. Which design is described?",
        choices: [
          "Multiple Baseline Design across settings",
          "Withdrawal Design",
          "Component analysis",
          "Parametric analysis",
        ],
        answer: "Multiple Baseline Design across settings",
        explanation:
          "A Multiple Baseline Design across settings staggers [the independent variable across settings] while measuring the same target behavior.",
      },
      {
        type: "scenario",
        prompt:
          "A treatment package has three steps. The BCBA compares Step 1 alone, Steps 1 and 2, and all three steps to identify what is necessary. Which analysis is this?",
        choices: [
          "Component analysis",
          "Parametric analysis",
          "Changing Criterion Design",
          "External validity analysis",
        ],
        answer: "Component analysis",
        explanation:
          "Component analysis identifies the [active, necessary, sufficient, or efficient elements] of a treatment package.",
      },
      {
        type: "scenario",
        prompt:
          "A BCBA compares 2-minute, 5-minute, and 10-minute access to a reinforcer while keeping the rest of the intervention constant. Which analysis is this?",
        choices: [
          "Parametric analysis",
          "Component analysis",
          "Multiple Baseline Design",
          "Withdrawal Design",
        ],
        answer: "Parametric analysis",
        explanation:
          "Parametric analysis compares [different values of one independent variable], such as duration, magnitude, intensity, or frequency.",
      },
      {
        type: "scenario",
        prompt:
          "A reprimand condition is ineffective before a water mist condition, but effective after the water mist condition. What threat or effect should be considered?",
        choices: [
          "Sequence effect",
          "External validity",
          "Response generalization",
          "Criterion drift",
        ],
        answer: "Sequence effect",
        explanation:
          "A sequence effect occurs when exposure to [an earlier condition influences responding in a later condition].",
      },
      {
        type: "scenario",
        prompt:
          "During a Multiple Baseline Design across behaviors, untreated kicking improves when hitting is treated. What concern does this raise?",
        choices: [
          "Response generalization may complicate interpretation",
          "The design has no independent variable",
          "A parametric analysis is complete",
          "External validity is impossible",
        ],
        answer: "Response generalization may complicate interpretation",
        explanation:
          "Improvement in [an untreated behavior] can complicate interpretation in a multiple baseline across behaviors because the tiers may not remain independent.",
        hint:
          "Think about whether the [untreated behavior changed] because of the treatment applied to another behavior.",
      },
      {
        type: "scenario",
        prompt:
          "A new observer starts scoring behavior midway through a study and uses a slightly different definition. Which threat is most relevant?",
        choices: [
          "Instrumentation",
          "Maturation",
          "External validity",
          "Parametric analysis",
        ],
        answer: "Instrumentation",
        explanation:
          "Instrumentation threats involve [changes in measurement systems, observers, definitions, or recording procedures].",
        hint:
          "Look for [a change in how behavior is measured] rather than a change in the learner or intervention.",
      },
      {
        type: "scenario",
        prompt:
          "A BCBA compares attention, escape, and tangible treatment packages in brief randomized sessions to determine which package produces the best outcome. What kind of analysis is this?",
        choices: [
          "Comparative analysis",
          "Component analysis",
          "Parametric analysis",
          "Instrumentation check",
        ],
        answer: "Comparative analysis",
        explanation:
          "Comparative analysis evaluates [the relative effects of two or more conditions or interventions].",
        hint:
          "Ask whether the analyst is comparing [different interventions] rather than parts or values of one intervention.",
      },
      {
        type: "scenario",
        prompt:
          "A BCBA evaluates whether praise alone, tokens alone, or praise plus tokens is necessary for behavior change. Which analysis best fits?",
        choices: [
          "Component analysis",
          "Parametric analysis",
          "Maturation analysis",
          "External validity analysis",
        ],
        answer: "Component analysis",
        explanation:
          "Component analysis tests the contribution of [individual or combined elements] in a treatment package.",
        hint:
          "Look for [separate pieces of one package] being isolated or combined.",
      },
      {
        type: "scenario",
        prompt:
          "A BCBA keeps the reinforcement procedure constant but compares 30-second, 60-second, and 120-second reinforcement durations. Which analysis best fits?",
        choices: [
          "Parametric analysis",
          "Component analysis",
          "Sequence-effect analysis",
          "Multiple Baseline Design across behaviors",
        ],
        answer: "Parametric analysis",
        explanation:
          "Parametric analysis compares [different values of one independent variable] while other features remain constant.",
        hint:
          "Look for [one variable changing by amount, duration, magnitude, intensity, or frequency].",
      },
    ],
    masteryQuestions: [
      {
        type: "scenario",
        graphId: "withdrawal-problem-behavior",
        prompt:
          "A target behavior decreases during intervention, returns toward baseline when intervention is withdrawn, and decreases again when intervention is reintroduced. Which design is described?",
        choices: ["Reversal Design", "Multiple Baseline Design", "Changing Criterion Design", "Alternating Treatments / Multielement Design"],
        answer: "Reversal Design",
        explanation:
          "Reversal Designs demonstrate control through [repeated changes between baseline and intervention conditions].",
      },
      {
        type: "scenario",
        graphId: "multiple-baseline-settings",
        prompt:
          "A treatment effect appears only when intervention is introduced across three settings at staggered times. What is demonstrated?",
        choices: ["Experimental control", "Measurement drift", "A history threat only", "No functional relation"],
        answer: "Experimental control",
        explanation:
          "Staggered behavior change across tiers supports [a functional relation] in a multiple baseline design.",
      },
      {
        type: "scenario",
        graphId: "changing-criterion-on-task",
        prompt:
          "A learner's number of completed problems increases from 5 to 10 to 15 as the reinforcement criterion changes across phases. Which design is described?",
        choices: ["Changing Criterion Design", "Withdrawal Design", "Multiple Baseline Design", "Multielement Design"],
        answer: "Changing Criterion Design",
        explanation:
          "Changing Criterion Designs show control when behavior [tracks stepwise criterion changes].",
      },
      {
        type: "scenario",
        graphId: "alternating-standard",
        prompt:
          "A BCBA compares two prompting procedures by rapidly alternating them across sessions and looking for separated data paths. Which design is described?",
        choices: ["Alternating Treatments / Multielement Design", "Multiple Baseline Design", "Withdrawal Design", "Changing Criterion Design"],
        answer: "Alternating Treatments / Multielement Design",
        explanation:
          "Alternating Treatments / Multielement Designs compare conditions through [rapid alternation and differentiated data paths].",
      },
      {
        type: "scenario",
        prompt:
          "A school break occurs exactly when behavior improves in the intervention phase. Which threat to validity is most relevant?",
        choices: ["History", "External validity", "Replication", "Treatment fidelity"],
        answer: "History",
        explanation:
          "History refers to [outside events] that may account for behavior change.",
      },
      {
        type: "scenario",
        prompt:
          "Which statement best differentiates Internal vs External Validity?",
        choices: [
          "Internal validity asks whether [the independent variable caused change]; external validity asks whether findings [generalize].",
          "Internal validity asks whether results generalize; external validity asks whether observers agree.",
          "Internal validity is the same as social validity; external validity is the same as treatment integrity.",
          "Internal validity applies only to group designs; external validity applies only to Reversal Designs.",
        ],
        answer:
          "Internal validity asks whether [the independent variable caused change]; external validity asks whether findings [generalize].",
        explanation:
          "Internal validity concerns [causal control within the study]. External validity concerns [generality beyond the original conditions].",
      },
      {
        type: "scenario",
        graphId: "reversal-aba",
        prompt:
          "During Visual Analysis of Graphs, data shift immediately after the phase change with little overlap between baseline and intervention. What interpretation is supported?",
        choices: ["A stronger intervention effect", "No functional relation", "Instrumentation only", "Poor differentiation"],
        answer: "A stronger intervention effect",
        explanation:
          "Immediate change with low overlap supports [a stronger visual effect] when replicated across comparisons.",
      },
      {
        type: "scenario",
        graphId: "multiple-baseline-participants",
        prompt:
          "A behavior cannot ethically be returned to baseline once it improves. Which design is often preferred?",
        choices: ["Multiple Baseline Design", "Withdrawal Design", "A-B-A-B Reversal Design", "Simple A-B Design only"],
        answer: "Multiple Baseline Design",
        explanation:
          "Multiple Baseline Designs can demonstrate experimental control [without withdrawing an effective intervention].",
      },
      {
        type: "scenario",
        prompt:
          "A BCBA manipulates attention and measures study behavior. Which term describes study behavior in this analysis?",
        choices: [
          "Dependent variable",
          "Independent variable",
          "Confounding variable",
          "Extraneous variable",
        ],
        answer: "Dependent variable",
        explanation:
          "The dependent variable is [the measured behavior]; the independent variable is [the condition manipulated by the analyst].",
      },
      {
        type: "scenario",
        prompt:
          "A school-wide reward program begins on the same day as the treatment phase. Which issue most directly weakens internal validity?",
        choices: [
          "A confounding variable",
          "External validity",
          "Successful replication",
          "A dependent variable",
        ],
        answer: "A confounding variable",
        explanation:
          "A confounding variable [changes with the independent variable] and creates an alternative explanation for behavior change.",
      },
      {
        type: "scenario",
        prompt:
          "Which question best reflects external validity?",
        choices: [
          "Will the treatment effect generalize to other learners or settings?",
          "Did the intervention cause behavior change in this phase?",
          "Was the y-axis labeled correctly?",
          "Did the observer use event recording?",
        ],
        answer: "Will the treatment effect generalize to other learners or settings?",
        explanation:
          "External validity concerns [the generality of findings beyond the original conditions].",
      },
      {
        type: "scenario",
        prompt:
          "A BCBA compares a full intervention package with versions that omit one element at a time. Which analysis is being used?",
        choices: [
          "Component analysis",
          "Parametric analysis",
          "Multiple Baseline Design",
          "Changing Criterion Design",
        ],
        answer: "Component analysis",
        explanation:
          "Component analysis identifies which intervention elements are [active, necessary, or sufficient].",
      },
      {
        type: "scenario",
        prompt:
          "A BCBA compares different magnitudes of the same reinforcer while all other parts of the procedure stay constant. Which analysis is being used?",
        choices: [
          "Parametric analysis",
          "Component analysis",
          "Withdrawal Design",
          "Comparative analysis across behaviors",
        ],
        answer: "Parametric analysis",
        explanation:
          "Parametric analysis evaluates the effects of [different values of one independent variable].",
      },
      {
        type: "scenario",
        graphId: "alternating-standard",
        prompt:
          "A BCBA evaluates three intervention packages using daily randomization and rapid condition changes. Which design best fits?",
        choices: [
          "Alternating Treatments / Multielement Design",
          "Changing Criterion Design",
          "Multiple Baseline Design across settings",
          "A-B-A-B Reversal Design",
        ],
        answer: "Alternating Treatments / Multielement Design",
        explanation:
          "Alternating Treatments / Multielement Designs are useful for [rapidly comparing two or more conditions or interventions].",
      },
      {
        type: "scenario",
        prompt:
          "Which design is least appropriate when treatment effects are irreversible or returning to baseline would be unethical?",
        choices: [
          "Withdrawal Design",
          "Multiple Baseline Design",
          "Alternating Treatments / Multielement Design",
          "Changing Criterion Design",
        ],
        answer: "Withdrawal Design",
        explanation:
          "Withdrawal Designs require [removing or reducing the intervention], which may be inappropriate when effects are irreversible or withdrawal is unethical.",
        hint:
          "Focus on whether the design requires [removing an effective intervention].",
      },
      {
        type: "scenario",
        prompt:
          "A learner's behavior improves after intervention, but a major classroom schedule change occurred on the same day. Which interpretation is most cautious?",
        choices: [
          "An extraneous or confounding variable may threaten internal validity",
          "External validity has been demonstrated",
          "A component analysis has isolated the active variable",
          "The dependent variable has been manipulated",
        ],
        answer:
          "An extraneous or confounding variable may threaten internal validity",
        explanation:
          "A schedule change occurring with the intervention creates [an alternative explanation] for behavior change and weakens internal validity.",
        hint:
          "Ask whether another event changed [at the same time as the independent variable].",
      },
      {
        type: "scenario",
        prompt:
          "A graph shows improved behavior in the original clinic sessions, and the BCBA now asks whether the effect will occur at home with caregivers. Which validity issue is being evaluated?",
        choices: [
          "External validity",
          "Internal validity",
          "Instrumentation",
          "Sequence effect",
        ],
        answer: "External validity",
        explanation:
          "External validity concerns whether findings [generalize beyond the original participants, settings, behaviors, or times].",
        hint:
          "Decide whether the question is about [causal control inside the study] or [generality beyond it].",
      },
      {
        type: "scenario",
        prompt:
          "A treatment package includes prompts, praise, and tokens. The BCBA removes one element at a time to see which elements are necessary. Which analysis is described?",
        choices: [
          "Component analysis",
          "Parametric analysis",
          "Comparative analysis of unrelated treatments",
          "Maturation analysis",
        ],
        answer: "Component analysis",
        explanation:
          "Component analysis identifies the [active and necessary elements] of a treatment package.",
        hint:
          "Look for package elements being [added, removed, or isolated].",
      },
      {
        type: "scenario",
        prompt:
          "A BCBA compares FR 1, FR 3, and FR 5 while keeping the same reinforcer and response requirement. Which analysis is described?",
        choices: [
          "Parametric analysis",
          "Component analysis",
          "External validity analysis",
          "History threat analysis",
        ],
        answer: "Parametric analysis",
        explanation:
          "Parametric analysis compares [different values of one independent variable], such as schedule value.",
        hint:
          "Look for [one variable varied across several values] while the rest of the procedure stays constant.",
      },
      {
        type: "scenario",
        prompt:
          "A BCBA compares three full intervention packages with rapid alternation to see which produces the strongest data path. Which purpose best describes the analysis?",
        choices: [
          "Comparative analysis",
          "Component analysis",
          "Instrumentation analysis",
          "Maturation analysis",
        ],
        answer: "Comparative analysis",
        explanation:
          "Comparative analysis evaluates [the relative effects of two or more interventions or conditions].",
        hint:
          "Focus on whether the analyst is comparing [whole conditions] or identifying parts within one package.",
      },
    ],
  },
  e: {
    miniLessons: sectionEMiniLessons,
    practiceQuestions: [
      {
        type: "scenario",
        prompt:
          "During a 20-minute observation, a learner emits 40 hand raises. Which measure reports responses per unit of time?",
        choices: [
          "Rate",
          "Frequency",
          "Duration",
          "Latency",
        ],
        answer: "Rate",
        explanation:
          "Rate includes [count per time unit]; frequency is count alone.",
        hint:
          "Ask whether [the observation time] is part of the measurement statement.",
      },
      {
        type: "matching",
        prompt: "Match each continuous measure to its discrimination cue.",
        pairs: [
          { term: "Frequency", definition: "Count of responses." },
          { term: "Duration", definition: "Time from response onset to response offset." },
          { term: "Latency", definition: "Time from stimulus to response onset." },
          { term: "IRT", definition: "Time between consecutive responses." },
        ],
        answer: "All continuous measures matched correctly",
        explanation:
          "Continuous measures differ by whether they capture [count], [response length], [time to start], or [time between responses].",
        hint:
          "Separate [count], [length of behavior], [time after an antecedent], and [time between responses].",
      },
      {
        type: "select-all",
        prompt:
          "Select statements that correctly describe discontinuous measurement.",
        choices: [
          "Partial interval can [overestimate] behavior.",
          "Whole interval can [underestimate] behavior.",
          "Momentary time sampling records behavior at [the interval endpoint].",
          "Discontinuous measurement captures every response.",
        ],
        answers: [
          "Partial interval can [overestimate] behavior.",
          "Whole interval can [underestimate] behavior.",
          "Momentary time sampling records behavior at [the interval endpoint].",
        ],
        answer: "Partial interval, whole interval, and momentary time sampling descriptions selected",
        explanation:
          "Discontinuous systems [sample behavior] rather than recording every occurrence.",
        hint:
          "Think about [how intervals are scored] and whether every response is captured.",
      },
      {
        type: "fill-blank",
        prompt:
          "Complete the statement: Duration measures how long behavior ____.",
        answer: "lasts",
        explanation:
          "Duration measures temporal extent: how long behavior lasts from [onset to offset].",
        hint:
          "This measure captures temporal extent, not count or response speed.",
      },
      {
        type: "scenario",
        prompt:
          "A BCBA counts completed envelopes at the end of a vocational task without observing the whole session. Which recording system is being used?",
        choices: [
          "Permanent product recording",
          "Momentary time sampling",
          "Latency recording",
          "Whole interval recording",
        ],
        answer: "Permanent product recording",
        explanation:
          "Permanent product recording measures [a lasting product of behavior] after it occurs.",
        hint:
          "Look for [a durable outcome] that remains after behavior has occurred.",
      },
      {
        type: "scenario",
        graphId: "reversal-positive-attention",
        prompt:
          "The data shift upward immediately after the condition change and shift downward when the condition is removed. Which interpretation is strongest?",
        choices: [
          "The graph shows an immediate treatment effect with a replicated pattern.",
          "The graph cannot be interpreted because it has phase labels.",
          "The graph shows only a bar graph summary.",
          "The graph shows no relation because the data are connected.",
        ],
        answer:
          "The graph shows an immediate treatment effect with a replicated pattern.",
        explanation:
          "Immediate data shifts [across condition changes] strengthen interpretation of a treatment effect.",
        hint:
          "Focus on [level change around phase change lines] and whether the pattern repeats.",
      },
      {
        type: "matching",
        prompt: "Match each graph element to its role.",
        pairs: [
          { term: "X-axis", definition: "Sessions or time." },
          { term: "Y-axis", definition: "Measured response value." },
          { term: "Phase change line", definition: "Condition changed." },
          { term: "Legend", definition: "Identifies data paths or symbols." },
        ],
        answer: "All graph elements matched correctly",
        explanation:
          "Graph elements orient the analyst to [time], [measured values], [conditions], and [data paths].",
        hint:
          "Separate [axes], [condition changes], and [labels for symbols or paths].",
      },
      {
        type: "scenario",
        prompt:
          "Intervention data are improving but highly variable and overlap with baseline. What is the best data-based decision?",
        choices: [
          "Collect more data or modify the plan based on the pattern.",
          "Declare mastery because one point improved.",
          "Terminate intervention because variability is always success.",
          "Ignore baseline because intervention has started.",
        ],
        answer: "Collect more data or modify the plan based on the pattern.",
        explanation:
          "Data-based decisions consider [level, trend, variability, overlap, and immediacy] instead of a single point.",
        hint:
          "When confidence is weak, use [the data pattern] to guide additional data collection or changes.",
      },
    ],
    masteryQuestions: [
      {
        prompt:
          "Which option is best described as rate?",
        choices: [
          "Thirty responses in ten minutes",
          "Thirty total responses",
          "Ten minutes of crying",
          "Five seconds from instruction to response",
        ],
        answer: "Thirty responses in ten minutes",
        explanation:
          "Rate includes [a count in relation to time].",
        hint:
          "Rate requires both [a response count] and [a time unit].",
      },
      {
        type: "scenario",
        prompt:
          "A teacher records whether out-of-seat behavior occurred at any point during each 30-second interval. Which system is described?",
        choices: [
          "Partial interval recording",
          "Whole interval recording",
          "Latency recording",
          "Permanent product recording",
        ],
        answer: "Partial interval recording",
        explanation:
          "Partial interval recording scores the interval if behavior occurs [at any time during the interval].",
        hint:
          "Notice whether behavior must occur [for the whole interval] or [at any point in the interval].",
      },
      {
        type: "scenario",
        prompt:
          "A BCBA wants to measure time from a demand to the first compliance response. Which measure fits best?",
        choices: [
          "Latency",
          "Duration",
          "IRT",
          "Frequency",
        ],
        answer: "Latency",
        explanation:
          "Latency measures time from [a stimulus or instruction to response onset].",
        hint:
          "Focus on the time from [an antecedent event to the start of behavior].",
      },
      {
        type: "scenario",
        prompt:
          "Which example is best described as permanent product recording?",
        choices: [
          "Counting completed task cards after a work period",
          "Recording every hand raise as it occurs",
          "Scoring behavior at the end of each interval",
          "Timing from instruction to first response",
        ],
        answer: "Counting completed task cards after a work period",
        explanation:
          "Permanent product recording uses [a durable outcome of behavior] that can be measured later.",
        hint:
          "Look for [a lasting product] rather than direct observation of each response.",
      },
      {
        type: "scenario",
        graphId: "reversal-aba",
        prompt:
          "Which visual-analysis feature is most relevant when judging whether the data changed quickly after the phase change line?",
        choices: [
          "Immediacy of effect",
          "Legend placement",
          "Axis font size",
          "Session numbering",
        ],
        answer: "Immediacy of effect",
        explanation:
          "Immediacy of effect evaluates [how quickly data change after a condition change].",
        hint:
          "Attend to the data [immediately before and immediately after] the condition changes.",
      },
      {
        type: "scenario",
        graphId: "multiple-baseline-settings",
        prompt:
          "A graph shows behavior improving only after intervention starts in each tier. Which interpretation is strongest?",
        choices: [
          "The pattern supports a functional relation across tiers.",
          "The pattern is a bar graph summary.",
          "The pattern shows latency only.",
          "The pattern cannot be interpreted because tiers are stacked.",
        ],
        answer: "The pattern supports a functional relation across tiers.",
        explanation:
          "Staggered changes [across tiers] support interpretation of experimental control and treatment effects.",
        hint:
          "Look for whether behavior changes [when, and only when, the intervention begins] in each tier.",
      },
      {
        prompt:
          "Which data pattern most strongly suggests collecting more data before changing an intervention?",
        choices: [
          "Highly variable data with no clear trend",
          "Stable baseline followed by immediate level change",
          "Repeated low variability across all sessions",
          "Clear replication across phase changes",
        ],
        answer: "Highly variable data with no clear trend",
        explanation:
          "Variable data with [no clear trend] can weaken confidence and may require more data before a decision.",
        hint:
          "Think about when the visual pattern is [unclear] rather than stable or replicated.",
      },
      {
        prompt:
          "Which option is best described as a data path?",
        choices: [
          "A line connecting data points within a condition",
          "The vertical axis label",
          "A written condition name above the graph",
          "A summary statement below a bar graph",
        ],
        answer: "A line connecting data points within a condition",
        explanation:
          "A data path connects data points [within a condition] to show the pattern over time.",
        hint:
          "Look for the element that shows [the pattern between repeated data points].",
      },
      {
        type: "scenario",
        prompt:
          "A BCBA records whether a student is engaged at the exact moment each 2-minute interval ends. Which system is described?",
        choices: [
          "Momentary time sampling",
          "Partial interval recording",
          "Whole interval recording",
          "Frequency recording",
        ],
        answer: "Momentary time sampling",
        explanation:
          "Momentary time sampling scores whether behavior is occurring [at the interval endpoint].",
        hint:
          "Focus on whether behavior is scored [throughout the interval] or [only at one moment].",
      },
      {
        prompt:
          "Which option best differentiates latency from IRT?",
        choices: [
          "Latency is [stimulus-to-response time]; IRT is [response-to-response time].",
          "Latency is count per time; IRT is total count.",
          "Latency requires a product; IRT requires interval scoring.",
          "Latency overestimates behavior; IRT underestimates behavior.",
        ],
        answer:
          "Latency is [stimulus-to-response time]; IRT is [response-to-response time].",
        explanation:
          "Latency begins with [an antecedent stimulus]; IRT begins [after one response and ends at the next response].",
        hint:
          "Compare [the starting event] for each time measure.",
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
        prompt: "Match each function to the maintaining reinforcer.",
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
          "The item is a Discriminative Stimulus (SD).",
          "The item is a punisher because it was selected.",
        ],
        answer: "The item may be a reinforcer because it increased behavior.",
        explanation:
          "Preference assessment identifies candidates; a reinforcer is demonstrated by increased responding.",
      },
      {
        type: "fill-blank",
        prompt: "Complete the statement: Functional analysis tests function by manipulating ____.",
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
        prompt: "Match each differential reinforcement procedure to its definition.",
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
          "A learner receives reinforcement for asking for help instead of tearing worksheets. Which procedure is described?",
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
          "A prompt is gradually reduced until the learner responds to the natural Discriminative Stimulus (SD). What procedure is this?",
        choices: ["Prompt fading", "Response cost", "DRO", "Functional analysis"],
        answer: "Prompt fading",
        explanation:
          "Prompt fading transfers stimulus control from the prompt to the natural Discriminative Stimulus (SD).",
      },
      {
        type: "fill-blank",
        prompt: "Complete the statement: Shaping reinforces successive ____.",
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
        prompt: "Match implementation terms to their definitions.",
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
        prompt: "Complete the statement: Integrity asks whether the intervention was implemented as ____.",
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
        prompt: "Match BST components to their definitions.",
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
          "A supervisee knows how to run preference assessments but does not do them because materials are unavailable. What is the best description?",
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
        prompt: "Complete the statement: Function-based supervision analyzes antecedents and ____ for supervisee behavior.",
        answer: "consequences",
        explanation:
          "Function-based supervision uses behavior-environment relations to improve supervisee performance.",
      },
    ],
  },
};

export function getModuleContent(sectionSlug: string) {
  const content = moduleContent[sectionSlug];

  if (!content) {
    return {
      miniLessons: [],
      practiceQuestions: [],
      masteryQuestions: [],
    };
  }

  return {
    ...content,
    practiceQuestions: replaceSortingPracticeQuestions(content.practiceQuestions),
  };
}
