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
    label: "A.4",
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
    label: "A.1",
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
    label: "A.2",
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
    label: "A.2",
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
    label: "A.2",
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
    label: "A.2",
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
    label: "A.2",
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
    label: "A.3",
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
    label: "A.3",
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
    label: "A.3",
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
    label: "A.4",
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
    label: "A.4",
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
    label: "A.5",
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
    label: "A.5",
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
    label: "A.5",
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
    label: "A.5",
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
    label: "A.5",
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
    label: "A.5",
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
    label: "A.5",
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
    label: "A.5",
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
    label: "A.5",
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
    label: "A.5",
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
    label: "A.5",
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
    label: "A.5",
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
    label: "A.5",
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

const sectionAExpandedMiniLessons: MiniLessonContent[] = [
  {
    slug: "methodological-vs-radical-behaviorism",
    label: "A.3",
    title: "Methodological vs Radical Behaviorism",
    body: [
      "Methodological behaviorism emphasizes [publicly observable behavior].",
      "Radical behaviorism includes [private events] while still explaining behavior through behavior-environment relations.",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Methodological behaviorism",
      leftText: "Public behavior only",
      rightTitle: "Radical behaviorism",
      rightText: "Public behavior plus [private events]",
      cue: "Both avoid mentalism; radical behaviorism treats private events as behavior to be explained.",
    },
  },
  {
    slug: "environmental-determinism",
    label: "A.2",
    title: "Environmental Determinism",
    body: [
      "Environmental determinism means behavior occurs in [lawful relations with environmental variables].",
      "It does not mean one event always causes behavior in a simple one-to-one way.",
    ],
    visual: {
      type: "choice",
      prompt: "Which statement best reflects environmental determinism?",
      choices: [
        "Behavior is influenced by lawful environmental relations across history and context.",
        "Behavior is random until personality variables are measured.",
        "Behavior is caused only by inner thoughts.",
        "Environmental events matter only after a diagnosis is assigned.",
      ],
      answer:
        "Behavior is influenced by lawful environmental relations across history and context.",
      hint:
        "Look for [lawful environmental relations], not randomness or inner causes.",
      feedback:
        "Environmental determinism supports studying behavior as [lawful and analyzable].",
    },
  },
  {
    slug: "philosophic-doubt",
    label: "A.2",
    title: "Philosophic Doubt",
    body: [
      "Philosophic doubt means conclusions remain [open to revision].",
      "New data can strengthen, refine, or replace an explanation.",
    ],
    visual: {
      type: "fill-blank",
      prompt: "Complete the philosophic doubt cue.",
      sentence: "Philosophic doubt keeps conclusions open to ____ when new data appear.",
      answer: "revision",
      feedback:
        "Philosophic doubt means scientific conclusions are [tentative and revisable].",
    },
  },
  {
    slug: "selectionism-levels",
    label: "A.2",
    title: "Selectionism Across Levels",
    body: [
      "Selectionism explains behavior through [selection by consequences].",
      "Selection can occur across phylogenic, ontogenic, and cultural histories.",
    ],
    visual: {
      type: "matching",
      prompt: "Match each selection level to its cue.",
      pairs: [
        { term: "Phylogenic", definition: "Species history across evolution." },
        { term: "Ontogenic", definition: "Individual learning history." },
        { term: "Cultural", definition: "Practices selected across groups." },
      ],
    },
  },
  {
    slug: "assumption-discrimination-grid",
    label: "A.2",
    title: "Assumption Discrimination",
    body: [
      "Philosophical assumptions are easy to confuse because they all support scientific reasoning.",
      "Discriminate by asking whether the cue is about [data], [simplicity], [usefulness], [lawfulness], or [revision].",
    ],
    visual: {
      type: "matching",
      prompt: "Match each assumption to its fastest cue.",
      pairs: [
        { term: "Empiricism", definition: "Objective observation and data." },
        { term: "Parsimony", definition: "Simplest adequate explanation." },
        { term: "Pragmatism", definition: "Useful for prediction and action." },
        { term: "Philosophic doubt", definition: "Open to revision with new data." },
      ],
    },
  },
  {
    slug: "behaviorism-discipline",
    label: "A.4",
    title: "Behaviorism as Philosophy",
    body: [
      "Behaviorism is the [philosophy] of the science of behavior.",
      "It asks how behavior should be understood, explained, and studied.",
    ],
    visual: {
      type: "choice",
      prompt: "Which statement best describes behaviorism?",
      choices: [
        "The philosophical foundation for explaining behavior scientifically.",
        "Only direct service delivery with clients.",
        "Only laboratory research on reinforcement schedules.",
        "A data display method used in practice.",
      ],
      answer:
        "The philosophical foundation for explaining behavior scientifically.",
      hint:
        "Behaviorism is the philosophical lens, not the applied service branch.",
      feedback:
        "Behaviorism is the [philosophy] underlying behavior analysis.",
    },
  },
  {
    slug: "eab-aba-practice-map",
    label: "A.4",
    title: "EAB, ABA, and Professional Practice",
    body: [
      "Experimental Analysis of Behavior (EAB) is [basic research].",
      "Applied Behavior Analysis (ABA) applies principles to [socially significant behavior].",
      "Professional practice is the [delivery of behavior-analytic services].",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each activity by discipline.",
      categories: ["EAB/basic research", "ABA/professional practice"],
      items: [
        { label: "Laboratory study of reinforcement schedules", category: "EAB/basic research" },
        { label: "Teaching communication in a school program", category: "ABA/professional practice" },
        { label: "Testing behavior principles under controlled conditions", category: "EAB/basic research" },
        { label: "Training caregivers to implement a behavior plan", category: "ABA/professional practice" },
      ],
    },
  },
  {
    slug: "description-prediction-control",
    label: "A.1",
    title: "Description, Prediction, and Control",
    body: [
      "Description identifies [what behavior occurs].",
      "Prediction identifies [reliable covariation].",
      "Control shows behavior changes when [a variable is manipulated].",
    ],
    visual: {
      type: "flow",
      prompt: "Order the goals of science.",
      steps: [
        "Description: measure what occurs",
        "Prediction: identify reliable relations",
        "Control: manipulate variables to change behavior",
      ],
      feedback:
        "Behavior analysis moves from [description] to [prediction] to [control].",
    },
  },
  {
    slug: "explanation-vs-prediction",
    label: "A.1",
    title: "Explanation vs Prediction",
    body: [
      "Prediction says behavior [covaries with another event].",
      "Explanation requires a coherent account of [why the relation occurs] within behavior-environment relations.",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Prediction",
      leftText: "When X occurs, behavior is more likely",
      rightTitle: "Explanation",
      rightText: "Why the relation fits behavior principles",
      cue: "Prediction can occur without a full explanation.",
    },
  },
  {
    slug: "correlation-vs-causation",
    label: "A.1",
    title: "Correlation vs Causation",
    body: [
      "Correlation means events [covary].",
      "Causation in behavior analysis requires [experimental control].",
    ],
    visual: {
      type: "choice",
      prompt: "A BCBA notices problem behavior is higher on noisy days but has not manipulated noise. What has been shown?",
      choices: ["Correlation or prediction", "Experimental control", "Technological replication", "Generality"],
      answer: "Correlation or prediction",
      hint:
        "Ask whether a variable was manipulated or only observed with behavior.",
      feedback:
        "Covariation supports [prediction], but causation requires [experimental control].",
    },
  },
  {
    slug: "objective-observation",
    label: "A.2",
    title: "Objective Observation",
    body: [
      "Objective observation means recording events as [observable and measurable].",
      "It reduces reliance on labels, impressions, or inferred states.",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each statement by observation quality.",
      categories: ["Objective", "Needs revision"],
      items: [
        { label: "Left seat for 12 seconds after worksheet delivery", category: "Objective" },
        { label: "Was manipulative during math", category: "Needs revision" },
        { label: "Said 'help' within 5 seconds of the task direction", category: "Objective" },
        { label: "Had a bad attitude", category: "Needs revision" },
      ],
    },
  },
  {
    slug: "replication-scientific-thinking",
    label: "A.1",
    title: "Replication",
    body: [
      "Replication means an effect is [reproduced].",
      "Replication strengthens confidence that behavior change is not accidental or limited to one situation.",
    ],
    visual: {
      type: "choice",
      prompt: "Which example best reflects replication?",
      choices: [
        "The intervention effect occurs again when the condition is reintroduced.",
        "A single data point improves after one session.",
        "A behavior is described but not measured.",
        "A procedure is popular with staff.",
      ],
      answer:
        "The intervention effect occurs again when the condition is reintroduced.",
      hint:
        "Replication means the effect happens again under relevant conditions.",
      feedback:
        "Replication strengthens confidence through [repeated demonstration].",
    },
  },
  {
    slug: "measurement-protects-science",
    label: "A.1",
    title: "Why Measurement Matters",
    body: [
      "Measurement turns behavior change into [observable evidence].",
      "Without measurement, decisions drift toward opinion, preference, or authority.",
    ],
    visual: {
      type: "select-all",
      prompt: "Select reasons measurement supports scientific practice.",
      choices: [
        { label: "It allows data-based decisions.", correct: true },
        { label: "It helps detect whether intervention is effective.", correct: true },
        { label: "It replaces the need for operational definitions.", correct: false },
        { label: "It helps evaluate functional relations.", correct: true },
      ],
      feedback:
        "Measurement supports [data-based decisions] and protects against opinion-only practice.",
    },
  },
  {
    slug: "functional-relations-foundation",
    label: "A.1",
    title: "Functional Relations",
    body: [
      "A functional relation means behavior changes because of [systematic manipulation of a variable].",
      "It is stronger than noticing that two events happen together.",
    ],
    visual: {
      type: "choice",
      prompt: "Which example best supports a functional relation?",
      choices: [
        "Behavior changes repeatedly when the intervention is introduced and withdrawn.",
        "Behavior is high on days when the room is loud.",
        "Caregivers report behavior is improving.",
        "The behavior is socially important.",
      ],
      answer:
        "Behavior changes repeatedly when the intervention is introduced and withdrawn.",
      hint:
        "Look for systematic manipulation plus behavior change.",
      feedback:
        "Functional relations require [condition-linked behavior change].",
    },
  },
  {
    slug: "applied-dimension-expanded",
    label: "A.5",
    title: "Applied Dimension: Examples and Nonexamples",
    body: [
      "Applied targets are selected because they are [socially significant].",
      "The exam trap is confusing an easy-to-measure behavior with an important behavior.",
    ],
    visual: {
      type: "example",
      example:
        "Teaching a learner to request a break because it reduces dangerous elopement.",
      nonexample:
        "Measuring pencil taps because they are easy to count but not clinically important.",
    },
  },
  {
    slug: "behavioral-dimension-expanded",
    label: "A.5",
    title: "Behavioral Dimension: Examples and Nonexamples",
    body: [
      "Behavioral targets must be [observable and measurable].",
      "Replace labels with response definitions that can be counted, timed, or otherwise measured.",
    ],
    visual: {
      type: "example",
      example:
        "Raises hand above shoulder before speaking during group instruction.",
      nonexample: "Shows better self-esteem during class.",
    },
  },
  {
    slug: "analytic-dimension-expanded",
    label: "A.5",
    title: "Analytic Dimension: Examples and Nonexamples",
    body: [
      "Analytic work demonstrates [experimental control].",
      "A behavior change alone is not analytic unless the data support a functional relation.",
    ],
    visual: {
      type: "choice",
      prompt: "Which scenario best reflects the analytic dimension?",
      choices: [
        "Behavior changes only when the intervention is systematically introduced across tiers.",
        "A parent reports the child liked the intervention.",
        "The target behavior is socially important.",
        "The procedure is written in detailed steps.",
      ],
      answer:
        "Behavior changes only when the intervention is systematically introduced across tiers.",
      hint:
        "Analytic asks whether the data show experimental control.",
      feedback:
        "Analytic means the data support [a functional relation].",
    },
  },
  {
    slug: "technological-dimension-expanded",
    label: "A.5",
    title: "Technological Dimension: Examples and Nonexamples",
    body: [
      "Technological procedures are [clear enough to replicate].",
      "Vague phrases like 'prompt as needed' usually weaken this dimension.",
    ],
    visual: {
      type: "select-all",
      prompt: "Select details that strengthen technological writing.",
      choices: [
        { label: "When to present the antecedent", correct: true },
        { label: "Exact response definition", correct: true },
        { label: "Prompting and consequence steps", correct: true },
        { label: "A statement that the procedure should feel natural", correct: false },
      ],
      feedback:
        "Technological writing includes [clear procedural steps] that others can replicate.",
    },
  },
  {
    slug: "conceptually-systematic-expanded",
    label: "A.5",
    title: "Conceptually Systematic: Examples and Nonexamples",
    body: [
      "Conceptually systematic procedures are tied to [behavior-analytic principles].",
      "A procedure can be technological but not conceptually systematic if it lacks a behavioral rationale.",
    ],
    visual: {
      type: "choice",
      prompt: "Which statement is most conceptually systematic?",
      choices: [
        "Differential reinforcement will strengthen functional communication by arranging reinforcement for the alternative response.",
        "Use the program because it is popular.",
        "Follow the steps exactly as written.",
        "The target matters to the family.",
      ],
      answer:
        "Differential reinforcement will strengthen functional communication by arranging reinforcement for the alternative response.",
      hint:
        "Look for a connection to behavior-analytic principles.",
      feedback:
        "Conceptually systematic means the procedure is [principle-based].",
    },
  },
  {
    slug: "effective-dimension-expanded",
    label: "A.5",
    title: "Effective Dimension: Examples and Nonexamples",
    body: [
      "Effective change is [large enough to matter].",
      "Small data movement may not be effective if daily life does not improve.",
    ],
    visual: {
      type: "choice",
      prompt: "Which example best demonstrates effectiveness?",
      choices: [
        "Aggression drops from 20 episodes per week to 1 and family routines resume.",
        "Aggression drops from 20 episodes per week to 19.",
        "The procedure is linked to reinforcement.",
        "The behavior is measured with frequency.",
      ],
      answer:
        "Aggression drops from 20 episodes per week to 1 and family routines resume.",
      hint:
        "Effective asks whether the size of change is meaningful.",
      feedback:
        "Effective means behavior change has [practical importance].",
    },
  },
  {
    slug: "generality-dimension-expanded",
    label: "A.5",
    title: "Generality Dimension: Examples and Nonexamples",
    body: [
      "Generality means change [maintains or transfers].",
      "Look for new settings, people, materials, related behaviors, or time after teaching ends.",
    ],
    visual: {
      type: "select-all",
      prompt: "Select examples of generality.",
      choices: [
        { label: "The skill occurs with a new caregiver.", correct: true },
        { label: "The skill maintains after intervention is faded.", correct: true },
        { label: "The skill occurs only during prompted teaching trials.", correct: false },
        { label: "A related untrained response improves.", correct: true },
      ],
      feedback:
        "Generality includes [maintenance], [setting/person transfer], and related behavior change.",
    },
  },
  {
    slug: "dimension-scenario-sort",
    label: "A.5",
    title: "7 Dimensions Scenario Sort",
    body: [
      "Dimension scenarios require identifying the [critical feature].",
      "Do not choose a dimension because the scenario sounds generally positive.",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each scenario by the dimension cue.",
      categories: ["Social/measurement", "Control/replication"],
      items: [
        { label: "Target improves independence", category: "Social/measurement" },
        { label: "Response is directly countable", category: "Social/measurement" },
        { label: "Data show intervention caused change", category: "Control/replication" },
        { label: "Procedure can be implemented by another clinician", category: "Control/replication" },
      ],
    },
  },
  {
    slug: "science-protects-clients",
    label: "A.1",
    title: "Scientific Rigor Protects Clients",
    body: [
      "Scientific rigor protects clients by requiring [evidence before confidence].",
      "Measurement, replication, and functional relations reduce ineffective or harmful practice.",
    ],
    visual: {
      type: "choice",
      prompt: "Why does scientific rigor matter ethically?",
      choices: [
        "It reduces harm by requiring data before claiming that treatment works.",
        "It makes client preference unnecessary.",
        "It replaces informed consent.",
        "It allows clinicians to avoid collaboration.",
      ],
      answer:
        "It reduces harm by requiring data before claiming that treatment works.",
      hint:
        "Connect science to client protection and treatment benefit.",
      feedback:
        "Scientific rigor supports ethical care by requiring [evidence before confidence].",
    },
  },
  {
    slug: "evidence-based-foundations",
    label: "A.1",
    title: "Evidence-Based Practice Foundations",
    body: [
      "Evidence-based practice depends on [behavior-analytic principles, data, client values, and context].",
      "The philosophical foundation matters because it keeps practice observable, testable, and revisable.",
    ],
    visual: {
      type: "matching",
      prompt: "Match each foundation to its ethical value.",
      pairs: [
        { term: "Empiricism", definition: "Use objective data before deciding." },
        { term: "Philosophic doubt", definition: "Revise plans when evidence changes." },
        { term: "Pragmatism", definition: "Use explanations that improve action." },
        { term: "Parsimony", definition: "Avoid unnecessary assumptions." },
      ],
    },
  },
  {
    slug: "socially-significant-behavior",
    label: "A.5",
    title: "Socially Significant Behavior",
    body: [
      "Socially significant behavior improves [health, independence, access, safety, or quality of life].",
      "It links the applied dimension to ethical client-centered practice.",
    ],
    visual: {
      type: "choice",
      prompt: "Which target is most socially significant?",
      choices: [
        "Using a communication response to access help instead of severe problem behavior",
        "Completing a worksheet color preference survey because it is easy to graph",
        "Sitting in a preferred chair selected by staff",
        "Repeating a phrase that has no use outside teaching sessions",
      ],
      answer:
        "Using a communication response to access help instead of severe problem behavior",
      hint:
        "Look for meaningful improvement in safety, access, independence, or quality of life.",
      feedback:
        "Social significance is about [meaningful benefit in the learner's life].",
    },
  },
];

const sectionCExpandedMiniLessons: MiniLessonContent[] = [
  {
    slug: "operational-definitions-and-measurement",
    label: "C.1",
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
    label: "C.2",
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
    label: "C.3",
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
    label: "C.4",
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
    label: "C.5",
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
    label: "C.6",
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
    label: "C.7",
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
    label: "C.5",
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
    label: "C.3",
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
    label: "C.8",
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
      hint: "IOA is about agreement in measurement, not whether an intervention caused behavior change.",
      feedback:
        "IOA evaluates consistency between observers' data records.",
    },
  },
  {
    slug: "count-ioa",
    label: "C.8",
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
    label: "C.8",
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
    label: "C.8",
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
    label: "C.10",
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
    label: "C.11",
    title: "Level, Trend, and Variability",
    body: [
      "Level asks [how high or low] data are.",
      "Trend asks [direction]; variability asks [how much data fluctuate].",
    ],
    visual: {
      type: "choice",
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
    label: "C.11",
    title: "Immediacy, Overlap, and Data Interpretation",
    body: [
      "Immediacy asks whether behavior changes [right after a condition change].",
      "Overlap asks how much data from one condition [share the same range] as data from another condition.",
    ],
    visual: {
      type: "choice",
      prompt: "Which visual-analysis cue focuses on data right around a condition change?",
      choices: [
        "Immediacy",
        "Level",
        "Legend",
        "Trial-by-trial IOA",
      ],
      answer: "Immediacy",
      hint: "Look for the cue that compares data immediately before and after the condition changes.",
      feedback:
        "Immediacy evaluates [how quickly data change] after a condition change.",
    },
  },
  {
    slug: "baseline-intervention-maintenance-generalization",
    label: "C.11",
    title: "Baseline, Intervention, Maintenance, and Generalization Data",
    body: [
      "Initial data show [starting level, trend, and variability before decisions].",
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
    slug: "data-based-decision-making",
    label: "C.11",
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
        "Make a confident data-based conclusion",
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
    graphId: "measurement-level-change",
    prompt:
      "Initial data are high and stable. After a condition change, behavior immediately drops to a lower, stable level with little overlap. Which data-interpretation statement is strongest?",
    choices: ["Clear level change with strong immediacy", "No interpretable data pattern", "High variability blocks interpretation", "Only the axis label should be interpreted"],
    answer: "Clear level change with strong immediacy",
    explanation:
      "A clear level change with immediacy and low overlap supports a stronger [visual-analysis interpretation].",
    hint:
      "Compare level, immediacy, overlap, and stability across the phase change.",
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
    choices: ["Generalization", "Duration IOA", "Initial data pattern", "Momentary time sampling"],
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
      "Latency measures observer agreement; IRT measures frequency.",
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
    graphId: "measurement-level-change",
    prompt:
      "In a graph, data shift from high initial levels to lower levels immediately after a phase change, with little overlap. Which visual analysis feature is most directly described?",
    choices: ["Immediacy of effect", "Generalization", "Total count IOA", "Momentary time sampling"],
    answer: "Immediacy of effect",
    explanation:
      "Immediacy of effect evaluates whether behavior changes right after a condition change.",
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
    choices: ["Generalization", "Latency", "Permanent product", "Rate"],
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
];

const sectionDMiniLessons: MiniLessonContent[] = [
  {
    slug: "single-case-design-measures",
    label: "D.1",
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
    label: "D.4",
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
    label: "D.7",
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
    label: "D.7",
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
    label: "D.4",
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
    slug: "single-case-vs-group-design-strengths",
    label: "D.5",
    title: "Single-Case and Group Design Strengths",
    body: [
      "Single-case designs show behavior change through [repeated measurement of individual behavior].",
      "Group designs summarize [aggregate performance across participants].",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Single-case design",
      leftText: "Individual serves as their own control through repeated measures",
      rightTitle: "Group design",
      rightText: "Compares or summarizes performance across participants",
      cue: "Design comparison asks for the [relative strengths] of each design approach.",
    },
  },
  {
    slug: "multiple-baseline-participants",
    label: "D.7",
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
    label: "D.7",
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
    label: "D.7",
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
    label: "D.7",
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
    label: "D.7",
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
    label: "D.7",
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
    label: "D.7",
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
    label: "D.6",
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
    label: "D.6",
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
    label: "D.4",
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
    label: "D.2",
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
    label: "D.3",
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
    label: "D.9",
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

const sectionDAdditionalMiniLessons: MiniLessonContent[] = [
  {
    slug: "prediction-verification-replication-deep-dive",
    label: "D.4",
    title: "Prediction, Verification, and Replication",
    body: [
      "Prediction estimates [what behavior would do without intervention].",
      "Verification and replication strengthen confidence that [the independent variable produced the behavior change].",
    ],
    visual: {
      type: "graph",
      graphId: "reversal-pvr",
      graphTitle: "Withdrawal Design Logic",
      phases: [
        { label: "Prediction", detail: "Baseline predicts [future responding].", tone: "blue" },
        { label: "Verification", detail: "Return to baseline tests [that prediction].", tone: "teal" },
        { label: "Replication", detail: "Reintroduction repeats [the intervention effect].", tone: "green" },
      ],
      cue: "Note: experimental control is stronger when behavior changes [with repeated condition changes].",
      prompt: "Which feature best shows replication?",
      choices: [
        "Behavior changes again when the intervention is reintroduced",
        "Baseline has one data point",
        "The graph has a y-axis label",
        "The first intervention phase starts after baseline",
      ],
      answer: "Behavior changes again when the intervention is reintroduced",
      hint:
        "Replication means the effect is [reproduced], not just observed once.",
      feedback:
        "Replication supports a functional relation when the behavior change [occurs again] after reintroduction of the independent variable.",
    },
  },
  {
    slug: "internal-vs-external-validity-deep-dive",
    label: "D.2",
    title: "Internal vs External Validity",
    body: [
      "Internal validity asks whether [the independent variable caused the behavior change].",
      "External validity asks whether the finding [generalizes beyond the original conditions].",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Internal validity",
      leftText: "Can we rule out alternative explanations inside this study?",
      rightTitle: "External validity",
      rightText: "Will the effect generalize across people, settings, behaviors, or time?",
      cue: "Internal = [causal control]. External = [generality].",
    },
  },
  {
    slug: "threats-to-internal-validity-expanded",
    label: "D.3",
    title: "Threats to Internal Validity",
    body: [
      "Threats to internal validity are [alternative explanations] for behavior change.",
      "Common threats include history, maturation, instrumentation, testing effects, sequence effects, and observer drift.",
    ],
    visual: {
      type: "matching",
      prompt: "Match each threat to its cue.",
      pairs: [
        { term: "History", definition: "An outside event occurs during the study." },
        { term: "Maturation", definition: "Natural change over time may explain change." },
        { term: "Instrumentation", definition: "Measurement procedures change." },
        { term: "Observer drift", definition: "Observers gradually score differently from the definition." },
      ],
    },
  },
  {
    slug: "repeated-measurement",
    label: "D.4",
    title: "Repeated Measurement",
    body: [
      "Repeated measurement shows [patterns over time], not just one before-and-after snapshot.",
      "It helps detect trend, variability, treatment effects, and ongoing behavior change.",
    ],
    visual: {
      type: "graph",
      graphId: "reversal-aba",
      graphTitle: "Repeated Measures Across Sessions",
      phases: [
        { label: "Trend", detail: "Repeated points show [direction].", tone: "blue" },
        { label: "Variability", detail: "Repeated points show [fluctuation].", tone: "teal" },
        { label: "Effect", detail: "Condition changes can be compared [across time].", tone: "green" },
      ],
      cue: "Note: repeated data points make visual analysis possible.",
      prompt: "Why does repeated measurement matter in single-case design?",
      choices: [
        "It reveals data patterns across time and condition changes",
        "It replaces the need to define behavior",
        "It proves external validity without replication",
        "It removes all threats to validity automatically",
      ],
      answer: "It reveals data patterns across time and condition changes",
      hint:
        "Think about what several data points show that one pre/post score cannot show.",
      feedback:
        "Repeated measurement supports visual analysis by showing [level, trend, variability, and change across conditions].",
    },
  },
  {
    slug: "stability-before-intervention",
    label: "D.4-D.6",
    title: "Stability Before Intervention",
    body: [
      "A stable baseline improves prediction because data show [limited trend and manageable variability].",
      "A strongly improving or highly variable baseline can weaken conclusions about the intervention effect.",
    ],
    visual: {
      type: "choice",
      prompt: "Which baseline pattern gives the clearest prediction before intervention?",
      choices: [
        "Stable responding with little trend in the direction of treatment",
        "A steep improving trend before treatment begins",
        "Highly variable data with no interpretable pattern",
        "No baseline data before intervention",
      ],
      answer: "Stable responding with little trend in the direction of treatment",
      hint:
        "Look for a baseline that supports [a clear prediction] of future responding.",
      feedback:
        "Stable baseline data make it easier to judge whether later behavior change is tied to [the intervention].",
    },
  },
  {
    slug: "comparative-analyses-expanded",
    label: "D.8",
    title: "Comparative Analyses",
    body: [
      "Comparative analysis asks [which intervention or condition produces the stronger effect].",
      "It can also consider efficiency, side effects, feasibility, and clinical fit.",
    ],
    visual: {
      type: "graph",
      graphId: "alternating-standard",
      graphTitle: "Comparative Analysis Cue",
      phases: [
        { label: "Condition A", detail: "One intervention produces [one data path].", tone: "blue" },
        { label: "Condition B", detail: "Another intervention produces [a second data path].", tone: "teal" },
        { label: "Decision", detail: "Choose based on [effects and efficiency].", tone: "green" },
      ],
      cue: "Note: comparative analysis compares [whole conditions or interventions].",
      prompt: "What is the main question in comparative analysis?",
      choices: [
        "Which intervention or condition produces the better outcome?",
        "Which single component inside a package is necessary?",
        "Which value of one variable is optimal?",
        "Will effects generalize to a new setting?",
      ],
      answer: "Which intervention or condition produces the better outcome?",
      hint:
        "Look for a comparison across [whole interventions or conditions].",
      feedback:
        "Comparative analysis evaluates [relative treatment effects] and can guide efficient intervention selection.",
    },
  },
  {
    slug: "component-analyses-expanded",
    label: "D.8",
    title: "Component Analyses",
    body: [
      "Component analysis identifies [which treatment elements are active or necessary].",
      "Elements may be added, removed, or isolated to simplify treatment responsibly.",
    ],
    visual: {
      type: "flow",
      prompt: "Order a component analysis logic chain.",
      steps: [
        "Start with treatment package",
        "Remove or isolate one element",
        "Compare behavior change",
        "Keep necessary components",
      ],
      feedback:
        "Component analysis asks which parts of a package are [necessary, sufficient, efficient, or effective].",
    },
  },
  {
    slug: "parametric-analyses-expanded",
    label: "D.8",
    title: "Parametric Analyses",
    body: [
      "Parametric analysis manipulates [different values of one independent variable].",
      "Examples include schedule value, dosage, duration, intensity, magnitude, or frequency.",
    ],
    visual: {
      type: "choice",
      prompt:
        "A BCBA compares 30-second, 60-second, and 120-second reinforcement durations. Which analysis is described?",
      choices: [
        "Parametric analysis",
        "Component analysis",
        "External validity analysis",
        "History threat analysis",
      ],
      answer: "Parametric analysis",
      hint:
        "Look for [different values of one variable] while the rest of the procedure stays constant.",
      feedback:
        "Parametric analysis evaluates [which value or amount] of one independent variable works best.",
    },
  },
  {
    slug: "experimental-design-selection-expanded",
    label: "D.9",
    title: "Experimental Design Selection",
    body: [
      "Design selection depends on [reversibility, ethics, speed of comparison, and the clinical question].",
      "Choose the design that can demonstrate experimental control without compromising client welfare.",
    ],
    visual: {
      type: "choice",
      prompt:
        "An effective intervention should not be withdrawn because the behavior is dangerous. Which design is often strongest?",
      choices: [
        "Multiple Baseline Design",
        "A-B-A-B Withdrawal Design",
        "Simple A-B Design only",
        "Changing Criterion Design only because all behavior is irreversible",
      ],
      answer: "Multiple Baseline Design",
      hint:
        "Choose a design that can show control [without removing an effective intervention].",
      feedback:
        "Multiple Baseline Designs can show experimental control through [staggered intervention] when withdrawal is unethical or impractical.",
    },
  },
  {
    slug: "visual-analysis-practice-expanded",
    label: "D.6",
    title: "Visual Analysis Practice",
    body: [
      "Visual analysis integrates [level, trend, variability, immediacy, overlap, and consistency].",
      "Strong interpretation depends on patterns within phases and across similar phases.",
    ],
    visual: {
      type: "select-all",
      prompt: "Select visual-analysis features used to judge treatment effects.",
      choices: [
        { label: "Level", correct: true },
        { label: "Trend", correct: true },
        { label: "Immediacy of effect", correct: true },
        { label: "Overlap", correct: true },
        { label: "Client age as the only graph feature", correct: false },
      ],
      feedback:
        "Visual analysis examines [level, trend, variability, immediacy, overlap, and consistency] to evaluate treatment effects.",
    },
  },
];

const sectionCMeasurementExpansionMiniLessons: MiniLessonContent[] = [
  {
    slug: "repeatability",
    label: "C.1",
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
    label: "C.1",
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
    label: "C.1",
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
    label: "C.1",
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
    label: "C.1",
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
    label: "C.1",
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
    label: "C.2",
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
    label: "C.2",
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
    label: "C.2",
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
    label: "C.2",
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
    label: "C.2",
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
    label: "C.2",
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
    label: "C.2",
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
    label: "C.3",
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
    label: "C.3",
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
    label: "C.3",
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
    label: "C.3",
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
    label: "C.3",
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
    label: "C.3",
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
    label: "C.2-C.3",
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
    label: "C.4",
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
    label: "C.4",
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
    label: "C.5",
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
    label: "C.5",
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
    label: "C.5",
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
    label: "C.5",
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
    label: "C.6",
    title: "Level",
    body: [
      "Level is the [vertical position] of data.",
      "Compare level within and across phases to judge behavior change.",
    ],
    visual: {
      type: "choice",
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
    label: "C.6",
    title: "Trend",
    body: [
      "Trend is the [overall direction], and variability is [how much data fluctuate].",
      "Trend may be increasing, decreasing, zero, or variable.",
    ],
    visual: {
      type: "choice",
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
    label: "C.6",
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
    label: "C.6",
    title: "Level, Trend, and Variability",
    body: [
      "Level, trend, and variability are read together during visual analysis.",
      "Separate [vertical position], [direction], and [bounce] before judging effect.",
    ],
    visual: {
      type: "choice",
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
    label: "C.6",
    title: "Immediacy of Effect",
    body: [
      "Immediate behavior change occurs [quickly after a condition change].",
      "Strong immediacy means the data shift right after the phase change line.",
    ],
    visual: {
      type: "choice",
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
    label: "C.6",
    title: "Immediate vs Delayed Change",
    body: [
      "Immediate behavior change occurs [right after a condition change].",
      "Delayed change means the data shift [only after additional sessions].",
    ],
    visual: {
      type: "choice",
      prompt: "What best supports an immediate data-pattern change?",
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
    label: "C.7",
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
        "Make a confident data-based conclusion immediately.",
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

const sectionEMiniLessons: MiniLessonContent[] = [
  {
    slug: "ethics-code-foundations",
    label: "E.1",
    title: "BACB Ethics Code Foundations",
    body: [
      "Ethical practice protects [client welfare, dignity, and rights].",
      "Ethical decisions use the [BACB Ethics Code], [clinical data], [supervision], [documentation], and [applicable law].",
    ],
    visual: {
      type: "select-all",
      prompt: "Select anchors for ethical decision making.",
      choices: [
        { label: "Client dignity and welfare", correct: true },
        { label: "Informed consent and assent when applicable", correct: true },
        { label: "Accurate documentation of decisions", correct: true },
        { label: "Convenience for the provider before client rights", correct: false },
      ],
      feedback:
        "Ethics starts with [client welfare and dignity], [informed consent], [accurate records], and [professional responsibility].",
    },
  },
  {
    slug: "client-dignity",
    label: "E.1",
    title: "Client Dignity",
    body: [
      "Client dignity means services protect [respect, privacy, autonomy, and humane care].",
      "Dignity is evaluated in how goals are selected, procedures are implemented, and [people are discussed respectfully].",
    ],
    visual: {
      type: "example",
      example:
        "A team teaches functional communication and offers choices before using more intrusive procedures.",
      nonexample:
        "A team discusses a learner's behavior loudly in a public hallway.",
    },
  },
  {
    slug: "informed-consent",
    label: "E.4",
    title: "Informed Consent",
    body: [
      "Informed consent requires [voluntary agreement] after understanding procedures and risks.",
      "Explain goals, procedures, risks, benefits, alternatives, data use, and [the right to withdraw consent].",
    ],
    visual: {
      type: "flow",
      prompt: "Order an informed-consent sequence.",
      steps: [
        "Describe the service or procedure",
        "Explain risks, benefits, and alternatives",
        "Check understanding and answer questions",
        "Document voluntary consent",
      ],
      feedback:
        "Informed consent is a [voluntary process], not just a signature.",
    },
  },
  {
    slug: "confidentiality",
    label: "E.4",
    title: "Confidentiality",
    body: [
      "Confidentiality protects [private client information].",
      "Share information only with [authorization or legal/ethical requirement].",
    ],
    visual: {
      type: "choice",
      prompt: "Which action best protects confidentiality?",
      choices: [
        "Discussing client progress in a private team meeting with authorized people",
        "Posting a client success story with identifying details",
        "Texting a full treatment plan to a personal phone",
        "Talking about a client in a waiting room without names but with details",
      ],
      answer:
        "Discussing client progress in a private team meeting with authorized people",
      hint:
        "Ask who is [authorized to access private client information] and whether identifying information is protected.",
      feedback:
        "Confidentiality requires [authorized access to private client information].",
    },
  },
  {
    slug: "scope-of-competence",
    label: "E.3",
    title: "Scope of Competence",
    body: [
      "Scope of competence means working within [training, supervised experience, and current skills].",
      "When a case requires skills outside competence, obtain [supervision, training, consultation, or referral].",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each action by ethical fit.",
      categories: ["Within scope process", "Needs correction"],
      items: [
        { label: "Seek consultation before treating a new specialty area", category: "Within scope process" },
        { label: "Accept a case without relevant training because the family is urgent", category: "Needs correction" },
        { label: "Document supervised competency before implementing a new assessment", category: "Within scope process" },
        { label: "Advertise expertise based only on one webinar", category: "Needs correction" },
      ],
    },
  },
  {
    slug: "conflicts-of-interest",
    label: "E.7",
    title: "Conflicts of Interest",
    body: [
      "A conflict of interest occurs when another interest could [bias professional judgment].",
      "Identify, disclose, avoid, or manage conflicts before they [affect client-centered services].",
    ],
    visual: {
      type: "choice",
      prompt: "Which scenario most clearly creates a conflict of interest?",
      choices: [
        "A BCBA recommends a service provider owned by their spouse without disclosure",
        "A BCBA reviews data with a supervisor",
        "A BCBA uses a signed consent form before assessment",
        "A BCBA adjusts a plan based on treatment integrity data",
      ],
      answer:
        "A BCBA recommends a service provider owned by their spouse without disclosure",
      hint:
        "Look for a personal, financial, or organizational interest that could [bias professional judgment].",
      feedback:
        "Conflicts require [disclosure and management] so professional judgment stays client-centered.",
    },
  },
  {
    slug: "multiple-relationships",
    label: "E.7",
    title: "Multiple Relationships",
    body: [
      "Multiple relationships occur when a professional relationship overlaps with [another professional or personal role].",
      "The risk is [impaired objectivity], exploitation, or harm.",
    ],
    visual: {
      type: "matching",
      prompt: "Match each ethics term to its cue.",
      pairs: [
        { term: "Conflict of interest", definition: "Another interest may [bias professional judgment]." },
        { term: "Multiple relationship", definition: "The BCBA has [overlapping professional and personal roles] with the same person." },
        { term: "Boundary", definition: "A professional limit that [protects objective, client-centered services]." },
        { term: "Referral", definition: "A safer option when [objectivity or competence] is compromised." },
      ],
    },
  },
  {
    slug: "professional-boundaries",
    label: "E.7",
    title: "Professional Boundaries",
    body: [
      "Professional boundaries keep services [objective, safe, and client-centered].",
      "Warm rapport is appropriate; [blurred personal roles] can create ethical risk.",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Professional rapport",
      leftText: "Kind, [respectful and service-focused]",
      rightTitle: "Boundary risk",
      rightText: "Personal role overlap that may [impair professional judgment]",
      cue: "Boundary decisions protect [client welfare and professional objectivity], not practitioner personal interests.",
    },
  },
  {
    slug: "documentation-record-keeping",
    label: "E.3",
    title: "Documentation and Record Keeping",
    body: [
      "Documentation should be [accurate, timely, objective, and secure].",
      "Records support continuity of care, accountability, billing accuracy, and [ethical decision making].",
    ],
    visual: {
      type: "select-all",
      prompt: "Select ethical documentation practices.",
      choices: [
        { label: "Record objective data and service changes promptly", correct: true },
        { label: "Store records using secure systems", correct: true },
        { label: "Document consent, risks, decisions, and follow-up", correct: true },
        { label: "Change old data to make a graph look more effective", correct: false },
      ],
      feedback:
        "Ethical records are [accurate, secure, and clinically useful].",
    },
  },
  {
    slug: "supervision-ethics",
    label: "E.10",
    title: "Supervision Ethics",
    body: [
      "Supervision must match [supervisee competence and client needs].",
      "Ethical supervisors train, observe, give feedback, document performance, and [monitor client outcomes].",
    ],
    visual: {
      type: "matching",
      prompt: "Match each supervision responsibility to its cue.",
      pairs: [
        { term: "Competence", definition: "Assign tasks the supervisee can perform with [appropriate training for assigned duties]." },
        { term: "Observation", definition: "Watch implementation [directly or through reliable review]." },
        { term: "Feedback", definition: "Give [behavior-specific correction and reinforcement]." },
        { term: "Documentation", definition: "Record supervision activities and [supervisee performance concerns]." },
      ],
    },
  },
  {
    slug: "treatment-integrity",
    label: "E.10",
    title: "Treatment Integrity",
    body: [
      "Treatment integrity means procedures are [implemented as designed].",
      "Low integrity can make [outcome data hard to interpret] and may harm client progress.",
    ],
    visual: {
      type: "fill-blank",
      prompt: "Complete the treatment integrity cue.",
      sentence: "Treatment integrity means the plan is implemented as ____.",
      answer: "designed",
      feedback:
        "Treatment integrity protects [client outcomes and behavior-change interpretation].",
    },
  },
  {
    slug: "least-restrictive-effective",
    label: "E.9",
    title: "Least Restrictive and Effective Procedures",
    body: [
      "Ethical intervention balances [effective procedures] with [minimally intrusive procedures].",
      "Use function-based, reinforcement-based, and consented procedures before considering [more intrusive options].",
    ],
    visual: {
      type: "choice",
      prompt: "Which decision best reflects least restrictive effective practice?",
      choices: [
        "Start with a function-based reinforcement procedure and monitor data before adding intrusive components",
        "Use the most intrusive procedure first because it may work faster",
        "Avoid data collection if the procedure feels acceptable",
        "Continue an ineffective plan because it is less restrictive",
      ],
      answer:
        "Start with a function-based reinforcement procedure and monitor data before adding intrusive components",
      hint:
        "Balance [clinical effect and procedural restrictiveness] with consent, function, and ongoing data.",
      feedback:
        "Least restrictive effective practice requires [data-based benefit and ethical safeguards].",
    },
  },
  {
    slug: "behavior-change-consent",
    label: "E.4",
    title: "Behavior-Change Procedures and Consent",
    body: [
      "Behavior-change plans require consent for [goals, procedures, risks, benefits, and alternatives].",
      "Consent should be revisited when [procedures change or risk increases].",
    ],
    visual: {
      type: "flow",
      prompt: "Order ethical behavior-change planning.",
      steps: [
        "Assess function and social significance",
        "Select effective and least restrictive procedures",
        "Explain risks, benefits, and alternatives",
        "Obtain and document consent before implementation",
      ],
      feedback:
        "Ethical behavior-change planning joins [assessment, effectiveness, least restriction, and consent].",
    },
  },
  {
    slug: "cultural-responsiveness",
    label: "E.9",
    title: "Cultural Responsiveness",
    body: [
      "Cultural responsiveness means services account for [client values, context, language, and preferences].",
      "It does not mean abandoning data; it means selecting goals and procedures with [cultural humility and collaboration].",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each action by cultural responsiveness.",
      categories: ["Responsive", "Needs revision"],
      items: [
        { label: "Ask caregivers how routines and values affect goals", category: "Responsive" },
        { label: "Assume one family routine should apply to all clients", category: "Needs revision" },
        { label: "Use interpreters or translated materials when needed", category: "Responsive" },
        { label: "Dismiss client preference because the protocol is familiar", category: "Needs revision" },
      ],
    },
  },
  {
    slug: "reporting-concerns",
    label: "E.12",
    title: "Reporting Concerns",
    body: [
      "Reporting concerns means responding when [client welfare, rights, or professional standards] may be at risk.",
      "Use documentation, consultation, supervision, mandated reporting rules, and [organizational reporting channels] as appropriate.",
    ],
    visual: {
      type: "choice",
      prompt: "A supervisee reports that data are being changed before billing reports are sent. What should the BCBA do first?",
      choices: [
        "Document the concern, protect client records, and follow ethical and organizational reporting steps",
        "Ignore it because no client complained",
        "Change the data back without telling anyone",
        "Post about the agency online to warn families",
      ],
      answer:
        "Document the concern, protect client records, and follow ethical and organizational reporting steps",
      hint:
        "Think about [client welfare, accurate records, confidentiality, and responsible reporting].",
      feedback:
        "Ethical reporting uses [documentation, confidentiality, and appropriate reporting channels].",
    },
  },
  {
    slug: "ethical-decision-making",
    label: "E.1",
    title: "Ethical Decision-Making Sequence",
    body: [
      "Ethical decision making is [systematic, documented, and consultative].",
      "A defensible decision considers [code requirements, risks, stakeholders, data, consultation, and follow-up].",
    ],
    visual: {
      type: "flow",
      prompt: "Order an ethical decision-making sequence.",
      steps: [
        "Identify the ethical concern and affected parties",
        "Review code, law, data, and relevant policies",
        "Consult appropriately while protecting confidentiality",
        "Act, document, monitor, and follow up",
      ],
      feedback:
        "Ethical decision making prioritizes [client dignity and safety] from concern to follow-up.",
    },
  },
];

const sectionEPracticeQuestions: QuestionContent[] = [
  {
    type: "scenario",
    prompt:
      "A family asks to begin a new punishment-based procedure immediately, but the BCBA has not reviewed risks, benefits, alternatives, or consent. What is the best next action?",
    choices: [
      "Review the procedure, risks, benefits, alternatives, and obtain informed consent before implementation",
      "Start immediately because the family requested it",
      "Ask the RBT to implement it without documentation",
      "Avoid all behavior-change procedures because consent is complicated",
    ],
    answer:
      "Review the procedure, risks, benefits, alternatives, and obtain informed consent before implementation",
    explanation:
      "Ethical behavior-change procedures require [informed consent], data-based selection, and safeguards before implementation.",
    hint:
      "Focus on [consent, risk, alternatives, and documentation] before changing procedures.",
  },
  {
    type: "matching",
    prompt: "Match each ethics concept to its discrimination cue.",
    pairs: [
      { term: "Confidentiality", definition: "Protect [private client information]." },
      { term: "Scope of competence", definition: "Work within [training, supervised experience, and current skills]." },
      { term: "Conflict of interest", definition: "Another interest may [bias professional judgment]." },
      { term: "Treatment integrity", definition: "Procedures are [implemented as designed]." },
    ],
    answer: "All ethics concepts matched correctly",
    explanation:
      "Ethical discrimination depends on whether the issue involves [information protection], [provider competence], [judgment bias], or [implementation accuracy].",
    hint:
      "Separate [information protection], [provider skill], [judgment bias], and [fidelity to the plan].",
  },
  {
    type: "select-all",
    prompt: "Select ethical documentation practices.",
    choices: [
      "Document consent and major treatment changes",
      "Record objective data and service decisions promptly",
      "Secure records from unauthorized access",
      "Rewrite data later if the intervention should have worked",
    ],
    answers: [
      "Document consent and major treatment changes",
      "Record objective data and service decisions promptly",
      "Secure records from unauthorized access",
    ],
    answer:
      "Consent, objective data, service decisions, and secure records are ethical documentation practices",
    explanation:
      "Documentation should be [accurate, timely, objective, and secure].",
    hint:
      "Look for practices that protect [accuracy, security, and continuity of care].",
  },
  {
    type: "sorting",
    prompt: "Sort each scenario by the primary ethics issue.",
    categories: ["Competence or boundaries", "Confidentiality or records"],
    items: [
      { label: "Accepting a specialty case without training or consultation", category: "Competence or boundaries" },
      { label: "Discussing a client in a public hallway", category: "Confidentiality or records" },
      { label: "Becoming a paid babysitter for a current client", category: "Competence or boundaries" },
      { label: "Changing session notes after billing review", category: "Confidentiality or records" },
    ],
    answer: "Ethics scenarios sorted by primary issue",
    explanation:
      "Competence and boundaries involve [professional role and skill]; confidentiality and records involve [information protection and accuracy].",
    hint:
      "Ask whether the concern is about [professional role and boundary concerns] or about client information and records.",
  },
  {
    type: "fill-blank",
    prompt:
      "Complete the cue: Treatment integrity means procedures are implemented as ____.",
    answer: "designed",
    explanation:
      "Treatment integrity means procedures are [implemented as designed], which protects outcomes and interpretation.",
    hint:
      "This term asks whether implementation matched the written plan.",
  },
  {
    type: "scenario",
    prompt:
      "A BCBA is offered a referral bonus for recommending one therapy product to all clients. What is the main ethical concern?",
    choices: [
      "A conflict of interest may bias recommendations",
      "The procedure automatically has high treatment integrity",
      "The product is confidential information",
      "The referral bonus proves external validity",
    ],
    answer: "A conflict of interest may bias recommendations",
    explanation:
      "A conflict of interest occurs when another interest may [bias professional judgment].",
    hint:
      "Look for a financial or personal interest that could [influence clinical recommendations].",
  },
  {
    type: "scenario",
    prompt:
      "A supervisor assigns an RBT to implement a new procedure after modeling it once, without observing performance or giving feedback. What is the strongest concern?",
    choices: [
      "Supervision ethics and treatment integrity",
      "External validity",
      "Permanent product recording",
      "Generalized conditioned reinforcement",
    ],
    answer: "Supervision ethics and treatment integrity",
    explanation:
      "Ethical supervision includes [training, observation, feedback, documentation, and monitoring implementation].",
    hint:
      "Focus on whether the supervisee was [trained and monitored] sufficiently for accurate implementation.",
  },
  {
    type: "scenario",
    prompt:
      "A team selects a goal without asking the client or family about priorities, culture, routines, or language needs. Which ethical area is most directly weak?",
    choices: [
      "Cultural responsiveness and client dignity",
      "Rate measurement",
      "Multiple baseline logic",
      "Schedule thinning",
    ],
    answer: "Cultural responsiveness and client dignity",
    explanation:
      "Culturally responsive services consider [values, context, language, preferences, and collaboration].",
    hint:
      "Look for missing collaboration with [client values and contextual variables].",
  },
  {
    type: "scenario",
    prompt:
      "A behavior plan is less intrusive but has produced no meaningful improvement after adequate implementation. What is the best ethical interpretation?",
    choices: [
      "Least restrictive procedures must also be effective, so the plan should be reviewed",
      "Least restrictive always means continuing the same plan",
      "Effectiveness is irrelevant when procedures are mild",
      "Consent is no longer needed after the first plan",
    ],
    answer:
      "Least restrictive procedures must also be effective, so the plan should be reviewed",
    explanation:
      "Ethical treatment balances [least restrictive procedures] with [effective procedures].",
    hint:
      "Consider both [procedural restrictiveness] and whether the data show meaningful benefit.",
  },
  {
    type: "scenario",
    prompt:
      "A BCBA notices possible billing fraud and altered data in client records. What should guide the response?",
    choices: [
      "Document, protect confidentiality, consult/report through appropriate channels, and follow up",
      "Ignore it if services are still occurring",
      "Post identifying details publicly",
      "Delete the records to prevent harm",
    ],
    answer:
      "Document, protect confidentiality, consult/report through appropriate channels, and follow up",
    explanation:
      "Ethical concern reporting requires [documentation, confidentiality, appropriate channels, and follow-up].",
    hint:
      "Think systematic response: [protect records and report appropriately], consult/report appropriately, and document.",
  },
];

const sectionEMasteryQuestions: QuestionContent[] = [
  {
    type: "scenario",
    prompt:
      "A BCBA explains a proposed intervention, risks, benefits, alternatives, data use, and the right to withdraw before the caregiver agrees. Which ethical process is best described?",
    choices: ["Informed consent", "Treatment integrity", "Multiple relationship", "External validity"],
    answer: "Informed consent",
    explanation:
      "Informed consent requires [voluntary agreement] after clear information about procedures and risks.",
    hint:
      "Focus on [agreement after risks, benefits, alternatives, and rights are explained].",
  },
  {
    type: "scenario",
    prompt:
      "A BCBA discusses a client's treatment details with a friend in a restaurant, without using the client's name but with enough details to identify them. Which issue is most relevant?",
    choices: ["Confidentiality", "Parametric analysis", "Treatment generality", "Frequency recording"],
    answer: "Confidentiality",
    explanation:
      "Confidentiality protects [private client information], even when names are omitted.",
    hint:
      "Ask whether client information could be [identified or accessed by unauthorized people].",
  },
  {
    type: "scenario",
    prompt:
      "A BCBA is asked to treat severe feeding concerns but has no training, supervised experience, or consultation in feeding intervention. What is the best ethical action?",
    choices: [
      "Seek training, supervision, consultation, or referral before providing the service",
      "Accept the case because all BCBAs can treat every behavior",
      "Implement a plan from the internet and monitor later",
      "Ask the family to sign a waiver so competence is not required",
    ],
    answer:
      "Seek training, supervision, consultation, or referral before providing the service",
    explanation:
      "Scope of competence depends on [training, supervised experience, and current skills].",
    hint:
      "Focus on whether the provider has [competence for this specialty area].",
  },
  {
    type: "scenario",
    prompt:
      "A provider recommends a clinic owned by a close family member without disclosing the relationship. Which ethical concern is strongest?",
    choices: ["Conflict of interest", "Momentary time sampling", "Response generalization", "Permanent product recording"],
    answer: "Conflict of interest",
    explanation:
      "A conflict of interest exists when another interest may [bias professional judgment].",
    hint:
      "Look for a personal or financial relationship that could [influence professional recommendations].",
  },
  {
    type: "scenario",
    prompt:
      "A current client's caregiver asks the BCBA to become the child's paid weekend tutor outside services. Which concept should the BCBA evaluate first?",
    choices: ["Multiple relationship and professional boundaries", "External validity only", "Total count IOA", "Line graph construction"],
    answer: "Multiple relationship and professional boundaries",
    explanation:
      "Multiple relationships create overlapping roles that may impair [professional objectivity] or create harm.",
    hint:
      "Ask whether a [second role overlaps with the existing professional relationship].",
  },
  {
    type: "scenario",
    prompt:
      "An RBT implements a teaching procedure differently from the written plan, and progress data become difficult to interpret. Which issue is most directly involved?",
    choices: ["Treatment integrity", "Cultural responsiveness", "External validity", "Unconditioned reinforcement"],
    answer: "Treatment integrity",
    explanation:
      "Treatment integrity means procedures are [implemented as designed].",
    hint:
      "Focus on whether implementation [matched the written procedure].",
  },
  {
    type: "scenario",
    prompt:
      "A less intrusive function-based procedure is producing meaningful improvement. A team member suggests adding a more intrusive procedure to make progress faster. Which ethical principle should guide the decision?",
    choices: [
      "Use effective procedures with the least restrictive approach needed",
      "Always use the most intrusive option first",
      "Ignore function when treatment is working",
      "Remove consent after data improve",
    ],
    answer:
      "Use effective procedures with the least restrictive approach needed",
    explanation:
      "Ethical intervention balances [effective procedures] with [minimally intrusive procedures].",
    hint:
      "Consider whether a [more intrusive option is clinically necessary] when the current plan is effective.",
  },
  {
    type: "scenario",
    prompt:
      "A supervisor gives a supervisee responsibilities beyond their skill level and does not observe or provide feedback. Which area is most directly implicated?",
    choices: ["Supervision ethics", "Visual analysis", "Rate vs frequency", "Matching law"],
    answer: "Supervision ethics",
    explanation:
      "Supervision ethics requires [competent delegation, observation, feedback, documentation, and monitoring].",
    hint:
      "Look at [task assignment, observation, and performance feedback].",
  },
  {
    type: "scenario",
    prompt:
      "A team chooses goals without considering the client's language, family routines, cultural values, or preferences. Which ethical area is most directly weak?",
    choices: ["Cultural responsiveness", "Changing Criterion Design", "Exact count IOA", "Behavioral momentum"],
    answer: "Cultural responsiveness",
    explanation:
      "Cultural responsiveness considers [values, context, language, and preferences] while maintaining data-based practice.",
    hint:
      "Look for missing attention to [cultural and contextual variables].",
  },
  {
    type: "scenario",
    prompt:
      "A BCBA identifies a possible ethical violation involving altered records. Which response is most appropriate?",
    choices: [
      "Document facts, protect confidentiality, consult or report through appropriate channels, and follow up",
      "Discuss identifying details with friends to get quick advice",
      "Ignore the concern until a caregiver asks about it",
      "Delete related records to prevent conflict",
    ],
    answer:
      "Document facts, protect confidentiality, consult or report through appropriate channels, and follow up",
    explanation:
      "Ethical concern response should be [systematic, confidential, documented, and followed up].",
    hint:
      "Think about a responsible process from [identification through follow-up].",
  },
];

const sectionEExpandedMiniLessons: MiniLessonContent[] = [
  {
    slug: "benefit-others",
    label: "E.1",
    title: "Benefit Others",
    body: [
      "Benefit others means maximizing [client welfare and rights] while minimizing harm.",
      "The client’s interests come first when professional, financial, or organizational pressures compete.",
    ],
    visual: {
      type: "choice",
      prompt: "Which action best reflects benefit others?",
      choices: [
        "Revising services when data show limited benefit and risk is increasing",
        "Continuing a profitable service package without reviewing outcomes",
        "Prioritizing staff convenience over client welfare",
        "Using a familiar procedure even when it increases risk",
      ],
      answer:
        "Revising services when data show limited benefit and risk is increasing",
      hint:
        "Look for the action that prioritizes [client welfare and risk reduction].",
      feedback:
        "Benefit others requires [maximizing client benefit and minimizing harm].",
    },
  },
  {
    slug: "compassion-dignity-respect",
    label: "E.1",
    title: "Compassion, Dignity, and Respect",
    body: [
      "Compassion means responding with [care and humane treatment].",
      "Respect includes privacy, self-determination, equitable treatment, and informed choices.",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each action by whether it protects dignity.",
      categories: ["Protects dignity", "Needs revision"],
      items: [
        { label: "Offer choices and explain procedures in understandable language", category: "Protects dignity" },
        { label: "Discuss a client’s hygiene needs in a public hallway", category: "Needs revision" },
        { label: "Adapt communication for the client’s language needs", category: "Protects dignity" },
        { label: "Use embarrassing materials because they are easy to find", category: "Needs revision" },
      ],
    },
  },
  {
    slug: "behave-with-integrity",
    label: "E.1",
    title: "Behave With Integrity",
    body: [
      "Integrity means being [truthful, accountable, and trustworthy].",
      "It includes correcting errors, following through on obligations, and avoiding misrepresentation.",
    ],
    visual: {
      type: "select-all",
      prompt: "Select actions that show professional integrity.",
      choices: [
        { label: "Correct an inaccurate report promptly", correct: true },
        { label: "Represent credentials accurately", correct: true },
        { label: "Follow through on agreed service obligations", correct: true },
        { label: "Leave out unfavorable data from a graph", correct: false },
      ],
      feedback:
        "Integrity requires [truthfulness, accountability, and correction of errors].",
    },
  },
  {
    slug: "ensure-competence",
    label: "E.1",
    title: "Ensure Competence",
    body: [
      "Ensure competence means staying within [scope of practice and scope of competence].",
      "It also requires ongoing professional development and awareness of personal limits.",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Scope of practice",
      leftText: "What the profession and role permit",
      rightTitle: "Scope of competence",
      rightText: "What this analyst is [trained and skilled] to do",
      cue: "Practice asks [what the professional role permits]; competence asks [what this BCBA can perform responsibly].",
    },
  },
  {
    slug: "scope-of-practice",
    label: "E.3",
    title: "Scope of Practice vs Scope of Competence",
    body: [
      "Scope of practice is the profession’s [authorized service area].",
      "Scope of competence is the analyst’s [demonstrated ability within that service area].",
    ],
    visual: {
      type: "choice",
      prompt: "Which statement best differentiates scope of practice and scope of competence?",
      choices: [
        "Practice defines what the role may include; competence defines what the individual can perform responsibly",
        "Practice and competence are identical once someone is certified",
        "Competence refers to billing codes; practice refers only to supervision hours",
        "Practice applies only to research; competence applies only to direct therapy",
      ],
      answer:
        "Practice defines what the role may include; competence defines what the individual can perform responsibly",
      hint:
        "Separate [professional role boundaries] from [individual skill boundaries].",
      feedback:
        "The key discrimination is [professional role authorization] versus [individual demonstrated competence].",
    },
  },
  {
    slug: "maintaining-competence",
    label: "E.3",
    title: "Maintaining Competence",
    body: [
      "Maintaining competence requires [continuing education and current practice knowledge].",
      "Competence can change when science, client needs, technology, or practice areas change.",
    ],
    visual: {
      type: "fill-blank",
      prompt: "Complete the competence cue.",
      sentence: "Maintaining competence requires ongoing ____ development.",
      answer: "professional",
      feedback:
        "Maintaining competence requires [ongoing professional development] and current knowledge.",
    },
  },
  {
    slug: "accurate-credentials",
    label: "E.3",
    title: "Accurate Representation of Credentials",
    body: [
      "Accurate representation means describing credentials, roles, training, and services [truthfully and accurately].",
      "Do not imply specialty competence, certification, or outcomes that are not supported.",
    ],
    visual: {
      type: "example",
      example:
        "A BCBA states they are trained in early intervention and seeking consultation for feeding cases.",
      nonexample:
        "A BCBA advertises as a feeding specialist after attending one introductory webinar.",
    },
  },
  {
    slug: "professional-accountability",
    label: "E.3",
    title: "Professional Accountability",
    body: [
      "Professional accountability means taking responsibility for [your work and delegated work].",
      "Accountability includes correcting errors, documenting decisions, and monitoring supervisee implementation.",
    ],
    visual: {
      type: "choice",
      prompt: "Which action best reflects professional accountability?",
      choices: [
        "Correcting an incorrect report and documenting the correction",
        "Blaming the RBT without reviewing supervision practices",
        "Ignoring a parent concern because data collection is inconvenient",
        "Continuing an ineffective plan without review",
      ],
      answer: "Correcting an incorrect report and documenting the correction",
      hint:
        "Look for ownership, correction, and documentation.",
      feedback:
        "Accountability requires [owning and correcting professional errors].",
    },
  },
  {
    slug: "record-retention-security",
    label: "E.3",
    title: "Record Retention and Security",
    body: [
      "Record retention means keeping documentation for [required time frames].",
      "Security means protecting records from unauthorized access, loss, alteration, or disclosure.",
    ],
    visual: {
      type: "matching",
      prompt: "Match each records term to its cue.",
      pairs: [
        { term: "Retention", definition: "Keep records for required time frames." },
        { term: "Security", definition: "Protect records from unauthorized access." },
        { term: "Accuracy", definition: "Record services and data truthfully." },
        { term: "Access", definition: "Release records only through authorized processes." },
      ],
    },
  },
  {
    slug: "client-welfare-vulnerable-clients",
    label: "E.4",
    title: "Client Welfare and Vulnerable Clients",
    body: [
      "Client welfare includes [safety, rights, dignity, and effective services].",
      "Vulnerable clients may need extra safeguards for communication, consent, assent, choice, and protection from coercion.",
    ],
    visual: {
      type: "select-all",
      prompt: "Select safeguards for vulnerable clients.",
      choices: [
        { label: "Use assent and withdrawal cues when possible", correct: true },
        { label: "Provide choices and understandable explanations", correct: true },
        { label: "Monitor risk and treatment effects closely", correct: true },
        { label: "Ignore refusal behavior because consent was signed", correct: false },
      ],
      feedback:
        "Vulnerable clients require safeguards for [safety, assent, dignity, and choice].",
    },
  },
  {
    slug: "assent-vs-consent",
    label: "E.4",
    title: "Assent vs Informed Consent",
    body: [
      "Informed consent is [authorized voluntary agreement].",
      "Assent is behavior indicating [willingness to participate] from someone who cannot provide full informed consent.",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Consent",
      leftText: "Authorized agreement after understanding procedures and risks",
      rightTitle: "Assent",
      rightText: "Willing participation shown through behavior",
      cue: "Consent authorizes services; assent monitors [ongoing willingness to participate].",
    },
  },
  {
    slug: "hipaa-privacy-basics",
    label: "E.4",
    title: "HIPAA and Privacy Basics",
    body: [
      "Privacy rules protect [health and service information].",
      "Use secure systems, minimum necessary sharing, and authorization procedures when applicable.",
    ],
    visual: {
      type: "choice",
      prompt: "Which practice best supports privacy?",
      choices: [
        "Use secure systems and share only the minimum necessary information with authorized parties",
        "Send full reports through personal text messages for convenience",
        "Discuss client details in public if names are not used",
        "Store session notes on a shared personal laptop",
      ],
      answer:
        "Use secure systems and share only the minimum necessary information with authorized parties",
      hint:
        "Look for secure storage and [minimum necessary information sharing].",
      feedback:
        "Privacy protection uses [secure systems and authorized limited disclosure].",
    },
  },
  {
    slug: "gifts-financial-relationships",
    label: "E.7",
    title: "Gifts and Financial Relationships",
    body: [
      "Gifts and financial relationships can create [undue influence or conflicts of interest].",
      "Evaluate whether the exchange could affect objectivity, service access, or client trust.",
    ],
    visual: {
      type: "choice",
      prompt: "Which gift situation creates the highest ethical risk?",
      choices: [
        "A caregiver offers an expensive vacation package after the BCBA recommends continued services",
        "A caregiver sends a thank-you note to the clinic office",
        "A client draws a card during art time and gives it to the team",
        "A team receives agency-approved snacks at a staff meeting",
      ],
      answer:
        "A caregiver offers an expensive vacation package after the BCBA recommends continued services",
      hint:
        "Look for value, timing, and whether the gift could [bias professional judgment].",
      feedback:
        "Gift concerns increase when they create [undue influence or conflicts of interest].",
    },
  },
  {
    slug: "social-media-conduct",
    label: "E.5",
    title: "Social Media and Professional Conduct",
    body: [
      "Professional conduct applies across [in-person and digital settings].",
      "Social media risks include confidentiality breaches, boundary crossings, testimonials, and misrepresentation.",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each social media action.",
      categories: ["Lower risk", "Ethical risk"],
      items: [
        { label: "Post a general educational article with no client details", category: "Lower risk" },
        { label: "Share a client video from session without proper authorization", category: "Ethical risk" },
        { label: "Accept a current caregiver's friend request on a personal account", category: "Ethical risk" },
        { label: "Use an agency-approved page for general service information", category: "Lower risk" },
      ],
    },
  },
  {
    slug: "exploitative-relationships",
    label: "E.7",
    title: "Exploitative Relationships",
    body: [
      "Exploitative relationships use power, access, or trust for [personal advantage from professional power].",
      "The ethical concern is harm, coercion, impaired judgment, or compromised client welfare.",
    ],
    visual: {
      type: "choice",
      prompt: "Which scenario most clearly shows an exploitative relationship?",
      choices: [
        "A BCBA pressures a caregiver to buy products from the BCBA's side business",
        "A BCBA explains a service agreement before assessment",
        "A BCBA consults a supervisor about a difficult case",
        "A BCBA documents a caregiver's concerns objectively",
      ],
      answer:
        "A BCBA pressures a caregiver to buy products from the BCBA's side business",
      hint:
        "Look for use of professional power for [personal advantage from the service relationship].",
      feedback:
        "Exploitative relationships involve [power used for personal benefit] and risk harm.",
    },
  },
  {
    slug: "supervisor-feedback-responsibilities",
    label: "E.10",
    title: "Feedback Responsibilities",
    body: [
      "Supervision feedback should be [timely, behavior-specific, and data-informed].",
      "Feedback protects clients by improving implementation, competence, and treatment integrity.",
    ],
    visual: {
      type: "fill-blank",
      prompt: "Complete the supervision cue.",
      sentence: "Effective supervision feedback should be timely, behavior-specific, and ____-informed.",
      answer: "data",
      feedback:
        "Feedback is strongest when it is [observable, timely, and data-informed].",
    },
  },
  {
    slug: "supervisor-competence",
    label: "E.10",
    title: "Supervisor Competence",
    body: [
      "Supervisor competence means supervising only within [areas of qualified expertise].",
      "Supervisors must be competent in the services, populations, procedures, and supervision practices involved.",
    ],
    visual: {
      type: "choice",
      prompt: "Which supervision arrangement is most ethical?",
      choices: [
        "A supervisor seeks consultation before supervising a procedure outside their experience",
        "A supervisor accepts all cases because they hold a BCBA credential",
        "A supervisor delegates high-risk procedures without direct observation",
        "A supervisor stops documenting sessions once rapport is strong",
      ],
      answer:
        "A supervisor seeks consultation before supervising a procedure outside their experience",
      hint:
        "Focus on [qualified expertise and client protection].",
      feedback:
        "Supervisor competence requires [qualified expertise and appropriate consultation] when needed.",
    },
  },
  {
    slug: "delegation-oversight",
    label: "E.10",
    title: "Delegation and Oversight",
    body: [
      "Delegation is ethical when tasks match [training, competence, and supervision].",
      "Oversight means monitoring implementation and outcomes after tasks are assigned.",
    ],
    visual: {
      type: "flow",
      prompt: "Order ethical delegation.",
      steps: [
        "Assess supervisee competence",
        "Train and model the task",
        "Observe implementation and give feedback",
        "Monitor treatment integrity and client outcomes",
      ],
      feedback:
        "Delegation requires [training, observation, feedback, and monitoring].",
    },
  },
  {
    slug: "data-falsification",
    label: "E.3",
    title: "Data Falsification Concerns",
    body: [
      "Data falsification means altering, inventing, or omitting data in a way that [misrepresents services or outcomes].",
      "It is an integrity, documentation, billing, and client-welfare concern.",
    ],
    visual: {
      type: "choice",
      prompt: "Which action is data falsification?",
      choices: [
        "Changing missed-session data to show treatment was implemented",
        "Correcting a typo and documenting the correction",
        "Adding a note that data were not collected due to illness",
        "Reviewing raw data with a supervisor",
      ],
      answer: "Changing missed-session data to show treatment was implemented",
      hint:
        "Look for a change that [misrepresents what occurred].",
      feedback:
        "Data falsification misrepresents [services, data, or outcomes].",
    },
  },
  {
    slug: "evidence-based-practice",
    label: "E.9",
    title: "Evidence-Based Practice",
    body: [
      "Evidence-based practice uses [best available evidence], clinical expertise, client values, and contextual fit.",
      "It does not mean using a preferred procedure without data or ignoring client context.",
    ],
    visual: {
      type: "select-all",
      prompt: "Select components of evidence-based ethical service delivery.",
      choices: [
        { label: "Best available evidence", correct: true },
        { label: "Client values and contextual fit", correct: true },
        { label: "Clinical expertise and ongoing data", correct: true },
        { label: "Provider preference without outcome data", correct: false },
      ],
      feedback:
        "Evidence-based practice integrates [best available evidence], [clinical expertise], [client values and context], and data.",
    },
  },
  {
    slug: "collaboration-caregivers-professionals",
    label: "E.8",
    title: "Collaboration With Caregivers and Professionals",
    body: [
      "Collaboration means communicating respectfully with [clients, stakeholders, and other providers].",
      "The goal is coordinated care while protecting confidentiality and professional role boundaries.",
    ],
    visual: {
      type: "matching",
      prompt: "Match each collaboration action to its ethics cue.",
      pairs: [
        { term: "Caregiver input", definition: "Improves social validity and contextual fit." },
        { term: "Provider collaboration", definition: "Coordinates services across disciplines." },
        { term: "Confidentiality", definition: "Limits information sharing to authorized purposes." },
        { term: "Role clarity", definition: "Prevents confusion about professional responsibilities." },
      ],
    },
  },
  {
    slug: "environmental-barriers",
    label: "E.9",
    title: "Environmental Conditions Interfering With Services",
    body: [
      "Environmental barriers are conditions that interfere with [effective and ethical service delivery].",
      "Examples include unsafe settings, insufficient staffing, lack of materials, or policies that prevent treatment integrity.",
    ],
    visual: {
      type: "choice",
      prompt: "A clinic requires sessions in a room where severe aggression cannot be managed safely. What is the ethical priority?",
      choices: [
        "Address the environmental barrier before continuing services in that setting",
        "Continue because the schedule is already approved",
        "Ignore safety because the intervention plan is evidence based",
        "Change the data sheet but keep the procedures the same",
      ],
      answer:
        "Address the environmental barrier before continuing services in that setting",
      hint:
        "Ask whether the environment allows [safe and effective implementation].",
      feedback:
        "Environmental barriers must be addressed when they threaten [safety, integrity, or effectiveness].",
    },
  },
  {
    slug: "self-reporting-obligations",
    label: "E.12",
    title: "Self-Reporting Obligations",
    body: [
      "Self-reporting means notifying appropriate bodies when required by [BACB, legal, or regulatory requirements].",
      "It may apply to critical information that affects certification, practice, or public protection.",
    ],
    visual: {
      type: "choice",
      prompt: "Which action best fits self-reporting obligations?",
      choices: [
        "Review reporting requirements and submit required information through the appropriate channel",
        "Wait until a client asks about the issue",
        "Post the issue publicly before consulting requirements",
        "Ask a coworker to report it without documentation",
      ],
      answer:
        "Review reporting requirements and submit required information through the appropriate channel",
      hint:
        "Focus on [required reporting channels] and documentation.",
      feedback:
        "Self-reporting is guided by [professional and regulatory requirements].",
    },
  },
  {
    slug: "bacb-reporting-responsibilities",
    label: "E.12",
    title: "BACB Reporting Responsibilities",
    body: [
      "BACB reporting responsibilities involve serious concerns that may affect [client protection or professional standards].",
      "Some urgent risks may require immediate reporting to authorities before BACB or licensure reporting.",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each concern by likely first response.",
      categories: ["Immediate protection first", "Consult and document first"],
      items: [
        { label: "Client is at immediate risk of serious harm", category: "Immediate protection first" },
        { label: "A minor documentation inconsistency is unclear", category: "Consult and document first" },
        { label: "Possible abuse or mandated reporting concern", category: "Immediate protection first" },
        { label: "Question about whether a boundary issue occurred", category: "Consult and document first" },
      ],
    },
  },
  {
    slug: "ethical-decision-tree",
    label: "E.1",
    title: "Ethical Decision Tree",
    body: [
      "An ethical decision tree helps organize [risk, stakeholders, standards, consultation, action, and follow-up].",
      "The purpose is not to memorize a script; it is to reduce harm through systematic action.",
    ],
    visual: {
      type: "flow",
      prompt: "Order the ethical decision tree.",
      steps: [
        "Define the concern and immediate risk",
        "Identify stakeholders and relevant standards",
        "Consult and document while protecting confidentiality",
        "Act, monitor outcomes, and follow up",
      ],
      feedback:
        "Ethical problem solving is [systematic, documented, and client-centered].",
    },
  },
];

const sectionEExpandedPracticeQuestions: QuestionContent[] = [
  {
    type: "matching",
    prompt: "Match each core ethics principle to its discrimination cue.",
    pairs: [
      { term: "Benefit others", definition: "Maximize welfare and minimize harm." },
      { term: "Compassion, dignity, and respect", definition: "Promote privacy, self-determination, and equitable treatment." },
      { term: "Integrity", definition: "Be truthful, accountable, and trustworthy." },
      { term: "Ensure competence", definition: "Work within practice and competence boundaries." },
    ],
    answer: "All core principles matched correctly",
    explanation:
      "The core principles separate [client welfare], [dignity and respect], [truthfulness and accountability], and [professional competence].",
    hint:
      "Sort by the main ethical function: welfare, respect, honesty, or skill boundaries.",
  },
  {
    type: "scenario",
    prompt:
      "A BCBA is asked to supervise a procedure they have never implemented or supervised. What should guide the decision?",
    choices: [
      "Supervisor competence and consultation before accepting responsibility",
      "Certification alone is enough to supervise all ABA procedures",
      "Supervision documentation can replace competence",
      "The supervisee's confidence is the only factor",
    ],
    answer: "Supervisor competence and consultation before accepting responsibility",
    explanation:
      "Supervisor competence requires [qualified expertise and consultation or referral] when needed.",
    hint:
      "Focus on whether the supervisor has qualified expertise for the procedure.",
  },
  {
    type: "select-all",
    prompt: "Select examples of boundary or exploitation risk.",
    choices: [
      "Pressuring a caregiver to buy products from the BCBA's side business",
      "Accepting an expensive gift after recommending more services",
      "Becoming a current client's paid babysitter",
      "Providing a written service agreement before assessment",
    ],
    answers: [
      "Pressuring a caregiver to buy products from the BCBA's side business",
      "Accepting an expensive gift after recommending more services",
      "Becoming a current client's paid babysitter",
    ],
    answer:
      "Side-business pressure, expensive gifts, and babysitting a current client are boundary or exploitation risks",
    explanation:
      "Boundary risks involve [role overlap], [undue influence], or [personal advantage within a professional relationship].",
    hint:
      "Look for personal gain, second roles, or pressure inside a professional relationship.",
  },
  {
    type: "fill-blank",
    prompt:
      "Complete the ethical service cue: Evidence-based practice integrates evidence, client values, clinical expertise, and ongoing ____.",
    answer: "data",
    explanation:
      "Evidence-based practice requires [ongoing client data] rather than relying only on preference or habit.",
    hint:
      "The missing word is what lets the team evaluate whether treatment is working.",
  },
  {
    type: "sorting",
    prompt: "Sort each responsibility.",
    categories: ["Client protection", "Professional accountability"],
    items: [
      { label: "Use assent and withdrawal cues when possible", category: "Client protection" },
      { label: "Correct an inaccurate report promptly", category: "Professional accountability" },
      { label: "Address unsafe environmental conditions", category: "Client protection" },
      { label: "Represent credentials truthfully", category: "Professional accountability" },
    ],
    answer: "Responsibilities sorted by protection or accountability",
    explanation:
      "Client protection focuses on [client safety and rights]; accountability focuses on [truthfulness and professional responsibility].",
    hint:
      "Ask whether the action mainly protects the client or corrects/represents professional conduct.",
  },
  {
    type: "scenario",
    prompt:
      "A caregiver posts a positive review and asks the BCBA to share it on the clinic page while services are ongoing. What is the primary ethical concern?",
    choices: [
      "Testimonials and public statements involving current clients",
      "Momentary time sampling",
      "Trial-by-trial IOA",
      "Parametric analysis",
    ],
    answer: "Testimonials and public statements involving current clients",
    explanation:
      "Social media and testimonials can create [confidentiality, undue influence, and public statement] risks.",
    hint:
      "Think about public statements and the power difference in a current service relationship.",
  },
  {
    type: "scenario",
    prompt:
      "An agency policy prevents staff from collecting treatment-integrity data even though outcomes are not improving. What should the BCBA address?",
    choices: [
      "Environmental conditions interfering with effective service delivery",
      "A generalized conditioned punisher",
      "A multiple baseline design",
      "Permanent product recording",
    ],
    answer:
      "Environmental conditions interfering with effective service delivery",
    explanation:
      "Environmental barriers must be addressed when they threaten [integrity, safety, or effectiveness].",
    hint:
      "Look for a setting condition that blocks ethical and effective implementation.",
  },
  {
    type: "scenario",
    prompt:
      "A supervisee repeatedly implements a procedure incorrectly. The supervisor has not observed sessions or provided behavior-specific feedback. Which responsibility is weakest?",
    choices: [
      "Performance monitoring and feedback",
      "Confidentiality in public statements",
      "Client financial agreement",
      "Research review",
    ],
    answer: "Performance monitoring and feedback",
    explanation:
      "Supervision ethics requires [monitoring supervisee performance] and providing timely feedback.",
    hint:
      "Focus on observation and feedback after delegation.",
  },
  {
    type: "scenario",
    prompt:
      "A client shows clear refusal behavior during sessions even though a guardian signed consent. What should the team consider?",
    choices: [
      "Assent, withdrawal cues, dignity, and possible procedure modification",
      "Consent means refusal behavior can be ignored",
      "Assent applies only to research with adults",
      "Treatment integrity is irrelevant once consent is signed",
    ],
    answer:
      "Assent, withdrawal cues, dignity, and possible procedure modification",
    explanation:
      "Consent authorizes services, but assent and withdrawal cues support [ongoing willingness and dignity].",
    hint:
      "Separate legal authorization from the client's ongoing behavior indicating willingness.",
  },
  {
    type: "scenario",
    prompt:
      "A BCBA learns of a possible mandated reporting concern that may involve immediate client risk. What is the strongest first priority?",
    choices: [
      "Protect the client and follow required immediate reporting procedures",
      "Wait until the next supervision meeting",
      "Post a general warning online",
      "Only report to the BACB after several months",
    ],
    answer:
      "Protect the client and follow required immediate reporting procedures",
    explanation:
      "Immediate risk requires [immediate client protection] and required reporting channels.",
    hint:
      "Prioritize immediate safety and required reporting obligations.",
  },
  {
    type: "select-all",
    prompt: "Select steps in a structured ethical decision-making process.",
    choices: [
      "Define the issue and potential risk",
      "Identify stakeholders and relevant standards",
      "Consult and document while protecting confidentiality",
      "Choose the easiest action without considering consequences",
    ],
    answers: [
      "Define the issue and potential risk",
      "Identify stakeholders and relevant standards",
      "Consult and document while protecting confidentiality",
    ],
    answer:
      "Define risk, identify stakeholders and standards, consult, document, and protect confidentiality",
    explanation:
      "Ethical decision making is [structured, documented, consultative, and client-centered].",
    hint:
      "Look for steps that reduce harm and create a documented decision trail.",
  },
];

const sectionEExpandedMasteryQuestions: QuestionContent[] = [
  {
    type: "scenario",
    prompt:
      "A service package benefits the agency financially, but client data show no meaningful improvement and risk is increasing. Which core principle is most directly at issue?",
    choices: ["Benefit others", "Momentary time sampling", "Scope of practice only", "External validity"],
    answer: "Benefit others",
    explanation:
      "Benefit others requires prioritizing [client welfare and risk reduction] over competing interests.",
    hint:
      "Look for the principle centered on maximizing benefit and minimizing harm.",
  },
  {
    type: "scenario",
    prompt:
      "A BCBA is legally allowed to provide ABA services but lacks training in a specialized feeding protocol. Which distinction is most relevant?",
    choices: [
      "Scope of practice vs scope of competence",
      "Consent vs confidentiality",
      "Rate vs duration",
      "Internal vs external validity",
    ],
    answer: "Scope of practice vs scope of competence",
    explanation:
      "Scope of practice concerns [professional role authorization]; scope of competence concerns [individual demonstrated skill].",
    hint:
      "Separate what the professional role may include from what this analyst can perform responsibly.",
  },
  {
    type: "scenario",
    prompt:
      "A BCBA advertises expertise in a treatment area after one introductory webinar and no supervised practice. Which ethical concern is strongest?",
    choices: [
      "Inaccurate representation of credentials or competence",
      "Client assent",
      "Momentary time sampling",
      "Visual analysis",
    ],
    answer: "Inaccurate representation of credentials or competence",
    explanation:
      "Accurate representation requires [truthful description of credentials, training, and competence].",
    hint:
      "Focus on whether the public claim overstates training or expertise.",
  },
  {
    type: "scenario",
    prompt:
      "A current caregiver offers an expensive gift after the BCBA recommends continuing services. Which ethical risk is most relevant?",
    choices: [
      "Gift or financial relationship creating undue influence",
      "Data path construction",
      "Response effort",
      "Trial-by-trial IOA",
    ],
    answer: "Gift or financial relationship creating undue influence",
    explanation:
      "High-value gifts can create [undue influence or conflicts of interest].",
    hint:
      "Look at value, timing, and whether judgment could be biased.",
  },
  {
    type: "scenario",
    prompt:
      "A client lacks capacity for informed consent but consistently approaches materials, participates willingly, and stops participating when overwhelmed. What should the team monitor?",
    choices: ["Assent and withdrawal cues", "Only billing accuracy", "A changing criterion line", "Social media testimonials"],
    answer: "Assent and withdrawal cues",
    explanation:
      "Assent reflects [willingness to participate] when full informed consent is not possible.",
    hint:
      "Focus on ongoing behavior that indicates willingness or refusal.",
  },
  {
    type: "scenario",
    prompt:
      "A BCBA deletes low treatment-integrity scores before sending a report to a funder. Which concern is most directly represented?",
    choices: ["Data falsification", "Cultural responsiveness", "Assent", "Scope of practice"],
    answer: "Data falsification",
    explanation:
      "Data falsification misrepresents [services, implementation, or outcomes].",
    hint:
      "Look for altering records so they no longer represent what occurred.",
  },
  {
    type: "scenario",
    prompt:
      "A supervisor delegates a complex protocol to a trainee without training, observation, or feedback. Which supervision issue is most relevant?",
    choices: [
      "Delegation and oversight",
      "Permanent product recording",
      "Multiple baseline across settings",
      "Unconditioned reinforcement",
    ],
    answer: "Delegation and oversight",
    explanation:
      "Ethical delegation requires [training, competence, observation, feedback, and monitoring].",
    hint:
      "Focus on what must happen before and after assigning tasks.",
  },
  {
    type: "scenario",
    prompt:
      "A behavior plan is evidence based in the literature, but the team has no data showing it works for this client and ignores family values. What is missing?",
    choices: [
      "Evidence-based practice integrated with client values and ongoing data",
      "A gift policy only",
      "A standard celeration chart",
      "A public testimonial",
    ],
    answer:
      "Evidence-based practice integrated with client values and ongoing data",
    explanation:
      "Evidence-based practice integrates [research evidence, clinical expertise, client values, context, and ongoing data].",
    hint:
      "Look beyond published support to client context and data-based evaluation.",
  },
  {
    type: "scenario",
    prompt:
      "A classroom lacks safe space and staffing for a high-risk procedure, making treatment integrity unlikely. What should the BCBA address?",
    choices: [
      "Environmental conditions interfering with service delivery",
      "A generalized conditioned reinforcer",
      "Latency measurement",
      "A chained schedule",
    ],
    answer: "Environmental conditions interfering with service delivery",
    explanation:
      "Environmental conditions must be addressed when they interfere with [safe and effective service delivery].",
    hint:
      "Focus on setting barriers that prevent safe or accurate implementation.",
  },
  {
    type: "scenario",
    prompt:
      "A BCBA identifies a complex ethical dilemma with multiple stakeholders and possible harm. Which action best fits ethical decision-making guidance?",
    choices: [
      "Define the risk, identify stakeholders and standards, consult, document, act, and follow up",
      "Choose the fastest action and avoid documentation",
      "Ask social media for advice with details removed",
      "Delay action until everyone agrees there is no risk",
    ],
    answer:
      "Define the risk, identify stakeholders and standards, consult, document, act, and follow up",
    explanation:
      "Ethical decision making should be [systematic, documented, consultative, and client-centered].",
    hint:
      "Look for a structured process from defining risk through follow-up.",
  },
];

const sectionETcoMappingMiniLessons: MiniLessonContent[] = [
  {
    slug: "risks-from-unethical-behavior",
    label: "E.2",
    title: "Risks From Unethical Behavior",
    body: [
      "Unethical behavior can harm [clients, supervisees, the practitioner, organizations, and the profession].",
      "Ethical risk affects trust, safety, treatment outcomes, documentation accuracy, and professional credibility.",
    ],
    visual: {
      type: "select-all",
      prompt: "Select possible risks from unethical behavior.",
      choices: [
        { label: "Client safety and welfare are compromised", correct: true },
        { label: "Supervisees learn unsafe or inaccurate practices", correct: true },
        { label: "Organizations lose trust and credibility", correct: true },
        { label: "The profession is protected from reputational harm", correct: false },
      ],
      feedback:
        "Unethical behavior can harm [clients, supervisees, practitioners, organizations, and the profession].",
    },
  },
  {
    slug: "unethical-risk-discrimination",
    label: "E.2",
    title: "Who Is at Risk?",
    body: [
      "Client risk includes [harm, loss of dignity, ineffective treatment, and rights violations].",
      "Professional risk includes [loss of credibility, disciplinary action, and damaged public trust].",
    ],
    visual: {
      type: "matching",
      prompt: "Match each risk target to its cue.",
      pairs: [
        { term: "Client", definition: "Safety, dignity, rights, and outcomes may be harmed." },
        { term: "Supervisee", definition: "Poor modeling or feedback may shape unsafe practice." },
        { term: "Organization", definition: "Trust, compliance, and service quality may be damaged." },
        { term: "Profession", definition: "Public credibility of behavior analysis may be weakened." },
      ],
    },
  },
  {
    slug: "discontinuing-services-ethically",
    label: "E.6",
    title: "Discontinuing Services Ethically",
    body: [
      "Discontinuing services requires [transition planning and avoidance of abandonment].",
      "Protect clients through notice, referrals, documentation, and continuity-of-care planning when possible.",
    ],
    visual: {
      type: "flow",
      prompt: "Order an ethical discontinuation process.",
      steps: [
        "Identify reason and immediate risk",
        "Notify stakeholders and discuss transition needs",
        "Provide referrals or continuity-of-care supports",
        "Document the transition plan and follow-up steps",
      ],
      feedback:
        "Ethical discontinuation protects [client welfare and continuity of care].",
    },
  },
  {
    slug: "discontinuing-supervision-ethically",
    label: "E.6",
    title: "Discontinuing Supervision Ethically",
    body: [
      "Discontinuing supervision requires [supervisee protection, client protection, and transition documentation].",
      "Avoid abrupt changes that leave supervisees practicing without competent oversight.",
    ],
    visual: {
      type: "choice",
      prompt:
        "A supervisor must end supervision in two weeks. Which action best protects the supervisee and clients?",
      choices: [
        "Create a documented transition plan, identify replacement supervision, and communicate responsibilities",
        "Stop signing supervision records immediately without notice",
        "Tell the supervisee to continue independently until a new supervisor appears",
        "Delete supervision notes to avoid confusion",
      ],
      answer:
        "Create a documented transition plan, identify replacement supervision, and communicate responsibilities",
      hint:
        "Focus on [continuity, documentation, and protection during role changes].",
      feedback:
        "Ethical supervision transitions require [planned continuity and documented responsibilities].",
    },
  },
  {
    slug: "interpersonal-skills-ethical-practice",
    label: "E.8",
    title: "Interpersonal Skills in Ethical Practice",
    body: [
      "Ethical collaboration includes [active listening, accepting feedback, and seeking input].",
      "Respectful communication helps teams address disagreement without losing client focus.",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each response by interpersonal skill quality.",
      categories: ["Supports ethical collaboration", "Needs revision"],
      items: [
        { label: "Reflect caregiver concern before explaining the data", category: "Supports ethical collaboration" },
        { label: "Dismiss feedback because the caregiver is upset", category: "Needs revision" },
        { label: "Ask another provider for relevant context with authorization", category: "Supports ethical collaboration" },
        { label: "Respond defensively when a supervisee asks a question", category: "Needs revision" },
      ],
    },
  },
  {
    slug: "professional-disagreement",
    label: "E.8",
    title: "Responding to Disagreement",
    body: [
      "Professional disagreement should be handled with [respectful communication and client-centered reasoning].",
      "Use data, ethics standards, and stakeholder input rather than defensiveness or authority alone.",
    ],
    visual: {
      type: "choice",
      prompt:
        "A caregiver disagrees with a recommendation and says the plan does not fit family routines. What should the BCBA do first?",
      choices: [
        "Listen, clarify the concern, review data and values, and collaborate on next steps",
        "End services because disagreement means noncompliance",
        "Tell the caregiver certification makes discussion unnecessary",
        "Ignore the concern unless data collection stops",
      ],
      answer:
        "Listen, clarify the concern, review data and values, and collaborate on next steps",
      hint:
        "Look for [active listening, data review, and collaborative problem solving].",
      feedback:
        "Respectful disagreement uses [listening, data, ethics, and collaboration].",
    },
  },
  {
    slug: "personal-biases",
    label: "E.11",
    title: "Personal Biases",
    body: [
      "Bias must not interfere with [professional judgment or client welfare].",
      "Reduce bias by using data, ethical standards, cultural responsiveness, consultation, and reflective practice.",
    ],
    visual: {
      type: "select-all",
      prompt: "Select actions that reduce bias in ethical decision making.",
      choices: [
        { label: "Review objective data before recommending services", correct: true },
        { label: "Seek consultation when personal reactions may affect judgment", correct: true },
        { label: "Consider client culture, values, and context", correct: true },
        { label: "Base recommendations on personal preference alone", correct: false },
      ],
      feedback:
        "Bias is reduced through [data, consultation, cultural responsiveness, and ethical standards].",
    },
  },
  {
    slug: "bias-and-treatment-recommendations",
    label: "E.11",
    title: "Bias and Treatment Recommendations",
    body: [
      "Biased recommendations may overvalue [provider preference] and undervalue [client context, data, and welfare].",
      "Culturally responsive decision making checks whether recommendations fit client needs and ethical standards.",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Bias risk",
      leftText: "Recommendation driven by [personal assumptions or convenience]",
      rightTitle: "Ethical recommendation",
      rightText: "Recommendation guided by [data, client values, and ethical standards]",
      cue: "The key discrimination is [personal assumption] versus [data-informed client welfare].",
    },
  },
  {
    slug: "legal-regulatory-practice-requirements",
    label: "E.12",
    title: "Legal, Regulatory, and Practice Requirements",
    body: [
      "Ethical practice must follow [applicable law, regulation, and practice requirements].",
      "When requirements are unclear or high risk, seek legal, administrative, supervisory, or regulatory guidance.",
    ],
    visual: {
      type: "matching",
      prompt: "Match each requirement area to its cue.",
      pairs: [
        { term: "Law", definition: "Legal requirements that apply to services or reporting." },
        { term: "Regulation", definition: "Rules from licensing, certification, or oversight bodies." },
        { term: "Policy", definition: "Service setting requirements that guide documentation and practice." },
        { term: "Guidance", definition: "Consultation when requirements are unclear or high risk." },
      ],
    },
  },
  {
    slug: "mandated-reporting-and-documentation",
    label: "E.12",
    title: "Mandated Reporting and Documentation",
    body: [
      "Mandated reporting applies when [law or regulation requires reporting specific concerns].",
      "Documentation should show what was observed, what standards applied, consultation sought, actions taken, and follow-up.",
    ],
    visual: {
      type: "choice",
      prompt:
        "A BCBA suspects a legally reportable safety concern. What should guide the response?",
      choices: [
        "Follow applicable mandated reporting requirements and document actions objectively",
        "Wait until the family asks for help",
        "Post a vague warning online without details",
        "Ignore the concern if services are otherwise effective",
      ],
      answer:
        "Follow applicable mandated reporting requirements and document actions objectively",
      hint:
        "Focus on [required reporting], [client protection], and [objective documentation].",
      feedback:
        "Legal and regulatory requirements guide [mandated reporting and documentation].",
    },
  },
];

const sectionETcoMappingPracticeQuestions: QuestionContent[] = [
  {
    type: "select-all",
    prompt: "Select groups that may be harmed by unethical behavior.",
    choices: [
      "Clients receiving services",
      "Supervisees learning professional practice",
      "The behavior analyst and organization",
      "The profession of behavior analysis",
      "Only the person who committed the violation",
    ],
    answers: [
      "Clients receiving services",
      "Supervisees learning professional practice",
      "The behavior analyst and organization",
      "The profession of behavior analysis",
    ],
    answer:
      "Clients, supervisees, behavior analysts, organizations, and the profession can all be harmed by unethical behavior",
    explanation:
      "Unethical behavior can harm [clients, supervisees, the practitioner, organizations, and the profession].",
    hint:
      "Think beyond one person. Ethical risk can affect safety, trust, services, supervision, and public credibility.",
  },
  {
    type: "scenario",
    prompt:
      "A BCBA ends services abruptly after a disagreement with a caregiver and provides no referrals, transition plan, or documentation. Which concern is most direct?",
    choices: [
      "Abandonment risk during discontinuation of services",
      "Appropriate transition planning",
      "Interobserver agreement",
      "Generalization programming",
    ],
    answer: "Abandonment risk during discontinuation of services",
    explanation:
      "Discontinuing services requires [transition planning and avoidance of abandonment].",
    hint:
      "Look for whether the service change protects continuity of care and client welfare.",
  },
  {
    type: "matching",
    prompt: "Match each transition responsibility to its cue.",
    pairs: [
      { term: "Avoid abandonment", definition: "Do not leave clients or supervisees without reasonable protection." },
      { term: "Referral", definition: "Identify appropriate supports when services end or change." },
      { term: "Documentation", definition: "Record transition decisions, risks, and follow-up." },
      { term: "Continuity of care", definition: "Plan so needed supports do not stop abruptly." },
    ],
    answer: "All transition responsibilities matched correctly",
    explanation:
      "Ethical transitions require [continuity of care, referral support, documentation, and avoidance of abandonment].",
    hint:
      "Separate the actions that protect the person during service or supervision changes.",
  },
  {
    type: "sorting",
    prompt: "Sort each interpersonal response.",
    categories: ["Ethical interpersonal skill", "Needs revision"],
    items: [
      { label: "Listen and summarize the caregiver's concern before responding", category: "Ethical interpersonal skill" },
      { label: "Reject feedback because it feels critical", category: "Needs revision" },
      { label: "Ask a supervisee what support would improve implementation", category: "Ethical interpersonal skill" },
      { label: "Use credentials to shut down disagreement", category: "Needs revision" },
    ],
    answer: "Interpersonal responses sorted correctly",
    explanation:
      "Ethical collaboration includes [active listening, accepting feedback, respectful communication, and seeking input].",
    hint:
      "Look for responses that keep communication respectful and client-centered.",
  },
  {
    type: "scenario",
    prompt:
      "A BCBA feels frustrated with a family and notices they are recommending a more restrictive plan than the data support. What should the BCBA do?",
    choices: [
      "Seek consultation, review data and ethics standards, and evaluate possible bias",
      "Proceed because frustration is clinically irrelevant",
      "Discontinue services immediately without a transition plan",
      "Ask the family to accept the recommendation without discussion",
    ],
    answer:
      "Seek consultation, review data and ethics standards, and evaluate possible bias",
    explanation:
      "Bias must not interfere with [professional judgment or client welfare].",
    hint:
      "Focus on using consultation, data, and ethics standards when personal reactions may affect judgment.",
  },
  {
    type: "fill-blank",
    prompt:
      "Complete the cue: Ethical practice must follow applicable law, regulation, and ____ requirements.",
    answer: "practice",
    explanation:
      "Ethical practice must follow [applicable law, regulation, and practice requirements].",
    hint:
      "The missing word refers to requirements that govern professional service delivery.",
  },
  {
    type: "scenario",
    prompt:
      "An agency policy conflicts with a mandated reporting requirement. Which action best reflects ethical practice?",
    choices: [
      "Follow applicable law or regulation and seek appropriate administrative or legal guidance",
      "Follow the agency policy only because it is local",
      "Wait until the next annual review",
      "Ask a supervisee to decide without consultation",
    ],
    answer:
      "Follow applicable law or regulation and seek appropriate administrative or legal guidance",
    explanation:
      "Legal and regulatory requirements may require action beyond internal service-setting policies.",
    hint:
      "Think about the hierarchy among law, regulation, policy, and consultation when protection is at stake.",
  },
  {
    type: "scenario",
    prompt:
      "A supervisee is losing supervision because the supervisor is leaving the agency. Which action best protects the supervisee and clients?",
    choices: [
      "Create a transition plan, document responsibilities, and arrange competent replacement supervision",
      "Tell the supervisee to keep practicing and catch up later",
      "Stop supervision records immediately with no notice",
      "Let clients decide whether supervision is needed",
    ],
    answer:
      "Create a transition plan, document responsibilities, and arrange competent replacement supervision",
    explanation:
      "Discontinuing supervision ethically requires [supervisee protection, client protection, and transition documentation].",
    hint:
      "Focus on continuity and protection during a supervision change.",
  },
];

const sectionETcoMappingMasteryQuestions: QuestionContent[] = [
  {
    type: "scenario",
    prompt:
      "A BCBA falsifies treatment-integrity data to make services appear effective. Which risk statement is most accurate?",
    choices: [
      "The action can harm clients, the organization, the practitioner, and public trust in the profession",
      "The action only matters if the client notices",
      "The action is acceptable if behavior improved later",
      "The action affects billing but not ethical credibility",
    ],
    answer:
      "The action can harm clients, the organization, the practitioner, and public trust in the profession",
    explanation:
      "Unethical behavior can harm [clients, supervisees, the practitioner, organizations, and the profession].",
    hint:
      "Consider safety, outcomes, documentation, organizational trust, and professional credibility.",
  },
  {
    type: "scenario",
    prompt:
      "A provider must stop services because the client is moving, but the client still needs support. Which action is most ethical?",
    choices: [
      "Plan the transition, provide referral options, document the change, and support continuity of care",
      "End sessions on the final scheduled day with no additional action",
      "Continue billing without services until another provider is found",
      "Delete records so the next provider can start fresh",
    ],
    answer:
      "Plan the transition, provide referral options, document the change, and support continuity of care",
    explanation:
      "Discontinuing services requires [transition planning and avoidance of abandonment].",
    hint:
      "Look for client protection during the service change.",
  },
  {
    type: "scenario",
    prompt:
      "During a team meeting, a caregiver challenges the plan because it conflicts with family routines. Which response best reflects ethical interpersonal skill?",
    choices: [
      "Listen, ask clarifying questions, review data, and collaborate on an acceptable plan",
      "Dismiss the concern because the intervention is evidence based",
      "Tell the caregiver disagreement means services must end",
      "Ask the RBT to explain why the caregiver is wrong",
    ],
    answer:
      "Listen, ask clarifying questions, review data, and collaborate on an acceptable plan",
    explanation:
      "Ethical collaboration includes [active listening, accepting feedback, and seeking input].",
    hint:
      "Focus on communication that remains respectful, data-informed, and client-centered.",
  },
  {
    type: "scenario",
    prompt:
      "A BCBA realizes a personal belief about a family may be affecting treatment recommendations. Which response is most appropriate?",
    choices: [
      "Seek consultation, review data and ethics standards, and adjust recommendations to protect client welfare",
      "Trust the belief because clinical judgment is always enough",
      "Avoid documenting the concern",
      "Recommend the most familiar intervention regardless of fit",
    ],
    answer:
      "Seek consultation, review data and ethics standards, and adjust recommendations to protect client welfare",
    explanation:
      "Bias must not interfere with [professional judgment or client welfare].",
    hint:
      "Look for consultation and data-based safeguards against biased judgment.",
  },
  {
    type: "scenario",
    prompt:
      "A BCBA is unsure whether a privacy rule, state law, or agency policy governs a records request. What is the best next action?",
    choices: [
      "Seek appropriate legal, administrative, supervisory, or regulatory guidance before releasing records",
      "Release all records immediately because the request sounds urgent",
      "Ignore the request until it expires",
      "Ask a friend outside the case to decide",
    ],
    answer:
      "Seek appropriate legal, administrative, supervisory, or regulatory guidance before releasing records",
    explanation:
      "Ethical practice must follow [applicable law, regulation, and practice requirements].",
    hint:
      "When requirements are unclear, consider the safest authorized guidance channel.",
  },
  {
    type: "scenario",
    prompt:
      "A supervisor ends a supervision relationship but leaves the supervisee responsible for active client programming without replacement oversight. Which issue is most direct?",
    choices: [
      "Unethical supervision discontinuation and transition planning",
      "Appropriate independent practice",
      "A valid discontinuous measurement procedure",
      "A public statement concern only",
    ],
    answer:
      "Unethical supervision discontinuation and transition planning",
    explanation:
      "Discontinuing supervision ethically requires [supervisee protection, client protection, and transition documentation].",
    hint:
      "Look for whether the supervision change protects clients and supervisee competence.",
  },
];

const sectionCMeasurementExpansionPracticeQuestions: QuestionContent[] = [
  {
    type: "scenario",
    prompt:
      "During a 20-minute observation, a learner emits 40 hand raises. Which measure reports responses per unit of time?",
    choices: ["Rate", "Frequency", "Duration", "Latency"],
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
    answer:
      "Partial interval, whole interval, and momentary time sampling descriptions selected",
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
    graphId: "measurement-level-change",
    prompt:
      "The data show a clear level change immediately after one condition change and another clear level change after the next condition change. Which measurement/data interpretation is strongest?",
    choices: [
      "The data pattern shows strong immediacy and low overlap across condition changes.",
      "The graph cannot be interpreted because it has phase labels.",
      "The graph shows only a bar graph summary.",
      "The graph shows no relation because the data are connected.",
    ],
    answer:
      "The data pattern shows strong immediacy and low overlap across condition changes.",
    explanation:
      "Immediate data shifts with little overlap support a stronger [visual-analysis interpretation].",
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
];

const sectionCMeasurementExpansionMasteryQuestions: QuestionContent[] = [
  {
    prompt: "Which option is best described as rate?",
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
    choices: ["Latency", "Duration", "IRT", "Frequency"],
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
    graphId: "measurement-level-change",
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
    prompt:
      "Which data pattern most strongly suggests collecting more data before changing an intervention?",
    choices: [
      "Highly variable data with no clear trend",
      "Stable baseline followed by immediate level change",
      "Repeated low variability across all sessions",
      "Stable data with an immediate level change",
    ],
    answer: "Highly variable data with no clear trend",
    explanation:
      "Variable data with [no clear trend] can weaken confidence and may require more data before a decision.",
    hint:
      "Think about when the visual pattern is [unclear] rather than stable or replicated.",
  },
  {
    prompt: "Which option is best described as a data path?",
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
    prompt: "Which option best differentiates latency from IRT?",
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
];

const sectionCValidityIntegrityMiniLessons: MiniLessonContent[] = [
  {
    slug: "validity-vs-reliability",
    label: "C.8",
    title: "Validity vs Reliability",
    body: [
      "Validity means the measurement system measures [what it is intended to measure].",
      "Reliability means the procedure produces [consistent results across observers or occasions].",
    ],
    visual: {
      type: "matching",
      prompt: "Match each measurement quality to its cue.",
      pairs: [
        { term: "Validity", definition: "Measures the intended behavior or dimension." },
        { term: "Reliability", definition: "Produces consistent measurement results." },
        { term: "Nonvalid measure", definition: "Records something different from the target behavior." },
        { term: "Unreliable measure", definition: "Changes because of observer or procedure inconsistency." },
      ],
    },
  },
  {
    slug: "accuracy-reliability-bias-error",
    label: "C.8",
    title: "Accuracy, Reliability, Bias, and Error",
    body: [
      "Accuracy means observed values are [close to the true value].",
      "Measurement bias is [systematic error in one direction]; measurement error is [the difference between observed and true values].",
    ],
    visual: {
      type: "matching",
      prompt: "Match each measurement concern to its cue.",
      pairs: [
        { term: "Accuracy", definition: "Observed values are close to the true value." },
        { term: "Reliability", definition: "Observers repeatedly record similar values." },
        { term: "Bias", definition: "Error occurs systematically in one direction." },
        { term: "Error", definition: "Observed values differ from true values." },
      ],
    },
  },
  {
    slug: "efficient-measurement-systems",
    label: "C.9",
    title: "Efficient Measurement Systems",
    body: [
      "Efficient measurement balances [data usefulness with response effort].",
      "A simpler system may be appropriate when it still answers [the clinical decision question].",
    ],
    visual: {
      type: "choice",
      prompt:
        "A high-rate classroom behavior occurs all day, and exact frequency would be impractical. Which decision best reflects efficiency?",
      choices: [
        "Choose a feasible sampling system that still answers the question",
        "Stop collecting data because exact frequency is hard",
        "Use the most complex system regardless of observer training",
        "Change the target behavior so measurement is easier",
      ],
      answer: "Choose a feasible sampling system that still answers the question",
      hint:
        "Consider [data usefulness], [observer effort], and whether the system answers the clinical question.",
      feedback:
        "Efficient systems preserve decision value while reducing unnecessary measurement burden.",
    },
  },
  {
    slug: "cost-benefit-and-training-duration",
    label: "C.9",
    title: "Cost-Benefit and Observer Training",
    body: [
      "Cost-benefit analysis weighs [decision value against time, training, and effort].",
      "Observer training duration matters when complex systems reduce [feasibility or reliability].",
    ],
    visual: {
      type: "select-all",
      prompt: "Select factors that should affect measurement-system selection.",
      choices: [
        { label: "How useful the data are for decisions", correct: true },
        { label: "How much observer training is required", correct: true },
        { label: "Whether the system is practical in the setting", correct: true },
        { label: "Whether the graph looks decorative", correct: false },
      ],
      feedback:
        "Measurement selection should consider [decision usefulness], [training time], and [practical implementation].",
    },
  },
  {
    slug: "procedural-integrity-measurement",
    label: "C.12",
    title: "Procedural Integrity Measurement",
    body: [
      "Procedural integrity measures whether procedures are implemented [as written].",
      "Treatment outcomes are harder to interpret when procedures are [not implemented consistently].",
    ],
    visual: {
      type: "choice",
      prompt:
        "Behavior does not improve, and integrity data show staff delivered reinforcement only half of the planned times. What is the best interpretation?",
      choices: [
        "Low procedural integrity weakens conclusions about the intervention",
        "The intervention is definitely ineffective",
        "The dependent variable is invalid",
        "A standard celeration chart is required",
      ],
      answer: "Low procedural integrity weakens conclusions about the intervention",
      hint:
        "Ask whether the intervention was implemented [as written] before interpreting outcomes.",
      feedback:
        "Procedural integrity data help determine whether outcomes reflect the planned procedure or inconsistent implementation.",
    },
  },
  {
    slug: "treatment-integrity-vs-procedural-integrity",
    label: "C.12",
    title: "Treatment Integrity vs Procedural Integrity",
    body: [
      "Treatment integrity and procedural integrity both concern [implementation as planned].",
      "Procedural-integrity data show whether intervention components occurred [as written and at the planned quality].",
    ],
    visual: {
      type: "matching",
      prompt: "Match each integrity cue.",
      pairs: [
        { term: "Procedure implemented as written", definition: "High procedural integrity." },
        { term: "Steps skipped or delivered inconsistently", definition: "Low procedural integrity." },
        { term: "Outcome improves with high integrity", definition: "Stronger interpretation of intervention effect." },
        { term: "Outcome unclear with low integrity", definition: "Weaker interpretation of intervention effect." },
      ],
    },
  },
  {
    slug: "standard-celeration-chart",
    label: "C.10-C.11",
    title: "Standard Celeration Chart",
    body: [
      "Standard celeration charts show [frequency change over time].",
      "Celeration describes [acceleration or deceleration in response frequency].",
    ],
    visual: {
      type: "choice",
      prompt: "Which statement best describes what a standard celeration chart displays?",
      choices: [
        "Frequency change over time on a standardized display",
        "A single percentage score without repeated measurement",
        "Only agreement between two observers",
        "Only categorical survey responses",
      ],
      answer: "Frequency change over time on a standardized display",
      hint:
        "Focus on [frequency] and [change over time], not IOA or one-time summaries.",
      feedback:
        "Standard celeration charts are used to display repeated frequency data and celeration patterns.",
    },
  },
  {
    slug: "celeration-vs-line-graph",
    label: "C.10-C.11",
    title: "Standard Celeration Chart vs Line Graph",
    body: [
      "A basic line graph shows [level and trend on an equal-interval display].",
      "A standard celeration chart emphasizes [multiplicative frequency change over time].",
    ],
    visual: {
      type: "matching",
      prompt: "Match the display to its main discrimination cue.",
      pairs: [
        { term: "Line graph", definition: "Repeated data points connected across sessions or time." },
        { term: "Standard celeration chart", definition: "Standardized display for frequency change over time." },
        { term: "Acceleration", definition: "Frequency increases over time." },
        { term: "Deceleration", definition: "Frequency decreases over time." },
      ],
    },
  },
];

const sectionCValidityIntegrityPracticeQuestions: QuestionContent[] = [
  {
    type: "scenario",
    prompt:
      "A team wants to measure aggressive behavior, but the data sheet records only whether the learner frowned. Which measurement concern is most direct?",
    choices: ["Validity", "Reliability", "Trial-by-trial IOA", "Generality"],
    answer: "Validity",
    explanation:
      "Validity means the system measures [what it is intended to measure].",
    hint:
      "Ask whether the recorded response matches [the intended target behavior].",
  },
  {
    type: "scenario",
    prompt:
      "Two observers repeatedly obtain similar counts, but both miss low-intensity responses because the definition excludes them. Which statement is most accurate?",
    choices: [
      "The data may be reliable but inaccurate",
      "The data must be valid because observers agree",
      "The data show procedural integrity",
      "The data are a standard celeration chart",
    ],
    answer: "The data may be reliable but inaccurate",
    explanation:
      "Reliability reflects [consistent results]; accuracy requires values [close to the true value].",
    hint:
      "Separate [observer consistency] from [closeness to the true value].",
  },
  {
    type: "scenario",
    prompt:
      "An observer consistently records shorter durations than actually occurred because the timer starts late. Which issue is most direct?",
    choices: ["Measurement bias", "Interobserver agreement", "Maintenance", "Momentary time sampling"],
    answer: "Measurement bias",
    explanation:
      "Measurement bias is [systematic error in one direction].",
    hint:
      "Look for an error pattern that repeatedly shifts values [in the same direction].",
  },
  {
    type: "select-all",
    prompt: "Select factors that support an efficient measurement system.",
    choices: [
      "The data answer the clinical decision question.",
      "Observers can be trained to use the system accurately.",
      "The system is feasible in the setting.",
      "The system is selected only because it is the longest form available.",
    ],
    answers: [
      "The data answer the clinical decision question.",
      "Observers can be trained to use the system accurately.",
      "The system is feasible in the setting.",
    ],
    answer:
      "Useful, trainable, and feasible measurement systems support efficient data collection.",
    explanation:
      "Efficiency balances [data usefulness], [training time], and [response effort].",
    hint:
      "Think about whether the data are useful enough to justify [time and effort].",
  },
  {
    type: "scenario",
    prompt:
      "A caregiver reports that the intervention was rarely implemented as written, but the graph shows little behavior change. What should the BCBA consider first?",
    choices: [
      "Low procedural integrity may weaken interpretation of the outcome",
      "The intervention is conclusively ineffective",
      "The behavior has generalized",
      "Reliability of the y-axis label is the central issue",
    ],
    answer: "Low procedural integrity may weaken interpretation of the outcome",
    explanation:
      "Procedural integrity measures whether procedures were implemented [as written], which affects interpretation of outcomes.",
    hint:
      "Ask whether poor outcomes reflect [the procedure] or [inconsistent implementation].",
  },
  {
    type: "scenario",
    prompt:
      "A chart displays response frequency each day and emphasizes whether responding is accelerating or decelerating over time. Which display is most directly described?",
    choices: [
      "Standard celeration chart",
      "Bar graph",
      "Scatterplot for time of day",
      "Trial-by-trial IOA table",
    ],
    answer: "Standard celeration chart",
    explanation:
      "Standard celeration charts show [frequency change over time], including acceleration and deceleration.",
    hint:
      "Focus on [frequency over time] and [celeration].",
  },
];

const sectionCValidityIntegrityMasteryQuestions: QuestionContent[] = [
  {
    type: "scenario",
    prompt:
      "A BCBA measures 'engagement' by recording only eye contact, although the operational definition includes touching materials, responding, and looking at the task. Which issue is most direct?",
    choices: ["Validity", "Momentary time sampling", "Generalization", "Total count IOA"],
    answer: "Validity",
    explanation:
      "Validity means the measurement system measures [what it is intended to measure].",
    hint:
      "Compare the measured response to [the full intended target].",
  },
  {
    type: "scenario",
    prompt:
      "Observer records are highly consistent across sessions, but later video review shows both observers missed many responses. Which statement is most accurate?",
    choices: [
      "The measurement may be reliable but not accurate",
      "The measurement must be accurate because it is consistent",
      "The measurement demonstrates procedural integrity",
      "The measurement is a permanent product",
    ],
    answer: "The measurement may be reliable but not accurate",
    explanation:
      "Reliable data are [consistent]; accurate data are [close to the true value].",
    hint:
      "Do not treat [consistency] as the same thing as [truthfulness of values].",
  },
  {
    type: "scenario",
    prompt:
      "A complex duration system gives excellent detail but requires extensive training and produces frequent observer errors in a busy classroom. Which consideration is most relevant?",
    choices: [
      "Efficiency and cost-benefit of the measurement system",
      "Positive punishment",
      "Graph generalization summary",
      "Generality across settings",
    ],
    answer: "Efficiency and cost-benefit of the measurement system",
    explanation:
      "Efficient measurement weighs [data usefulness against time, training, and effort].",
    hint:
      "Consider whether the measurement system is [practical enough] to produce usable data.",
  },
  {
    type: "scenario",
    prompt:
      "Treatment data show no improvement, and integrity data show the procedure was implemented correctly on only 35% of opportunities. What conclusion is most appropriate?",
    choices: [
      "The low integrity weakens conclusions about treatment effectiveness",
      "The treatment is proven ineffective",
      "The dependent variable is no longer measurable",
      "The outcome demonstrates maintenance",
    ],
    answer: "The low integrity weakens conclusions about treatment effectiveness",
    explanation:
      "Treatment outcomes are harder to interpret when procedures are [not implemented consistently].",
    hint:
      "Ask whether the treatment was actually delivered [as planned].",
  },
  {
    type: "scenario",
    prompt:
      "A display shows daily response frequency and whether performance is accelerating or decelerating. Which interpretation target fits best?",
    choices: [
      "Celeration",
      "Exact count IOA",
      "Latency",
      "Procedural drift",
    ],
    answer: "Celeration",
    explanation:
      "Celeration describes [acceleration or deceleration in response frequency].",
    hint:
      "Look for [frequency change over time], not observer agreement or response delay.",
  },
];

const sectionDRelocatedFromCMiniLessons: MiniLessonContent[] = [
  {
    slug: "single-subject-design-basics",
    label: "D.4-D.7",
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
    label: "D.4-D.7",
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
];

const sectionDRelocatedFromCPracticeQuestions: QuestionContent[] = [
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
];

const sectionDRelocatedFromCMasteryQuestions: QuestionContent[] = [
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
];

const sectionDAdditionalPracticeQuestions: QuestionContent[] = [
  {
    type: "matching",
    prompt: "Match each experimental-control term to its discrimination cue.",
    pairs: [
      { term: "Prediction", definition: "Baseline estimates future responding without intervention." },
      { term: "Verification", definition: "A return or comparison tests whether the prediction holds." },
      { term: "Replication", definition: "The effect occurs again when the independent variable returns." },
      { term: "Functional relation", definition: "Behavior changes systematically with manipulation of the independent variable." },
    ],
    answer: "All experimental-control terms matched correctly",
    explanation:
      "Prediction, verification, and replication support [experimental control] and help demonstrate [functional relations].",
    hint:
      "Separate baseline forecasting, testing the forecast, and reproducing the effect.",
  },
  {
    type: "scenario",
    graphId: "reversal-pvr",
    prompt:
      "A baseline predicts continued responding, withdrawal produces a return toward baseline, and reintroduction repeats the intervention effect. What is the strongest interpretation?",
    choices: [
      "The pattern strengthens experimental control through prediction, verification, and replication",
      "Only external validity has been demonstrated",
      "A single A-B comparison is sufficient",
      "The pattern is unrelated to functional relations",
    ],
    answer:
      "The pattern strengthens experimental control through prediction, verification, and replication",
    explanation:
      "A functional relation is strengthened when behavior changes [predictably and repeatedly] with the independent variable.",
    hint:
      "Look for repeated behavior change tied to condition changes.",
  },
  {
    type: "sorting",
    prompt: "Sort each validity example.",
    categories: ["Internal validity", "External validity"],
    items: [
      { label: "Did the intervention cause the behavior change?", category: "Internal validity" },
      { label: "Will the effect occur in a different setting?", category: "External validity" },
      { label: "Were history threats ruled out?", category: "Internal validity" },
      { label: "Will the effect generalize to another learner?", category: "External validity" },
    ],
    answer: "All validity examples sorted correctly",
    explanation:
      "Internal validity concerns [causal control]; external validity concerns [generality beyond the original conditions].",
    hint:
      "Separate causation within the study from generality outside the study.",
  },
  {
    type: "matching",
    prompt: "Match each internal-validity threat to the scenario cue.",
    pairs: [
      { term: "History", definition: "A school-wide reward program starts during treatment." },
      { term: "Maturation", definition: "Behavior changes gradually as the learner grows or develops." },
      { term: "Instrumentation", definition: "Observers change definitions or scoring rules mid-study." },
      { term: "Sequence effect", definition: "An earlier condition changes responding in a later condition." },
    ],
    answer: "All validity threats matched correctly",
    explanation:
      "Threats to internal validity are [alternative explanations] for behavior change.",
    hint:
      "Match the threat by what changed besides the planned independent variable.",
  },
  {
    type: "scenario",
    prompt:
      "An observer slowly begins counting shorter and shorter instances of behavior across sessions. Which threat is most relevant?",
    choices: [
      "Observer drift",
      "External validity",
      "Parametric analysis",
      "Replication",
    ],
    answer: "Observer drift",
    explanation:
      "Observer drift occurs when scoring gradually shifts away from [the original measurement definition].",
    hint:
      "Focus on gradual measurement change by the observer.",
  },
  {
    type: "select-all",
    prompt: "Select reasons repeated measurement matters in single-case experimental design.",
    choices: [
      "It reveals trend across sessions",
      "It shows variability within phases",
      "It allows comparison before and after condition changes",
      "It eliminates the need for operational definitions",
    ],
    answers: [
      "It reveals trend across sessions",
      "It shows variability within phases",
      "It allows comparison before and after condition changes",
    ],
    answer:
      "Repeated measurement reveals trend, variability, and behavior change across conditions.",
    explanation:
      "Repeated measurement provides the data patterns needed for [visual analysis and experimental control].",
    hint:
      "Look for what multiple data points show over time.",
  },
  {
    type: "scenario",
    prompt:
      "Baseline data are already improving steeply before intervention begins. What is the main interpretive concern?",
    choices: [
      "The baseline may not support a clear prediction of future responding",
      "The dependent variable has been manipulated",
      "External validity has been proven",
      "The graph must be a multielement design",
    ],
    answer: "The baseline may not support a clear prediction of future responding",
    explanation:
      "A strongly improving baseline can weaken confidence that later change was caused by [the intervention].",
    hint:
      "Ask whether baseline supports a stable prediction before treatment starts.",
  },
  {
    type: "scenario",
    graphId: "alternating-standard",
    prompt:
      "Two intervention packages are rapidly alternated, and one produces consistently better outcomes with similar effort. Which analysis is most directly represented?",
    choices: [
      "Comparative analysis",
      "Component analysis",
      "Parametric analysis",
      "Maturation analysis",
    ],
    answer: "Comparative analysis",
    explanation:
      "Comparative analysis evaluates [the relative effects of two or more interventions or conditions].",
    hint:
      "Look for comparison of whole interventions rather than treatment parts or dosage values.",
  },
  {
    type: "scenario",
    prompt:
      "A treatment package includes visual prompts, praise, and tokens. The BCBA systematically removes one element at a time to find what is necessary. Which analysis is this?",
    choices: [
      "Component analysis",
      "Parametric analysis",
      "External validity analysis",
      "History analysis",
    ],
    answer: "Component analysis",
    explanation:
      "Component analysis identifies [active or necessary treatment elements].",
    hint:
      "Ask whether the analyst is testing parts of one package.",
  },
  {
    type: "scenario",
    prompt:
      "A BCBA compares 2-minute, 5-minute, and 10-minute breaks while keeping the procedure otherwise constant. Which analysis is this?",
    choices: [
      "Parametric analysis",
      "Component analysis",
      "Comparative analysis of unrelated packages",
      "Instrumentation analysis",
    ],
    answer: "Parametric analysis",
    explanation:
      "Parametric analysis evaluates [different values of one independent variable].",
    hint:
      "Look for one variable varied by amount, duration, magnitude, intensity, or frequency.",
  },
  {
    type: "scenario",
    prompt:
      "A learner's severe behavior is likely irreversible once reduced, and withdrawing treatment would be unsafe. Which design-selection consideration matters most?",
    choices: [
      "Avoid designs requiring withdrawal of effective treatment",
      "Use A-B-A-B because withdrawal is always strongest",
      "Ignore ethics because experimental control is the only goal",
      "Use a simple A-B design because repeated measurement is unnecessary",
    ],
    answer: "Avoid designs requiring withdrawal of effective treatment",
    explanation:
      "Design selection should account for [ethics, reversibility, and client safety].",
    hint:
      "Focus on whether the design requires removing an effective intervention.",
  },
  {
    type: "select-all",
    prompt: "Select visual-analysis features that support a stronger treatment effect.",
    choices: [
      "Immediate change after phase change",
      "Low overlap between baseline and intervention",
      "Consistent patterns in similar phases",
      "A descriptive title that names the design",
    ],
    answers: [
      "Immediate change after phase change",
      "Low overlap between baseline and intervention",
      "Consistent patterns in similar phases",
    ],
    answer:
      "Immediacy, low overlap, and consistency strengthen visual interpretation.",
    explanation:
      "Visual analysis integrates [level, trend, variability, immediacy, overlap, and consistency].",
    hint:
      "Look for graph features that show behavior changed with the condition.",
  },
];

const sectionDAdditionalMasteryQuestions: QuestionContent[] = [
  {
    type: "scenario",
    graphId: "reversal-pvr",
    prompt:
      "Which statement best describes how prediction, verification, and replication support experimental control?",
    choices: [
      "They show that behavior changes predictably and repeatedly with manipulation of the independent variable.",
      "They show that behavior changed once after treatment started.",
      "They show that findings generalize to every setting.",
      "They replace the need for repeated measurement.",
    ],
    answer:
      "They show that behavior changes predictably and repeatedly with manipulation of the independent variable.",
    explanation:
      "Prediction, verification, and replication strengthen interpretation of [functional relations].",
    hint:
      "Focus on repeated condition-linked behavior change.",
  },
  {
    type: "scenario",
    prompt:
      "A study shows clear experimental control for one learner, and the team asks whether the same effect will occur with another learner. Which validity issue is being evaluated?",
    choices: [
      "External validity",
      "Internal validity",
      "Instrumentation",
      "Maturation",
    ],
    answer: "External validity",
    explanation:
      "External validity concerns whether findings [generalize beyond the original conditions].",
    hint:
      "Decide whether the question is about causation inside the study or generality outside it.",
  },
  {
    type: "scenario",
    prompt:
      "A new data collector begins using a different response definition during the intervention phase. Which threat is most relevant?",
    choices: [
      "Instrumentation",
      "History",
      "External validity",
      "Parametric analysis",
    ],
    answer: "Instrumentation",
    explanation:
      "Instrumentation threats involve [changes in measurement procedures, observers, or definitions].",
    hint:
      "Look for a change in how data are measured.",
  },
  {
    type: "scenario",
    prompt:
      "Why is repeated measurement essential in single-case experimental designs?",
    choices: [
      "It allows analysis of level, trend, variability, and behavior change across conditions.",
      "It guarantees generalization across settings.",
      "It removes the need for baseline data.",
      "It makes observer drift impossible.",
    ],
    answer:
      "It allows analysis of level, trend, variability, and behavior change across conditions.",
    explanation:
      "Repeated measurement provides [data patterns over time] needed for visual analysis.",
    hint:
      "Think about what repeated data points make visible.",
  },
  {
    type: "scenario",
    prompt:
      "A baseline is highly variable and trending in the desired direction before treatment. Which concern is strongest?",
    choices: [
      "The baseline may not support a clear prediction of future behavior without treatment.",
      "The baseline proves external validity.",
      "The design must be a component analysis.",
      "The independent variable is already replicated.",
    ],
    answer:
      "The baseline may not support a clear prediction of future behavior without treatment.",
    explanation:
      "Baseline stability improves prediction because data show [limited trend and interpretable variability].",
    hint:
      "Ask whether baseline makes future responding predictable.",
  },
  {
    type: "scenario",
    graphId: "alternating-standard",
    prompt:
      "A BCBA compares two complete treatment packages and selects the one with clearer effects and easier implementation. Which analysis is represented?",
    choices: [
      "Comparative analysis",
      "Component analysis",
      "Parametric analysis",
      "Observer drift analysis",
    ],
    answer: "Comparative analysis",
    explanation:
      "Comparative analysis evaluates [relative effects of whole conditions or interventions].",
    hint:
      "Look for comparison across complete intervention options.",
  },
  {
    type: "scenario",
    prompt:
      "A treatment package is tested with and without response prompts to determine whether prompts are necessary. Which analysis is represented?",
    choices: [
      "Component analysis",
      "Parametric analysis",
      "External validity analysis",
      "Maturation analysis",
    ],
    answer: "Component analysis",
    explanation:
      "Component analysis evaluates [which elements of a treatment package are necessary].",
    hint:
      "Focus on whether one part of a package is being isolated or removed.",
  },
  {
    type: "scenario",
    prompt:
      "A BCBA compares 10-second, 20-second, and 30-second prompts while keeping the intervention otherwise constant. Which analysis is represented?",
    choices: [
      "Parametric analysis",
      "Component analysis",
      "Multiple Baseline Design",
      "History threat",
    ],
    answer: "Parametric analysis",
    explanation:
      "Parametric analysis manipulates [different values of one independent variable].",
    hint:
      "Look for one feature changing by value or amount.",
  },
  {
    type: "scenario",
    prompt:
      "Which design is often appropriate when treatment withdrawal is unethical but staggered introduction is feasible?",
    choices: [
      "Multiple Baseline Design",
      "A-B-A-B Withdrawal Design",
      "Simple A-B Design only",
      "Reversal Design with repeated withdrawal",
    ],
    answer: "Multiple Baseline Design",
    explanation:
      "Multiple Baseline Designs can show control [without withdrawing an effective intervention].",
    hint:
      "Choose the design that avoids removing treatment while still demonstrating control.",
  },
  {
    type: "scenario",
    graphId: "reversal-aba",
    prompt:
      "During visual analysis, intervention data show an immediate level change, minimal overlap, and a consistent pattern across comparisons. Which interpretation is strongest?",
    choices: [
      "The visual pattern supports a stronger treatment effect.",
      "The graph cannot support experimental control because it has phase lines.",
      "Only the axis label should be interpreted.",
      "The pattern shows observer drift.",
    ],
    answer: "The visual pattern supports a stronger treatment effect.",
    explanation:
      "Immediacy, low overlap, and consistency across similar phases support [stronger visual evidence of an effect].",
    hint:
      "Use level, immediacy, overlap, and consistency to interpret the graph.",
  },
];

const sectionDPracticePromptsMovedToMastery = new Set<string>([
  "Match each experimental-control term to its discrimination cue.",
  "Sort each validity example.",
  "Match each internal-validity threat to the scenario cue.",
  "Select reasons repeated measurement matters in single-case experimental design.",
  "A learner's severe behavior is likely irreversible once reduced, and withdrawing treatment would be unsafe. Which design-selection consideration matters most?",
  "Select visual-analysis features that support a stronger treatment effect.",
  "Complete the graph-interpretation cue: In a Changing Criterion Design, behavior should track the changing ____.",
  "Study behavior increases during Positive Attention, decreases when attention is removed, and increases again when Positive Attention returns. Which graph feature shows replication?",
  "In the withdrawal design graph, which feature verifies the original baseline prediction?",
  "A reprimand condition is ineffective before a water mist condition, but effective after the water mist condition. What threat or effect should be considered?",
]);

const excludeMovedModuleDPracticeQuestions = (questions: QuestionContent[]) =>
  questions.filter((question) => !sectionDPracticePromptsMovedToMastery.has(question.prompt));

const sectionDMovedPracticeMasteryQuestions: QuestionContent[] = [
  {
    type: "scenario",
    prompt:
      "Which option best differentiates prediction, verification, and replication in experimental control?",
    choices: [
      "Prediction estimates future baseline responding, verification tests that estimate, and replication reproduces the effect.",
      "Prediction means the intervention worked once, verification means the result generalized, and replication means observers agreed.",
      "Prediction identifies the dependent variable, verification labels the axis, and replication selects the graph scale.",
      "Prediction, verification, and replication are interchangeable labels for the same phase-change line.",
    ],
    answer:
      "Prediction estimates future baseline responding, verification tests that estimate, and replication reproduces the effect.",
    explanation:
      "Experimental control is strengthened when baseline prediction is tested and the intervention effect is reproduced through [prediction, verification, and replication].",
    hint:
      "Separate forecasting baseline responding, testing that forecast, and reproducing the effect.",
  },
  {
    type: "scenario",
    prompt:
      "Which statement best differentiates internal validity from external validity?",
    choices: [
      "Internal validity concerns whether the independent variable caused change; external validity concerns whether findings generalize.",
      "Internal validity concerns whether findings generalize; external validity concerns whether the dependent variable was measurable.",
      "Internal validity means the graph has repeated measurement; external validity means the y-axis is labeled.",
      "Internal validity and external validity both mean the same thing as treatment integrity.",
    ],
    answer:
      "Internal validity concerns whether the independent variable caused change; external validity concerns whether findings generalize.",
    explanation:
      "Internal validity asks whether the design supports [causal control]; external validity asks whether the finding shows [generality beyond the original conditions].",
    hint:
      "Ask whether the concern is causal control inside the study or generality outside it.",
  },
  {
    type: "scenario",
    prompt:
      "A school-wide reward program starts during treatment, observers change scoring rules, and a learner's development may affect responding. What do these examples have in common?",
    choices: [
      "They are alternative explanations that can threaten internal validity.",
      "They are required components of a Changing Criterion Design.",
      "They demonstrate external validity across settings.",
      "They are examples of differentiated data paths in a multielement design.",
    ],
    answer:
      "They are alternative explanations that can threaten internal validity.",
    explanation:
      "History, maturation, instrumentation, and sequence effects can create [alternative explanations] for behavior change.",
    hint:
      "Focus on events or measurement changes besides the planned independent variable.",
  },
  {
    type: "scenario",
    prompt:
      "Why is repeated measurement necessary for interpreting experimental control in single-case designs?",
    choices: [
      "It reveals level, trend, variability, and behavior change across condition changes.",
      "It eliminates the need for baseline prediction and operational definitions.",
      "It proves treatment effects after one improved data point.",
      "It replaces the need to manipulate the independent variable.",
    ],
    answer:
      "It reveals level, trend, variability, and behavior change across condition changes.",
    explanation:
      "Repeated measurement provides the data patterns needed for [visual analysis and experimental control].",
    hint:
      "Think about what multiple data points show that a single score cannot show.",
  },
  {
    type: "scenario",
    prompt:
      "A target behavior is likely irreversible once reduced, and withdrawing an effective treatment would be unsafe. Which design-selection decision is most appropriate?",
    choices: [
      "Select a design that can show control without requiring treatment withdrawal.",
      "Use repeated withdrawal because it is always required for experimental control.",
      "Avoid baseline measurement because treatment withdrawal is unsafe.",
      "Select a design based only on the easiest graph to draw.",
    ],
    answer:
      "Select a design that can show control without requiring treatment withdrawal.",
    explanation:
      "Design selection should account for [ethics, reversibility, and client safety] while still supporting experimental control.",
    hint:
      "Consider whether the design would require removing an effective intervention.",
  },
  {
    type: "scenario",
    prompt:
      "Which set of visual-analysis features most strongly supports a treatment effect?",
    choices: [
      "Immediate change, low overlap, and consistent patterns across similar phases",
      "A descriptive graph title, one improved point, and a colorful data path",
      "A labeled x-axis, participant diagnosis, and one baseline point",
      "High overlap, delayed change, and inconsistent patterns across similar phases",
    ],
    answer:
      "Immediate change, low overlap, and consistent patterns across similar phases",
    explanation:
      "Visual analysis integrates [level, trend, variability, immediacy, overlap, and consistency] to evaluate treatment effects.",
    hint:
      "Look for features showing behavior changed with the condition, not cosmetic graph features.",
  },
  {
    type: "scenario",
    graphId: "changing-criterion-on-task",
    prompt:
      "In a Changing Criterion Design, which feature most directly supports experimental control?",
    choices: [
      "Behavior changes stepwise with each new criterion.",
      "Treatment is withdrawn and reintroduced across repeated baseline phases.",
      "All tiers change before intervention begins.",
      "Two conditions alternate rapidly with no criterion shifts.",
    ],
    answer: "Behavior changes stepwise with each new criterion.",
    explanation:
      "Changing Criterion Designs show control when behavior [tracks each new criterion].",
    hint:
      "Focus on whether responding shifts with the criterion line.",
  },
  {
    type: "scenario",
    graphId: "reversal-positive-attention",
    prompt:
      "Study behavior increases when Positive Attention is reintroduced after withdrawal. Which experimental-control feature is shown?",
    choices: [
      "Replication of the intervention effect",
      "A staggered baseline across settings",
      "A parametric comparison of criterion values",
      "Observer drift during measurement",
    ],
    answer: "Replication of the intervention effect",
    explanation:
      "Replication occurs when the intervention effect is [reproduced after reintroduction].",
    hint:
      "Look for the effect occurring again when the same condition returns.",
  },
  {
    type: "scenario",
    graphId: "reversal-pvr",
    prompt:
      "During withdrawal, behavior returns toward the baseline pattern. What does this most directly support?",
    choices: [
      "Verification of the original baseline prediction",
      "Generalization across untreated settings",
      "A differentiated multielement condition",
      "A new criterion level in a Changing Criterion Design",
    ],
    answer: "Verification of the original baseline prediction",
    explanation:
      "Verification is supported when withdrawal tests whether behavior returns toward [the predicted baseline pattern].",
    hint:
      "Focus on what the return toward baseline tests after intervention is removed.",
  },
  {
    type: "scenario",
    prompt:
      "A reprimand condition is ineffective before a water mist condition but effective after the water mist condition. Which validity concern should be considered?",
    choices: [
      "A sequence effect",
      "External validity across settings",
      "Response generalization",
      "A criterion-tracking effect",
    ],
    answer: "A sequence effect",
    explanation:
      "A sequence effect occurs when exposure to [an earlier condition influences responding in a later condition].",
    hint:
      "Ask whether one condition changed how the learner responded in a later condition.",
  },
];

const sectionFMiniLessons: MiniLessonContent[] = [
  {
    slug: "purpose-of-assessment",
    label: "F.8",
    title: "Purpose of Assessment",
    body: [
      "Behavior assessment identifies [socially significant behavior] and the conditions related to it.",
      "Assessment results should guide [target selection, treatment decisions, and progress evaluation].",
    ],
    visual: {
      type: "flow",
      prompt: "Order the assessment-to-treatment logic.",
      steps: [
        "Identify socially significant behavior",
        "Define the behavior objectively",
        "Select assessment methods",
        "Use results to guide treatment decisions",
      ],
      feedback:
        "Assessment connects [behavioral need] to [function-based and skill-building decisions].",
    },
  },
  {
    slug: "defining-observable-behavior",
    label: "F.8",
    title: "Defining Behavior",
    body: [
      "Behavior definitions should describe [observable and measurable responses].",
      "Avoid labels that describe presumed feelings, traits, or intent without a measurable response.",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each definition by assessment quality.",
      categories: ["Objective", "Subjective"],
      items: [
        { label: "Hits peer with open hand", category: "Objective" },
        { label: "Acts disrespectful", category: "Subjective" },
        { label: "Leaves seat for more than 3 seconds", category: "Objective" },
        { label: "Refuses because they are lazy", category: "Subjective" },
      ],
    },
  },
  {
    slug: "operational-definitions",
    label: "F.8",
    title: "Operational Definitions",
    body: [
      "An operational definition describes behavior in [observable and measurable terms].",
      "Strong definitions include examples, nonexamples, and clear boundaries for scoring.",
    ],
    visual: {
      type: "choice",
      prompt: "Which definition is most operational?",
      choices: [
        "Aggression = hitting, kicking, biting, or scratching another person with force",
        "Aggression = being mean",
        "Aggression = acting out when frustrated",
        "Aggression = unsafe behavior that staff dislike",
      ],
      answer:
        "Aggression = hitting, kicking, biting, or scratching another person with force",
      hint:
        "Look for [observable responses] and boundaries that two observers could score.",
      feedback:
        "Operational definitions use [observable and measurable terms] rather than labels.",
    },
  },
  {
    slug: "indirect-assessment",
    label: "F.1",
    title: "Indirect Assessment",
    body: [
      "Indirect assessments rely on [reports and interviews].",
      "They are efficient, but they may be affected by memory, interpretation, or incomplete information.",
    ],
    visual: {
      type: "matching",
      prompt: "Match each indirect source to its cue.",
      pairs: [
        { term: "Interview", definition: "Caregiver or staff describes patterns and concerns." },
        { term: "Rating scale", definition: "Structured ratings summarize reported behavior." },
        { term: "Questionnaire", definition: "Written responses identify possible variables." },
        { term: "Record review", definition: "Existing documents provide history and context." },
      ],
    },
  },
  {
    slug: "descriptive-assessment",
    label: "F.5",
    title: "Descriptive Assessment",
    body: [
      "Descriptive assessments involve [direct observation without experimental manipulation].",
      "They can identify correlations between antecedents, behavior, and consequences.",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Descriptive",
      leftText: "Observe behavior in natural routines",
      rightTitle: "Functional analysis",
      rightText: "Manipulate conditions experimentally",
      cue: "Descriptive assessment suggests relations; functional analysis tests relations.",
    },
  },
  {
    slug: "abc-recording",
    label: "F.5",
    title: "ABC Recording",
    body: [
      "ABC recording organizes [antecedent, behavior, and consequence] events.",
      "It supports hypotheses, but it does not prove function by itself.",
    ],
    visual: {
      type: "matching",
      prompt: "Match each ABC component.",
      pairs: [
        { term: "Antecedent", definition: "Event or condition before behavior." },
        { term: "Behavior", definition: "Observable response being measured." },
        { term: "Consequence", definition: "Event following behavior." },
        { term: "Hypothesis", definition: "Possible relation suggested by patterns." },
      ],
    },
  },
  {
    slug: "scatterplots-and-patterns",
    label: "F.5",
    title: "Scatterplots and Conditional Probability",
    body: [
      "Scatterplots show [when behavior occurs] across time, routines, or settings.",
      "Conditional probability estimates how often one event occurs given another event.",
    ],
    visual: {
      type: "choice",
      prompt: "A scatterplot shows aggression mostly during transitions. What is the best next step?",
      choices: [
        "Use the pattern to form a hypothesis and collect more assessment data",
        "Declare transition escape as proven without more data",
        "Ignore the pattern because scatterplots are never useful",
        "Stop assessment and begin punishment procedures",
      ],
      answer:
        "Use the pattern to form a hypothesis and collect more assessment data",
      hint:
        "Scatterplots suggest [time-based patterns], but interpretation still requires caution.",
      feedback:
        "Scatterplots support [hypothesis development], not unsupported conclusions.",
    },
  },
  {
    slug: "functional-analysis",
    label: "F.6",
    title: "Functional Analysis",
    body: [
      "Functional analyses manipulate [environmental variables experimentally].",
      "They test whether attention, escape, tangible access, or automatic reinforcement maintains behavior.",
    ],
    visual: {
      type: "select-all",
      prompt: "Select features of functional analysis.",
      choices: [
        { label: "Systematic manipulation of antecedents and consequences", correct: true },
        { label: "Direct tests of possible maintaining variables", correct: true },
        { label: "Safety planning before assessment sessions", correct: true },
        { label: "Only caregiver opinion with no observation", correct: false },
      ],
      feedback:
        "Functional analysis uses [experimental manipulation] with safety and ethical safeguards.",
    },
  },
  {
    slug: "functional-analysis-conditions",
    label: "F.6",
    title: "Functional Analysis Conditions",
    body: [
      "FA conditions test different [contingency arrangements].",
      "The highest responding in a test condition suggests the maintaining variable for that behavior.",
    ],
    visual: {
      type: "matching",
      prompt: "Match each FA condition to the tested contingency.",
      pairs: [
        { term: "Attention", definition: "Social attention follows behavior." },
        { term: "Escape", definition: "Demands are removed following behavior." },
        { term: "Tangible", definition: "Access to items follows behavior." },
        { term: "Alone/Ignore", definition: "Responding persists without social consequences." },
      ],
    },
  },
  {
    slug: "preference-assessment-purpose",
    label: "F.4",
    title: "Preference Assessments",
    body: [
      "Preference assessments identify [potential reinforcers].",
      "A stimulus becomes a demonstrated reinforcer only if it [increases future responding].",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Preferred item",
      leftText: "Selected or approached during assessment",
      rightTitle: "Reinforcer",
      rightText: "Increases future responding when delivered contingently",
      cue: "Preference suggests possibilities; reinforcement is shown by behavior change.",
    },
  },
  {
    slug: "preference-assessment-formats",
    label: "F.4",
    title: "Preference Assessment Formats",
    body: [
      "Preference format affects efficiency, choice opportunities, and assessment fit.",
      "Choose formats based on client skills, time, setting, and assessment purpose.",
    ],
    visual: {
      type: "matching",
      prompt: "Match each preference format.",
      pairs: [
        { term: "Single-stimulus", definition: "Present one item at a time and record approach." },
        { term: "Paired-stimulus", definition: "Present two items and record the selection." },
        { term: "MSW", definition: "Selected item returns to the array." },
        { term: "MSWO", definition: "Selected item is removed from the array." },
      ],
    },
  },
  {
    slug: "free-operant-preference-assessment",
    label: "F.4",
    title: "Free-Operant Preference Assessment",
    body: [
      "Free-operant preference assessment measures [allocation of time] among available stimuli.",
      "It can be efficient and may reduce forced-choice demands.",
    ],
    visual: {
      type: "choice",
      prompt: "Which example best fits free-operant preference assessment?",
      choices: [
        "The learner moves freely among items while the BCBA records duration of engagement",
        "The learner chooses between exactly two items on each trial",
        "The caregiver completes a rating scale only",
        "The BCBA tests attention and escape conditions",
      ],
      answer:
        "The learner moves freely among items while the BCBA records duration of engagement",
      hint:
        "Look for [free access] and measured engagement with available items.",
      feedback:
        "Free-operant assessment measures [time allocation] across available stimuli.",
    },
  },
  {
    slug: "skill-assessments",
    label: "F.3",
    title: "Skill Assessments",
    body: [
      "Skill assessments identify [skill deficits and prerequisite skills].",
      "They help choose teaching goals, prompting needs, and curriculum priorities.",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each assessment target.",
      categories: ["Skill assessment", "Behavior function assessment"],
      items: [
        { label: "Prerequisite imitation skills", category: "Skill assessment" },
        { label: "Mand repertoire gaps", category: "Skill assessment" },
        { label: "Escape-maintained aggression hypothesis", category: "Behavior function assessment" },
        { label: "Attention as a maintaining consequence", category: "Behavior function assessment" },
      ],
    },
  },
  {
    slug: "selecting-assessment-methods",
    label: "F.7",
    title: "Selecting Assessment Methods",
    body: [
      "Assessment selection balances [efficiency, accuracy, ethics, and contextual fit].",
      "The best method depends on the assessment question and risk level.",
    ],
    visual: {
      type: "flow",
      prompt: "Order assessment selection decisions.",
      steps: [
        "Clarify the assessment question",
        "Consider risk, context, and consent",
        "Choose efficient and accurate methods",
        "Interpret results with limitations",
      ],
      feedback:
        "Assessment selection should fit [purpose, risk, context, and data needs].",
    },
  },
  {
    slug: "assessment-interpretation",
    label: "F.7",
    title: "Assessment Interpretation",
    body: [
      "Assessment interpretation links data patterns to [treatment implications].",
      "Avoid unsupported inferences when assessment data are indirect, incomplete, or correlational.",
    ],
    visual: {
      type: "choice",
      prompt: "Which interpretation is most cautious and behavior analytic?",
      choices: [
        "ABC data suggest attention may be related, so additional assessment or a function-based test may be needed",
        "ABC data prove attention is the function in all settings",
        "Caregiver reports are enough to confirm all functions",
        "One observation rules out automatic reinforcement",
      ],
      answer:
        "ABC data suggest attention may be related, so additional assessment or a function-based test may be needed",
      hint:
        "Separate [suggested correlations] from experimentally demonstrated functional relations.",
      feedback:
        "Interpretation should state [what the data support] and [what they do not prove].",
    },
  },
  {
    slug: "assessment-ethics",
    label: "F.2",
    title: "Assessment Ethics",
    body: [
      "Assessment ethics include [consent, confidentiality, cultural responsiveness, competence, and least intrusive methods].",
      "Assessment should protect client dignity while producing useful data for treatment decisions.",
    ],
    visual: {
      type: "select-all",
      prompt: "Select ethical assessment practices.",
      choices: [
        { label: "Obtain consent and explain assessment procedures", correct: true },
        { label: "Adapt assessment to language and cultural context", correct: true },
        { label: "Protect records and assessment data", correct: true },
        { label: "Use the most intrusive assessment first for convenience", correct: false },
      ],
      feedback:
        "Ethical assessment protects [dignity, consent, privacy, cultural context, and safety].",
    },
  },
];

const sectionFExpandedMiniLessons: MiniLessonContent[] = [
  {
    slug: "educational-records",
    label: "F.1",
    title: "Educational Records",
    body: [
      "Educational records can show [skill history, supports, placement, and intervention response].",
      "Use records to guide questions, not to replace current assessment data.",
    ],
    visual: {
      type: "select-all",
      prompt: "Select educational records likely relevant to behavior assessment.",
      choices: [
        { label: "IEP goals and progress data", correct: true },
        { label: "Prior behavior intervention plans", correct: true },
        { label: "Attendance or transition history", correct: true },
        { label: "A staff member's unrelated vacation schedule", correct: false },
      ],
      feedback:
        "Relevant educational records help identify [skill history, context, and prior intervention response].",
    },
  },
  {
    slug: "medical-historical-records",
    label: "F.1",
    title: "Medical and Historical Records",
    body: [
      "Medical records may identify [health, medication, sleep, sensory, or safety variables] that affect assessment.",
      "Historical records help identify patterns across settings and time.",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each record by likely assessment relevance.",
      categories: ["Relevant", "Not relevant"],
      items: [
        { label: "Medication change near behavior increase", category: "Relevant" },
        { label: "History of seizures and sleep disruption", category: "Relevant" },
        { label: "Old cafeteria menu for a non-food behavior", category: "Not relevant" },
        { label: "Prior incident reports for the same target behavior", category: "Relevant" },
      ],
    },
  },
  {
    slug: "caregiver-interviews",
    label: "F.1",
    title: "Caregiver Interviews",
    body: [
      "Caregiver interviews gather [reported patterns, routines, priorities, and concerns].",
      "Interview data are useful, but they remain indirect until checked against observation or other data.",
    ],
    visual: {
      type: "choice",
      prompt: "Which interview question is strongest for assessment?",
      choices: [
        "What happens right before and after the behavior in daily routines?",
        "Why do you think the child is choosing to be difficult?",
        "Can you confirm attention is the proven function?",
        "Which diagnosis explains the behavior completely?",
      ],
      answer:
        "What happens right before and after the behavior in daily routines?",
      hint:
        "Look for questions about [observable antecedent-behavior-consequence patterns].",
      feedback:
        "Caregiver interviews should gather [contextual and behavioral information] without assuming function.",
    },
  },
  {
    slug: "interdisciplinary-information",
    label: "F.1",
    title: "Interdisciplinary Information",
    body: [
      "Other professionals may provide information about [communication, medical, educational, or environmental variables].",
      "Integrate interdisciplinary information within behavior-analytic scope and confidentiality requirements.",
    ],
    visual: {
      type: "matching",
      prompt: "Match each source to a possible assessment contribution.",
      pairs: [
        { term: "Speech-language pathologist", definition: "Communication needs and response forms." },
        { term: "Occupational therapist", definition: "Sensory or motor participation variables." },
        { term: "Teacher", definition: "Classroom routines and skill demands." },
        { term: "Medical provider", definition: "Health variables needing referral or coordination." },
      ],
    },
  },
  {
    slug: "relevant-vs-irrelevant-records",
    label: "F.1",
    title: "Relevant vs Irrelevant Records",
    body: [
      "Relevant records clarify [assessment questions, context, risk, or treatment planning].",
      "Irrelevant records add noise and can increase bias or confidentiality risk.",
    ],
    visual: {
      type: "choice",
      prompt: "Which record is most relevant before assessing aggression during transitions?",
      choices: [
        "Recent transition incident reports with antecedents and consequences",
        "A two-year-old unrelated art grade",
        "A staff birthday calendar",
        "A generic school newsletter",
      ],
      answer:
        "Recent transition incident reports with antecedents and consequences",
      hint:
        "Choose the source most connected to [the target behavior and assessment question].",
      feedback:
        "Relevant records help answer [the specific assessment question].",
    },
  },
  {
    slug: "culturally-responsive-assessment",
    label: "F.2",
    title: "Culturally Responsive Assessment",
    body: [
      "Culturally responsive assessment considers [client values, routines, language, and context].",
      "It improves assessment validity by reducing assumptions about what behavior means.",
    ],
    visual: {
      type: "select-all",
      prompt: "Select culturally responsive assessment actions.",
      choices: [
        { label: "Ask how family routines affect behavior and goals", correct: true },
        { label: "Use interpreters or accessible materials when needed", correct: true },
        { label: "Check whether examples fit the client's context", correct: true },
        { label: "Apply one standard goal without stakeholder input", correct: false },
      ],
      feedback:
        "Culturally responsive assessment attends to [values, language, routines, and context].",
    },
  },
  {
    slug: "culturally-relevant-interviewing",
    label: "F.2",
    title: "Culturally Relevant Interviewing",
    body: [
      "Culturally relevant interviewing uses [respectful questions and active listening].",
      "The goal is to understand context without treating culture as a stereotype.",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Responsive question",
      leftText: "How do routines and family priorities affect this goal?",
      rightTitle: "Biased question",
      rightText: "Is this behavior just part of your culture?",
      cue: "Ask about [individual context], not assumptions.",
    },
  },
  {
    slug: "avoiding-cultural-bias",
    label: "F.2",
    title: "Avoiding Cultural Bias",
    body: [
      "Bias can make assessors misread [communication style, routines, preferences, or priorities].",
      "Use data, consultation, and stakeholder input to reduce biased interpretation.",
    ],
    visual: {
      type: "choice",
      prompt: "Which action best reduces cultural bias?",
      choices: [
        "Verify assumptions with the client, caregiver, data, and consultation",
        "Assume the assessor's routines define appropriate behavior",
        "Ignore language access because the assessment form is standardized",
        "Treat caregiver disagreement as noncompliance",
      ],
      answer:
        "Verify assumptions with the client, caregiver, data, and consultation",
      hint:
        "Look for a response that checks [assumptions] against data and stakeholder context.",
      feedback:
        "Bias is reduced through [data, consultation, and culturally relevant input].",
    },
  },
  {
    slug: "language-access-assessment",
    label: "F.2",
    title: "Language and Access Considerations",
    body: [
      "Language access affects [consent, interview accuracy, and assessment validity].",
      "Accessible materials and interpreters can improve participation and reduce misunderstanding.",
    ],
    visual: {
      type: "fill-blank",
      prompt: "Complete the language access cue.",
      sentence: "Assessment materials should be understandable and ____ to the client or caregiver.",
      answer: "accessible",
      feedback:
        "Language access supports [accurate assessment and informed participation].",
    },
  },
  {
    slug: "prerequisite-skill-assessment",
    label: "F.3",
    title: "Prerequisite Skill Assessment",
    body: [
      "Prerequisite skill assessment identifies [skills needed before teaching a target].",
      "Missing prerequisites may explain slow acquisition even when reinforcement is strong.",
    ],
    visual: {
      type: "matching",
      prompt: "Match each target skill to a likely prerequisite.",
      pairs: [
        { term: "Imitation training", definition: "Attending and motor imitation readiness." },
        { term: "Matching-to-sample", definition: "Scanning and conditional discrimination." },
        { term: "Mand training", definition: "Motivating operation and response form." },
        { term: "Chained task", definition: "Component steps and transition skills." },
      ],
    },
  },
  {
    slug: "curriculum-based-assessment",
    label: "F.3",
    title: "Curriculum-Based Assessment",
    body: [
      "Curriculum-based assessment compares current performance to [instructional sequences or curriculum goals].",
      "It helps select teaching targets that are useful and appropriately sequenced.",
    ],
    visual: {
      type: "choice",
      prompt: "Which example best fits curriculum-based assessment?",
      choices: [
        "Assessing mastered and missing skills within a language curriculum sequence",
        "Testing whether problem behavior is maintained by escape",
        "Recording behavior at the end of each interval",
        "Ranking edible items from most to least selected",
      ],
      answer:
        "Assessing mastered and missing skills within a language curriculum sequence",
      hint:
        "Look for assessment tied to [instructional scope and sequence].",
      feedback:
        "Curriculum-based assessment identifies [current skill levels within a teaching sequence].",
    },
  },
  {
    slug: "developmental-considerations",
    label: "F.3",
    title: "Developmental Assessment Considerations",
    body: [
      "Developmental considerations help interpret [age, prerequisite skills, and functional independence].",
      "Use them to guide instruction while still individualizing assessment decisions.",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each item by assessment focus.",
      categories: ["Developmental consideration", "Behavior function"],
      items: [
        { label: "Current listener responding compared with daily needs", category: "Developmental consideration" },
        { label: "Escape follows aggression during demands", category: "Behavior function" },
        { label: "Prerequisite matching skills for a new program", category: "Developmental consideration" },
        { label: "Tangible access follows screaming", category: "Behavior function" },
      ],
    },
  },
  {
    slug: "strengths-vs-deficits",
    label: "F.3",
    title: "Strengths vs Deficits",
    body: [
      "Skill assessment should identify [strengths and deficits].",
      "Strengths can guide teaching format, response mode, and reinforcement planning.",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Strength",
      leftText: "Existing skill that can support teaching",
      rightTitle: "Deficit",
      rightText: "Missing or weak skill that may become a target",
      cue: "Assessment should not be a deficit-only list.",
    },
  },
  {
    slug: "single-stimulus-preference",
    label: "F.4",
    title: "Single-Stimulus Preference Assessment",
    body: [
      "Single-stimulus assessment presents [one item at a time].",
      "Approach, rejection, or engagement helps estimate preference for each stimulus.",
    ],
    visual: {
      type: "flow",
      prompt: "Order a single-stimulus assessment trial.",
      steps: [
        "Present one stimulus",
        "Record approach or engagement",
        "Remove item after trial",
        "Present the next stimulus",
      ],
      feedback:
        "Single-stimulus assessment evaluates [one stimulus at a time].",
    },
  },
  {
    slug: "paired-stimulus-preference",
    label: "F.4",
    title: "Paired-Stimulus Preference Assessment",
    body: [
      "Paired-stimulus assessment presents [two stimuli at a time].",
      "It can produce a clear rank order, but it may take more trials.",
    ],
    visual: {
      type: "choice",
      prompt: "Which cue identifies paired-stimulus assessment?",
      choices: [
        "The learner chooses between two items on each trial",
        "The learner roams freely among all items",
        "The selected item always returns to the full array",
        "The assessor manipulates attention and escape conditions",
      ],
      answer: "The learner chooses between two items on each trial",
      hint:
        "The key cue is [two items presented together].",
      feedback:
        "Paired-stimulus assessment uses [two-choice trials].",
    },
  },
  {
    slug: "msw-vs-mswo",
    label: "F.4",
    title: "MSW vs MSWO",
    body: [
      "Multiple-Stimulus With Replacement (MSW) returns the selected item [to the array].",
      "Multiple-Stimulus Without Replacement (MSWO) removes the selected item [after selection].",
    ],
    visual: {
      type: "comparison",
      leftTitle: "MSW",
      leftText: "Selected item returns",
      rightTitle: "MSWO",
      rightText: "Selected item is removed",
      cue: "With replacement = returns; without replacement = removed.",
    },
  },
  {
    slug: "preference-data-to-reinforcers",
    label: "F.4",
    title: "From Preference Data to Reinforcers",
    body: [
      "Preference assessments identify [potential reinforcers].",
      "A reinforcer is confirmed only when contingent delivery [increases future responding].",
    ],
    visual: {
      type: "choice",
      prompt: "Which conclusion is strongest after a learner selects music most often?",
      choices: [
        "Music is a potential reinforcer that should be tested in a contingency",
        "Music is proven to reinforce all behavior",
        "Music is a punisher because it was selected",
        "Music is an establishing operation",
      ],
      answer:
        "Music is a potential reinforcer that should be tested in a contingency",
      hint:
        "Separate [preference] from demonstrated reinforcement effects.",
      feedback:
        "Preference data identify [candidates], not guaranteed reinforcers.",
    },
  },
  {
    slug: "preference-assessment-limitations",
    label: "F.4",
    title: "Preference Assessment Limitations",
    body: [
      "Preference can shift with [motivation, satiation, context, and recent access].",
      "Preference assessment results should be updated and tested against response data.",
    ],
    visual: {
      type: "select-all",
      prompt: "Select limitations of preference assessments.",
      choices: [
        { label: "Preferences can change across time and context", correct: true },
        { label: "Selection does not prove reinforcement", correct: true },
        { label: "Satiation can affect responding", correct: true },
        { label: "One assessment permanently identifies all reinforcers", correct: false },
      ],
      feedback:
        "Preference assessments are useful but limited by [context, motivation, and reinforcement effects].",
    },
  },
  {
    slug: "narrative-recording",
    label: "F.5",
    title: "Narrative Recording",
    body: [
      "Narrative recording describes [ongoing events during direct observation].",
      "It can capture rich context, but it may be less structured than ABC recording.",
    ],
    visual: {
      type: "choice",
      prompt: "Which example best fits narrative recording?",
      choices: [
        "Writing a running description of events before, during, and after behavior",
        "Ranking items from most to least selected",
        "Testing escape in a demand condition",
        "Scoring correct responses across teaching trials",
      ],
      answer:
        "Writing a running description of events before, during, and after behavior",
      hint:
        "Look for [a descriptive running account] of observed events.",
      feedback:
        "Narrative recording captures [direct observation context].",
    },
  },
  {
    slug: "descriptive-assessment-limits",
    label: "F.5",
    title: "Correlation vs Causation",
    body: [
      "Descriptive assessment can show [correlations among events].",
      "It cannot by itself demonstrate that a consequence causes or maintains behavior.",
    ],
    visual: {
      type: "choice",
      prompt: "ABC data show attention often follows aggression. What is the safest conclusion?",
      choices: [
        "Attention may be related and should guide further assessment",
        "Attention is experimentally proven as the function",
        "Aggression is automatically maintained in all contexts",
        "The observation proves a treatment package is effective",
      ],
      answer:
        "Attention may be related and should guide further assessment",
      hint:
        "Descriptive data suggest [relations]; they do not prove causation.",
      feedback:
        "Descriptive assessment supports [hypotheses], not unsupported causal claims.",
    },
  },
  {
    slug: "conditional-probability-basics",
    label: "F.5",
    title: "Conditional Probability Basics",
    body: [
      "Conditional probability asks how often one event occurs [given another event].",
      "It can help identify patterns, but interpretation remains correlational.",
    ],
    visual: {
      type: "fill-blank",
      prompt: "Complete the conditional probability cue.",
      sentence: "Conditional probability examines one event given another ____.",
      answer: "event",
      feedback:
        "Conditional probability summarizes [event relations] in descriptive data.",
    },
  },
  {
    slug: "fa-attention-escape-tangible",
    label: "F.6",
    title: "Attention, Escape, and Tangible Functions",
    body: [
      "Attention conditions test whether behavior is maintained by [social attention].",
      "Escape and tangible conditions test [demand removal] and [item access].",
    ],
    visual: {
      type: "matching",
      prompt: "Match each FA condition to the tested consequence.",
      pairs: [
        { term: "Attention", definition: "Attention follows behavior." },
        { term: "Escape", definition: "Demands are removed after behavior." },
        { term: "Tangible", definition: "Items or activities follow behavior." },
        { term: "Control", definition: "Potential establishing operations are minimized." },
      ],
    },
  },
  {
    slug: "automatic-reinforcement-fa",
    label: "F.6",
    title: "Automatic Reinforcement in FA",
    body: [
      "Automatic reinforcement is suggested when behavior persists [without socially mediated consequences].",
      "Alone or ignore conditions can help evaluate automatic reinforcement.",
    ],
    visual: {
      type: "choice",
      prompt: "Which FA pattern most suggests automatic reinforcement?",
      choices: [
        "High responding in alone/ignore with no programmed social consequence",
        "High responding only when attention is delivered",
        "High responding only when demands are removed",
        "High selection of an item in MSWO",
      ],
      answer:
        "High responding in alone/ignore with no programmed social consequence",
      hint:
        "Look for behavior maintained by [nonsocial consequences].",
      feedback:
        "Automatic reinforcement is suggested by responding that persists [without social mediation].",
    },
  },
  {
    slug: "synthesized-contingencies",
    label: "F.6",
    title: "Synthesized Contingencies",
    body: [
      "Synthesized contingencies combine [multiple suspected reinforcers] in one test condition.",
      "They may fit natural contexts but require careful interpretation.",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Isolated contingency",
      leftText: "One suspected variable tested at a time",
      rightTitle: "Synthesized contingency",
      rightText: "Multiple suspected variables combined",
      cue: "Synthesized tests can improve context fit but may reduce precision about each variable.",
    },
  },
  {
    slug: "fa-safety-considerations",
    label: "F.6",
    title: "FA Safety Considerations",
    body: [
      "Functional analysis may evoke [dangerous or high-risk behavior].",
      "Safety planning includes consent, termination criteria, trained staff, and protective procedures.",
    ],
    visual: {
      type: "select-all",
      prompt: "Select FA safety considerations.",
      choices: [
        { label: "Consent and risk explanation", correct: true },
        { label: "Clear session termination criteria", correct: true },
        { label: "Trained staff and protective procedures", correct: true },
        { label: "Run high-risk sessions without a plan to get clean data", correct: false },
      ],
      feedback:
        "FA safety requires [consent, planning, competence, and risk reduction].",
    },
  },
  {
    slug: "experimental-control-in-fa",
    label: "F.6",
    title: "Experimental Control in FA",
    body: [
      "Experimental control in FA is shown when responding is [differentiated across test and control conditions].",
      "The pattern should correspond to the contingency being tested.",
    ],
    visual: {
      type: "choice",
      prompt: "What FA pattern best supports experimental control?",
      choices: [
        "High responding in one test condition and low responding in control",
        "Equal responding in every condition with no differentiation",
        "One caregiver report without direct observation",
        "A preference ranking with no behavior change test",
      ],
      answer:
        "High responding in one test condition and low responding in control",
      hint:
        "Look for [differentiated responding] tied to manipulated conditions.",
      feedback:
        "FA interpretation depends on [differentiation across conditions].",
    },
  },
  {
    slug: "fa-interpretation",
    label: "F.6",
    title: "FA Interpretation",
    body: [
      "FA interpretation connects [data patterns] to the tested contingency.",
      "Undifferentiated data may require revised conditions, more data, or alternative assessment.",
    ],
    visual: {
      type: "choice",
      prompt: "An FA shows similar moderate responding across all conditions. What is the best interpretation?",
      choices: [
        "The data are undifferentiated and may require additional assessment",
        "Attention is clearly proven",
        "Escape is ruled out permanently",
        "The preference assessment is complete",
      ],
      answer:
        "The data are undifferentiated and may require additional assessment",
      hint:
        "Ask whether one condition is clearly higher than the others.",
      feedback:
        "Undifferentiated FA data require [cautious interpretation and possible revision].",
    },
  },
  {
    slug: "services-referral-needs",
    label: "F.7",
    title: "Determining Service and Referral Needs",
    body: [
      "Assessment data help determine [whether behavior-analytic services are indicated].",
      "Some findings suggest referral to medical, mental health, speech, occupational, or educational professionals.",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each finding by likely next step.",
      categories: ["ABA service planning", "Referral/consultation"],
      items: [
        { label: "Functional communication deficit with clear teaching targets", category: "ABA service planning" },
        { label: "Possible pain or sudden sleep disruption", category: "Referral/consultation" },
        { label: "Need for AAC evaluation", category: "Referral/consultation" },
        { label: "Escape-maintained task refusal with teachable replacement behavior", category: "ABA service planning" },
      ],
    },
  },
  {
    slug: "insufficient-assessment-data",
    label: "F.7",
    title: "Insufficient Data Scenarios",
    body: [
      "Insufficient data means conclusions exceed [what the assessment supports].",
      "The ethical response is to collect more relevant data or seek consultation.",
    ],
    visual: {
      type: "choice",
      prompt: "Which statement best handles insufficient assessment data?",
      choices: [
        "The current data do not support a firm conclusion, so more assessment is needed",
        "The first hypothesis should be treated as proven",
        "Indirect reports should override all future direct data",
        "Referral is never needed when behavior is measurable",
      ],
      answer:
        "The current data do not support a firm conclusion, so more assessment is needed",
      hint:
        "Look for a conclusion that stays within [the limits of the data].",
      feedback:
        "Assessment interpretation should avoid [unsupported conclusions].",
    },
  },
  {
    slug: "socially-significant-goal-selection",
    label: "F.8",
    title: "Socially Significant Goal Selection",
    body: [
      "Socially significant goals improve [safety, independence, access, communication, or quality of life].",
      "Goal selection should reflect assessment data and client/stakeholder priorities.",
    ],
    visual: {
      type: "choice",
      prompt: "Which target is most socially significant?",
      choices: [
        "Teaching functional communication to replace dangerous behavior",
        "Teaching a trivial response because it is easy to graph",
        "Selecting a goal only because the worksheet is available",
        "Choosing a target unrelated to daily routines",
      ],
      answer:
        "Teaching functional communication to replace dangerous behavior",
      hint:
        "Look for improvement in [meaningful everyday outcomes].",
      feedback:
        "Social significance is about [meaningful benefit] for the client and context.",
    },
  },
  {
    slug: "client-informed-goals",
    label: "F.8",
    title: "Client-Informed Goals",
    body: [
      "Client-informed goals reflect [client needs, assent, preferences, and stakeholder priorities].",
      "Assessment should not select goals based only on provider convenience.",
    ],
    visual: {
      type: "select-all",
      prompt: "Select inputs that should inform goal selection.",
      choices: [
        { label: "Client assent and preferences when possible", correct: true },
        { label: "Caregiver and stakeholder priorities", correct: true },
        { label: "Assessment data and risk level", correct: true },
        { label: "Provider convenience alone", correct: false },
      ],
      feedback:
        "Client-informed goals integrate [data, priorities, assent, and context].",
    },
  },
  {
    slug: "prioritizing-target-behaviors",
    label: "F.8",
    title: "Prioritizing Target Behaviors",
    body: [
      "Prioritization considers [risk, social significance, frequency, severity, and feasibility].",
      "High-risk or high-impact behaviors may need priority even if they are harder to treat.",
    ],
    visual: {
      type: "flow",
      prompt: "Order target-prioritization decisions.",
      steps: [
        "Evaluate safety and risk",
        "Consider social significance and client priorities",
        "Check feasibility and contextual fit",
        "Select measurable goals and procedures",
      ],
      feedback:
        "Target prioritization balances [risk, impact, feasibility, and context].",
    },
  },
  {
    slug: "contextual-fit-feasibility",
    label: "F.8",
    title: "Contextual Fit, Feasibility, and Effectiveness",
    body: [
      "Contextual fit asks whether goals and procedures match [the setting, people, resources, and routines].",
      "Feasible procedures still must be effective; effective procedures still need implementation fit.",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Feasible",
      leftText: "Can be implemented with available supports",
      rightTitle: "Effective",
      rightText: "Produces meaningful behavior change",
      cue: "Goal/procedure selection balances [feasibility and effectiveness].",
    },
  },
];

const sectionFTcoAuditMiniLessons: MiniLessonContent[] = [
  {
    slug: "descriptive-assessment-vs-fa-decision",
    label: "F.5-F.6",
    title: "Descriptive Assessment vs Functional Analysis",
    body: [
      "Descriptive assessment identifies [patterns in naturally occurring events].",
      "Functional analysis evaluates [environmental variables through experimental manipulation].",
    ],
    visual: {
      type: "choice",
      prompt:
        "Which statement best keeps descriptive assessment and functional analysis separate?",
      choices: [
        "Descriptive assessment suggests hypotheses; functional analysis tests variables experimentally",
        "Descriptive assessment proves function; functional analysis only reviews records",
        "Descriptive assessment is a preference assessment; functional analysis ranks stimuli",
        "Descriptive assessment and functional analysis use the same procedures",
      ],
      answer:
        "Descriptive assessment suggests hypotheses; functional analysis tests variables experimentally",
      hint:
        "Compare [natural observation] with [experimental manipulation].",
      feedback:
        "The critical discrimination is [correlational patterns] versus [experimental tests of function].",
    },
  },
  {
    slug: "service-need-vs-referral",
    label: "F.7",
    title: "Service Need vs Referral",
    body: [
      "Assessment interpretation asks whether data support [behavior-analytic services, referral, or more assessment].",
      "Referral is indicated when findings involve [needs outside the behavior analyst's scope or competence].",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each finding by the most appropriate next step.",
      categories: ["ABA service planning", "Referral or consultation"],
      items: [
        {
          label: "Clear skill deficit with teachable communication targets",
          category: "ABA service planning",
        },
        {
          label: "Sudden behavior change with possible seizure activity",
          category: "Referral or consultation",
        },
        {
          label: "Escape-maintained behavior with feasible replacement response",
          category: "ABA service planning",
        },
        {
          label: "Speech access concern requiring AAC evaluation",
          category: "Referral or consultation",
        },
      ],
    },
  },
  {
    slug: "assessment-data-to-procedures",
    label: "F.8",
    title: "Assessment Data to Procedures",
    body: [
      "Assessment-based procedures should match [behavioral function, skill needs, preference data, risk, and contextual fit].",
      "A socially significant goal still needs procedures that are [effective, feasible, and culturally responsive].",
    ],
    visual: {
      type: "matching",
      prompt: "Match each assessment result to the procedure-selection implication.",
      pairs: [
        {
          term: "Escape-maintained behavior",
          definition: "Teach an appropriate break/request response and adjust demands.",
        },
        {
          term: "Skill deficit",
          definition: "Select teaching procedures for missing prerequisite or target skills.",
        },
        {
          term: "High-preference items",
          definition: "Test potential reinforcers within intervention contingencies.",
        },
        {
          term: "Low contextual fit",
          definition: "Revise procedures so caregivers or staff can implement them.",
        },
      ],
    },
  },
];

const sectionFPracticeQuestions: QuestionContent[] = [
  {
    type: "scenario",
    prompt:
      "A BCBA interviews caregivers and reviews records before observing behavior. What type of assessment information is being gathered first?",
    choices: ["Indirect assessment", "Functional analysis", "Continuous measurement", "Treatment integrity"],
    answer: "Indirect assessment",
    explanation:
      "Indirect assessments rely on [reports and interviews] rather than direct observation of behavior as it occurs.",
    hint:
      "Think about whether the analyst is observing behavior directly or gathering information from other sources.",
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
      "Behavioral function is identified by the [maintaining consequence], not response topography alone.",
    hint:
      "Match each function by what consequence follows behavior.",
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
      "Preference assessments identify [potential reinforcers]; functional analysis tests behavioral function.",
    hint:
      "Separate assessments that rank stimuli from assessments that manipulate environmental variables.",
  },
  {
    type: "scenario",
    prompt:
      "A BCBA writes, 'noncompliance means failure to begin the requested task within 10 seconds of a clear instruction.' What feature is strongest?",
    choices: [
      "The definition is observable and measurable",
      "The definition explains the learner's motivation",
      "The definition proves escape function",
      "The definition is subjective",
    ],
    answer: "The definition is observable and measurable",
    explanation:
      "Operational definitions describe behavior in [observable and measurable terms].",
    hint:
      "Look for whether two observers could identify the response the same way.",
  },
  {
    type: "scenario",
    prompt:
      "During observation, aggression is most likely when staff remove tablets, but no conditions are manipulated. Which conclusion is most appropriate?",
    choices: [
      "The data suggest a possible relation that needs further assessment",
      "The descriptive data prove tangible function",
      "The assessment is an MSWO",
      "The data show treatment integrity",
    ],
    answer: "The data suggest a possible relation that needs further assessment",
    explanation:
      "Descriptive assessment can show [correlations], but functional analysis is needed to test function experimentally.",
    hint:
      "Ask whether the analyst manipulated conditions or only observed natural events.",
  },
  {
    type: "select-all",
    prompt: "Select limitations of indirect assessment.",
    choices: [
      "Reports may be affected by memory or interpretation",
      "Respondents may not observe all relevant events",
      "Indirect data may miss actual antecedent-consequence patterns",
      "Indirect assessment always experimentally demonstrates function",
    ],
    answers: [
      "Reports may be affected by memory or interpretation",
      "Respondents may not observe all relevant events",
      "Indirect data may miss actual antecedent-consequence patterns",
    ],
    answer:
      "Memory/interpretation effects, incomplete observation, and missed event patterns are limitations.",
    explanation:
      "Indirect assessment is efficient but relies on [reported information] rather than direct tests.",
    hint:
      "Look for risks that come from relying on reports instead of observing or testing behavior-environment relations.",
  },
  {
    type: "fill-blank",
    prompt: "Complete the preference assessment cue.",
    answer: "potential reinforcers",
    explanation:
      "Preference assessments identify [potential reinforcers]; reinforcement is confirmed by increased future responding.",
  },
  {
    type: "scenario",
    graphId: "multielement-functional-analysis",
    prompt:
      "A functional analysis graph shows consistently highest responding in the attention condition. Which interpretation is most supported?",
    choices: [
      "Attention may be maintaining the behavior",
      "Escape from demands is confirmed because data are high",
      "The item is a reinforcer because it was selected",
      "The graph shows skill acquisition",
    ],
    answer: "Attention may be maintaining the behavior",
    explanation:
      "High responding in the attention condition suggests behavior may be maintained by [social attention].",
    hint:
      "Focus on which consequence is tested in the condition with the highest responding.",
  },
  {
    type: "scenario",
    prompt:
      "A learner can imitate actions but has few mands and limited listener responding. Which assessment focus best guides instruction?",
    choices: [
      "Skill assessment",
      "Functional analysis of problem behavior",
      "Scatterplot for time of day",
      "Paired-stimulus preference assessment only",
    ],
    answer: "Skill assessment",
    explanation:
      "Skill assessments identify [skill deficits and prerequisite skills] to guide teaching goals.",
    hint:
      "Look for missing instructional repertoires rather than maintaining consequences for problem behavior.",
  },
  {
    type: "scenario",
    prompt:
      "A BCBA needs quick information about which activities a learner approaches during free time without requiring forced choices. Which method fits best?",
    choices: [
      "Free-operant preference assessment",
      "Functional analysis",
      "Whole interval recording",
      "ABC narrative recording",
    ],
    answer: "Free-operant preference assessment",
    explanation:
      "Free-operant preference assessment measures [allocation of time] with available stimuli.",
    hint:
      "Look for free access and measured engagement with items.",
  },
  {
    type: "scenario",
    prompt:
      "A descriptive assessment shows attention often follows behavior. The team immediately states attention is the proven function. What is the problem?",
    choices: [
      "They made an unsupported inference from correlational data",
      "They used too many operational definitions",
      "They selected too many potential reinforcers",
      "They violated graphing conventions",
    ],
    answer: "They made an unsupported inference from correlational data",
    explanation:
      "Descriptive assessment suggests [correlations], but it does not experimentally demonstrate function.",
    hint:
      "Separate what the data suggest from what has been experimentally tested.",
  },
  {
    type: "scenario",
    prompt:
      "Before a functional analysis, the BCBA explains procedures and risks to the caregiver and plans lower-risk conditions first. Which concern is most directly addressed?",
    choices: [
      "Assessment ethics and safety",
      "Generalized conditioned reinforcement",
      "Respondent extinction",
      "Exact count IOA",
    ],
    answer: "Assessment ethics and safety",
    explanation:
      "Assessment ethics include [consent, safety planning, competence, and least intrusive methods].",
    hint:
      "Focus on consent, risk, and client protection during assessment.",
  },
];

const sectionFExpandedPracticeQuestions: QuestionContent[] = [
  {
    type: "matching",
    prompt: "Match each information source to the assessment question it can help answer.",
    pairs: [
      { term: "Educational record", definition: "What skills, supports, and interventions have been tried?" },
      { term: "Medical record", definition: "Are health variables or referrals relevant?" },
      { term: "Caregiver interview", definition: "What routines and priorities matter day to day?" },
      { term: "Interdisciplinary input", definition: "What communication, motor, or contextual variables may affect assessment?" },
    ],
    answer: "All information sources matched correctly",
    explanation:
      "Assessment planning requires selecting [relevant sources of information] rather than collecting every possible record.",
    hint:
      "Think about the assessment question each source can answer.",
  },
  {
    type: "scenario",
    prompt:
      "A caregiver reports that mealtimes follow religious fasting routines. What should the BCBA do with this information during assessment?",
    choices: [
      "Consider it as a contextual variable that may affect assessment and goals",
      "Ignore it because cultural routines are not behavioral variables",
      "Treat it as proof of noncompliance",
      "Use only the clinic's standard mealtime goal",
    ],
    answer:
      "Consider it as a contextual variable that may affect assessment and goals",
    explanation:
      "Culturally responsive assessment considers [client values, routines, language, and context].",
    hint:
      "Ask whether the information affects routines, access, priorities, or interpretation.",
  },
  {
    type: "select-all",
    prompt: "Select actions that reduce cultural bias during assessment.",
    choices: [
      "Use accessible language or interpreters when needed",
      "Ask caregivers about routines and priorities",
      "Check assumptions against data and consultation",
      "Assume the assessor's norms define the correct goal",
    ],
    answers: [
      "Use accessible language or interpreters when needed",
      "Ask caregivers about routines and priorities",
      "Check assumptions against data and consultation",
    ],
    answer:
      "Accessible language, caregiver input, and checking assumptions reduce bias.",
    explanation:
      "Culturally responsive assessment emphasizes [cultural variables] that may affect assessment and service delivery.",
    hint:
      "Look for actions that improve access, context, and data-based interpretation.",
  },
  {
    type: "scenario",
    prompt:
      "A learner fails a dressing program because they cannot yet imitate motor actions. Which assessment issue is most relevant?",
    choices: [
      "A prerequisite skill deficit",
      "A tangible function",
      "A paired-stimulus preference result",
      "A scatterplot correlation",
    ],
    answer: "A prerequisite skill deficit",
    explanation:
      "Skill assessment should identify [prerequisite skills] before selecting teaching procedures.",
    hint:
      "Focus on whether a missing skill is needed before the target can be taught.",
  },
  {
    type: "matching",
    prompt: "Match each preference assessment format to its key cue.",
    pairs: [
      { term: "Single-stimulus", definition: "One item presented at a time." },
      { term: "Paired-stimulus", definition: "Two items presented on each trial." },
      { term: "MSW", definition: "Selected item returns to the array." },
      { term: "MSWO", definition: "Selected item is removed after selection." },
    ],
    answer: "All preference formats matched correctly",
    explanation:
      "Preference assessment formats differ by [array size and replacement rules].",
    hint:
      "Compare how many items are presented and whether selected items return.",
  },
  {
    type: "scenario",
    prompt:
      "ABC data show problem behavior is often followed by peer attention. No conditions were manipulated. Which statement is most accurate?",
    choices: [
      "Peer attention is a hypothesis to evaluate further",
      "Peer attention is experimentally proven as the function",
      "The behavior is automatically reinforced",
      "Preference assessment is invalid",
    ],
    answer: "Peer attention is a hypothesis to evaluate further",
    explanation:
      "Descriptive assessment shows [correlation], not experimental causation.",
    hint:
      "Ask whether the analyst observed natural events or manipulated variables.",
  },
  {
    type: "scenario",
    graphId: "multielement-functional-analysis",
    prompt:
      "A functional analysis shows high responding in attention and low responding in control. Which interpretation is strongest?",
    choices: [
      "Attention may be maintaining the behavior",
      "Automatic reinforcement is clearly maintaining the behavior",
      "Escape is proven because demands were absent",
      "Preference assessment results are invalid",
    ],
    answer: "Attention may be maintaining the behavior",
    explanation:
      "Differentiated responding in the attention condition suggests behavior may contact [social attention].",
    hint:
      "Look for the condition with the clearest separation from control and what consequence it arranges.",
  },
  {
    type: "scenario",
    prompt:
      "A BCBA combines escape and tangible access in one test condition because interviews suggest both occur together naturally. What is being tested?",
    choices: [
      "A synthesized contingency",
      "A single-stimulus preference assessment",
      "A skill deficit",
      "A medical record review",
    ],
    answer: "A synthesized contingency",
    explanation:
      "Synthesized contingencies combine [multiple suspected reinforcers] in one test condition.",
    hint:
      "Look for multiple suspected consequences arranged together.",
  },
  {
    type: "scenario",
    prompt:
      "A severe behavior may cause injury during FA sessions. Which planning step is most important before assessment?",
    choices: [
      "Establish consent, safety procedures, trained staff, and termination criteria",
      "Run sessions quickly without safeguards",
      "Avoid all assessment forever",
      "Use only a preference assessment",
    ],
    answer:
      "Establish consent, safety procedures, trained staff, and termination criteria",
    explanation:
      "FA safety requires [consent, planning, competence, and risk reduction].",
    hint:
      "Focus on protecting the client while collecting useful data.",
  },
  {
    type: "scenario",
    prompt:
      "Assessment suggests possible pain, sudden sleep disruption, and behavior that changed abruptly. What is the best next step?",
    choices: [
      "Seek medical consultation or referral while continuing appropriate behavioral assessment",
      "Assume escape is the only function",
      "Ignore health variables because behavior is measurable",
      "Select goals without additional information",
    ],
    answer:
      "Seek medical consultation or referral while continuing appropriate behavioral assessment",
    explanation:
      "Assessment interpretation includes using data to determine [referral needs].",
    hint:
      "Look for assessment findings outside behavior-analytic scope that could affect services.",
  },
  {
    type: "scenario",
    prompt:
      "A team has only one caregiver report and no direct observation. They want to select a restrictive procedure immediately. What should the BCBA recommend?",
    choices: [
      "Collect more relevant data before drawing strong conclusions",
      "Use the restrictive procedure because one report is enough",
      "Skip consent because assessment is incomplete",
      "Treat preference data as functional analysis",
    ],
    answer: "Collect more relevant data before drawing strong conclusions",
    explanation:
      "Insufficient assessment data require [cautious interpretation] and additional relevant information.",
    hint:
      "Ask whether the conclusion exceeds the available data.",
  },
  {
    type: "scenario",
    prompt:
      "Assessment shows unsafe elopement, caregiver priority for community safety, and a feasible teaching context. Which goal is most appropriate?",
    choices: [
      "Teach a functional safety response and reduce elopement in community routines",
      "Teach a trivial table task because it is easy to count",
      "Select a goal unrelated to caregiver priorities",
      "Delay all goals until every preference item is ranked",
    ],
    answer:
      "Teach a functional safety response and reduce elopement in community routines",
    explanation:
      "Assessment-based goal selection should prioritize [social significance, client context, risk, and feasibility].",
    hint:
      "Look for the target with meaningful safety and daily-life impact.",
  },
];

const sectionFAdditionalPracticeQuestions: QuestionContent[] = [
  {
    type: "sorting",
    prompt:
      "Sort each record or source by whether it is likely relevant to a referral for aggression during classroom transitions.",
    categories: ["Relevant source", "Less relevant source"],
    items: [
      { label: "Recent transition incident reports with ABC notes", category: "Relevant source" },
      { label: "Current IEP transition supports and progress data", category: "Relevant source" },
      { label: "Medication or sleep changes around the behavior increase", category: "Relevant source" },
      { label: "A school newsletter unrelated to the learner or target behavior", category: "Less relevant source" },
    ],
    answer: "All records sorted by relevance",
    explanation:
      "Relevant sources are connected to [the target behavior, context, risk, or assessment question].",
    hint:
      "Focus on sources that could change assessment decisions for this referral.",
  },
  {
    type: "select-all",
    prompt:
      "Select information that may be useful from interdisciplinary sources during behavior assessment.",
    choices: [
      "Communication response forms used by the learner",
      "Motor or sensory variables that affect participation",
      "Medical variables that may require referral or coordination",
      "A professional's unsupported opinion that replaces behavioral data",
    ],
    answers: [
      "Communication response forms used by the learner",
      "Motor or sensory variables that affect participation",
      "Medical variables that may require referral or coordination",
    ],
    answer:
      "Communication forms, participation variables, and medical referral needs may be useful.",
    explanation:
      "Interdisciplinary information can identify [communication, motor, medical, and contextual variables] while behavioral conclusions still require appropriate data.",
    hint:
      "Look for information that affects assessment conditions or interpretation without replacing direct data.",
  },
  {
    type: "matching",
    prompt: "Match each cultural or access variable to an assessment adjustment.",
    pairs: [
      { term: "Home language", definition: "Use accessible communication supports." },
      { term: "Family routine", definition: "Ask how daily context affects goals and behavior." },
      { term: "Caregiver priority", definition: "Include stakeholder input in goal selection." },
      { term: "Assessor assumption", definition: "Check interpretation against data and consultation." },
    ],
    answer: "All cultural variables matched correctly",
    explanation:
      "Culturally responsive assessment adjusts for [language access, routines, stakeholder priorities, and bias risk].",
    hint:
      "Match each variable to the step that improves access, context, or data-based interpretation.",
  },
  {
    type: "fill-blank",
    prompt: "Complete the culturally responsive assessment cue.",
    answer: "context",
    explanation:
      "Culturally responsive assessment considers [client values, language, routines, and context].",
    hint:
      "The missing word refers to the setting, routines, and circumstances that affect behavior and services.",
  },
  {
    type: "scenario",
    prompt:
      "A BCBA uses a curriculum sequence to identify mastered listener skills, missing tact targets, and next teachable steps. Which assessment type is most directly described?",
    choices: [
      "Curriculum-based skill assessment",
      "Functional analysis",
      "Scatterplot assessment",
      "Free-operant preference assessment",
    ],
    answer: "Curriculum-based skill assessment",
    explanation:
      "Curriculum-based assessment compares performance to [instructional sequences or curriculum goals].",
    hint:
      "Look for an assessment tied to a teaching sequence rather than maintaining consequences.",
  },
  {
    type: "sorting",
    prompt: "Sort each skill assessment finding.",
    categories: ["Strength", "Deficit"],
    items: [
      { label: "Independently imitates gross motor actions", category: "Strength" },
      { label: "Does not request preferred items", category: "Deficit" },
      { label: "Matches identical objects reliably", category: "Strength" },
      { label: "Cannot follow one-step listener directions", category: "Deficit" },
    ],
    answer: "All skill findings sorted correctly",
    explanation:
      "Skill assessment identifies both [strengths that support teaching] and [deficits that may become targets].",
    hint:
      "Separate skills already in the repertoire from skills that are missing or weak.",
  },
  {
    type: "scenario",
    prompt:
      "A BCBA presents one item at a time, records approach or rejection, and then presents the next item. Which preference assessment format is this?",
    choices: [
      "Single-stimulus preference assessment",
      "Paired-stimulus preference assessment",
      "MSWO",
      "Functional analysis",
    ],
    answer: "Single-stimulus preference assessment",
    explanation:
      "Single-stimulus preference assessment presents [one stimulus at a time] and records approach, rejection, or engagement.",
    hint:
      "Attend to how many stimuli are available on each trial.",
  },
  {
    type: "scenario",
    prompt:
      "A learner moves freely among toys for 10 minutes while the assessor records time allocated to each item. Which preference assessment format is described?",
    choices: [
      "Free-operant preference assessment",
      "Single-stimulus preference assessment",
      "MSW",
      "ABC recording",
    ],
    answer: "Free-operant preference assessment",
    explanation:
      "Free-operant preference assessment measures [allocation of time] among freely available stimuli.",
    hint:
      "Look for free access rather than forced-choice trials.",
  },
  {
    type: "scenario",
    prompt:
      "A learner chooses a tablet first on an MSWO. The tablet is removed, and the remaining items are represented. Which feature distinguishes this procedure?",
    choices: [
      "The selected item is removed after selection",
      "Only one item is presented per trial",
      "Two items are compared on every trial",
      "An FA condition is manipulated",
    ],
    answer: "The selected item is removed after selection",
    explanation:
      "Multiple-Stimulus Without Replacement (MSWO) removes the selected item [after selection].",
    hint:
      "Focus on what happens to the selected item before the next choice.",
  },
  {
    type: "matching",
    prompt: "Match each descriptive assessment method to its key feature.",
    pairs: [
      { term: "ABC recording", definition: "Records antecedent, behavior, and consequence events." },
      { term: "Narrative recording", definition: "Provides a running description of observed events." },
      { term: "Scatterplot", definition: "Shows behavior patterns by time or routine." },
      { term: "Direct observation", definition: "Records behavior as it occurs in context." },
    ],
    answer: "All descriptive methods matched correctly",
    explanation:
      "Descriptive assessment methods involve [direct observation without experimental manipulation].",
    hint:
      "Match each method by the type of observational information it produces.",
  },
  {
    type: "fill-blank",
    prompt: "Complete the descriptive assessment cue.",
    answer: "correlation",
    explanation:
      "Descriptive assessment can show [correlation], but it does not demonstrate causation by itself.",
    hint:
      "The missing term means events covary without proving one causes the other.",
  },
  {
    type: "scenario",
    prompt:
      "An observer writes a running account of classroom events for 30 minutes, including staff directions, peer interaction, target behavior, and follow-up events. Which method is this?",
    choices: [
      "Narrative recording",
      "Paired-stimulus preference assessment",
      "Functional analysis",
      "Curriculum-based assessment",
    ],
    answer: "Narrative recording",
    explanation:
      "Narrative recording captures [ongoing observed events] in a less structured running account.",
    hint:
      "Look for a written description of naturally occurring events across time.",
  },
  {
    type: "matching",
    prompt: "Match each FA test condition to the programmed consequence.",
    pairs: [
      { term: "Attention condition", definition: "Attention follows target behavior." },
      { term: "Escape condition", definition: "Demands are removed after target behavior." },
      { term: "Tangible condition", definition: "Access to items follows target behavior." },
      { term: "Alone/ignore condition", definition: "No programmed social consequence follows behavior." },
    ],
    answer: "All FA conditions matched correctly",
    explanation:
      "Functional analysis conditions test [which environmental consequence maintains behavior].",
    hint:
      "Match each condition by what consequence follows target behavior.",
  },
  {
    type: "scenario",
    prompt:
      "In a tangible condition, problem behavior produces brief access to a preferred tablet. Responding is high only in that condition. What interpretation is most supported?",
    choices: [
      "Access to tangibles may be maintaining the behavior",
      "Escape from demands is the likely maintaining reinforcer",
      "Automatic reinforcement is proven",
      "The result is a curriculum-based assessment outcome",
    ],
    answer: "Access to tangibles may be maintaining the behavior",
    explanation:
      "High responding in a tangible condition suggests behavior may be maintained by [access to items or activities].",
    hint:
      "Focus on the programmed consequence in the differentiated test condition.",
  },
  {
    type: "select-all",
    prompt:
      "Select reasons FA safety planning may be needed before assessment sessions.",
    choices: [
      "The assessment may evoke dangerous behavior",
      "The team needs termination criteria",
      "Staff need training on session procedures",
      "Safety planning is unnecessary if the graph will be useful",
    ],
    answers: [
      "The assessment may evoke dangerous behavior",
      "The team needs termination criteria",
      "Staff need training on session procedures",
    ],
    answer:
      "Dangerous behavior risk, termination criteria, and trained staff support FA safety.",
    explanation:
      "Functional analysis safety planning includes [risk reduction, trained staff, and termination criteria].",
    hint:
      "Look for steps that protect the client while preserving useful assessment data.",
  },
  {
    type: "sorting",
    prompt: "Sort each assessment conclusion by whether it is supported or unsupported.",
    categories: ["Supported conclusion", "Unsupported conclusion"],
    items: [
      { label: "More data are needed before confirming function", category: "Supported conclusion" },
      { label: "One caregiver report proves the function", category: "Unsupported conclusion" },
      { label: "Medical consultation may be needed after sudden sleep-related behavior changes", category: "Supported conclusion" },
      { label: "ABC correlation proves causation", category: "Unsupported conclusion" },
    ],
    answer: "All conclusions sorted correctly",
    explanation:
      "Assessment interpretation requires [conclusions that match the strength and limits of the data].",
    hint:
      "Separate cautious interpretation from claims that exceed the available data.",
  },
  {
    type: "select-all",
    prompt: "Select features of strong assessment-based goal selection.",
    choices: [
      "Targets socially significant behavior",
      "Uses client and caregiver priorities when appropriate",
      "Considers contextual fit and feasibility",
      "Selects goals only because they are easy to score",
    ],
    answers: [
      "Targets socially significant behavior",
      "Uses client and caregiver priorities when appropriate",
      "Considers contextual fit and feasibility",
    ],
    answer:
      "Social significance, client input, and contextual fit support strong goal selection.",
    explanation:
      "Assessment-based goal selection should reflect [social significance, client-informed priorities, cultural context, and feasibility].",
    hint:
      "Look for goals that matter in context and can be implemented effectively.",
  },
];

const sectionFTcoAuditPracticeQuestions: QuestionContent[] = [
  {
    type: "scenario",
    prompt:
      "A BCBA has caregiver interview data suggesting behavior occurs during transitions, but no direct observation has occurred. Which next step best fits assessment interpretation?",
    choices: [
      "Use the interview data as a hypothesis and collect direct assessment data",
      "Treat transition escape as experimentally demonstrated",
      "Select a restrictive procedure because the caregiver report is enough",
      "Ignore the caregiver report because indirect data are never useful",
    ],
    answer:
      "Use the interview data as a hypothesis and collect direct assessment data",
    explanation:
      "Assessment interpretation requires [interpreting assessment data within the limits of the evidence]. Indirect data can guide next steps without proving function.",
    hint:
      "Ask whether the current information is enough to support a firm functional conclusion.",
  },
  {
    type: "scenario",
    prompt:
      "Assessment shows behavior is likely escape-maintained during writing tasks, and occupational therapy notes indicate fine-motor demands may be difficult. Which procedure-selection plan best uses the assessment data?",
    choices: [
      "Teach an appropriate break/request response while coordinating about task demands",
      "Use attention extinction because all problem behavior is attention maintained",
      "Ignore the motor information because it is not from a behavior analyst",
      "Choose a worksheet goal because it is easy to score",
    ],
    answer:
      "Teach an appropriate break/request response while coordinating about task demands",
    explanation:
      "Assessment-based procedure selection should integrate [behavioral function, relevant interdisciplinary information, and contextual fit].",
    hint:
      "Look for the option that matches the likely function and uses relevant assessment context.",
  },
  {
    type: "matching",
    prompt: "Match each assessment result to the strongest treatment-planning implication.",
    pairs: [
      {
        term: "Preferred item ranked high",
        definition: "Test as a potential reinforcer in a contingency.",
      },
      {
        term: "Undifferentiated FA",
        definition: "Revise assessment conditions or collect more data.",
      },
      {
        term: "Skill prerequisite missing",
        definition: "Teach the component skill before expecting the target response.",
      },
      {
        term: "Medical concern identified",
        definition: "Seek referral or consultation while staying within scope.",
      },
    ],
    answer: "All assessment implications matched correctly",
    explanation:
      "Assessment results should guide [procedures, referrals, and cautious interpretation] without exceeding what the data support.",
    hint:
      "Match each result to the decision it can most directly support.",
  },
  {
    type: "scenario",
    prompt:
      "A descriptive assessment shows attention follows behavior frequently, but an FA shows undifferentiated responding across conditions. Which interpretation is strongest?",
    choices: [
      "Attention remains a hypothesis, but the FA data do not clearly demonstrate that function",
      "Attention is proven because descriptive data always override FA data",
      "The behavior is automatically reinforced because the FA was undifferentiated",
      "The assessment proves no intervention is needed",
    ],
    answer:
      "Attention remains a hypothesis, but the FA data do not clearly demonstrate that function",
    explanation:
      "Descriptive data can suggest [correlational hypotheses], while undifferentiated FA data require [cautious interpretation and possible revision].",
    hint:
      "Consider the strength and limits of each assessment method before drawing a conclusion.",
  },
];

const sectionFMasteryQuestions: QuestionContent[] = [
  {
    type: "scenario",
    prompt:
      "Which statement best differentiates descriptive assessment from functional analysis?",
    choices: [
      "Descriptive assessment observes natural events; functional analysis manipulates environmental variables experimentally.",
      "Descriptive assessment proves function; functional analysis only interviews caregivers.",
      "Descriptive assessment is indirect; functional analysis never involves direct observation.",
      "Descriptive assessment is used only for skill deficits; functional analysis is used only for preference.",
    ],
    answer:
      "Descriptive assessment observes natural events; functional analysis manipulates environmental variables experimentally.",
    explanation:
      "Descriptive assessment involves [direct observation without experimental manipulation]; functional analysis manipulates [environmental variables experimentally].",
    hint:
      "Compare observation of natural events with experimental manipulation.",
  },
  {
    prompt: "Which definition is most appropriate for a target behavior?",
    choices: [
      "Tantrum = screaming above conversational volume, dropping to the floor, or kicking furniture",
      "Tantrum = being defiant",
      "Tantrum = trying to escape work",
      "Tantrum = behaving badly when upset",
    ],
    answer:
      "Tantrum = screaming above conversational volume, dropping to the floor, or kicking furniture",
    explanation:
      "Operational definitions use [observable and measurable terms].",
    hint:
      "Look for a response definition that observers can score consistently.",
  },
  {
    type: "scenario",
    graphId: "multielement-functional-analysis",
    prompt:
      "In a functional analysis graph, responding is consistently highest in the attention condition and low in control. Which interpretation is most accurate?",
    choices: [
      "Attention may be the maintaining reinforcer",
      "Escape is proven because behavior occurred",
      "The graph ranks preferred stimuli",
      "The behavior is automatically maintained because all data paths are shown",
    ],
    answer: "Attention may be the maintaining reinforcer",
    explanation:
      "Differentiated responding in the attention condition suggests behavior may be maintained by [social attention].",
    hint:
      "Attend to the condition with the differentiated high data path.",
  },
  {
    type: "scenario",
    prompt:
      "A child selects bubbles most often during MSWO. Later, task completion increases when bubbles follow completed tasks. What is demonstrated after the task-completion increase?",
    choices: [
      "Bubbles functioned as a reinforcer for task completion",
      "Bubbles were only a neutral stimulus",
      "The MSWO alone proved reinforcement",
      "Bubbles functioned as a punisher",
    ],
    answer: "Bubbles functioned as a reinforcer for task completion",
    explanation:
      "A reinforcer is demonstrated when a consequence [increases future responding].",
    hint:
      "Preference suggests candidates; reinforcement requires a behavior change effect.",
  },
  {
    type: "scenario",
    prompt:
      "Which method presents an array, removes the selected item after each choice, and continues until items are ranked?",
    choices: [
      "Multiple-stimulus without replacement",
      "Multiple-stimulus with replacement",
      "Single-stimulus preference assessment",
      "Free-operant preference assessment",
    ],
    answer: "Multiple-stimulus without replacement",
    explanation:
      "MSWO removes the selected item after each selection to rank preference across the array.",
    hint:
      "Focus on whether selected items return to the array.",
  },
  {
    type: "scenario",
    prompt:
      "A BCBA presents two items at a time and records which one the learner selects across many trials. Which assessment is described?",
    choices: [
      "Paired-stimulus preference assessment",
      "Free-operant preference assessment",
      "Scatterplot assessment",
      "Functional analysis",
    ],
    answer: "Paired-stimulus preference assessment",
    explanation:
      "Paired-stimulus preference assessment presents [two stimuli at a time] and records selections.",
    hint:
      "Look for choice trials with exactly two items.",
  },
  {
    type: "scenario",
    prompt:
      "ABC data show problem behavior often occurs after difficult tasks and is followed by task removal. What conclusion is most appropriate?",
    choices: [
      "The pattern suggests escape may be related and should guide further assessment or treatment planning",
      "Escape is experimentally proven in every setting",
      "Automatic reinforcement is ruled out permanently",
      "Preference assessment is no longer needed for any treatment planning",
    ],
    answer:
      "The pattern suggests escape may be related and should guide further assessment or treatment planning",
    explanation:
      "ABC data can support hypotheses about [antecedent-behavior-consequence patterns] but should be interpreted cautiously.",
    hint:
      "Notice whether the data are correlational or experimentally manipulated.",
  },
  {
    type: "scenario",
    prompt:
      "A scatterplot shows problem behavior concentrated during the last 20 minutes before lunch. What is the best interpretation?",
    choices: [
      "There is a time-based pattern that may guide further assessment",
      "The scatterplot proves the function is attention",
      "The behavior has no environmental relation",
      "A reinforcer has been experimentally demonstrated",
    ],
    answer:
      "There is a time-based pattern that may guide further assessment",
    explanation:
      "Scatterplots help identify [time, routine, or setting patterns] for further analysis.",
    hint:
      "Scatterplots show when behavior occurs, not a proven maintaining consequence.",
  },
  {
    type: "scenario",
    prompt:
      "A learner has strong matching skills but cannot request preferred items. Which assessment result most directly informs treatment planning?",
    choices: [
      "A skill deficit in manding should be targeted",
      "Attention is proven as the function",
      "Whole interval recording is required",
      "The learner has generalized conditioned punishers",
    ],
    answer: "A skill deficit in manding should be targeted",
    explanation:
      "Skill assessment results guide [instructional targets and prerequisite teaching].",
    hint:
      "Focus on missing skills that should be taught.",
  },
  {
    type: "scenario",
    prompt:
      "A BCBA has limited time, low-risk behavior, and needs preliminary hypotheses before direct observation. Which first step is most efficient?",
    choices: [
      "Use indirect assessment to gather reported patterns and context",
      "Run a high-risk functional analysis immediately",
      "Skip assessment and select punishment",
      "Use only mastery check scores",
    ],
    answer: "Use indirect assessment to gather reported patterns and context",
    explanation:
      "Assessment selection balances [efficiency, accuracy, ethics, and contextual fit].",
    hint:
      "Choose a method that fits the risk level and purpose.",
  },
  {
    type: "scenario",
    prompt:
      "Which action best reflects culturally responsive assessment?",
    choices: [
      "Ask about routines, language, values, and context before selecting targets",
      "Use the same targets for all clients because the form is standardized",
      "Ignore caregiver priorities to avoid bias",
      "Assess only in English because the data sheet is already made",
    ],
    answer:
      "Ask about routines, language, values, and context before selecting targets",
    explanation:
      "Culturally responsive assessment considers [client values, context, language, and preferences].",
    hint:
      "Look for assessment decisions that fit the client’s context and protect dignity.",
  },
  {
    type: "scenario",
    prompt:
      "Which assessment interpretation is strongest when evidence is indirect and descriptive but no experimental test has occurred?",
    choices: [
      "State a hypothesis and describe the limits of the conclusion",
      "Say the function is proven",
      "Ignore all descriptive patterns",
      "Treat the behavior as maintained by every reinforcer",
    ],
    answer: "State a hypothesis and describe the limits of the conclusion",
    explanation:
      "Assessment interpretation should distinguish [supported hypotheses] from unsupported claims.",
    hint:
      "Avoid conclusions that exceed the assessment method.",
  },
];

const sectionFExpandedMasteryQuestions: QuestionContent[] = [
  {
    type: "scenario",
    prompt:
      "A BCBA reviews an IEP, caregiver interview, physician note, and speech-language report before assessment. Which use of those sources best reflects selecting relevant assessment information?",
    choices: [
      "Use each source to identify variables relevant to the referral question and assessment plan",
      "Collect every available document even if it has no relation to assessment decisions",
      "Use only caregiver report because records can be lengthy",
      "Treat interdisciplinary notes as behavior-analytic conclusions",
    ],
    answer:
      "Use each source to identify variables relevant to the referral question and assessment plan",
    explanation:
      "Assessment planning focuses on [relevant sources of information] from records, clients, caregivers, and other professionals.",
    hint:
      "Look for a response that connects records to the assessment question without overgeneralizing.",
  },
  {
    type: "scenario",
    prompt:
      "A family uses a language at home that the assessor does not speak fluently. Which action best supports culturally responsive assessment?",
    choices: [
      "Arrange accessible communication supports and ask about language, routines, and priorities",
      "Continue only in English because the assessment forms are standardized",
      "Avoid caregiver interviews because language differences may affect reliability",
      "Select targets before considering communication access",
    ],
    answer:
      "Arrange accessible communication supports and ask about language, routines, and priorities",
    explanation:
      "Culturally responsive assessment requires attention to [cultural variables, language access, and contextual variables] that may affect assessment.",
    hint:
      "Focus on access and context before interpreting behavior or selecting goals.",
  },
  {
    type: "scenario",
    prompt:
      "A learner is referred for a group instruction goal, but assessment shows limited listener responding and imitation. What should the BCBA consider first?",
    choices: [
      "Prerequisite skill deficits that may affect the selected goal",
      "A tangible function because group instruction is difficult",
      "A paired-stimulus preference hierarchy as the only needed assessment",
      "A scatterplot because the concern is always time-based",
    ],
    answer: "Prerequisite skill deficits that may affect the selected goal",
    explanation:
      "Skill assessments identify [prerequisite skills, strengths, and deficits] that guide instructional goals.",
    hint:
      "Ask whether the learner has component skills needed for the proposed goal.",
  },
  {
    type: "scenario",
    prompt:
      "A BCBA presents two items per trial until each item has been compared with every other item. Which preference assessment is being used?",
    choices: [
      "Paired-stimulus preference assessment",
      "Multiple-stimulus without replacement",
      "Free-operant preference assessment",
      "Functional analysis",
    ],
    answer: "Paired-stimulus preference assessment",
    explanation:
      "A paired-stimulus preference assessment uses [two-item choice trials] across stimulus pairs.",
    hint:
      "Attend to the number of stimuli presented on each trial.",
  },
  {
    type: "scenario",
    prompt:
      "A learner selects crackers first in MSWO, but task completion does not increase when crackers follow completed work. Which interpretation is best?",
    choices: [
      "Crackers were highly preferred but were not demonstrated as reinforcers for that response",
      "The MSWO proves crackers are reinforcers in all contexts",
      "The task completion decrease proves crackers are punishers",
      "Preference assessment and reinforcement are the same assessment outcome",
    ],
    answer:
      "Crackers were highly preferred but were not demonstrated as reinforcers for that response",
    explanation:
      "Preference assessments identify [potential reinforcers]; reinforcement is demonstrated by [increased future responding].",
    hint:
      "Separate selection during assessment from a later behavior-change effect.",
  },
  {
    type: "scenario",
    prompt:
      "ABC recording shows aggression often follows denied access and is followed by item delivery. Which conclusion is most appropriate?",
    choices: [
      "Tangible access is a hypothesis to evaluate further because descriptive data are correlational",
      "Tangible function is experimentally proven by ABC recording alone",
      "Automatic reinforcement is the only possible interpretation",
      "The behavior must be ignored because ABC data are never useful",
    ],
    answer:
      "Tangible access is a hypothesis to evaluate further because descriptive data are correlational",
    explanation:
      "Descriptive assessments can identify [patterns and correlations], but they do not demonstrate experimental control.",
    hint:
      "Ask whether the assessor manipulated antecedents and consequences or only observed them.",
  },
  {
    type: "scenario",
    graphId: "multielement-functional-analysis",
    prompt:
      "An FA shows elevated responding in attention and low responding in alone, demand, and control. Which interpretation is most supported?",
    choices: [
      "Attention may be maintaining the behavior",
      "Escape from demands is the likely reinforcer because demands were tested",
      "Tangible access is proven because tangible was a condition",
      "Automatic reinforcement is proven because all conditions were included",
    ],
    answer: "Attention may be maintaining the behavior",
    explanation:
      "Differentiated responding in the attention condition suggests behavior may contact [social attention].",
    hint:
      "Focus on the condition with differentiated high responding and what consequence it tests.",
  },
  {
    type: "scenario",
    prompt:
      "A functional analysis condition combines escape from tasks and access to attention because both commonly follow behavior in the natural setting. Which concept is illustrated?",
    choices: [
      "Synthesized contingency",
      "Single-stimulus preference assessment",
      "Narrative recording",
      "Prerequisite skill assessment",
    ],
    answer: "Synthesized contingency",
    explanation:
      "Synthesized contingencies arrange [multiple suspected reinforcers together] during assessment.",
    hint:
      "Look for more than one suspected consequence being tested as a combined condition.",
  },
  {
    type: "scenario",
    prompt:
      "A behavior analyst sees sudden severe behavior after medication changes and sleep disruption. What assessment interpretation is most appropriate?",
    choices: [
      "Consider referral or consultation while continuing behavior-analytic assessment within scope",
      "Conclude escape function without further information",
      "Ignore medical variables because behavior is observable",
      "Begin intensive treatment before reviewing relevant records",
    ],
    answer:
      "Consider referral or consultation while continuing behavior-analytic assessment within scope",
    explanation:
      "Assessment interpretation includes using data to determine [service needs, referral needs, and limits of conclusions].",
    hint:
      "Look for a response that respects scope and avoids unsupported conclusions.",
  },
  {
    type: "scenario",
    prompt:
      "Assessment shows severe elopement in parking lots, caregiver concern about safety, and available practice routines. Which assessment-based goal-selection decision is strongest?",
    choices: [
      "Prioritize a measurable safety goal with procedures that fit daily routines and available support",
      "Choose a low-priority academic target because it is easier to score",
      "Delay goal selection until every possible skill deficit is assessed",
      "Select a standard goal without considering client context",
    ],
    answer:
      "Prioritize a measurable safety goal with procedures that fit daily routines and available support",
    explanation:
      "Assessment-based planning uses data to select [socially significant, feasible, and contextually fit goals and procedures].",
    hint:
      "Consider risk, social significance, client context, and feasibility together.",
  },
];

const sectionFAdditionalMasteryQuestions: QuestionContent[] = [
  {
    type: "scenario",
    prompt:
      "A referral asks why self-injury increased after a recent schedule change. Which record review decision is strongest?",
    choices: [
      "Review records connected to the target behavior, routines, health variables, and prior interventions",
      "Review all available records equally regardless of relation to the referral",
      "Avoid records because only direct observation can ever be useful",
      "Use only the oldest historical record to avoid current bias",
    ],
    answer:
      "Review records connected to the target behavior, routines, health variables, and prior interventions",
    explanation:
      "Assessment planning emphasizes [relevant records and information sources] that clarify assessment questions and risk.",
    hint:
      "Look for information sources tied to the referral question and assessment decisions.",
  },
  {
    type: "scenario",
    prompt:
      "A caregiver's description of appropriate mealtime behavior differs from the clinic's default expectations. Which response best reflects culturally responsive assessment?",
    choices: [
      "Ask about family routines and values before interpreting the behavior or selecting goals",
      "Treat the difference as noncompliance because clinic expectations are standard",
      "Remove caregiver input to avoid cultural bias",
      "Select the clinic goal because it is easier to measure",
    ],
    answer:
      "Ask about family routines and values before interpreting the behavior or selecting goals",
    explanation:
      "Culturally responsive assessment considers [values, routines, language, and contextual variables].",
    hint:
      "Focus on understanding context before making assessment interpretations.",
  },
  {
    type: "scenario",
    prompt:
      "A learner communicates with an AAC device, but the assessment materials require vocal responses only. Which concern is most relevant?",
    choices: [
      "The response format may create an access barrier and distort assessment results",
      "AAC use proves the learner has no skill deficits",
      "The assessor should ignore communication mode to keep procedures standardized",
      "The assessment automatically becomes a functional analysis",
    ],
    answer:
      "The response format may create an access barrier and distort assessment results",
    explanation:
      "Language and access considerations affect [participation, validity, and interpretation].",
    hint:
      "Look for the option that protects accurate assessment of the learner's repertoire.",
  },
  {
    type: "scenario",
    prompt:
      "A BCBA assesses a learner's current math responses against a curriculum sequence to select the next teachable targets. Which assessment best fits?",
    choices: [
      "Curriculum-based skill assessment",
      "Narrative recording",
      "Functional analysis",
      "Free-operant preference assessment",
    ],
    answer: "Curriculum-based skill assessment",
    explanation:
      "Curriculum-based assessment identifies [current performance within an instructional sequence].",
    hint:
      "Look for assessment of skills against a teaching scope and sequence.",
  },
  {
    type: "scenario",
    prompt:
      "Which assessment finding is best classified as a strength rather than a deficit?",
    choices: [
      "The learner independently matches identical pictures across 20 trials",
      "The learner does not request breaks when tasks are difficult",
      "The learner cannot follow one-step instructions",
      "The learner does not imitate gross motor actions",
    ],
    answer:
      "The learner independently matches identical pictures across 20 trials",
    explanation:
      "Strengths are [existing skills that can support teaching]; deficits are missing or weak skills.",
    hint:
      "Choose the option that describes a demonstrated repertoire.",
  },
  {
    type: "scenario",
    prompt:
      "A BCBA needs a preference assessment that may produce a clear rank order but can require many choice trials. Which format best fits?",
    choices: [
      "Paired-stimulus preference assessment",
      "Single-stimulus preference assessment",
      "Scatterplot recording",
      "Functional analysis",
    ],
    answer: "Paired-stimulus preference assessment",
    explanation:
      "Paired-stimulus assessments use [two-stimulus choice trials] and can produce a clear hierarchy.",
    hint:
      "Look for the preference format built around repeated two-option choices.",
  },
  {
    type: "scenario",
    prompt:
      "A BCBA wants a brief array-based preference assessment in which selected items return to the array after each choice. Which method is described?",
    choices: [
      "Multiple-Stimulus With Replacement (MSW)",
      "Multiple-Stimulus Without Replacement (MSWO)",
      "Free-operant preference assessment",
      "Single-stimulus preference assessment",
    ],
    answer: "Multiple-Stimulus With Replacement (MSW)",
    explanation:
      "Multiple-Stimulus With Replacement (MSW) returns selected items [to the array].",
    hint:
      "Focus on whether the selected item remains available for later selections.",
  },
  {
    type: "scenario",
    prompt:
      "A learner selected a ball most often in a preference assessment, but throwing the ball after homework does not increase homework completion. Which statement is most accurate?",
    choices: [
      "The ball was preferred in assessment but was not demonstrated as a reinforcer for homework completion",
      "The ball must be a reinforcer because it was selected most often",
      "Preference assessment data always override response data",
      "The ball functioned as a punisher because homework did not increase",
    ],
    answer:
      "The ball was preferred in assessment but was not demonstrated as a reinforcer for homework completion",
    explanation:
      "Preference assessment identifies [potential reinforcers], but reinforcement requires [increased future responding].",
    hint:
      "Separate stimulus selection from behavior change produced by contingent delivery.",
  },
  {
    type: "scenario",
    prompt:
      "Which statement best differentiates ABC recording from narrative recording?",
    choices: [
      "ABC recording organizes antecedents, behavior, and consequences; narrative recording gives a running description of events",
      "ABC recording experimentally manipulates consequences; narrative recording ranks stimuli",
      "ABC recording is a preference assessment; narrative recording is a skill assessment",
      "ABC recording proves function; narrative recording proves intervention effects",
    ],
    answer:
      "ABC recording organizes antecedents, behavior, and consequences; narrative recording gives a running description of events",
    explanation:
      "Both are descriptive methods, but ABC recording structures [antecedent-behavior-consequence events] while narrative recording captures [a running account].",
    hint:
      "Compare the structure of the observation record, not the function of behavior.",
  },
  {
    type: "scenario",
    prompt:
      "Scatterplot data show problem behavior during independent work on most afternoons. What conclusion is most appropriate?",
    choices: [
      "There is a time or routine pattern that can guide further assessment",
      "Independent work is experimentally proven as the cause",
      "The function is automatically reinforcement because behavior repeats",
      "The pattern rules out the need for direct observation",
    ],
    answer:
      "There is a time or routine pattern that can guide further assessment",
    explanation:
      "Scatterplots show [time or routine patterns], not experimental causation.",
    hint:
      "Look for the conclusion that describes a pattern without overclaiming function.",
  },
  {
    type: "scenario",
    prompt:
      "A descriptive assessment shows problem behavior is followed by escape on 70% of observed occurrences. What is the best interpretation?",
    choices: [
      "Escape is a strong hypothesis, but causation has not been experimentally demonstrated",
      "Escape is proven as the function because the percentage is high",
      "The assessment is invalid because percentages cannot be used descriptively",
      "The behavior must be maintained by attention because escape was observed",
    ],
    answer:
      "Escape is a strong hypothesis, but causation has not been experimentally demonstrated",
    explanation:
      "Conditional probability can summarize [event relations], but descriptive data remain correlational.",
    hint:
      "Notice whether the assessment measured a relation or manipulated the contingency.",
  },
  {
    type: "scenario",
    prompt:
      "A functional analysis shows high responding only when demands are removed after target behavior. Which function is most supported?",
    choices: [
      "Escape",
      "Attention",
      "Tangible",
      "Automatic reinforcement",
    ],
    answer: "Escape",
    explanation:
      "High responding when demands are removed suggests behavior is maintained by [escape from demands].",
    hint:
      "Identify the consequence arranged after behavior in the differentiated condition.",
  },
  {
    type: "scenario",
    prompt:
      "A functional analysis shows high responding in alone/ignore and low responding when social consequences are arranged. Which function is most supported?",
    choices: [
      "Automatic reinforcement",
      "Attention",
      "Escape",
      "Tangible",
    ],
    answer: "Automatic reinforcement",
    explanation:
      "Responding that persists without programmed social consequences suggests [automatic reinforcement].",
    hint:
      "Look for behavior that does not depend on another person's consequence.",
  },
  {
    type: "scenario",
    prompt:
      "Before conducting an FA for severe aggression, the BCBA obtains consent, trains staff, sets termination criteria, and prepares protective procedures. Which issue is most directly addressed?",
    choices: [
      "Functional analysis safety",
      "Preference assessment ranking",
      "Curriculum-based assessment",
      "Scatterplot interpretation",
    ],
    answer: "Functional analysis safety",
    explanation:
      "FA safety requires [consent, trained staff, termination criteria, and risk reduction].",
    hint:
      "Focus on steps that protect the client during experimental assessment.",
  },
  {
    type: "scenario",
    prompt:
      "Assessment data suggest severe sleep disruption and possible seizures may be related to new behavior. Which action is most appropriate?",
    choices: [
      "Seek appropriate medical referral or consultation while staying within behavior-analytic scope",
      "Treat the behavior as escape-maintained without further review",
      "Ignore health variables because they are outside behavioral assessment",
      "Select intervention goals based only on staff convenience",
    ],
    answer:
      "Seek appropriate medical referral or consultation while staying within behavior-analytic scope",
    explanation:
      "Assessment interpretation includes identifying [referral needs] and avoiding unsupported conclusions from insufficient data.",
    hint:
      "Look for the action that protects scope and client safety.",
  },
  {
    type: "scenario",
    prompt:
      "A team wants to target a low-priority worksheet skill, but assessment shows unsafe street elopement and caregiver concern about community access. Which assessment-based goal-selection decision is strongest?",
    choices: [
      "Prioritize a measurable safety and community-access goal with contextual fit",
      "Select the worksheet skill because it is easier to teach",
      "Ignore caregiver priorities because they are not data",
      "Postpone all goals until every possible preference item is tested",
    ],
    answer:
      "Prioritize a measurable safety and community-access goal with contextual fit",
    explanation:
      "Goal selection should prioritize [social significance, risk, client-informed priorities, and contextual fit].",
    hint:
      "Consider impact on safety, daily routines, and meaningful access.",
  },
];

const sectionFTcoAuditMasteryQuestions: QuestionContent[] = [
  {
    type: "scenario",
    prompt:
      "A BCBA reviews records and sees a sudden increase in self-injury after medication changes, sleep disruption, and school schedule changes. Which interpretation is most appropriate?",
    choices: [
      "The data suggest both behavioral assessment needs and possible referral or consultation needs",
      "The behavior is automatically maintained because medication changed",
      "The school schedule change proves escape function",
      "Medical and sleep variables should be ignored during behavior assessment",
    ],
    answer:
      "The data suggest both behavioral assessment needs and possible referral or consultation needs",
    explanation:
      "Assessment interpretation requires determining [need for behavior-analytic services, referral needs, and the limits of assessment conclusions].",
    hint:
      "Look for the option that uses relevant sources without making a conclusion beyond the data.",
  },
  {
    type: "scenario",
    prompt:
      "A learner's behavior occurs during hard tasks and decreases when an appropriate break response contacts reinforcement. Which assessment-based procedure-selection statement is strongest?",
    choices: [
      "Assessment supports a function-based procedure that teaches an alternative response and arranges reinforcement",
      "Assessment supports selecting goals unrelated to daily routines",
      "Assessment proves all future behavior should be treated with punishment",
      "Assessment should be ignored once a preferred item has been identified",
    ],
    answer:
      "Assessment supports a function-based procedure that teaches an alternative response and arranges reinforcement",
    explanation:
      "Assessment-based planning links assessment data to [socially significant goals and behavior-change procedures].",
    hint:
      "Focus on whether the procedure follows from the function and teaches a useful response.",
  },
  {
    type: "scenario",
    prompt:
      "Which statement best differentiates a culturally responsive assessment decision from a biased assessment decision?",
    choices: [
      "Responsive decisions check client context, language access, and stakeholder priorities against data",
      "Responsive decisions use the assessor's routines as the standard for all clients",
      "Responsive decisions avoid caregiver input to prevent disagreement",
      "Responsive decisions select goals before reviewing cultural or contextual variables",
    ],
    answer:
      "Responsive decisions check client context, language access, and stakeholder priorities against data",
    explanation:
      "Culturally responsive assessment emphasizes [cultural variables, language access, contextual variables, and bias reduction].",
    hint:
      "Look for the option that improves access and interpretation without relying on assumptions.",
  },
  {
    type: "scenario",
    prompt:
      "A team has scatterplot patterns, ABC correlations, and interviews, but no experimental test. Which conclusion is most accurate?",
    choices: [
      "The data can guide hypotheses, but function has not been experimentally demonstrated",
      "The data prove the maintaining variable because several descriptive sources agree",
      "Functional analysis is unnecessary because correlations are stronger than experiments",
      "The behavior must be maintained by every consequence observed",
    ],
    answer:
      "The data can guide hypotheses, but function has not been experimentally demonstrated",
    explanation:
      "Descriptive assessment identifies [patterns and correlations]; functional analysis tests [environmental variables experimentally].",
    hint:
      "Compare hypothesis development with experimental demonstration.",
  },
];

const sectionGMiniLessons: MiniLessonContent[] = [
  {
    slug: "g1-reinforcement-procedure-selection",
    label: "G.1",
    title: "Positive and Negative Reinforcement Procedures",
    body: [
      "Positive reinforcement adds [a stimulus after behavior] and behavior increases.",
      "Negative reinforcement removes [an aversive stimulus after behavior] and behavior increases.",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each procedure by reinforcement type.",
      categories: ["Positive reinforcement", "Negative reinforcement"],
      items: [
        { label: "Tokens delivered after homework completion", category: "Positive reinforcement" },
        { label: "Break from demands after appropriate break request", category: "Negative reinforcement" },
        { label: "Praise after independent handwashing", category: "Positive reinforcement" },
        { label: "Noise reduced after wearing headphones appropriately", category: "Negative reinforcement" },
      ],
    },
  },
  {
    slug: "g1-reinforcement-contingency-quality",
    label: "G.1",
    title: "Reinforcement Quality",
    body: [
      "Effective reinforcement procedures arrange [immediate, contingent, and valuable consequences].",
      "A reinforcer is confirmed by [increased future responding], not by preference alone.",
    ],
    visual: {
      type: "choice",
      prompt: "Which procedure is most likely to strengthen requesting?",
      choices: [
        "Deliver the requested item immediately after an independent request",
        "Deliver the item randomly with no relation to requesting",
        "Wait several hours before delivering the item",
        "Deliver the item only after problem behavior",
      ],
      answer: "Deliver the requested item immediately after an independent request",
      hint: "Look for [contingency] and [immediacy].",
      feedback:
        "Reinforcement procedures work best when consequences are [contingent, immediate, and valuable].",
    },
  },
  {
    slug: "g1-reinforcement-vs-bribery",
    label: "G.1",
    title: "Reinforcement vs Bribery",
    body: [
      "Reinforcement is a planned contingency that follows [a target response].",
      "Bribery usually offers a consequence after problem behavior is already occurring.",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Reinforcement",
      leftText: "Planned consequence follows the target response",
      rightTitle: "Bribery",
      rightText: "Offer made after problem behavior has begun",
      cue: "Design the contingency before behavior occurs.",
    },
  },
  {
    slug: "g2-dra",
    label: "G.2",
    title: "DRA",
    body: [
      "Differential Reinforcement of Alternative Behavior (DRA) reinforces [an appropriate alternative response].",
      "The alternative should contact the same reinforcer as the problem behavior when possible.",
    ],
    visual: {
      type: "choice",
      prompt: "Which example best fits DRA?",
      choices: [
        "Reinforce asking for help instead of tearing worksheets",
        "Reinforce no screaming for five minutes",
        "Reinforce only lower rates of calling out",
        "Remove tokens after aggression",
      ],
      answer: "Reinforce asking for help instead of tearing worksheets",
      hint: "Find the example that reinforces [a replacement response].",
      feedback: "DRA strengthens [an alternative behavior] that can compete with problem behavior.",
    },
  },
  {
    slug: "g2-dri",
    label: "G.2",
    title: "DRI",
    body: [
      "Differential Reinforcement of Incompatible Behavior (DRI) reinforces [a response that cannot occur at the same time] as the target behavior.",
      "Incompatibility is about response form, not just social acceptability.",
    ],
    visual: {
      type: "choice",
      prompt: "Which replacement response is incompatible with hand biting?",
      choices: [
        "Holding a two-hand fidget",
        "Saying 'break'",
        "Looking at a timer",
        "Sitting near staff",
      ],
      answer: "Holding a two-hand fidget",
      hint: "Look for a response that physically cannot occur with the target response.",
      feedback: "DRI requires [physical incompatibility] with the target behavior.",
    },
  },
  {
    slug: "g2-dro-drl-drh",
    label: "G.2",
    title: "DRO, DRL, and DRH",
    body: [
      "DRO reinforces [absence of the target behavior].",
      "DRL reinforces [lower rates]; DRH reinforces [higher rates].",
    ],
    visual: {
      type: "matching",
      prompt: "Match each differential reinforcement procedure.",
      pairs: [
        { term: "DRO", definition: "Reinforce no target behavior during an interval." },
        { term: "DRL", definition: "Reinforce rates below a criterion." },
        { term: "DRH", definition: "Reinforce rates above a criterion." },
        { term: "DRA", definition: "Reinforce an alternative response." },
      ],
    },
  },
  {
    slug: "g2-dr-with-without-extinction",
    label: "G.2",
    title: "Differential Reinforcement With Extinction",
    body: [
      "Differential reinforcement with extinction reinforces [the desired response] and withholds reinforcement for [the target problem behavior].",
      "Without extinction, the problem behavior may still contact its maintaining consequence.",
    ],
    visual: {
      type: "select-all",
      prompt: "Select features of DRA with extinction.",
      choices: [
        { label: "Alternative behavior contacts reinforcement", correct: true },
        { label: "Problem behavior no longer contacts the maintaining reinforcer", correct: true },
        { label: "The maintaining reinforcer is delivered for problem behavior", correct: false },
        { label: "Safety and feasibility must be considered", correct: true },
      ],
      feedback:
        "DRA with extinction combines [reinforcement for replacement behavior] with [withholding reinforcement for problem behavior].",
    },
  },
  {
    slug: "g3-time-based-reinforcement",
    label: "G.3",
    title: "Time-Based Reinforcement",
    body: [
      "Time-based reinforcement delivers stimuli by [time], not by the learner's response.",
      "Noncontingent reinforcement can reduce motivation for problem behavior by arranging access independently.",
    ],
    visual: {
      type: "choice",
      prompt: "Which example is time-based reinforcement?",
      choices: [
        "Attention is delivered every 2 minutes regardless of behavior",
        "Attention is delivered only after hand raising",
        "Tokens are removed after aggression",
        "Praise follows correct responses only",
      ],
      answer: "Attention is delivered every 2 minutes regardless of behavior",
      hint: "Look for delivery based on [elapsed time], not a response.",
      feedback: "Time-based schedules are [response-independent].",
    },
  },
  {
    slug: "g3-ft-vt-schedules",
    label: "G.3",
    title: "Fixed-Time vs Variable-Time",
    body: [
      "Fixed-Time (FT) schedules deliver reinforcement after [constant time intervals].",
      "Variable-Time (VT) schedules deliver reinforcement after [variable time intervals] around an average.",
    ],
    visual: {
      type: "matching",
      prompt: "Match each schedule to its cue.",
      pairs: [
        { term: "FT 2 min", definition: "Deliver after every 2 minutes." },
        { term: "VT 2 min", definition: "Deliver around a 2-minute average." },
        { term: "Response-independent", definition: "Delivery does not require a target response." },
        { term: "Schedule thinning", definition: "Gradually increase the time between deliveries." },
      ],
    },
  },
  {
    slug: "g4-conditioned-reinforcers",
    label: "G.4",
    title: "Conditioned Reinforcers",
    body: [
      "Conditioned reinforcers acquire value through [pairing with other reinforcers].",
      "Generalized conditioned reinforcers are paired with [many backup reinforcers].",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Conditioned",
      leftText: "Paired with another reinforcer",
      rightTitle: "Generalized",
      rightText: "Paired with many reinforcers",
      cue: "Tokens become powerful when exchange options stay valuable.",
    },
  },
  {
    slug: "g4-token-economy-components",
    label: "G.4",
    title: "Token Economy Components",
    body: [
      "Token economies include [target responses, tokens, backup reinforcers, exchange rules, and response-cost rules if used].",
      "Tokens should be delivered and exchanged using clear, teachable procedures.",
    ],
    visual: {
      type: "select-all",
      prompt: "Select components of a token economy.",
      choices: [
        { label: "Defined target responses", correct: true },
        { label: "Tokens delivered for target responses", correct: true },
        { label: "Backup reinforcers and exchange schedule", correct: true },
        { label: "Unplanned token delivery for any behavior", correct: false },
      ],
      feedback: "Token economies require [clear earning and exchange contingencies].",
    },
  },
  {
    slug: "g4-token-exchange",
    label: "G.4",
    title: "Token Exchange and Backup Reinforcers",
    body: [
      "Tokens maintain value when they can be exchanged for [effective backup reinforcers].",
      "Exchange schedules should balance motivation, practicality, and learner understanding.",
    ],
    visual: {
      type: "flow",
      prompt: "Order a token economy exchange sequence.",
      steps: [
        "Target response occurs",
        "Token is delivered",
        "Tokens are saved or counted",
        "Tokens are exchanged for backup reinforcer",
      ],
      feedback: "Tokens function through [exchange for backup reinforcers].",
    },
  },
  {
    slug: "g5-mos-in-interventions",
    label: "G.5",
    title: "Motivating Operations in Interventions",
    body: [
      "Motivating Operations (MOs) alter [the value of a consequence].",
      "Intervention plans can arrange MOs by managing deprivation, satiation, effort, and aversive conditions.",
    ],
    visual: {
      type: "choice",
      prompt: "Which intervention change most directly alters an MO?",
      choices: [
        "Offer breaks before tasks become highly aversive",
        "Add a picture that signals reinforcement is available",
        "Use a larger response card",
        "Change the data sheet color",
      ],
      answer: "Offer breaks before tasks become highly aversive",
      hint: "Look for a change in [reinforcer value or aversiveness].",
      feedback: "MO-based intervention changes [the value of consequences].",
    },
  },
  {
    slug: "g5-sds-in-interventions",
    label: "G.5",
    title: "Discriminative Stimuli in Interventions",
    body: [
      "A Discriminative Stimulus (SD) signals [reinforcement is available for a response].",
      "Clear SDs help learners know when and where responses will contact reinforcement.",
    ],
    visual: {
      type: "choice",
      prompt: "Which change best improves SD control?",
      choices: [
        "Show a help card only when asking for help will be reinforced",
        "Let the learner become more deprived of attention",
        "Remove all cues from the setting",
        "Deliver tokens on a time schedule",
      ],
      answer: "Show a help card only when asking for help will be reinforced",
      hint: "Find the cue that signals [response-reinforcer availability].",
      feedback: "SD arrangements clarify [when a response will be reinforced].",
    },
  },
  {
    slug: "g5-mo-vs-sd-planning",
    label: "G.5",
    title: "MO vs SD Planning",
    body: [
      "MO strategies change [how much the consequence matters].",
      "SD strategies change [which response is signaled as available for reinforcement].",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each intervention change.",
      categories: ["MO strategy", "SD strategy"],
      items: [
        { label: "Reduce task effort to lower escape value", category: "MO strategy" },
        { label: "Display a green card when break requests are available", category: "SD strategy" },
        { label: "Provide noncontingent attention before problem behavior", category: "MO strategy" },
        { label: "Use a clear instruction before a teaching trial", category: "SD strategy" },
      ],
    },
  },
  {
    slug: "g6-simple-discrimination",
    label: "G.6",
    title: "Simple Discrimination",
    body: [
      "Simple discrimination training teaches one response under [one relevant antecedent condition].",
      "The learner contacts reinforcement in the SD condition and not in the S-delta condition.",
    ],
    visual: {
      type: "comparison",
      leftTitle: "SD",
      leftText: "Response is reinforced",
      rightTitle: "S-delta",
      rightText: "Response is not reinforced",
      cue: "Discrimination training contrasts reinforcement availability.",
    },
  },
  {
    slug: "g6-conditional-discrimination",
    label: "G.6",
    title: "Conditional Discrimination",
    body: [
      "Conditional discrimination depends on [the relation between two or more stimuli].",
      "Matching-to-sample teaches responding based on which comparison matches the sample.",
    ],
    visual: {
      type: "choice",
      prompt: "Which example is conditional discrimination?",
      choices: [
        "Choose the picture of a dog when the sample is a dog",
        "Say 'help' when a help card is visible",
        "Sit when told 'sit'",
        "Raise hand when the teacher pauses",
      ],
      answer: "Choose the picture of a dog when the sample is a dog",
      hint: "Look for responding based on [the relation between stimuli].",
      feedback: "Conditional discrimination requires [stimulus-stimulus relations].",
    },
  },
  {
    slug: "g6-error-correction-discrimination",
    label: "G.6",
    title: "Discrimination Error Correction",
    body: [
      "Error correction should help transfer control to [the relevant antecedent stimulus].",
      "Effective correction avoids reinforcing repeated errors or prompt dependence.",
    ],
    visual: {
      type: "flow",
      prompt: "Order a simple error-correction sequence.",
      steps: ["Learner error", "Brief correction or prompt", "Represent the SD", "Reinforce independent correct response"],
      feedback: "Error correction should promote [independent discrimination].",
    },
  },
  {
    slug: "g7-stimulus-prompts",
    label: "G.7",
    title: "Stimulus Prompts",
    body: [
      "Stimulus prompts change [the antecedent stimulus] to make the correct response more likely.",
      "Examples include position, size, color, or highlighting cues.",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each prompt type.",
      categories: ["Stimulus prompt", "Response prompt"],
      items: [
        { label: "Place the correct card closer", category: "Stimulus prompt" },
        { label: "Point to the correct card", category: "Response prompt" },
        { label: "Make the correct comparison larger", category: "Stimulus prompt" },
        { label: "Physically guide the hand", category: "Response prompt" },
      ],
    },
  },
  {
    slug: "g7-response-prompts",
    label: "G.7",
    title: "Response Prompts",
    body: [
      "Response prompts act on [the learner's response].",
      "They include verbal, gestural, model, partial physical, and full physical prompts.",
    ],
    visual: {
      type: "matching",
      prompt: "Match each response prompt.",
      pairs: [
        { term: "Verbal", definition: "Tell the learner what to say or do." },
        { term: "Gestural", definition: "Point or motion toward the response." },
        { term: "Model", definition: "Demonstrate the response." },
        { term: "Physical", definition: "Guide the response with contact." },
      ],
    },
  },
  {
    slug: "g7-prompt-selection",
    label: "G.7",
    title: "Prompt Selection",
    body: [
      "Prompt selection should use [the least intrusive effective prompt] when possible.",
      "The prompt must support correct responding without becoming the controlling stimulus long term.",
    ],
    visual: {
      type: "choice",
      prompt: "Which prompt plan is strongest?",
      choices: [
        "Use the least intrusive prompt likely to produce correct responding and plan fading",
        "Use full physical prompts forever because they reduce errors",
        "Avoid prompts even when the learner cannot respond",
        "Use random prompts without data",
      ],
      answer: "Use the least intrusive prompt likely to produce correct responding and plan fading",
      hint: "Look for [effectiveness] plus [planned fading].",
      feedback: "Prompt selection balances [learner success and transfer of stimulus control].",
    },
  },
  {
    slug: "g8-prompt-fading-systems",
    label: "G.8",
    title: "Prompt Fading Systems",
    body: [
      "Prompt fading gradually removes [supplemental stimulus control].",
      "Most-to-least and least-to-most prompting differ in how support changes across opportunities.",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Most-to-least",
      leftText: "Start more supportive, then fade",
      rightTitle: "Least-to-most",
      rightText: "Start less supportive, then increase if needed",
      cue: "Both aim for independent responding to the natural SD.",
    },
  },
  {
    slug: "g8-time-delay",
    label: "G.8",
    title: "Time Delay",
    body: [
      "Time delay inserts [a delay between the SD and prompt].",
      "The delay gives the learner an opportunity to respond before the prompt occurs.",
    ],
    visual: {
      type: "flow",
      prompt: "Order a progressive time-delay trial.",
      steps: ["Present natural SD", "Wait briefly", "Prompt if needed", "Reinforce correct response"],
      feedback: "Time delay transfers control by increasing [opportunity for independent responding].",
    },
  },
  {
    slug: "g9-live-modeling",
    label: "G.9",
    title: "Modeling Procedures",
    body: [
      "Modeling shows [the target response] before the learner performs it.",
      "Models should be clear, relevant, and followed by opportunities to practice.",
    ],
    visual: {
      type: "choice",
      prompt: "Which example uses modeling?",
      choices: [
        "The therapist demonstrates handwashing before the learner tries",
        "The therapist removes a token after problem behavior",
        "The therapist delivers attention every 2 minutes",
        "The therapist records a scatterplot",
      ],
      answer: "The therapist demonstrates handwashing before the learner tries",
      hint: "Look for [showing the response].",
      feedback: "Modeling provides [a demonstration of the target response].",
    },
  },
  {
    slug: "g9-video-modeling",
    label: "G.9",
    title: "Video Modeling",
    body: [
      "Video modeling presents [recorded demonstrations] of the target response.",
      "It may support repeated viewing, consistency, and generalization across people.",
    ],
    visual: {
      type: "select-all",
      prompt: "Select possible advantages of video modeling.",
      choices: [
        { label: "Consistent demonstration across trials", correct: true },
        { label: "Repeated viewing opportunities", correct: true },
        { label: "No need to assess whether the learner imitates", correct: false },
        { label: "May reduce live model demands", correct: true },
      ],
      feedback: "Video modeling uses [recorded models] to support performance.",
    },
  },
  {
    slug: "g10-instructions",
    label: "G.10",
    title: "Instructions",
    body: [
      "Instructions describe [what to do] and can function as antecedent stimuli.",
      "Effective instructions are clear, concise, and matched to the learner's repertoire.",
    ],
    visual: {
      type: "choice",
      prompt: "Which instruction is most behaviorally clear?",
      choices: [
        "Put the red block in the bin",
        "Behave nicely",
        "Do better",
        "Be respectful",
      ],
      answer: "Put the red block in the bin",
      hint: "Look for [observable response requirements].",
      feedback: "Instructions should specify [the expected response].",
    },
  },
  {
    slug: "g10-rules",
    label: "G.10",
    title: "Rules",
    body: [
      "Rules describe [contingencies] that may guide behavior without direct contact with each contingency.",
      "Rules are useful when natural contingencies are delayed, risky, or hard to contact quickly.",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Instruction",
      leftText: "Tells what response to emit",
      rightTitle: "Rule",
      rightText: "Describes response-consequence relation",
      cue: "Rules can support behavior before direct contingency contact.",
    },
  },
  {
    slug: "g11-shaping-foundation",
    label: "G.11",
    title: "Shaping",
    body: [
      "Shaping reinforces [successive approximations] toward a terminal response.",
      "The response class changes gradually through differential reinforcement.",
    ],
    visual: {
      type: "flow",
      prompt: "Order a shaping sequence.",
      steps: ["Define terminal response", "Reinforce first approximation", "Raise criterion gradually", "Reinforce closer approximations"],
      feedback: "Shaping builds behavior through [successive approximations].",
    },
  },
  {
    slug: "g11-shaping-criteria",
    label: "G.11",
    title: "Shaping Criteria",
    body: [
      "Criteria should change in [small enough steps] for learner success.",
      "Moving too quickly can produce errors, extinction bursts, or loss of responding.",
    ],
    visual: {
      type: "choice",
      prompt: "Which shaping decision is strongest?",
      choices: [
        "Increase the response requirement after stable success at the current approximation",
        "Jump immediately to the terminal response with no reinforcement",
        "Change criteria randomly across trials",
        "Reinforce only errors to create variability",
      ],
      answer: "Increase the response requirement after stable success at the current approximation",
      hint: "Look for gradual change based on [current performance].",
      feedback: "Shaping criteria should follow [data and learner success].",
    },
  },
  {
    slug: "g11-shaping-vs-prompting",
    label: "G.11",
    title: "Shaping vs Prompting",
    body: [
      "Shaping changes [response form or dimension] through reinforcement.",
      "Prompting adds [supplemental antecedent assistance] to evoke a response.",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Shaping",
      leftText: "Reinforce closer approximations",
      rightTitle: "Prompting",
      rightText: "Add assistance before the response",
      cue: "Shaping changes the response; prompting helps evoke it.",
    },
  },
  {
    slug: "g12-task-analysis",
    label: "G.12",
    title: "Task Analysis",
    body: [
      "A task analysis breaks a complex skill into [teachable response steps].",
      "Each step should be observable, sequenced, and useful for instruction.",
    ],
    visual: {
      type: "flow",
      prompt: "Order a basic handwashing task analysis.",
      steps: ["Turn on water", "Wet hands", "Apply soap", "Rinse hands"],
      feedback: "Chaining uses [sequenced task-analysis steps].",
    },
  },
  {
    slug: "g12-forward-chaining",
    label: "G.12",
    title: "Forward Chaining",
    body: [
      "Forward chaining teaches [the first step first].",
      "The learner completes mastered early steps while later steps are prompted.",
    ],
    visual: {
      type: "choice",
      prompt: "Which example fits forward chaining?",
      choices: [
        "Teach step 1 independently, then add step 2 after step 1 is mastered",
        "Teach the final step first",
        "Prompt every step each time forever",
        "Reinforce only absence of behavior",
      ],
      answer: "Teach step 1 independently, then add step 2 after step 1 is mastered",
      hint: "Look for teaching from [beginning to end].",
      feedback: "Forward chaining starts with [the first response in the chain].",
    },
  },
  {
    slug: "g12-backward-chaining",
    label: "G.12",
    title: "Backward Chaining",
    body: [
      "Backward chaining teaches [the final step first].",
      "The learner contacts natural reinforcement at the end of the chain early in teaching.",
    ],
    visual: {
      type: "choice",
      prompt: "Which example fits backward chaining?",
      choices: [
        "Prompt all steps except the final step, then reinforce independent completion of the final step",
        "Teach the first step first",
        "Teach unrelated responses in random order",
        "Deliver reinforcement on a time schedule only",
      ],
      answer: "Prompt all steps except the final step, then reinforce independent completion of the final step",
      hint: "Look for teaching [the last step] first.",
      feedback: "Backward chaining begins instruction with [the terminal step].",
    },
  },
  {
    slug: "g12-total-task-chaining",
    label: "G.12",
    title: "Total-Task Chaining",
    body: [
      "Total-task chaining teaches [all steps in the chain during each opportunity].",
      "Prompts are provided as needed across the full sequence.",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Forward/backward",
      leftText: "Teach selected steps systematically",
      rightTitle: "Total-task",
      rightText: "Practice every step each time",
      cue: "Choose based on learner skills, chain length, and instructional context.",
    },
  },
  {
    slug: "g13-trial-based-procedures",
    label: "G.13",
    title: "Trial-Based Procedures",
    body: [
      "Trial-based procedures use [discrete learning opportunities] with clear antecedents and consequences.",
      "They can support repeated practice and precise data collection.",
    ],
    visual: {
      type: "flow",
      prompt: "Order a trial-based teaching opportunity.",
      steps: ["Present SD", "Learner responds", "Consequence delivered", "Record data"],
      feedback: "Trial-based teaching uses [structured learning trials].",
    },
  },
  {
    slug: "g13-free-operant-procedures",
    label: "G.13",
    title: "Free-Operant Procedures",
    body: [
      "Free-operant procedures allow [repeated responding over time] without discrete trial boundaries.",
      "They are useful when behavior can occur freely during natural routines.",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each teaching format.",
      categories: ["Trial-based", "Free-operant"],
      items: [
        { label: "Ten discrete tact trials at a table", category: "Trial-based" },
        { label: "Mand opportunities during free play", category: "Free-operant" },
        { label: "One instruction-response-consequence sequence", category: "Trial-based" },
        { label: "Continuous access to materials during art", category: "Free-operant" },
      ],
    },
  },
  {
    slug: "g14-dependent-group-contingency",
    label: "G.14",
    title: "Dependent Group Contingency",
    body: [
      "A dependent group contingency delivers a group consequence based on [one learner's or a small group's behavior].",
      "It can create peer pressure, so dignity and fairness must be considered.",
    ],
    visual: {
      type: "choice",
      prompt: "Which example is a dependent group contingency?",
      choices: [
        "The class earns extra recess if one table group completes cleanup",
        "Each learner earns a token for their own work",
        "The class earns recess only if every learner meets the goal",
        "Attention is delivered every 2 minutes regardless of behavior",
      ],
      answer: "The class earns extra recess if one table group completes cleanup",
      hint: "Look for the group outcome based on [one person or subgroup].",
      feedback: "Dependent group contingencies depend on [selected individual or subgroup performance].",
    },
  },
  {
    slug: "g14-independent-group-contingency",
    label: "G.14",
    title: "Independent Group Contingency",
    body: [
      "An independent group contingency uses the same criterion, but each learner earns based on [their own behavior].",
      "It reduces reliance on peer performance.",
    ],
    visual: {
      type: "choice",
      prompt: "Which example is an independent group contingency?",
      choices: [
        "Each student earns computer time if they complete their own work",
        "The whole class earns music if everyone completes work",
        "The whole class earns music if one student completes work",
        "Tokens are removed after problem behavior",
      ],
      answer: "Each student earns computer time if they complete their own work",
      hint: "Look for [individual earning] under a group-wide criterion.",
      feedback: "Independent group contingencies deliver consequences based on [each learner's performance].",
    },
  },
  {
    slug: "g14-interdependent-group-contingency",
    label: "G.14",
    title: "Interdependent Group Contingency",
    body: [
      "An interdependent group contingency delivers the group consequence when [all members or the group as a whole] meet the criterion.",
      "It can support teamwork but requires careful criterion setting.",
    ],
    visual: {
      type: "choice",
      prompt: "Which example is interdependent?",
      choices: [
        "The class earns recess if the class average reaches 90%",
        "One learner earns a token for independent work",
        "The class earns recess if one learner finishes",
        "A learner gets a break after asking",
      ],
      answer: "The class earns recess if the class average reaches 90%",
      hint: "Look for a consequence based on [whole-group performance].",
      feedback: "Interdependent group contingencies depend on [the group meeting the criterion].",
    },
  },
  {
    slug: "g15-stimulus-generalization",
    label: "G.15",
    title: "Stimulus Generalization",
    body: [
      "Stimulus generalization occurs when a response occurs under [new but similar antecedent conditions].",
      "Planning may include multiple examples, varied materials, and natural cues.",
    ],
    visual: {
      type: "choice",
      prompt: "Which example shows stimulus generalization?",
      choices: [
        "A learner greets familiar and unfamiliar teachers",
        "A learner says hello and waves to the same teacher",
        "A learner maintains the skill three months later",
        "A learner earns tokens for correct responses",
      ],
      answer: "A learner greets familiar and unfamiliar teachers",
      hint: "Look for [new antecedent conditions].",
      feedback: "Stimulus generalization involves responding across [new stimuli, people, settings, or materials].",
    },
  },
  {
    slug: "g15-response-generalization",
    label: "G.15",
    title: "Response Generalization",
    body: [
      "Response generalization occurs when [new response forms] occur after teaching related responses.",
      "Plans can reinforce varied appropriate responses that produce the same function.",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Stimulus generalization",
      leftText: "Same response in new situations",
      rightTitle: "Response generalization",
      rightText: "New responses in related situations",
      cue: "Ask whether the antecedent changed or the response form changed.",
    },
  },
  {
    slug: "g16-maintenance",
    label: "G.16",
    title: "Maintenance",
    body: [
      "Maintenance means behavior continues [after intervention conditions are reduced or removed].",
      "Plan maintenance with natural reinforcers, caregiver implementation, and periodic checks.",
    ],
    visual: {
      type: "choice",
      prompt: "Which plan best supports maintenance?",
      choices: [
        "Transfer reinforcement to natural classroom consequences and monitor over time",
        "Keep every prompt forever",
        "Stop data collection immediately after first correct response",
        "Teach only in one room with one therapist",
      ],
      answer: "Transfer reinforcement to natural classroom consequences and monitor over time",
      hint: "Look for [continued behavior over time] under natural conditions.",
      feedback: "Maintenance planning supports [durable responding].",
    },
  },
  {
    slug: "g16-schedule-thinning",
    label: "G.16",
    title: "Schedule Thinning",
    body: [
      "Schedule thinning gradually reduces [the density of reinforcement].",
      "Thinning should be data-based so behavior remains strong as reinforcement becomes more natural.",
    ],
    visual: {
      type: "flow",
      prompt: "Order a schedule-thinning plan.",
      steps: ["Start dense reinforcement", "Check stable responding", "Thin gradually", "Monitor for relapse or ratio strain"],
      feedback: "Schedule thinning moves from [dense reinforcement] toward [natural schedules].",
    },
  },
  {
    slug: "g16-maintenance-vs-generalization",
    label: "G.16",
    title: "Maintenance vs Generalization",
    body: [
      "Maintenance asks whether behavior continues [over time].",
      "Generalization asks whether behavior occurs [across new stimuli, settings, people, or responses].",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each outcome.",
      categories: ["Maintenance", "Generalization"],
      items: [
        { label: "Skill still occurs after 8 weeks", category: "Maintenance" },
        { label: "Skill occurs with a new caregiver", category: "Generalization" },
        { label: "Skill occurs after prompts are removed", category: "Maintenance" },
        { label: "Skill occurs with new materials", category: "Generalization" },
      ],
    },
  },
  {
    slug: "g17-punishment-procedures",
    label: "G.17",
    title: "Positive and Negative Punishment Procedures",
    body: [
      "Positive punishment adds [a stimulus after behavior] and behavior decreases.",
      "Negative punishment removes [a stimulus after behavior] and behavior decreases.",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each punishment procedure.",
      categories: ["Positive punishment", "Negative punishment"],
      items: [
        { label: "Corrective practice after unsafe behavior", category: "Positive punishment" },
        { label: "Token loss after aggression", category: "Negative punishment" },
        { label: "Brief reprimand after shouting", category: "Positive punishment" },
        { label: "Loss of game access after property destruction", category: "Negative punishment" },
      ],
    },
  },
  {
    slug: "g17-response-cost-time-out",
    label: "G.17",
    title: "Response Cost and Time-Out",
    body: [
      "Response cost removes [a specified amount of reinforcement] after behavior.",
      "Time-out removes [access to reinforcement] for a brief period after behavior.",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Response cost",
      leftText: "Lose tokens or points",
      rightTitle: "Time-out",
      rightText: "Lose access to reinforcement",
      cue: "Both are negative punishment procedures when behavior decreases.",
    },
  },
  {
    slug: "g18-emotional-effects",
    label: "G.18",
    title: "Emotional Effects",
    body: [
      "Behavior-change procedures can produce [emotional responding, avoidance, aggression, or reduced engagement].",
      "Plans should monitor unwanted effects and prioritize reinforcement-based approaches when possible.",
    ],
    visual: {
      type: "select-all",
      prompt: "Select possible unwanted effects to monitor.",
      choices: [
        { label: "Avoidance of teaching materials", correct: true },
        { label: "Emotional responding", correct: true },
        { label: "Aggression or escape from the intervention context", correct: true },
        { label: "Guaranteed generalization after one session", correct: false },
      ],
      feedback: "Monitor [emotional and elicited effects] throughout intervention.",
    },
  },
  {
    slug: "g18-mitigating-side-effects",
    label: "G.18",
    title: "Mitigating Unwanted Effects",
    body: [
      "Mitigation includes [functional assessment, reinforcement for alternatives, gradual changes, and data review].",
      "The plan should protect dignity, safety, and treatment acceptability.",
    ],
    visual: {
      type: "choice",
      prompt: "Which plan best mitigates unwanted effects?",
      choices: [
        "Teach alternatives, monitor side effects, and adjust based on data",
        "Ignore distress because behavior reduction is the only outcome",
        "Use the most intrusive procedure first",
        "Stop all reinforcement for appropriate behavior",
      ],
      answer: "Teach alternatives, monitor side effects, and adjust based on data",
      hint: "Look for [monitoring] and [reinforcement-based supports].",
      feedback: "Mitigation protects [client welfare and treatment effectiveness].",
    },
  },
  {
    slug: "g19-emergent-relations",
    label: "G.19",
    title: "Emergent Relations",
    body: [
      "Emergent relations occur when untaught relations appear after [training related relations].",
      "Teaching can be designed to promote derived responding and generative performance.",
    ],
    visual: {
      type: "choice",
      prompt: "Which example shows an emergent relation?",
      choices: [
        "After learning A-B and B-C, the learner demonstrates A-C without direct teaching",
        "The learner repeats one prompted response",
        "The learner loses tokens after problem behavior",
        "The learner receives attention every 2 minutes",
      ],
      answer: "After learning A-B and B-C, the learner demonstrates A-C without direct teaching",
      hint: "Look for [untaught performance] after related training.",
      feedback: "Emergent relations involve [new relations not directly taught].",
    },
  },
  {
    slug: "g19-generative-performance",
    label: "G.19",
    title: "Generative Performance",
    body: [
      "Generative performance means learners produce [novel, useful responses] beyond the exact training examples.",
      "Multiple exemplars, matrix training, and recombinative teaching can support generativity.",
    ],
    visual: {
      type: "select-all",
      prompt: "Select strategies that may promote generative performance.",
      choices: [
        { label: "Multiple-exemplar training", correct: true },
        { label: "Matrix training", correct: true },
        { label: "Teaching only one rigid example", correct: false },
        { label: "Programming common stimulus features", correct: true },
      ],
      feedback: "Generative teaching promotes [novel responding from trained relations].",
    },
  },
];

const sectionGPracticeQuestions: QuestionContent[] = [
  {
    type: "scenario",
    prompt:
      "A learner appropriately asks for a break, and the task is removed for 30 seconds. Break requests increase. Which procedure is being used?",
    choices: ["Negative reinforcement", "Positive punishment", "Response cost", "DRO"],
    answer: "Negative reinforcement",
    explanation:
      "Negative reinforcement removes [an aversive stimulus after behavior] and behavior increases.",
    hint: "Ask whether something was added or removed, and whether behavior increased.",
  },
  {
    type: "matching",
    prompt: "Match each differential reinforcement procedure to its criterion.",
    pairs: [
      { term: "DRA", definition: "Alternative response produces reinforcement." },
      { term: "DRI", definition: "Incompatible response produces reinforcement." },
      { term: "DRO", definition: "Absence of target behavior produces reinforcement." },
      { term: "DRL", definition: "Lower rate produces reinforcement." },
    ],
    answer: "All differential reinforcement procedures matched correctly",
    explanation:
      "Differential reinforcement depends on [which response pattern contacts reinforcement].",
    hint: "Compare the required response pattern for each procedure.",
  },
  {
    type: "scenario",
    prompt:
      "A teacher provides attention every 3 minutes regardless of behavior to reduce attention-maintained disruption. Which schedule is most directly described?",
    choices: ["Fixed-time reinforcement", "DRA", "DRH", "Token exchange"],
    answer: "Fixed-time reinforcement",
    explanation:
      "Fixed-time schedules deliver reinforcement after [constant time intervals] independent of responding.",
    hint: "Look for delivery based on elapsed time rather than a response.",
  },
  {
    type: "select-all",
    prompt: "Select core token economy components.",
    choices: [
      "Defined target responses",
      "Tokens delivered for target responses",
      "Backup reinforcers and exchange rules",
      "Tokens delivered randomly without exchange options",
    ],
    answers: [
      "Defined target responses",
      "Tokens delivered for target responses",
      "Backup reinforcers and exchange rules",
    ],
    answer: "Defined responses, tokens, backup reinforcers, and exchange rules",
    explanation:
      "Token economies require [earning rules and exchange contingencies].",
    hint: "Look for the parts that make tokens function as conditioned reinforcers.",
  },
  {
    type: "sorting",
    prompt: "Sort each intervention arrangement.",
    categories: ["MO strategy", "SD strategy"],
    items: [
      { label: "Provide noncontingent attention before attention-seeking behavior", category: "MO strategy" },
      { label: "Show a card when break requests will be honored", category: "SD strategy" },
      { label: "Reduce task difficulty before escape behavior escalates", category: "MO strategy" },
      { label: "Present a clear instruction before a teaching trial", category: "SD strategy" },
    ],
    answer: "All intervention arrangements sorted correctly",
    explanation:
      "MOs alter [reinforcer value]; SDs signal [response-reinforcer availability].",
    hint: "Separate value-altering changes from signal changes.",
  },
  {
    type: "scenario",
    prompt:
      "A learner selects the comparison picture that matches the sample picture. Which procedure is being taught?",
    choices: ["Conditional discrimination", "Simple discrimination", "DRO", "Response cost"],
    answer: "Conditional discrimination",
    explanation:
      "Conditional discrimination depends on [the relation between two or more stimuli].",
    hint: "Look for responding based on a stimulus-stimulus relation.",
  },
  {
    type: "matching",
    prompt: "Match each prompt to its category.",
    pairs: [
      { term: "Make the correct card larger", definition: "Stimulus prompt." },
      { term: "Point to the correct card", definition: "Response prompt." },
      { term: "Physically guide the response", definition: "Response prompt." },
      { term: "Place correct option closer", definition: "Stimulus prompt." },
    ],
    answer: "All prompts matched correctly",
    explanation:
      "Stimulus prompts alter [the antecedent stimulus]; response prompts assist [the learner's response].",
    hint: "Ask whether the prompt changes the materials or helps the response.",
  },
  {
    type: "scenario",
    prompt:
      "A therapist waits 2 seconds after the SD before prompting, then gradually increases the wait. What is the procedure?",
    choices: ["Time delay", "Backward chaining", "Response cost", "NCR"],
    answer: "Time delay",
    explanation:
      "Time delay inserts [a delay between the SD and prompt] to promote independent responding.",
    hint: "Look for a planned delay before the prompt.",
  },
  {
    type: "scenario",
    prompt:
      "The therapist demonstrates tying the first knot, then the learner practices. Which procedure is being used?",
    choices: ["Modeling", "DRO", "Time-out", "Schedule thinning"],
    answer: "Modeling",
    explanation:
      "Modeling provides [a demonstration of the target response].",
    hint: "Look for showing the response before the learner performs it.",
  },
  {
    type: "fill-blank",
    prompt: "Complete the cue: Shaping reinforces successive ____.",
    answer: "approximations",
    explanation:
      "Shaping reinforces [successive approximations] toward a terminal response.",
    hint: "The missing word describes closer versions of the final response.",
  },
  {
    type: "scenario",
    prompt:
      "A learner is prompted through every step of toothbrushing during each teaching opportunity. Which chaining procedure is most directly described?",
    choices: ["Total-task chaining", "Backward chaining", "Forward chaining", "DRO"],
    answer: "Total-task chaining",
    explanation:
      "Total-task chaining teaches [all steps in the chain during each opportunity].",
    hint: "Look for practicing the full sequence every time.",
  },
  {
    type: "sorting",
    prompt: "Sort the teaching formats.",
    categories: ["Trial-based", "Free-operant"],
    items: [
      { label: "Discrete listener-response trials", category: "Trial-based" },
      { label: "Mand opportunities during free play", category: "Free-operant" },
      { label: "Ten structured tact trials", category: "Trial-based" },
      { label: "Naturally occurring social initiations during recess", category: "Free-operant" },
    ],
    answer: "All teaching formats sorted correctly",
    explanation:
      "Trial-based procedures use [discrete opportunities]; free-operant procedures allow [repeated responding over time].",
    hint: "Look for clear trial boundaries versus ongoing opportunities.",
  },
  {
    type: "scenario",
    prompt:
      "The entire class earns a dance break if the class average reaches 90% on completed work. Which group contingency is this?",
    choices: ["Interdependent", "Independent", "Dependent", "Response cost"],
    answer: "Interdependent",
    explanation:
      "Interdependent group contingencies depend on [the group meeting the criterion].",
    hint: "Ask whether the group consequence depends on whole-group performance.",
  },
  {
    type: "scenario",
    prompt:
      "After teaching requests with one therapist, the learner requests with a parent and a teacher. Which outcome is shown?",
    choices: ["Stimulus generalization", "Response generalization", "Response cost", "Backward chaining"],
    answer: "Stimulus generalization",
    explanation:
      "Stimulus generalization occurs when behavior occurs across [new people, settings, materials, or antecedents].",
    hint: "Look for the same response under new antecedent conditions.",
  },
  {
    type: "scenario",
    prompt:
      "The BCBA gradually moves from FR 1 to VR 3 while monitoring stable responding. Which procedure is being used?",
    choices: ["Schedule thinning", "Positive punishment", "DRO", "Video modeling"],
    answer: "Schedule thinning",
    explanation:
      "Schedule thinning gradually reduces [reinforcement density] while preserving behavior.",
    hint: "Look for a planned move from dense to leaner reinforcement.",
  },
  {
    type: "scenario",
    prompt:
      "A learner loses one token after aggression, and aggression decreases. Which procedure is described?",
    choices: ["Response cost", "Positive reinforcement", "DRH", "Modeling"],
    answer: "Response cost",
    explanation:
      "Response cost removes [a specified amount of reinforcement] after behavior and is negative punishment when behavior decreases.",
    hint: "Ask whether reinforcement was removed after behavior.",
  },
  {
    type: "select-all",
    prompt: "Select unwanted effects to monitor during behavior-change procedures.",
    choices: [
      "Emotional responding",
      "Avoidance of teaching materials",
      "Aggression or escape from the intervention context",
      "Guaranteed generalization after one session",
    ],
    answers: [
      "Emotional responding",
      "Avoidance of teaching materials",
      "Aggression or escape from the intervention context",
    ],
    answer: "Emotional responding, avoidance, and aggression or escape",
    explanation:
      "Behavior-change planning requires monitoring [emotional and elicited effects] of procedures.",
    hint: "Look for effects that may signal distress or unwanted side effects.",
  },
  {
    type: "scenario",
    prompt:
      "After training A-B and B-C relations, the learner demonstrates A-C without direct teaching. Which outcome is shown?",
    choices: ["Emergent relation", "Response cost", "DRO", "Time-based reinforcement"],
    answer: "Emergent relation",
    explanation:
      "Emergent relations are [untaught relations] that appear after related training.",
    hint: "Look for a relation that was not directly trained.",
  },
  {
    type: "scenario",
    prompt:
      "A written rule says, 'If you finish the checklist before lunch, you earn computer time.' Which feature makes this a rule rather than a simple instruction?",
    choices: [
      "It describes a response-consequence relation",
      "It physically guides the learner's hand",
      "It removes reinforcement after behavior",
      "It presents a two-item preference choice",
    ],
    answer: "It describes a response-consequence relation",
    explanation:
      "Rules describe [contingencies] that can guide behavior before direct contact with every consequence.",
    hint: "Look for whether the statement describes what consequence follows the response.",
  },
  {
    type: "scenario",
    prompt:
      "A therapist shows a video of a peer ordering food, then the learner practices ordering. Which procedure is being used?",
    choices: ["Video modeling", "Forward chaining", "Response cost", "DRL"],
    answer: "Video modeling",
    explanation:
      "Video modeling uses [recorded demonstrations] of the target response.",
    hint: "Look for a recorded model shown before practice.",
  },
  {
    type: "scenario",
    prompt:
      "A learner can request snacks repeatedly during natural play without the teacher starting each trial. Which teaching format best fits?",
    choices: ["Free-operant procedure", "Trial-based procedure", "Backward chaining", "Dependent group contingency"],
    answer: "Free-operant procedure",
    explanation:
      "Free-operant procedures allow [repeated responding over time] without discrete trial boundaries.",
    hint: "Look for ongoing opportunities rather than a teacher-controlled trial sequence.",
  },
  {
    type: "scenario",
    prompt:
      "During a new procedure, the learner begins avoiding the teaching table and crying when materials appear. What should the BCBA do?",
    choices: [
      "Monitor and adjust for possible emotional or elicited effects",
      "Ignore the change because only target behavior matters",
      "Increase intrusiveness without reviewing data",
      "Stop all reinforcement for appropriate behavior",
    ],
    answer: "Monitor and adjust for possible emotional or elicited effects",
    explanation:
      "Behavior-change planning requires identifying and mitigating [emotional and elicited effects] of behavior-change procedures.",
    hint: "Focus on unwanted effects produced by the intervention context.",
  },
];

const sectionGMasteryQuestions: QuestionContent[] = [
  {
    type: "scenario",
    prompt:
      "A BCBA teaches a learner to request a break, and task removal follows only appropriate break requests. Break requests increase and disruption decreases. Which procedure best describes the plan?",
    choices: ["DRA using negative reinforcement", "DRO using positive punishment", "DRH using response cost", "Noncontingent reinforcement only"],
    answer: "DRA using negative reinforcement",
    explanation:
      "The alternative response contacts [removal of demands], so the plan combines DRA with negative reinforcement.",
    hint: "Identify the response being strengthened and the consequence that follows it.",
  },
  {
    type: "scenario",
    prompt:
      "A team provides attention every 2 minutes independent of behavior, then slowly increases the interval as disruption remains low. Which combination is described?",
    choices: ["Time-based reinforcement with schedule thinning", "Backward chaining with response cost", "DRL with token exchange", "Conditional discrimination with modeling"],
    answer: "Time-based reinforcement with schedule thinning",
    explanation:
      "Time-based reinforcement is [response-independent], and thinning gradually reduces [reinforcement density].",
    hint: "Look for time-based delivery and gradual changes to the schedule.",
  },
  {
    type: "scenario",
    prompt:
      "Which plan best reflects a token economy?",
    choices: [
      "Define target responses, deliver tokens for those responses, and exchange tokens for backup reinforcers",
      "Deliver praise randomly with no exchange system",
      "Remove tokens without teaching how they are earned",
      "Use tokens only as data points on a graph",
    ],
    answer:
      "Define target responses, deliver tokens for those responses, and exchange tokens for backup reinforcers",
    explanation:
      "Token economies require [earning rules, tokens, backup reinforcers, and exchange rules].",
    hint: "Look for both earning and exchange contingencies.",
  },
  {
    type: "scenario",
    prompt:
      "A learner fails to request help unless the teacher points at the help card. The BCBA gradually reduces pointing until the card itself evokes requesting. Which process is targeted?",
    choices: ["Prompt fading to transfer stimulus control", "Response cost to reduce behavior", "Backward chaining of a task analysis", "Noncontingent reinforcement"],
    answer: "Prompt fading to transfer stimulus control",
    explanation:
      "Prompt fading transfers control from [supplemental prompts] to [the natural SD].",
    hint: "Ask whether assistance is being reduced so natural cues control the response.",
  },
  {
    type: "scenario",
    prompt:
      "A learner chooses the correct comparison only when it matches the sample. Which discrimination is being taught?",
    choices: ["Conditional discrimination", "Simple discrimination", "Response generalization", "Negative punishment"],
    answer: "Conditional discrimination",
    explanation:
      "Conditional discrimination requires responding based on [the relation between stimuli].",
    hint: "Look for the response depending on a sample-comparison relation.",
  },
  {
    type: "scenario",
    prompt:
      "A therapist reinforces gradually clearer approximations of the word 'water' until the learner says the full word. Which procedure is described?",
    choices: ["Shaping", "Forward chaining", "DRO", "Independent group contingency"],
    answer: "Shaping",
    explanation:
      "Shaping reinforces [successive approximations] of one response dimension or form.",
    hint: "Look for gradual changes in one response.",
  },
  {
    type: "scenario",
    prompt:
      "A BCBA teaches the final step of zipping a coat first because that step naturally completes the routine. Which procedure is described?",
    choices: ["Backward chaining", "Forward chaining", "DRH", "Stimulus fading"],
    answer: "Backward chaining",
    explanation:
      "Backward chaining teaches [the final step first].",
    hint: "Look for instruction beginning at the end of the chain.",
  },
  {
    type: "scenario",
    prompt:
      "Each learner in a group earns the same reward only if their own behavior meets criterion. Which group contingency is described?",
    choices: ["Independent group contingency", "Interdependent group contingency", "Dependent group contingency", "Time-based reinforcement"],
    answer: "Independent group contingency",
    explanation:
      "Independent group contingencies use a group-wide criterion, but consequences depend on [each learner's own behavior].",
    hint: "Ask whether each learner earns individually or the group earns together.",
  },
  {
    type: "scenario",
    prompt:
      "A learner uses a newly taught greeting with peers, siblings, and unfamiliar adults. Which outcome is most directly shown?",
    choices: ["Stimulus generalization", "Maintenance", "Response cost", "DRL"],
    answer: "Stimulus generalization",
    explanation:
      "Stimulus generalization occurs when the same response occurs under [new antecedent conditions].",
    hint: "Look for same response, new people or settings.",
  },
  {
    type: "scenario",
    prompt:
      "A learner says 'help,' hands over a help card, and raises a hand to get assistance after only one response form was directly taught. Which outcome is shown?",
    choices: ["Response generalization", "Stimulus generalization", "Time-out", "Simple discrimination"],
    answer: "Response generalization",
    explanation:
      "Response generalization involves [new response forms] that serve a related function.",
    hint: "Look for new responses, not new antecedents.",
  },
  {
    type: "scenario",
    prompt:
      "A plan uses response cost for dangerous behavior. Which safeguard is most important?",
    choices: [
      "Use functional assessment, reinforcement for alternatives, consent, and ongoing data review",
      "Use response cost without monitoring because it is simple",
      "Remove all reinforcement for appropriate behavior",
      "Avoid teaching replacement behavior",
    ],
    answer:
      "Use functional assessment, reinforcement for alternatives, consent, and ongoing data review",
    explanation:
      "Punishment procedures require [ethical safeguards, alternatives, and data-based monitoring].",
    hint: "Look for a plan that protects client welfare and teaches appropriate behavior.",
  },
  {
    type: "scenario",
    prompt:
      "After training several noun-verb combinations, a learner produces new untrained combinations using the same words. Which target does this best support?",
    choices: ["Generative performance", "Response cost", "DRO", "Fixed-time reinforcement"],
    answer: "Generative performance",
    explanation:
      "Generative performance involves [novel, useful responding] beyond directly trained examples.",
    hint: "Look for untrained combinations emerging from trained components.",
  },
  {
    type: "scenario",
    prompt:
      "A BCBA reduces response effort before demands because escape-maintained behavior is more likely when work is difficult. Which intervention variable is being adjusted?",
    choices: ["Motivating operation", "Discriminative stimulus", "Response cost", "Conditional discrimination"],
    answer: "Motivating operation",
    explanation:
      "Motivating operations alter [the value of a consequence], such as the value of escape from difficult tasks.",
    hint: "Ask whether the plan changes value or signals availability.",
  },
  {
    type: "scenario",
    prompt:
      "A therapist demonstrates a response, the learner imitates it, and feedback follows. Which procedure is most directly involved?",
    choices: ["Modeling", "Schedule thinning", "DRO", "Response cost"],
    answer: "Modeling",
    explanation:
      "Modeling provides [a demonstration of the target response] before learner performance.",
    hint: "Look for the procedure that shows the response.",
  },
  {
    type: "scenario",
    prompt:
      "Which statement best differentiates an instruction from a rule?",
    choices: [
      "An instruction specifies what to do; a rule describes a contingency relation",
      "An instruction always uses punishment; a rule always uses response cost",
      "An instruction is a token; a rule is a backup reinforcer",
      "An instruction requires no learner repertoire; a rule requires no consequence history",
    ],
    answer:
      "An instruction specifies what to do; a rule describes a contingency relation",
    explanation:
      "Instructions specify [the expected response]; rules describe [response-consequence relations].",
    hint: "Compare what the statement tells the learner about behavior and consequences.",
  },
  {
    type: "scenario",
    prompt:
      "Which teaching arrangement is best described as trial-based?",
    choices: [
      "The teacher presents an SD, the learner responds, a consequence follows, and data are recorded",
      "The learner can respond freely throughout recess with no trial boundaries",
      "The class earns a reward only if the group average meets criterion",
      "Tokens are exchanged for backup reinforcers after a session",
    ],
    answer:
      "The teacher presents an SD, the learner responds, a consequence follows, and data are recorded",
    explanation:
      "Trial-based procedures use [discrete learning opportunities] with clear antecedents and consequences.",
    hint: "Look for a clear beginning and end to each learning opportunity.",
  },
  {
    type: "scenario",
    prompt:
      "A learner starts crying and escaping from sessions after a new response cost program begins. Which unwanted effect of behavior-change procedures should be evaluated?",
    choices: [
      "Emotional and elicited effects of the behavior-change procedure",
      "Emergent relations from matrix training",
      "Simple discrimination between SD and S-delta",
      "Paired-stimulus preference hierarchy",
    ],
    answer:
      "Emotional and elicited effects of the behavior-change procedure",
    explanation:
      "Behavior-change procedures can produce [emotional responding, avoidance, or other unwanted effects] that require monitoring and mitigation.",
    hint: "Focus on side effects of the procedure, not the target behavior definition.",
  },
];

const sectionHMiniLessons: MiniLessonContent[] = [
  {
    slug: "h1-observable-measurable-goals",
    label: "H.1",
    title: "Observable and Measurable Goals",
    body: [
      "Intervention goals should describe [observable and measurable behavior].",
      "Avoid goals based only on labels, intent, personality, or inferred feelings.",
    ],
    visual: {
      type: "choice",
      prompt: "Which goal is written in observable and measurable terms?",
      choices: [
        "During independent work, Jordan will request help within 10 seconds in 80% of opportunities.",
        "Jordan will be less frustrated during class.",
        "Jordan will understand why work is important.",
        "Jordan will have a better attitude.",
      ],
      answer:
        "During independent work, Jordan will request help within 10 seconds in 80% of opportunities.",
      hint: "Look for [a response, condition, and measurable criterion].",
      feedback:
        "Intervention goals need [observable responses] and [measurable criteria].",
    },
  },
  {
    slug: "h1-goal-components",
    label: "H.1",
    title: "Goal Components",
    body: [
      "Strong goals include [condition, response, criterion, and context].",
      "The criterion should match the measurement system and meaningful improvement expected.",
    ],
    visual: {
      type: "matching",
      prompt: "Match each goal component.",
      pairs: [
        { term: "Condition", definition: "When or where the response should occur." },
        { term: "Response", definition: "The observable behavior targeted." },
        { term: "Criterion", definition: "How much or how often counts as success." },
        { term: "Context", definition: "Relevant routines, people, or settings." },
      ],
    },
  },
  {
    slug: "h1-social-significance",
    label: "H.1",
    title: "Socially Significant Goals",
    body: [
      "A measurable goal still needs [social significance].",
      "Prioritize goals that improve safety, independence, communication, access, or quality of life.",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each goal by social significance.",
      categories: ["Stronger goal", "Weaker goal"],
      items: [
        { label: "Request a break to reduce dangerous elopement", category: "Stronger goal" },
        { label: "Complete a trivial worksheet unrelated to daily routines", category: "Weaker goal" },
        { label: "Use a communication response to access needed help", category: "Stronger goal" },
        { label: "Sit with hands folded only because it is easy to measure", category: "Weaker goal" },
      ],
    },
  },
  {
    slug: "h1-baseline-to-goal",
    label: "H.1",
    title: "Baseline Data to Goals",
    body: [
      "Baseline data help set [realistic and meaningful criteria].",
      "A goal should be ambitious enough to matter without ignoring current performance.",
    ],
    visual: {
      type: "choice",
      prompt: "Baseline shows 0 independent break requests across five sessions. Which first goal is most reasonable?",
      choices: [
        "Request a break independently in 60% of opportunities during work routines.",
        "Use 50 different sentences tomorrow with no prompts.",
        "Never need breaks again.",
        "Be calm all day with no definition.",
      ],
      answer:
        "Request a break independently in 60% of opportunities during work routines.",
      hint: "Pick the goal that uses [current data] and [measurable improvement].",
      feedback:
        "Baseline data support [data-based and measurable goal criteria].",
    },
  },
  {
    slug: "h2-assessment-to-intervention",
    label: "H.2",
    title: "Assessment Results to Intervention",
    body: [
      "Interventions should follow [assessment results], not convenience or habit.",
      "Function, skill deficits, preference data, risk, and context all matter.",
    ],
    visual: {
      type: "flow",
      prompt: "Order assessment-based intervention selection.",
      steps: [
        "Review assessment results",
        "Identify function or skill need",
        "Select evidence-supported procedure",
        "Check preferences and contextual fit",
      ],
      feedback:
        "Intervention selection should integrate [assessment data, evidence, preferences, and fit].",
    },
  },
  {
    slug: "h2-evidence-preferences-fit",
    label: "H.2",
    title: "Evidence, Preferences, and Contextual Fit",
    body: [
      "A recommended intervention should be supported by [scientific evidence].",
      "It also needs [client preference, caregiver feasibility, and contextual fit].",
    ],
    visual: {
      type: "select-all",
      prompt: "Select factors that should guide intervention recommendation.",
      choices: [
        { label: "Assessment results", correct: true },
        { label: "Scientific evidence", correct: true },
        { label: "Client preferences and contextual fit", correct: true },
        { label: "Provider convenience alone", correct: false },
      ],
      feedback:
        "Intervention recommendations require [assessment results, scientific evidence, client preferences, and contextual fit].",
    },
  },
  {
    slug: "h2-function-based-selection",
    label: "H.2",
    title: "Function-Based Selection",
    body: [
      "Function-based intervention matches procedures to [the maintaining consequence].",
      "For escape-maintained behavior, teach an appropriate response that accesses breaks or task modification.",
    ],
    visual: {
      type: "matching",
      prompt: "Match each function to a function-based intervention feature.",
      pairs: [
        { term: "Escape", definition: "Teach break requests and adjust task demands." },
        { term: "Attention", definition: "Teach appropriate attention requests." },
        { term: "Tangible", definition: "Teach appropriate access requests." },
        { term: "Automatic", definition: "Arrange competing stimulation or skill-building supports." },
      ],
    },
  },
  {
    slug: "h2-differential-reinforcement-selection",
    label: "H.2",
    title: "Differential Reinforcement Selection",
    body: [
      "Differential reinforcement procedures should be selected from [assessment results, function, safety, and contextual fit].",
      "The key discrimination is which response pattern will contact reinforcement while the target behavior decreases.",
    ],
    visual: {
      type: "matching",
      prompt: "Match each differential reinforcement procedure to its intervention-selection cue.",
      pairs: [
        { term: "DRA", definition: "Reinforce an appropriate alternative response." },
        { term: "DRO", definition: "Reinforce the absence of target behavior for an interval." },
        { term: "DRI", definition: "Reinforce a response that cannot occur with the target response." },
        { term: "DRL", definition: "Reinforce lower rates of behavior that remain acceptable." },
        { term: "DRH", definition: "Reinforce higher rates of a behavior that should increase." },
      ],
    },
  },
  {
    slug: "h2-contextual-fit",
    label: "H.2",
    title: "Contextual Fit",
    body: [
      "Contextual fit asks whether the intervention can be implemented within [real routines, resources, values, and constraints].",
      "A technically strong plan can fail if it is not feasible for the setting.",
    ],
    visual: {
      type: "choice",
      prompt: "Which plan has the best contextual fit?",
      choices: [
        "A brief FCT routine teachers can implement during actual transitions.",
        "A complex plan requiring two staff when only one staff member is present.",
        "A clinic-only procedure for behavior that occurs only at home.",
        "A plan caregivers say conflicts with important family routines.",
      ],
      answer:
        "A brief FCT routine teachers can implement during actual transitions.",
      hint: "Look for [feasible implementation in the real context].",
      feedback:
        "Contextual fit supports [implementation and maintenance].",
    },
  },
  {
    slug: "h2-cultural-responsiveness",
    label: "H.2",
    title: "Cultural Responsiveness in Intervention",
    body: [
      "Intervention selection should respect [client values, routines, language, and priorities].",
      "Cultural responsiveness is part of contextual fit, not an optional extra.",
    ],
    visual: {
      type: "select-all",
      prompt: "Select culturally responsive intervention actions.",
      choices: [
        { label: "Ask caregivers whether procedures fit routines and values", correct: true },
        { label: "Use accessible language for training materials", correct: true },
        { label: "Adapt examples to the learner's real settings", correct: true },
        { label: "Use the provider's preferred plan regardless of client context", correct: false },
      ],
      feedback:
        "Culturally responsive intervention uses [client context, values, access, and collaboration].",
    },
  },
  {
    slug: "h2-scientific-evidence-vs-trend",
    label: "H.2",
    title: "Scientific Evidence vs Popularity",
    body: [
      "Evidence-based selection uses [scientific evidence and assessment data].",
      "Popularity, testimonials, or convenience do not replace behavior-analytic evidence.",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each reason for selecting an intervention.",
      categories: ["Evidence-based reason", "Weak reason"],
      items: [
        { label: "Function-based FCT has evidence for escape-maintained behavior", category: "Evidence-based reason" },
        { label: "A social media post said the strategy works for everyone", category: "Weak reason" },
        { label: "Data show DRA improved similar behavior in this setting", category: "Evidence-based reason" },
        { label: "The provider prefers it because it is familiar", category: "Weak reason" },
      ],
    },
  },
  {
    slug: "h3-alternative-behavior-features",
    label: "H.3",
    title: "Socially Valid Alternative Behavior",
    body: [
      "A replacement behavior should be [socially valid, efficient, effective, and acceptable].",
      "It should access the functional reinforcer more appropriately than the target behavior.",
    ],
    visual: {
      type: "select-all",
      prompt: "Select features of a strong alternative behavior.",
      choices: [
        { label: "Contacts the same reinforcer when possible", correct: true },
        { label: "Is easier than problem behavior at first", correct: true },
        { label: "Is acceptable to the learner and context", correct: true },
        { label: "Requires more effort than problem behavior", correct: false },
      ],
      feedback:
        "Socially valid alternatives should be [efficient, effective, acceptable, and functionally related].",
    },
  },
  {
    slug: "h3-fct",
    label: "H.3",
    title: "Functional Communication Training",
    body: [
      "Functional Communication Training (FCT) teaches [a communication response] that accesses the same reinforcer as problem behavior.",
      "The response form should fit the learner's current communication repertoire.",
    ],
    visual: {
      type: "choice",
      prompt: "Which response is the best FCT target for escape-maintained aggression during writing?",
      choices: [
        "Handing over a break card during writing",
        "Sitting silently for the whole day",
        "Sorting colors during lunch",
        "Saying thank you after snack",
      ],
      answer: "Handing over a break card during writing",
      hint: "Look for [communication] that accesses [the same functional reinforcer].",
      feedback:
        "FCT teaches [functional communication] that competes with problem behavior.",
    },
  },
  {
    slug: "h3-alternative-vs-incompatible",
    label: "H.3",
    title: "Alternative vs Incompatible Behavior",
    body: [
      "Alternative behavior is selected for [social validity and functional usefulness].",
      "Incompatible behavior physically cannot occur at the same time as the target response.",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Alternative",
      leftText: "Appropriate response that meets the same need",
      rightTitle: "Incompatible",
      rightText: "Response that cannot occur with the target behavior",
      cue: "Alternative = useful replacement. Incompatible = physically cannot happen together.",
    },
  },
  {
    slug: "h3-response-effort",
    label: "H.3",
    title: "Response Effort",
    body: [
      "Early replacement behavior should require [less effort than problem behavior].",
      "If the replacement response is too hard, problem behavior may remain more efficient.",
    ],
    visual: {
      type: "choice",
      prompt: "Which replacement response has the best early response-effort fit?",
      choices: [
        "Tap a break card placed on the desk",
        "Write a five-sentence paragraph to request a break",
        "Wait 20 minutes before requesting help",
        "Use a response form the learner has never practiced",
      ],
      answer: "Tap a break card placed on the desk",
      hint: "Choose the response that is [quick, easy, and teachable].",
      feedback:
        "Low response effort helps the alternative behavior [compete with problem behavior].",
    },
  },
  {
    slug: "h4-reinforcement-unwanted-effects",
    label: "H.4",
    title: "Unwanted Effects of Reinforcement",
    body: [
      "Reinforcement procedures can accidentally strengthen [the wrong response pattern].",
      "Monitor adventitious reinforcement, satiation, response bursts, and dependency on dense schedules.",
    ],
    visual: {
      type: "choice",
      prompt: "Which situation shows an unwanted reinforcement effect?",
      choices: [
        "Staff deliver attention after disruption, and disruption increases.",
        "Staff reinforce hand raising, and hand raising increases.",
        "A learner maintains a skill with natural praise.",
        "A learner requests help instead of tearing work.",
      ],
      answer: "Staff deliver attention after disruption, and disruption increases.",
      hint: "Look for reinforcement of [an unintended response].",
      feedback:
        "Reinforcement should be arranged for [target or alternative behavior], not accidentally for problem behavior.",
    },
  },
  {
    slug: "h4-extinction-side-effects",
    label: "H.4",
    title: "Extinction Side Effects",
    body: [
      "Extinction may produce [extinction bursts, variability, emotional responding, aggression, or resurgence].",
      "Plan safety, reinforcement for alternatives, and caregiver/staff coaching before implementation.",
    ],
    visual: {
      type: "select-all",
      prompt: "Select possible extinction side effects.",
      choices: [
        { label: "Temporary increase in response intensity or frequency", correct: true },
        { label: "Emotional responding", correct: true },
        { label: "Resurgence of previously reinforced responses", correct: true },
        { label: "Guaranteed immediate calm behavior", correct: false },
      ],
      feedback:
        "Extinction side effects require [planning, safety, and reinforcement for alternatives].",
    },
  },
  {
    slug: "h4-punishment-unwanted-effects",
    label: "H.4",
    title: "Unwanted Effects of Punishment",
    body: [
      "Punishment may produce [avoidance, emotional responding, aggression, or damaged rapport].",
      "Use safeguards, consent, data review, and reinforcement-based alternatives.",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each action by whether it mitigates punishment risk.",
      categories: ["Mitigates risk", "Increases risk"],
      items: [
        { label: "Teach and reinforce replacement behavior", category: "Mitigates risk" },
        { label: "Monitor emotional responding and avoidance", category: "Mitigates risk" },
        { label: "Use punishment without consent or data review", category: "Increases risk" },
        { label: "Ignore side effects because behavior decreases", category: "Increases risk" },
      ],
    },
  },
  {
    slug: "h4-mitigation-plan",
    label: "H.4",
    title: "Mitigation Planning",
    body: [
      "Mitigation means arranging supports to reduce [unwanted effects of procedures].",
      "Plans should include reinforcement for alternatives, safety criteria, integrity checks, and data review.",
    ],
    visual: {
      type: "flow",
      prompt: "Order a mitigation planning sequence.",
      steps: [
        "Identify possible unwanted effects",
        "Teach and reinforce alternatives",
        "Set safety and integrity checks",
        "Review data and adjust quickly",
      ],
      feedback:
        "Mitigation is [planned before implementation] and adjusted with data.",
    },
  },
  {
    slug: "h5-relapse-types",
    label: "H.5",
    title: "Relapse",
    body: [
      "Relapse means a reduced behavior returns after treatment gains.",
      "Common relapse risks include [resurgence, renewal, reinstatement, and rapid loss of reinforcement].",
    ],
    visual: {
      type: "matching",
      prompt: "Match each relapse cue.",
      pairs: [
        { term: "Resurgence", definition: "Previously reinforced behavior returns when current behavior no longer contacts reinforcement." },
        { term: "Renewal", definition: "Behavior returns when context changes." },
        { term: "Reinstatement", definition: "Behavior returns after response-independent reinforcer delivery." },
        { term: "Ratio strain", definition: "Responding weakens when schedule thinning is too abrupt." },
      ],
    },
  },
  {
    slug: "h5-relapse-prevention",
    label: "H.5",
    title: "Relapse Prevention",
    body: [
      "Relapse prevention plans for [future contexts, leaner schedules, and competing contingencies].",
      "Teach caregivers and staff what to do if target behavior reappears.",
    ],
    visual: {
      type: "select-all",
      prompt: "Select relapse prevention strategies.",
      choices: [
        { label: "Program common stimuli and natural reinforcers", correct: true },
        { label: "Thin schedules gradually with data review", correct: true },
        { label: "Create a booster plan for early signs of recurrence", correct: true },
        { label: "Stop all supports immediately after first improvement", correct: false },
      ],
      feedback:
        "Relapse planning uses [maintenance, generalization, schedule thinning, and booster supports].",
    },
  },
  {
    slug: "h5-natural-contingencies",
    label: "H.5",
    title: "Transfer to Natural Contingencies",
    body: [
      "Durable intervention shifts from artificial supports to [natural contingencies].",
      "Schedule thinning and caregiver implementation can support maintenance without abrupt withdrawal.",
    ],
    visual: {
      type: "flow",
      prompt: "Order reinforcement transfer.",
      steps: [
        "Begin with dense programmed reinforcement",
        "Teach reliable alternative behavior",
        "Thin schedule gradually",
        "Shift to natural reinforcers and monitoring",
      ],
      feedback:
        "Maintenance improves when behavior contacts [natural reinforcement].",
    },
  },
  {
    slug: "h6-procedural-integrity",
    label: "H.6",
    title: "Procedural Integrity",
    body: [
      "Procedural integrity measures whether procedures are implemented [as written].",
      "Low integrity weakens conclusions about whether the intervention itself is effective.",
    ],
    visual: {
      type: "choice",
      prompt: "Integrity data show staff delivered reinforcement for only 40% of replacement responses. What is the best first decision?",
      choices: [
        "Improve implementation before concluding the intervention is ineffective.",
        "Declare the procedure ineffective immediately.",
        "Ignore integrity because behavior data matter more.",
        "Switch to punishment without training staff.",
      ],
      answer:
        "Improve implementation before concluding the intervention is ineffective.",
      hint: "Ask whether the plan was implemented [as designed].",
      feedback:
        "Data-based integrity decisions protect interpretation of [intervention effects].",
    },
  },
  {
    slug: "h6-integrity-vs-effectiveness",
    label: "H.6",
    title: "Integrity vs Effectiveness",
    body: [
      "Integrity asks whether the plan was implemented [correctly].",
      "Effectiveness asks whether behavior changed [meaningfully].",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Integrity",
      leftText: "Was the plan done as written?",
      rightTitle: "Effectiveness",
      rightText: "Did behavior improve enough?",
      cue: "Low integrity must be addressed before changing a plan based only on poor outcomes.",
    },
  },
  {
    slug: "h6-integrity-data-decision",
    label: "H.6",
    title: "Integrity Data Decisions",
    body: [
      "Integrity data guide decisions about [training, simplification, feedback, and environmental supports].",
      "Do not blame the client for poor outcomes when implementation is inconsistent.",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each decision.",
      categories: ["Integrity problem", "Effectiveness problem"],
      items: [
        { label: "Staff skip the prompt fading step", category: "Integrity problem" },
        { label: "Procedure is implemented accurately but behavior does not improve", category: "Effectiveness problem" },
        { label: "Data sheets show reinforcement delivered late", category: "Integrity problem" },
        { label: "High integrity and no behavior change after enough data", category: "Effectiveness problem" },
      ],
    },
  },
  {
    slug: "h7-effectiveness-data",
    label: "H.7",
    title: "Intervention Effectiveness",
    body: [
      "Effectiveness decisions use [client behavior data] and social validity information.",
      "A plan may need continuation, modification, or discontinuation based on level, trend, variability, and risk.",
    ],
    visual: {
      type: "choice",
      prompt: "Behavior data show a stable improving trend and high integrity. What is the best decision?",
      choices: [
        "Continue the intervention and monitor progress.",
        "Change the plan immediately because any trend requires revision.",
        "Stop all data collection.",
        "Ignore integrity and switch procedures.",
      ],
      answer: "Continue the intervention and monitor progress.",
      hint: "Look for data showing [improvement with high implementation].",
      feedback:
        "High integrity plus improving data supports [continuing and monitoring].",
    },
  },
  {
    slug: "h7-modification-decision",
    label: "H.7",
    title: "Modify or Continue",
    body: [
      "Modify an intervention when data show [insufficient progress despite adequate integrity].",
      "If integrity is low, fix implementation before judging effectiveness.",
    ],
    visual: {
      type: "matching",
      prompt: "Match each data pattern to the strongest decision.",
      pairs: [
        { term: "High integrity + improving data", definition: "Continue and monitor." },
        { term: "Low integrity + poor data", definition: "Train/support implementers first." },
        { term: "High integrity + flat data", definition: "Modify the intervention." },
        { term: "Improvement + low social validity", definition: "Collaborate and adapt for fit." },
      ],
    },
  },
  {
    slug: "h7-graph-decision",
    label: "H.7",
    title: "Graph-Based Decisions",
    body: [
      "Graphs help evaluate [level, trend, variability, immediacy, and overlap].",
      "Intervention modification should be based on data patterns, not one isolated point.",
    ],
    visual: {
      type: "choice",
      prompt: "Which data pattern most suggests modification is needed?",
      choices: [
        "High integrity with flat or worsening behavior across several sessions.",
        "One slightly variable point after a strong improving trend.",
        "Stable improvement across multiple sessions.",
        "Improvement in natural settings with caregiver support.",
      ],
      answer:
        "High integrity with flat or worsening behavior across several sessions.",
      hint: "Look for [adequate implementation] with [insufficient behavior change].",
      feedback:
        "Effectiveness decisions require [data patterns over time].",
    },
  },
  {
    slug: "h7-social-validity-decision",
    label: "H.7",
    title: "Social Validity and Effectiveness",
    body: [
      "Effectiveness is not only statistical or visual change; it must be [meaningful to the client and context].",
      "Low acceptability can threaten implementation even when behavior changes.",
    ],
    visual: {
      type: "select-all",
      prompt: "Select reasons to revisit an intervention even if behavior improves.",
      choices: [
        { label: "Caregivers cannot implement it safely", correct: true },
        { label: "The learner shows strong avoidance of the procedure", correct: true },
        { label: "The goal no longer matches client priorities", correct: true },
        { label: "The graph has a clear improving trend and the plan is acceptable", correct: false },
      ],
      feedback:
        "Data-based decisions include [effectiveness, acceptability, feasibility, and client welfare].",
    },
  },
  {
    slug: "h8-collaboration",
    label: "H.8",
    title: "Collaboration",
    body: [
      "Collaboration supports services by aligning [client, caregiver, teacher, staff, and professional input].",
      "Effective collaboration uses active listening, clear roles, and data-based discussion.",
    ],
    visual: {
      type: "select-all",
      prompt: "Select collaborative actions.",
      choices: [
        { label: "Ask caregivers about feasibility and priorities", correct: true },
        { label: "Share clear implementation steps with teachers", correct: true },
        { label: "Coordinate with related professionals within scope", correct: true },
        { label: "Dismiss stakeholder concerns because the plan is technical", correct: false },
      ],
      feedback:
        "Collaboration improves [contextual fit, integrity, and continuity of services].",
    },
  },
  {
    slug: "h8-caregiver-teacher-training",
    label: "H.8",
    title: "Caregiver and Teacher Support",
    body: [
      "Intervention implementation often depends on [caregiver, teacher, or staff behavior].",
      "Support should include instructions, modeling, rehearsal, feedback, and simple materials when needed.",
    ],
    visual: {
      type: "flow",
      prompt: "Order collaborative training support.",
      steps: [
        "Explain the intervention goal",
        "Model the procedure",
        "Practice with feedback",
        "Review data and adjust supports",
      ],
      feedback:
        "Collaborative support should build [accurate and feasible implementation].",
    },
  },
  {
    slug: "h8-interdisciplinary-collaboration",
    label: "H.8",
    title: "Interdisciplinary Collaboration",
    body: [
      "Collaboration does not mean replacing behavior-analytic decisions with unsupported opinions.",
      "It means integrating relevant expertise while preserving [assessment data, scope, ethics, and client priorities].",
    ],
    visual: {
      type: "choice",
      prompt: "Which collaboration response is strongest?",
      choices: [
        "Coordinate with the speech-language pathologist on communication response forms while using behavior data to evaluate effects.",
        "Let another provider choose the behavior plan without data.",
        "Ignore medical or educational information because it is not behavior analytic.",
        "Avoid caregivers so the plan stays technically pure.",
      ],
      answer:
        "Coordinate with the speech-language pathologist on communication response forms while using behavior data to evaluate effects.",
      hint: "Look for [coordination] plus [behavior-analytic data].",
      feedback:
        "Strong collaboration preserves [scope, data, and shared implementation].",
    },
  },
  {
    slug: "h2-contextual-fit-failures",
    label: "H.2",
    title: "Contextual Fit Failures",
    body: [
      "A plan can be evidence-based and still fail if it does not fit [real routines, resources, culture, or staffing].",
      "Contextual fit failures often show up as low procedural integrity, low acceptability, or rapid abandonment.",
    ],
    visual: {
      type: "choice",
      prompt: "Which example most clearly shows a contextual fit failure?",
      choices: [
        "A plan requires two trained staff during lunch, but the classroom has one aide and no extra coverage.",
        "A function-based FCT plan is easy for caregivers to implement during meals.",
        "A teacher collects data with a simple checklist during the natural routine.",
        "A learner's communication response contacts reinforcement in school and home.",
      ],
      answer:
        "A plan requires two trained staff during lunch, but the classroom has one aide and no extra coverage.",
      hint: "Look for [a mismatch between the plan and actual implementation conditions].",
      feedback:
        "Contextual fit requires [feasible implementation in the real service context].",
    },
  },
  {
    slug: "h7-treatment-acceptability",
    label: "H.7",
    title: "Treatment Acceptability and Social Validity",
    body: [
      "Social validity asks whether goals, procedures, and outcomes are [acceptable and meaningful to stakeholders].",
      "Treatment acceptability affects whether caregivers, teachers, staff, and clients will actually use the plan.",
    ],
    visual: {
      type: "select-all",
      prompt: "Select signs that treatment acceptability needs more review.",
      choices: [
        { label: "Caregivers say the plan conflicts with daily routines", correct: true },
        { label: "Teachers report the procedure is too complex during transitions", correct: true },
        { label: "The learner strongly avoids the intervention materials", correct: true },
        { label: "Stakeholders report the plan is feasible and meaningful", correct: false },
      ],
      feedback:
        "Social validity includes [goal importance, procedure acceptability, and outcome meaningfulness].",
    },
  },
  {
    slug: "h3-function-based-replacement-selection",
    label: "H.3",
    title: "Replacement Behavior by Function",
    body: [
      "A strong replacement behavior should access [the same functional reinforcer] more appropriately.",
      "Poor replacements may be polite, easy to teach, or preferred by adults but still fail if they do not match function.",
    ],
    visual: {
      type: "matching",
      prompt: "Match each function to the strongest replacement behavior focus.",
      pairs: [
        { term: "Escape", definition: "Request a break, help, or task modification." },
        { term: "Attention", definition: "Request attention appropriately." },
        { term: "Tangible", definition: "Request access, wait, or trade appropriately." },
        { term: "Automatic", definition: "Use a competing response or alternative stimulation." },
      ],
    },
  },
  {
    slug: "h4-extinction-emotional-responding",
    label: "H.4",
    title: "Extinction Bursts and Emotional Responding",
    body: [
      "Extinction can temporarily produce [more frequent, intense, or varied responding].",
      "Emotional responding is a clinical safety signal, not a reason to ignore data or continue without supports.",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each observation by clinical meaning.",
      categories: ["Plan for support", "Not enough by itself"],
      items: [
        { label: "Aggression increases during early extinction sessions", category: "Plan for support" },
        { label: "Crying begins when reinforcement is withheld", category: "Plan for support" },
        { label: "One low-frequency response occurs once", category: "Not enough by itself" },
        { label: "A procedure name appears in a written plan", category: "Not enough by itself" },
      ],
    },
  },
  {
    slug: "h5-relapse-pattern-discrimination",
    label: "H.5",
    title: "Resurgence, Renewal, and Reinstatement",
    body: [
      "Relapse planning requires discriminating [which recurrence pattern is likely].",
      "Resurgence, renewal, and reinstatement point to different prevention supports.",
    ],
    visual: {
      type: "matching",
      prompt: "Match each relapse pattern to its cue.",
      pairs: [
        { term: "Resurgence", definition: "An older response returns when the current alternative no longer contacts reinforcement." },
        { term: "Renewal", definition: "Problem behavior returns when the learner enters a different context." },
        { term: "Reinstatement", definition: "Problem behavior returns after response-independent access to the reinforcer." },
        { term: "Maintenance", definition: "Behavior change continues over time after teaching conditions change." },
      ],
    },
  },
  {
    slug: "h6-treatment-fidelity-graphs",
    label: "H.6",
    title: "Treatment Fidelity Graphs",
    body: [
      "Treatment fidelity graphs show whether procedures are implemented [as designed across time].",
      "Outcome data are harder to interpret when fidelity is low or unstable.",
    ],
    visual: {
      type: "choice",
      prompt: "A fidelity graph shows implementation near 45% for five sessions while problem behavior remains high. What should the team do first?",
      choices: [
        "Improve training, simplify the plan, or adjust supports before judging effectiveness.",
        "Conclude the procedure is ineffective and abandon assessment results.",
        "Stop collecting integrity data because outcome data are enough.",
        "Increase response effort for the replacement behavior.",
      ],
      answer:
        "Improve training, simplify the plan, or adjust supports before judging effectiveness.",
      hint: "Ask whether the intervention was implemented [accurately enough to evaluate].",
      feedback:
        "Fidelity data guide [procedural integrity decisions] before outcome conclusions.",
    },
  },
  {
    slug: "h7-ineffective-intervention-analysis",
    label: "H.7",
    title: "Ineffective Intervention Analysis",
    body: [
      "An ineffective plan should be analyzed before replacing it.",
      "Check [function match, integrity, reinforcement strength, response effort, side effects, and contextual fit].",
    ],
    visual: {
      type: "flow",
      prompt: "Order an ineffective-intervention review.",
      steps: [
        "Confirm data pattern",
        "Check procedural integrity",
        "Revisit function and replacement behavior",
        "Modify the plan and continue monitoring",
      ],
      feedback:
        "Intervention modification should be [data-based and assessment-linked].",
    },
  },
  {
    slug: "h7-effectiveness-vs-practicality",
    label: "H.7",
    title: "Effectiveness vs Practicality",
    body: [
      "A plan must be effective enough to matter and practical enough to be used.",
      "The best clinical decision balances [behavior-change outcomes] with [feasible, acceptable implementation].",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Effective but impractical",
      leftText: "Behavior improves, but the plan cannot be sustained in real routines",
      rightTitle: "Practical but weak",
      rightText: "Easy to implement, but data show little meaningful behavior change",
      cue: "Best fit = meaningful change plus feasible implementation.",
    },
  },
  {
    slug: "h5-natural-contingency-transfer",
    label: "H.5",
    title: "Schedule Thinning and Natural Contingencies",
    body: [
      "Schedule thinning gradually shifts reinforcement toward [natural timing, natural people, and natural consequences].",
      "Abrupt thinning can produce relapse, ratio strain, or loss of the replacement behavior.",
    ],
    visual: {
      type: "flow",
      prompt: "Order a reinforcement-transfer plan.",
      steps: [
        "Start with dense reinforcement for the replacement behavior",
        "Confirm stable low problem behavior",
        "Thin reinforcement gradually using data",
        "Transfer to natural contingencies and booster supports",
      ],
      feedback:
        "Maintenance planning uses [gradual schedule thinning and natural contingencies].",
    },
  },
  {
    slug: "h8-culturally-responsive-implementation",
    label: "H.8",
    title: "Culturally Responsive Intervention Planning",
    body: [
      "Culturally responsive planning integrates [client values, language, routines, and caregiver priorities].",
      "Collaboration is strongest when stakeholders help shape how the plan will work in real life.",
    ],
    visual: {
      type: "select-all",
      prompt: "Select culturally responsive implementation actions.",
      choices: [
        { label: "Ask how procedures fit family routines and priorities", correct: true },
        { label: "Use language-access supports for training and consent", correct: true },
        { label: "Adapt examples and materials to the natural setting", correct: true },
        { label: "Keep the plan unchanged when stakeholders describe access barriers", correct: false },
      ],
      feedback:
        "Culturally responsive intervention planning supports [acceptability, feasibility, and client-centered care].",
    },
  },
];

const sectionHPracticeQuestions: QuestionContent[] = [
  {
    type: "scenario",
    prompt:
      "A draft goal says, 'Kai will be more cooperative.' Which revision best develops an intervention goal in observable and measurable terms?",
    choices: [
      "Given a one-step instruction, Kai will begin the task within 10 seconds in 80% of opportunities.",
      "Kai will have a better attitude during instruction.",
      "Kai will stop being difficult when work is presented.",
      "Kai will understand adult expectations.",
    ],
    answer:
      "Given a one-step instruction, Kai will begin the task within 10 seconds in 80% of opportunities.",
    explanation:
      "Intervention goals should include [observable behavior] and [measurable criteria].",
    hint: "Look for a response that can be observed and counted.",
  },
  {
    type: "matching",
    prompt: "Match each intervention-selection variable to its cue.",
    pairs: [
      { term: "Assessment results", definition: "Function, skill deficits, risk, and data patterns." },
      { term: "Scientific evidence", definition: "Research and behavior-analytic support for the procedure." },
      { term: "Client preferences", definition: "Values, assent, priorities, and acceptability." },
      { term: "Contextual fit", definition: "Feasibility in real routines and available resources." },
    ],
    answer: "All intervention-selection variables matched correctly",
    explanation:
      "Intervention recommendations should integrate [assessment results, evidence, preferences, and contextual fit].",
    hint: "Match each cue to the source of information it describes.",
  },
  {
    type: "scenario",
    prompt:
      "Assessment shows aggression is maintained by escape from writing. Which recommendation best follows assessment results?",
    choices: [
      "Teach a break request, reinforce it, and adjust writing demands while monitoring data.",
      "Use attention extinction because all aggression is attention maintained.",
      "Select a token economy without considering function.",
      "Begin punishment before teaching any alternative response.",
    ],
    answer:
      "Teach a break request, reinforce it, and adjust writing demands while monitoring data.",
    explanation:
      "Function-based plans match intervention to [the maintaining consequence] and teach useful alternatives.",
    hint: "Look for the response that accesses the same function appropriately.",
  },
  {
    type: "select-all",
    prompt: "Select features of a socially valid alternative behavior.",
    choices: [
      "Efficient enough to compete with problem behavior",
      "Acceptable in the real context",
      "Contacts the same functional reinforcer when possible",
      "Harder to perform than problem behavior",
    ],
    answers: [
      "Efficient enough to compete with problem behavior",
      "Acceptable in the real context",
      "Contacts the same functional reinforcer when possible",
    ],
    answer:
      "Efficient, acceptable, and functionally related alternatives are socially valid.",
    explanation:
      "Socially valid alternatives should be [efficient, effective, acceptable, and functionally related].",
    hint: "Check each option against function, effort, and acceptability.",
  },
  {
    type: "scenario",
    prompt:
      "A learner screams for attention. The team teaches, 'Can you play?' and delivers attention for that response. What procedure is most directly represented?",
    choices: ["Functional Communication Training (FCT)", "Response cost", "Time-out", "DRL"],
    answer: "Functional Communication Training (FCT)",
    explanation:
      "FCT teaches [a communication response] that accesses the same reinforcer as problem behavior.",
    hint: "Look for communication replacing problem behavior.",
  },
  {
    type: "matching",
    prompt:
      "Match each differential reinforcement procedure to the clinical decision it best supports.",
    pairs: [
      { term: "DRA", definition: "Increase an appropriate alternative response." },
      { term: "DRO", definition: "Reinforce intervals without the target behavior." },
      { term: "DRI", definition: "Increase a response physically incompatible with the target response." },
      { term: "DRL", definition: "Decrease behavior to an acceptable lower rate." },
      { term: "DRH", definition: "Increase behavior to a higher rate." },
    ],
    answer: "All differential reinforcement procedures matched correctly",
    explanation:
      "Intervention selection depends on whether the goal is [alternative responding, absence of behavior, incompatible responding, lower rates, or higher rates].",
    hint:
      "Focus on the response pattern that should contact reinforcement, not just the procedure acronym.",
  },
  {
    type: "sorting",
    prompt: "Sort each unwanted effect by procedure type most commonly associated with the concern.",
    categories: ["Extinction concern", "Punishment concern"],
    items: [
      { label: "Extinction burst after withholding attention", category: "Extinction concern" },
      { label: "Avoidance of therapist after response cost", category: "Punishment concern" },
      { label: "Resurgence when FCT no longer contacts reinforcement", category: "Extinction concern" },
      { label: "Emotional responding after corrective practice", category: "Punishment concern" },
    ],
    answer: "All unwanted effects sorted correctly",
    explanation:
      "Mitigating unwanted effects requires planning for [unwanted effects of reinforcement, extinction, and punishment procedures].",
    hint: "Separate withholding reinforcement from consequences that reduce behavior.",
  },
  {
    type: "select-all",
    prompt: "Select relapse mitigation strategies.",
    choices: [
      "Thin reinforcement schedules gradually",
      "Program common stimuli across settings",
      "Teach caregivers what to do if behavior reappears",
      "Remove all supports immediately after first improvement",
    ],
    answers: [
      "Thin reinforcement schedules gradually",
      "Program common stimuli across settings",
      "Teach caregivers what to do if behavior reappears",
    ],
    answer:
      "Schedule thinning, common stimuli, and caregiver response plans mitigate relapse.",
    explanation:
      "Relapse mitigation plans for [maintenance, generalization, and recurrence risk].",
    hint: "Look for supports that make behavior durable over time and context.",
  },
  {
    type: "scenario",
    prompt:
      "A plan shows no behavior change, but integrity data show staff reinforced the replacement response only 30% of the time. What should happen first?",
    choices: [
      "Improve procedural integrity before judging effectiveness.",
      "Declare the intervention ineffective.",
      "Switch to punishment immediately.",
      "Stop measuring integrity.",
    ],
    answer: "Improve procedural integrity before judging effectiveness.",
    explanation:
      "Low procedural integrity means the plan was not implemented [as written], so effectiveness cannot be interpreted clearly.",
    hint: "Ask whether the intervention was implemented well enough to evaluate.",
  },
  {
    type: "matching",
    prompt: "Match each data pattern to a data-based decision.",
    pairs: [
      { term: "High integrity + improving trend", definition: "Continue and monitor." },
      { term: "Low integrity + poor outcomes", definition: "Train or simplify implementation." },
      { term: "High integrity + flat trend", definition: "Modify the intervention." },
      { term: "Improving data + low acceptability", definition: "Collaborate to improve fit." },
    ],
    answer: "All data patterns matched correctly",
    explanation:
      "Data-based decisions about procedural integrity and intervention effectiveness use [integrity data] and [effectiveness data] together.",
    hint: "Choose the decision supported by implementation and outcome data.",
  },
  {
    type: "scenario",
    graphId: "reversal-positive-attention",
    prompt:
      "A graph shows study behavior increases when the intervention is introduced and decreases when it is removed. What data-based decision about intervention effectiveness is most supported if procedural integrity is high?",
    choices: [
      "The intervention appears effective and should be continued or planned for maintenance.",
      "The plan should be abandoned because behavior changed.",
      "Integrity must be low because behavior improved.",
      "The graph only supports a preference hierarchy.",
    ],
    answer:
      "The intervention appears effective and should be continued or planned for maintenance.",
    explanation:
      "Effectiveness decisions use [behavior-change data] with integrity and social validity information.",
    hint: "Look for whether behavior changes with the intervention condition.",
  },
  {
    type: "scenario",
    prompt:
      "Caregivers report that a technically effective plan is too complex for morning routines. Which collaborative response best supports services?",
    choices: [
      "Collaborate to simplify the plan while preserving its function-based components.",
      "Dismiss caregiver input because the graph improved.",
      "Stop all intervention because one routine is difficult.",
      "Use the plan only in clinic and ignore home routines.",
    ],
    answer:
      "Collaborate to simplify the plan while preserving its function-based components.",
    explanation:
      "Collaboration supports [contextual fit, procedural integrity, and service continuity].",
    hint: "Look for adaptation with collaboration, not abandonment or dismissal.",
  },
  {
    type: "fill-blank",
    prompt: "Complete the cue: Procedural integrity measures whether the plan is implemented as ____.",
    answer: "written",
    explanation:
      "Procedural integrity measures whether procedures are implemented [as written].",
    hint: "The missing word describes following the intervention plan.",
  },
  {
    type: "scenario",
    prompt:
      "A learner uses a break card reliably in therapy, but problem behavior returns in the classroom where the card is unavailable. Which issue is most relevant?",
    choices: ["Generalization and relapse planning", "Paired-stimulus preference assessment", "Momentary time sampling", "External validity of a group design"],
    answer: "Generalization and relapse planning",
    explanation:
      "Planning for relapse requires attention to [future contexts and recurrence risk].",
    hint: "Focus on what happens when context and supports change.",
  },
  {
    type: "select-all",
    prompt: "Select elements of a strong collaboration plan.",
    choices: [
      "Clear roles for caregivers and staff",
      "Accessible implementation materials",
      "Data review with stakeholders",
      "No stakeholder input after the plan is written",
    ],
    answers: [
      "Clear roles for caregivers and staff",
      "Accessible implementation materials",
      "Data review with stakeholders",
    ],
    answer:
      "Roles, accessible materials, and shared data review support collaboration.",
    explanation:
      "Collaboration to support services should strengthen [implementation, communication, and data-based adjustment].",
    hint: "Look for actions that help people implement and review the plan together.",
  },
  {
    type: "scenario",
    prompt:
      "A clinic plan reduced elopement, but teachers report it cannot be used during recess because materials are locked in the therapy room. What is the strongest next step?",
    choices: [
      "Revise the plan with teachers so function-based supports are feasible in the recess routine.",
      "Keep the plan unchanged because clinic data improved.",
      "Remove recess from the intervention because it is difficult to control.",
      "Switch to punishment because materials are unavailable.",
    ],
    answer:
      "Revise the plan with teachers so function-based supports are feasible in the recess routine.",
    explanation:
      "Contextual fit problems require [collaborative adaptation while preserving intervention function].",
    hint:
      "Look for a response that keeps the behavioral logic and solves the implementation barrier.",
  },
  {
    type: "scenario",
    prompt:
      "A learner engages in hand biting to escape toothbrushing. Which replacement behavior is weakest?",
    choices: [
      "Saying 'all done' to end toothbrushing permanently with no hygiene alternative.",
      "Requesting a 30-second break during toothbrushing.",
      "Requesting help with the next step.",
      "Choosing between two toothbrushes before continuing.",
    ],
    answer:
      "Saying 'all done' to end toothbrushing permanently with no hygiene alternative.",
    explanation:
      "Poor replacement behaviors may access escape but fail to support [health, safety, and socially valid outcomes].",
    hint:
      "Compare whether each response matches function while still preserving the clinical goal.",
  },
  {
    type: "select-all",
    prompt:
      "Select supports that reduce risk during extinction bursts and emotional responding.",
    choices: [
      "Teach and reinforce an alternative response before extinction is implemented",
      "Prepare staff for temporary increases in intensity or variability",
      "Set safety criteria and monitor emotional responding",
      "Withhold all reinforcement for every response indefinitely",
    ],
    answers: [
      "Teach and reinforce an alternative response before extinction is implemented",
      "Prepare staff for temporary increases in intensity or variability",
      "Set safety criteria and monitor emotional responding",
    ],
    answer:
      "Alternative reinforcement, staff preparation, and safety criteria reduce extinction-related risk.",
    explanation:
      "Mitigation planning should anticipate [extinction bursts, emotional responding, variability, and safety needs].",
    hint:
      "Choose supports that prepare for side effects rather than making extinction broader or harsher.",
  },
  {
    type: "scenario",
    graphId: "withdrawal-problem-behavior",
    prompt:
      "A graph shows problem behavior decreases during intervention phases and rises when the intervention is withdrawn. Procedural integrity is consistently high. Which data-based decision is strongest?",
    choices: [
      "Continue the intervention and plan maintenance, generalization, and relapse-prevention supports.",
      "Modify the intervention because improved data always indicate failure.",
      "Ignore implementation data because only the final data point matters.",
      "Stop the plan immediately because withdrawal produced behavior change.",
    ],
    answer:
      "Continue the intervention and plan maintenance, generalization, and relapse-prevention supports.",
    explanation:
      "High-integrity outcome data can support [continuation plus maintenance and relapse planning].",
    hint:
      "Look for whether behavior changes in the expected direction when the intervention is present.",
  },
  {
    type: "matching",
    prompt:
      "Match each relapse or maintenance planning concern to the best prevention cue.",
    pairs: [
      { term: "Resurgence", definition: "Keep the alternative response contacting reinforcement during thinning." },
      { term: "Renewal", definition: "Program supports across contexts where the behavior may occur." },
      { term: "Reinstatement", definition: "Plan for response-independent contact with the maintaining reinforcer." },
      { term: "Maintenance", definition: "Shift behavior toward natural contingencies over time." },
    ],
    answer: "All relapse and maintenance planning concerns matched correctly",
    explanation:
      "Relapse prevention depends on [the recurrence pattern and the contingencies likely to change].",
    hint:
      "Match each concern to what changes: reinforcement for alternatives, context, reinforcer access, or time.",
  },
];

const sectionHMasteryQuestions: QuestionContent[] = [
  {
    type: "scenario",
    prompt:
      "Which intervention goal is best written in observable and measurable terms?",
    choices: [
      "Given a denied item, Mia will request 'wait' or 'help' within 10 seconds in 80% of opportunities across three sessions.",
      "Mia will tolerate frustration better.",
      "Mia will be more respectful when denied items.",
      "Mia will understand delayed reinforcement.",
    ],
    answer:
      "Given a denied item, Mia will request 'wait' or 'help' within 10 seconds in 80% of opportunities across three sessions.",
    explanation:
      "Observable and measurable goals include [condition, response, criterion, and context].",
    hint: "Look for the option that could be scored consistently by observers.",
  },
  {
    type: "scenario",
    prompt:
      "Assessment indicates problem behavior is maintained by access to tangibles, caregivers prefer communication-based procedures, and research supports FCT. Which recommendation is strongest?",
    choices: [
      "Teach an appropriate access request and reinforce it with the requested tangible on a clear schedule.",
      "Use an unrelated attention program because it is easier for the provider.",
      "Begin response cost before teaching an alternative response.",
      "Select a goal without caregiver input because evidence is enough.",
    ],
    answer:
      "Teach an appropriate access request and reinforce it with the requested tangible on a clear schedule.",
    explanation:
      "Intervention recommendations integrate [assessment results, scientific evidence, client preferences, and contextual fit].",
    hint: "Choose the plan that fits function, evidence, and stakeholder context.",
  },
  {
    type: "scenario",
    prompt:
      "Which replacement behavior is most socially valid for escape-maintained aggression during math?",
    choices: [
      "Requesting a brief break or help using an already teachable response form.",
      "Sitting silently for the entire math block with no break access.",
      "Completing an unrelated art task.",
      "Using a response that requires more effort than aggression and is not understood by staff.",
    ],
    answer:
      "Requesting a brief break or help using an already teachable response form.",
    explanation:
      "Socially valid alternative behaviors should be [efficient, effective, acceptable, and functionally related].",
    hint: "Look for the response that competes with problem behavior and works in context.",
  },
  {
    type: "scenario",
    prompt:
      "A DRA plus extinction plan may cause a temporary burst in problem behavior. Which addition best mitigates unwanted effects?",
    choices: [
      "Safety planning, dense reinforcement for the alternative response, and staff coaching.",
      "Withholding all reinforcement for every response.",
      "Ignoring emotional responding and waiting for improvement.",
      "Removing data collection during the first week.",
    ],
    answer:
      "Safety planning, dense reinforcement for the alternative response, and staff coaching.",
    explanation:
      "Intervention planning should mitigate [unwanted effects of reinforcement, extinction, and punishment procedures].",
    hint: "Look for prevention and support, not ignoring side effects.",
  },
  {
    type: "scenario",
    prompt:
      "A client interrupts peers about 40 times per hour. The team wants to reduce interruptions to a socially acceptable rate without eliminating conversation. Which procedure is the best fit?",
    choices: [
      "DRL with reinforcement for lower, acceptable rates of interruption.",
      "DRO with reinforcement only if the client never speaks.",
      "DRH with reinforcement for more frequent interruption.",
      "DRI with reinforcement for a response unrelated to conversation.",
    ],
    answer:
      "DRL with reinforcement for lower, acceptable rates of interruption.",
    explanation:
      "DRL is selected when the behavior should occur [at a lower acceptable rate], not disappear completely.",
    hint:
      "Look for the procedure that changes rate without requiring the behavior to be absent.",
  },
  {
    type: "scenario",
    prompt:
      "Problem behavior decreases during intervention but returns when the learner moves to a new classroom. Which planning issue is most directly shown?",
    choices: ["Relapse and renewal risk", "Preference assessment format", "Operational definition quality", "Multiple relationship risk"],
    answer: "Relapse and renewal risk",
    explanation:
      "Relapse planning includes preparing for [recurrence when contexts or contingencies change].",
    hint: "Focus on recurrence after a context change.",
  },
  {
    type: "scenario",
    prompt:
      "Integrity data show the plan was implemented with 35% accuracy. Behavior data show no improvement. What is the best interpretation?",
    choices: [
      "The intervention cannot be fairly judged until implementation improves.",
      "The intervention is definitely ineffective.",
      "The target behavior is not measurable.",
      "The replacement response is automatically socially valid.",
    ],
    answer:
      "The intervention cannot be fairly judged until implementation improves.",
    explanation:
      "Data-based decisions about procedural integrity matter because low integrity weakens interpretation of [intervention effectiveness].",
    hint: "Ask whether the plan was actually implemented.",
  },
  {
    type: "scenario",
    graphId: "reversal-positive-attention",
    prompt:
      "A graph shows improved responding only when the intervention is active, and procedural integrity is high. Which data-based decision about intervention effectiveness is most supported?",
    choices: [
      "Continue the intervention and plan maintenance/generalization supports.",
      "Modify the plan because any behavior change means it failed.",
      "Stop the intervention because integrity is high.",
      "Ignore social validity and use the plan in every context unchanged.",
    ],
    answer:
      "Continue the intervention and plan maintenance/generalization supports.",
    explanation:
      "Data-based decisions about intervention effectiveness use [effectiveness data] with integrity and social validity to guide continuation or modification.",
    hint: "Look for behavior change that tracks the intervention condition.",
  },
  {
    type: "scenario",
    prompt:
      "A caregiver says the intervention works but cannot be implemented during bus pickup because materials are unavailable. What should the BCBA do?",
    choices: [
      "Collaborate to adapt materials and routines while preserving the intervention function.",
      "Tell the caregiver to implement it exactly or stop services.",
      "Ignore the concern because the clinic data improved.",
      "Remove caregiver involvement from the plan.",
    ],
    answer:
      "Collaborate to adapt materials and routines while preserving the intervention function.",
    explanation:
      "Collaboration with others should support [contextual fit and implementation].",
    hint: "Look for problem solving with stakeholders while keeping the behavioral logic.",
  },
  {
    type: "scenario",
    prompt:
      "Which statement best differentiates procedural integrity from intervention effectiveness?",
    choices: [
      "Procedural integrity asks whether the plan was implemented as written; effectiveness asks whether behavior changed meaningfully.",
      "Procedural integrity asks whether stakeholders like the plan; effectiveness asks whether staff attended training.",
      "Procedural integrity means maintenance; effectiveness means generalization.",
      "Procedural integrity and effectiveness are the same if the graph improves.",
    ],
    answer:
      "Procedural integrity asks whether the plan was implemented as written; effectiveness asks whether behavior changed meaningfully.",
    explanation:
      "Integrity concerns [implementation accuracy]; effectiveness concerns [behavior-change outcomes].",
    hint: "Separate implementation data from client outcome data.",
  },
  {
    type: "scenario",
    prompt:
      "After FCT succeeds on an FR 1 schedule, the BCBA gradually increases delay to reinforcement while monitoring requests and problem behavior. Which planning goal is most direct?",
    choices: ["Schedule thinning to support maintenance", "Immediate punishment to reduce requesting", "Ignoring relapse risk", "Changing the operational definition"],
    answer: "Schedule thinning to support maintenance",
    explanation:
      "Schedule thinning transfers behavior toward [natural contingencies] while monitoring relapse risk.",
    hint: "Look for moving from dense to leaner reinforcement with data review.",
  },
  {
    type: "scenario",
    prompt:
      "Which data-based decision about intervention effectiveness is best when high-integrity data show no improvement after enough sessions?",
    choices: [
      "Modify the intervention based on the data pattern and assessment logic.",
      "Continue indefinitely because integrity is high.",
      "Assume the learner is choosing not to improve.",
      "Stop collaborating with caregivers.",
    ],
    answer:
      "Modify the intervention based on the data pattern and assessment logic.",
    explanation:
      "When integrity is adequate and data show insufficient progress, data-based decision making supports [intervention modification].",
    hint: "Use both implementation and outcome data.",
  },
  {
    type: "scenario",
    prompt:
      "Which collaboration behavior best supports implementation across school and home?",
    choices: [
      "Use shared data review, clear role descriptions, and accessible caregiver/teacher training.",
      "Give caregivers the full technical plan with no explanation.",
      "Ask teachers to collect data but never review it with them.",
      "Keep the plan clinic-only because collaboration takes time.",
    ],
    answer:
      "Use shared data review, clear role descriptions, and accessible caregiver/teacher training.",
    explanation:
      "Collaboration with others supports [consistent implementation and service coordination].",
    hint: "Look for communication, training, roles, and data sharing.",
  },
  {
    type: "scenario",
    prompt:
      "A behavior analyst recommends a highly effective intervention, but caregivers cannot implement it because it requires materials they do not have and conflicts with transportation routines. Which concern should guide revision?",
    choices: [
      "Contextual fit and treatment acceptability",
      "Response class hierarchy only",
      "Momentary time sampling accuracy",
      "Private events as explanatory fiction",
    ],
    answer: "Contextual fit and treatment acceptability",
    explanation:
      "Intervention selection should balance [evidence, effectiveness, feasibility, and stakeholder acceptability].",
    hint:
      "Focus on whether the plan can be used accurately in the real routine.",
  },
  {
    type: "scenario",
    prompt:
      "A learner hits to obtain teacher attention. Which replacement behavior is most functionally matched and socially valid?",
    choices: [
      "Tap a card or say 'excuse me' to request teacher attention.",
      "Complete extra math problems silently.",
      "Request a break from all academic tasks.",
      "Stand with hands in pockets for ten minutes.",
    ],
    answer:
      "Tap a card or say 'excuse me' to request teacher attention.",
    explanation:
      "Replacement behavior should access [the same functional reinforcer] in a more acceptable way.",
    hint:
      "Identify the reinforcer maintaining the target behavior, then choose a response that accesses it appropriately.",
  },
  {
    type: "scenario",
    prompt:
      "During extinction for attention-maintained disruption, disruption initially becomes louder and more variable. What is the best interpretation?",
    choices: [
      "This may be an extinction burst or response variability that requires planned support and safety monitoring.",
      "The behavior is now automatically reinforced and all data should be discarded.",
      "The team should stop all reinforcement for appropriate behavior.",
      "The operational definition must be invalid because behavior changed.",
    ],
    answer:
      "This may be an extinction burst or response variability that requires planned support and safety monitoring.",
    explanation:
      "Extinction can produce [temporary increases, variability, and emotional responding] that should be anticipated and monitored.",
    hint:
      "Look for a side effect of withholding the maintaining reinforcer, not a reason to ignore replacement behavior.",
  },
  {
    type: "scenario",
    graphId: "reversal-positive-attention",
    prompt:
      "A graph shows behavior improves during intervention phases, but fidelity data show implementation was below 50% during the same sessions. What conclusion is most defensible?",
    choices: [
      "Interpret effectiveness cautiously and review which components were actually implemented.",
      "Assume the entire written intervention package is effective exactly as designed.",
      "Stop collecting procedural integrity data because behavior improved.",
      "Conclude the intervention failed because fidelity was imperfect.",
    ],
    answer:
      "Interpret effectiveness cautiously and review which components were actually implemented.",
    explanation:
      "Procedural integrity data affect how confidently the team can interpret [intervention effectiveness].",
    hint:
      "Ask whether the outcome data reflect the written plan or only parts of it.",
  },
  {
    type: "scenario",
    prompt:
      "After FCT reduces problem behavior, the team gradually delays reinforcement, teaches caregivers to honor requests in natural routines, and schedules booster checks. Which goal is most directly addressed?",
    choices: [
      "Maintenance through schedule thinning and transfer to natural contingencies",
      "Immediate discontinuation of reinforcement",
      "Punishment-based response suppression",
      "Reducing measurement reliability",
    ],
    answer:
      "Maintenance through schedule thinning and transfer to natural contingencies",
    explanation:
      "Durable intervention effects require [gradual schedule thinning, natural contingencies, and relapse-prevention planning].",
    hint:
      "Look for procedures that help the replacement behavior continue after intensive teaching conditions change.",
  },
];

const sectionIMiniLessons: MiniLessonContent[] = [
  {
    slug: "why-supervision-matters",
    label: "I.1",
    title: "Why Behavior-Analytic Supervision Matters",
    body: [
      "Behavior-analytic supervision is an active system for improving [supervisee performance and client outcomes].",
      "Strong supervision supports procedural integrity, ethical behavior, problem solving, retention, and safer service delivery.",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each outcome by whether it is a direct benefit of strong supervision.",
      categories: ["Supervision benefit", "Not a supervision benefit"],
      items: [
        { label: "Higher procedural integrity", category: "Supervision benefit" },
        { label: "Clearer professional repertoires", category: "Supervision benefit" },
        { label: "Ignoring implementation data", category: "Not a supervision benefit" },
        { label: "Better support for client progress", category: "Supervision benefit" },
      ],
    },
  },
  {
    slug: "supervision-as-behavior-change",
    label: "I.1",
    title: "Supervision Is Behavior Change",
    body: [
      "Supervisors change staff behavior by arranging [antecedents, consequences, modeling, rehearsal, feedback, and data review].",
      "Meeting attendance alone is not supervision if staff performance is not assessed and improved.",
    ],
    visual: {
      type: "choice",
      prompt: "Which action treats supervision as behavior change?",
      choices: [
        "Observe implementation and reinforce accurate performance.",
        "Hold a meeting without observing staff behavior.",
        "Assume written instructions are enough for mastery.",
        "Wait for client outcomes to worsen before giving feedback.",
      ],
      answer: "Observe implementation and reinforce accurate performance.",
      feedback:
        "Excellent discrimination. Effective supervision changes observable supervisee behavior through arranged conditions.",
      hint:
        "Look for direct observation and consequences for staff performance.",
    },
  },
  {
    slug: "risks-of-ineffective-supervision",
    label: "I.1",
    title: "Risks of Ineffective Supervision",
    body: [
      "Ineffective supervision can harm [clients, supervisees, organizations, and the profession].",
      "Weak supervision may produce poor client progress, unsafe implementation, staff attrition, and ineffective future supervisors.",
    ],
    visual: {
      type: "select-all",
      prompt: "Select risks associated with ineffective supervision.",
      choices: [
        { label: "Poor procedural integrity", correct: true },
        { label: "Greater client-safety risk", correct: true },
        { label: "Improved staff retention by default", correct: false },
        { label: "Weak professional repertoires", correct: true },
      ],
      feedback:
        "Correct. Supervision quality affects client safety, staff skill, organizational functioning, and the field.",
    },
  },
  {
    slug: "capacity-before-supervision",
    label: "I.1",
    title: "Capacity Before Accepting Supervisees",
    body: [
      "Supervisory capacity includes [time, caseload, documentation, response time, client demand, and logistical resources].",
      "Adding supervisees when feedback and documentation are already delayed can reduce supervision quality.",
    ],
    visual: {
      type: "choice",
      prompt: "A supervisor is already missing feedback deadlines and is asked to add two trainees. What is most appropriate?",
      choices: [
        "Review capacity and decline or delay new supervision if quality cannot be maintained.",
        "Accept immediately because more supervision hours always benefit trainees.",
        "Stop documenting supervision to create more time.",
        "Assign trainees to independent cases before competence is verified.",
      ],
      answer:
        "Review capacity and decline or delay new supervision if quality cannot be maintained.",
      feedback:
        "Correct. Ethical supervision requires realistic capacity and quality control.",
      hint:
        "Think about protecting supervision quality before increasing volume.",
    },
  },
  {
    slug: "effective-supervisory-relationships",
    label: "I.2",
    title: "Effective Supervisory Relationships",
    body: [
      "Effective supervisory relationships include [clear expectations, timely communication, active listening, and professional boundaries].",
      "A positive relationship does not mean avoiding corrective feedback; it means feedback is respectful, useful, and behavior-focused.",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort the supervisor behavior.",
      categories: ["Supports relationship", "Weakens relationship"],
      items: [
        { label: "Schedules regular check-ins", category: "Supports relationship" },
        { label: "Cancels observations without follow-up", category: "Weakens relationship" },
        { label: "Listens actively before problem solving", category: "Supports relationship" },
        { label: "Gives vague criticism days later", category: "Weakens relationship" },
      ],
    },
  },
  {
    slug: "supervision-contracts",
    label: "I.2",
    title: "Supervisor-Supervisee Contracts",
    body: [
      "A supervision contract clarifies [roles, scope, expectations, communication, documentation, criteria, boundaries, and consequences].",
      "Contracts reduce ambiguity by making supervision requirements explicit before problems occur.",
    ],
    visual: {
      type: "matching",
      prompt: "Match each contract element to its purpose.",
      pairs: [
        { term: "Roles", definition: "Who is responsible for each supervision activity." },
        { term: "Criteria", definition: "How competent performance will be evaluated." },
        { term: "Communication", definition: "How and when questions or updates should occur." },
        { term: "Boundaries", definition: "Professional limits for the supervisory relationship." },
      ],
    },
  },
  {
    slug: "clear-expectations",
    label: "I.2",
    title: "Clear Expectations and Role Clarification",
    body: [
      "Clear expectations define [what to do, when to do it, how quality is evaluated, and what documentation is required].",
      "Vague expectations make feedback harder because performance is not observable or measurable.",
    ],
    visual: {
      type: "choice",
      prompt: "Which expectation is most behaviorally clear?",
      choices: [
        "Submit session notes by 5 p.m. using the clinic template with all required fields completed.",
        "Be more responsible with paperwork.",
        "Communicate better with caregivers.",
        "Show more professionalism soon.",
      ],
      answer:
        "Submit session notes by 5 p.m. using the clinic template with all required fields completed.",
      feedback:
        "Correct. Clear expectations specify observable behavior, timing, and quality criteria.",
      hint:
        "Choose the option that someone could observe and evaluate consistently.",
    },
  },
  {
    slug: "giving-performance-feedback",
    label: "I.2",
    title: "Giving Performance Feedback Effectively",
    body: [
      "Effective feedback is [timely, descriptive, contingent, behavior-focused, and linked to next steps].",
      "Corrective feedback should describe what to change and may include modeling or rehearsal.",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Weak feedback",
      leftText: "You need to do better with prompting.",
      rightTitle: "Strong feedback",
      rightText: "During the next trial, wait 3 seconds before giving the gestural prompt.",
      cue: "Strong feedback names the performance and the next observable action.",
    },
  },
  {
    slug: "accepting-supervisee-feedback",
    label: "I.2",
    title: "Accepting Supervisee Feedback",
    body: [
      "Supervisee feedback can be [social-validity and process data] about the supervision system.",
      "A supervisor can maintain objective standards while adapting examples, communication, or support.",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each response to supervisee feedback.",
      categories: ["Professional response", "Unhelpful response"],
      items: [
        { label: "Ask for examples and clarify the concern", category: "Professional response" },
        { label: "Dismiss the concern because fidelity improved", category: "Unhelpful response" },
        { label: "Use feedback to adjust meeting structure", category: "Professional response" },
        { label: "Stop giving corrective feedback entirely", category: "Unhelpful response" },
      ],
    },
  },
  {
    slug: "professional-boundaries",
    label: "I.2",
    title: "Professional Boundaries in Supervision",
    body: [
      "Professional boundaries protect [objectivity, supervisee welfare, and client service quality].",
      "Friendly supervision can still maintain role clarity, confidentiality, and performance expectations.",
    ],
    visual: {
      type: "choice",
      prompt: "Which action best maintains professional boundaries?",
      choices: [
        "Clarify communication channels and keep feedback focused on work performance.",
        "Use personal favors to motivate supervisee compliance.",
        "Discuss confidential client details on a personal social media account.",
        "Avoid written expectations because the relationship is friendly.",
      ],
      answer:
        "Clarify communication channels and keep feedback focused on work performance.",
      feedback:
        "Correct. Boundaries support objectivity, confidentiality, and clear supervisory roles.",
      hint:
        "Look for role clarity and protection of professional responsibilities.",
    },
  },
  {
    slug: "equity-in-supervision",
    label: "I.3",
    title: "Equity in Supervision Practices",
    body: [
      "Equity means arranging [fair access to feedback, learning opportunities, role clarity, accommodations, and advancement].",
      "Equity does not mean lowering competency standards; it means removing unnecessary barriers to meeting them.",
    ],
    visual: {
      type: "choice",
      prompt: "Which action best promotes equity?",
      choices: [
        "Audit who receives client-observation opportunities and correct access barriers.",
        "Give fewer learning opportunities to supervisees with different schedules.",
        "Use one feedback format even when it blocks understanding.",
        "Avoid data review because equity is only about attitudes.",
      ],
      answer:
        "Audit who receives client-observation opportunities and correct access barriers.",
      feedback:
        "Excellent. Equity is active, data-informed, and connected to access and opportunity.",
      hint:
        "Look for fair access while keeping objective expectations.",
    },
  },
  {
    slug: "culturally-responsive-supervision",
    label: "I.3",
    title: "Culturally Responsive Supervision",
    body: [
      "Culturally responsive supervision considers [communication, rapport, feedback preferences, authority relationships, and contextual variables].",
      "Culture is not demographic trivia; it should affect real supervisory decisions when relevant.",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Not responsive",
      leftText: "Uses the same examples and feedback style even when they reduce participation.",
      rightTitle: "Responsive",
      rightText: "Collaborates on examples and feedback delivery while keeping measurable criteria.",
      cue: "Responsiveness adapts support, not the need for competence.",
    },
  },
  {
    slug: "supervision-goals-direct-assessment",
    label: "I.4",
    title: "Selecting Goals From Direct Assessment",
    body: [
      "Direct assessment uses [observation of supervisee performance and permanent products] to select goals.",
      "A supervision goal should target a measurable staff behavior linked to service quality.",
    ],
    visual: {
      type: "choice",
      prompt: "Which goal is based on direct assessment?",
      choices: [
        "Increase correct implementation of error correction from 45% to 90% during observed sessions.",
        "Make the supervisee more confident by next month.",
        "Improve professionalism because the supervisor prefers it.",
        "Review definitions because the supervisee attended training.",
      ],
      answer:
        "Increase correct implementation of error correction from 45% to 90% during observed sessions.",
      feedback:
        "Correct. Direct assessment goals use observed performance data and measurable criteria.",
      hint:
        "Choose the goal tied to observed staff behavior and a performance criterion.",
    },
  },
  {
    slug: "supervision-goals-indirect-assessment",
    label: "I.4",
    title: "Selecting Goals From Indirect Assessment",
    body: [
      "Indirect assessment includes [interviews, self-assessments, record review, and supervisee reports].",
      "Indirect information helps identify possible goals, but direct performance data should verify priority needs when possible.",
    ],
    visual: {
      type: "matching",
      prompt: "Match each information source to its supervision use.",
      pairs: [
        { term: "Interview", definition: "Identifies perceived barriers and goals." },
        { term: "Record review", definition: "Shows documentation patterns and missed requirements." },
        { term: "Self-assessment", definition: "Reveals confidence and perceived competence." },
        { term: "Direct observation", definition: "Verifies actual implementation performance." },
      ],
    },
  },
  {
    slug: "goals-environmental-barriers",
    label: "I.4",
    title: "Matching Goals to Environmental Barriers",
    body: [
      "Goal selection should account for [workload, materials, workflow, staffing, language access, and setting demands].",
      "A performance goal may fail if the environment makes correct implementation unnecessarily difficult.",
    ],
    visual: {
      type: "choice",
      prompt: "Staff know the procedure but cannot find materials during sessions. Which goal/support best fits?",
      choices: [
        "Organize materials and create a pre-session checklist.",
        "Assign more reading about reinforcement schedules.",
        "Lower the integrity criterion permanently.",
        "Ignore the barrier because staff should remember.",
      ],
      answer: "Organize materials and create a pre-session checklist.",
      feedback:
        "Correct. Environmental barriers often need resource, process, or task-clarification supports.",
      hint:
        "Ask whether the barrier is missing skill or missing conditions for performance.",
    },
  },
  {
    slug: "bst-instruction",
    label: "I.5",
    title: "Behavioral Skills Training: Instruction",
    body: [
      "BST instruction gives [clear directions, rationale, performance criteria, and active learner engagement].",
      "Instruction alone is not enough when the supervisee has not demonstrated the skill.",
    ],
    visual: {
      type: "choice",
      prompt: "Which instruction component is strongest?",
      choices: [
        "Explain when to prompt, show the criterion, and define correct implementation.",
        "Tell the supervisee to be more consistent.",
        "Send a policy link without performance criteria.",
        "Ask the supervisee to watch quietly without questions.",
      ],
      answer:
        "Explain when to prompt, show the criterion, and define correct implementation.",
      feedback:
        "Correct. Instructions should make the target performance and criteria clear.",
      hint:
        "Choose the option that clarifies what correct performance looks like.",
    },
  },
  {
    slug: "bst-modeling",
    label: "I.5",
    title: "Behavioral Skills Training: Modeling",
    body: [
      "Modeling shows [what correct implementation looks like] before the supervisee practices.",
      "Models may be live, video, peer, role-play, or in-vivo depending on context and safety.",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort the example.",
      categories: ["Modeling", "Not modeling"],
      items: [
        { label: "Supervisor demonstrates the data-collection procedure", category: "Modeling" },
        { label: "Supervisor only emails the checklist", category: "Not modeling" },
        { label: "Peer demonstrates FCT prompting during role play", category: "Modeling" },
        { label: "Supervisor asks if everyone understands", category: "Not modeling" },
      ],
    },
  },
  {
    slug: "bst-rehearsal",
    label: "I.5",
    title: "Behavioral Skills Training: Rehearsal",
    body: [
      "Rehearsal means the supervisee [practices the skill] under conditions close to where it will be used.",
      "Role play may establish initial performance; in-vivo rehearsal helps generalize to real service settings.",
    ],
    visual: {
      type: "choice",
      prompt: "Which plan best adds rehearsal?",
      choices: [
        "Have the technician practice the prompting sequence with feedback before client implementation.",
        "Tell the technician to read the protocol again.",
        "Ask the technician to sign that training was completed.",
        "Show a video but do not allow practice.",
      ],
      answer:
        "Have the technician practice the prompting sequence with feedback before client implementation.",
      feedback:
        "Correct. Rehearsal requires active practice of the target performance.",
      hint:
        "Look for practice, not just exposure to information.",
    },
  },
  {
    slug: "bst-feedback",
    label: "I.5",
    title: "Behavioral Skills Training: Feedback",
    body: [
      "BST feedback is [descriptive, timely, contingent, and connected to the next performance opportunity].",
      "Feedback may include praise for correct steps and corrective feedback with re-modeling or more practice.",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Vague",
      leftText: "Good job, but watch your timing.",
      rightTitle: "Descriptive",
      rightText: "You waited 1 second; next trial, wait 3 seconds before prompting.",
      cue: "Feedback should specify the observed response and the next response.",
    },
  },
  {
    slug: "bst-vs-lecture",
    label: "I.5",
    title: "Discriminating BST From Lecture-Only Training",
    body: [
      "BST includes [instructions, modeling, rehearsal, and feedback].",
      "Lecture-only training may build knowledge but often fails to establish accurate implementation.",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each training activity.",
      categories: ["BST component", "Lecture-only feature"],
      items: [
        { label: "Role-play the procedure", category: "BST component" },
        { label: "Watch slides without practice", category: "Lecture-only feature" },
        { label: "Receive corrective feedback after rehearsal", category: "BST component" },
        { label: "Listen to definitions only", category: "Lecture-only feature" },
      ],
    },
  },
  {
    slug: "reinforcement-in-performance-management",
    label: "I.5",
    title: "Performance Management With Reinforcement",
    body: [
      "Performance management may use [contingent praise, recognition, preferred assignments, goal feedback, and natural reinforcers].",
      "Staff reinforcement should be ethical, equitable, and connected to observable performance.",
    ],
    visual: {
      type: "choice",
      prompt: "Which example uses reinforcement for staff performance?",
      choices: [
        "The supervisor gives specific praise and preferred planning time when fidelity meets criterion.",
        "The supervisor ignores correct implementation.",
        "The supervisor criticizes errors without stating the correct response.",
        "The supervisor withholds materials until staff complain.",
      ],
      answer:
        "The supervisor gives specific praise and preferred planning time when fidelity meets criterion.",
      feedback:
        "Correct. Reinforcement follows and strengthens desired supervisee performance.",
      hint:
        "Look for a consequence delivered after accurate performance.",
    },
  },
  {
    slug: "feedback-in-performance-management",
    label: "I.5",
    title: "Performance Management With Feedback",
    body: [
      "Feedback is most useful when staff already have [at least some performance repertoire] and need correction, fluency, or consistency.",
      "Feedback alone is less likely to work when the supervisee has never learned the skill.",
    ],
    visual: {
      type: "choice",
      prompt: "A technician can implement DRA correctly in role play but misses steps in session. Which support is most direct?",
      choices: [
        "In-vivo performance feedback with monitoring and reinforcement.",
        "Only a lecture on the definition of DRA.",
        "No support because role-play mastery is enough.",
        "Change the client's behavior plan immediately.",
      ],
      answer:
        "In-vivo performance feedback with monitoring and reinforcement.",
      feedback:
        "Correct. Performance supports fit when the skill exists but is inconsistent in context.",
      hint:
        "Ask whether the skill is absent or present but not occurring reliably.",
    },
  },
  {
    slug: "modeling-and-practice",
    label: "I.5",
    title: "Modeling and Practice for Supervisees",
    body: [
      "Modeling plus practice helps supervisees contact [examples, nonexamples, and corrected performance].",
      "Performance improves fastest when practice occurs under realistic conditions with immediate feedback.",
    ],
    visual: {
      type: "flow",
      prompt: "Order the active teaching sequence.",
      steps: ["Describe the target response", "Model correct implementation", "Rehearse the skill", "Give descriptive feedback"],
      feedback:
        "Great job. Active performance management arranges demonstration, practice, and feedback.",
    },
  },
  {
    slug: "task-clarification",
    label: "I.5",
    title: "Task Clarification",
    body: [
      "Task clarification is indicated when staff do not know [what to do, when to do it, or which standard applies].",
      "Checklists, decision rules, visual prompts, and job aids can clarify expected performance.",
    ],
    visual: {
      type: "choice",
      prompt: "Staff know how to collect data but do not know which sheet to use for each program. What should the supervisor prioritize?",
      choices: [
        "A decision rule and job aid for selecting the correct data sheet.",
        "A full lecture on all measurement systems.",
        "Punishment for choosing the wrong form.",
        "No change because staff already know data collection.",
      ],
      answer:
        "A decision rule and job aid for selecting the correct data sheet.",
      feedback:
        "Correct. The barrier is task clarification, not necessarily lack of skill.",
      hint:
        "Look for unclear cues about when or which action to perform.",
    },
  },
  {
    slug: "response-effort",
    label: "I.5",
    title: "Manipulating Response Effort",
    body: [
      "Response-effort changes make correct staff performance [easier, more efficient, or less aversive].",
      "Examples include organizing materials, simplifying forms, reducing unnecessary steps, or improving workflow.",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each intervention.",
      categories: ["Reduces response effort", "Does not reduce response effort"],
      items: [
        { label: "Pre-load data sheets on tablets", category: "Reduces response effort" },
        { label: "Add three duplicate signatures", category: "Does not reduce response effort" },
        { label: "Keep teaching materials in labeled bins", category: "Reduces response effort" },
        { label: "Require staff to search multiple folders", category: "Does not reduce response effort" },
      ],
    },
  },
  {
    slug: "performance-diagnostics",
    label: "I.6",
    title: "Performance Diagnostics",
    body: [
      "Performance diagnostics assess [one specific supervisee performance concern] before selecting an intervention.",
      "Useful domains include training, task clarification, resources/processes, and consequences/effort/competing tasks.",
    ],
    visual: {
      type: "matching",
      prompt: "Match each diagnostic domain to the likely support.",
      pairs: [
        { term: "Training", definition: "Use BST or improved teaching components." },
        { term: "Task clarification", definition: "Use checklists, prompts, or decision rules." },
        { term: "Resources/processes", definition: "Fix materials, staffing, workflow, or tools." },
        { term: "Consequences/effort", definition: "Arrange feedback, reinforcement, or effort changes." },
      ],
    },
  },
  {
    slug: "skill-vs-performance-deficits",
    label: "I.6",
    title: "Skill Deficits vs Performance Deficits",
    body: [
      "A skill deficit means the supervisee [cannot perform the response yet].",
      "A performance deficit means the supervisee [can perform the response but does not under current conditions].",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Skill deficit",
      leftText: "Needs instruction, modeling, rehearsal, and feedback.",
      rightTitle: "Performance deficit",
      rightText: "Needs antecedent, consequence, effort, or resource supports.",
      cue: "Do not treat every staff issue as a training issue.",
    },
  },
  {
    slug: "function-based-supervisee-behavior",
    label: "I.6",
    title: "Function-Based Approaches to Supervisee Behavior",
    body: [
      "Function-based supervision analyzes [antecedents and consequences] affecting supervisee behavior.",
      "Low fidelity, late notes, or feedback avoidance may require different supports depending on the function.",
    ],
    visual: {
      type: "choice",
      prompt: "A supervisee avoids data entry because the system is slow and confusing. Which support best matches the barrier?",
      choices: [
        "Simplify the workflow, clarify steps, and monitor data-entry completion.",
        "Repeat lecture content on reinforcement.",
        "Assume the supervisee lacks motivation and stop supervision.",
        "Ignore the data-entry problem because sessions occurred.",
      ],
      answer:
        "Simplify the workflow, clarify steps, and monitor data-entry completion.",
      feedback:
        "Correct. The support matches resources, process, and response-effort barriers.",
      hint:
        "Look for the environmental condition making correct performance difficult.",
    },
  },
  {
    slug: "common-performance-barriers",
    label: "I.6",
    title: "Common Reasons Staff Do Not Perform",
    body: [
      "Staff performance may be affected by [missing skills, unclear cues, unavailable materials, weak consequences, high effort, or competing tasks].",
      "Choosing the wrong support can waste supervision time and delay client progress.",
    ],
    visual: {
      type: "matching",
      prompt: "Match the barrier to the supervision response.",
      pairs: [
        { term: "Cannot perform skill", definition: "Use BST." },
        { term: "Does not know when to act", definition: "Clarify task cues." },
        { term: "Materials unavailable", definition: "Fix resources or process." },
        { term: "Correct work never contacts feedback", definition: "Add feedback and reinforcement." },
      ],
    },
  },
  {
    slug: "procedural-integrity-supervision",
    label: "I.7",
    title: "Procedural Integrity in Supervision",
    body: [
      "Procedural integrity measures whether staff implement procedures [as designed].",
      "Low integrity should be addressed before concluding that a client intervention is ineffective.",
    ],
    visual: {
      type: "choice",
      prompt: "Client outcomes are poor and staff fidelity averages 48%. What should the supervisor address first?",
      choices: [
        "Improve implementation fidelity before judging the clinical procedure.",
        "Declare the intervention ineffective immediately.",
        "Stop collecting integrity data.",
        "Move to maintenance because poor outcomes are expected.",
      ],
      answer:
        "Improve implementation fidelity before judging the clinical procedure.",
      feedback:
        "Correct. Low fidelity weakens interpretation of client outcome data.",
      hint:
        "Ask whether the intervention was implemented well enough to evaluate.",
    },
  },
  {
    slug: "measuring-staff-performance",
    label: "I.7",
    title: "Measuring Staff Performance",
    body: [
      "Staff performance can be measured with [direct observation, permanent products, fidelity checklists, latency, frequency, and quality criteria].",
      "Measurement should match the performance target and the supervision decision.",
    ],
    visual: {
      type: "sorting",
      prompt: "Sort each measure.",
      categories: ["Direct performance measure", "Indirect or product measure"],
      items: [
        { label: "Observed percentage of correct prompting steps", category: "Direct performance measure" },
        { label: "Completed session note reviewed later", category: "Indirect or product measure" },
        { label: "Latency to respond to caregiver message", category: "Direct performance measure" },
        { label: "Supervisee self-rating of confidence", category: "Indirect or product measure" },
      ],
    },
  },
  {
    slug: "graphing-supervisee-performance",
    label: "I.7",
    title: "Graphing Supervisee Performance Data",
    body: [
      "Graphs help supervisors detect [level, trend, variability, maintenance, and generalization] in staff performance.",
      "Graphing staff data supports data-based decisions about training, feedback, fading, and follow-up checks.",
    ],
    visual: {
      type: "graph",
      prompt: "After BST, implementation fidelity increases across sessions. What decision is best supported?",
      graphTitle: "Supervisee performance data",
      phases: [
        { label: "Baseline", detail: "Low fidelity", tone: "blue" },
        { label: "BST", detail: "Fidelity improves", tone: "teal" },
      ],
      choices: [
        "Plan maintenance and generalization checks after mastery.",
        "End supervision permanently after one improved point.",
        "Declare training unnecessary.",
        "Ignore fidelity because attendance was high.",
      ],
      answer: "Plan maintenance and generalization checks after mastery.",
      feedback:
        "Correct. Improved staff performance should be followed by maintenance and generalization planning.",
      graphId: "supervision-bst-fidelity",
      hint:
        "Look for improved fidelity and decide how to support durability.",
    },
  },
  {
    slug: "data-based-supervision-decisions",
    label: "I.7",
    title: "Data-Based Supervision Decisions",
    body: [
      "Data-based supervision integrates [staff fidelity, client outcomes, permanent products, professionalism, and social-validity data].",
      "Different data patterns support different next steps.",
    ],
    visual: {
      type: "choice",
      prompt: "Fidelity improves to 95%, but client target behavior does not improve. What is the best next decision?",
      choices: [
        "Analyze the clinical procedure, client variables, and assessment fit.",
        "Blame staff performance first.",
        "Stop measuring client outcomes.",
        "Reduce supervision because fidelity improved.",
      ],
      answer:
        "Analyze the clinical procedure, client variables, and assessment fit.",
      feedback:
        "Correct. High fidelity with weak client outcomes shifts attention to intervention effectiveness and fit.",
      hint:
        "First decide whether implementation is strong enough to evaluate the procedure.",
    },
  },
  {
    slug: "evaluating-supervisory-efficacy",
    label: "I.7",
    title: "Evaluating Supervisory Efficacy",
    body: [
      "Supervisory efficacy means supervision produces [measurable improvements in supervisee performance and relevant outcomes].",
      "Efficacy should be evaluated with data, not assumed from meetings completed.",
    ],
    visual: {
      type: "choice",
      prompt: "Which data stream most directly evaluates supervisory efficacy?",
      choices: [
        "Supervisee fidelity improves after the supervision plan is implemented.",
        "The supervisor scheduled all meetings but observed no performance.",
        "The supervisee says the content was interesting without performance data.",
        "The supervisor completed the same agenda each week.",
      ],
      answer:
        "Supervisee fidelity improves after the supervision plan is implemented.",
      feedback:
        "Correct. Efficacy is shown by behavior change linked to the supervision procedures.",
      hint:
        "Look for measurable supervisee behavior change.",
    },
  },
  {
    slug: "modifying-supervision",
    label: "I.7",
    title: "Modifying Supervision When Performance Does Not Improve",
    body: [
      "When performance does not improve, supervisors should [reanalyze barriers and modify supports].",
      "More lecture is not always the answer; the barrier may be task clarification, effort, materials, consequences, or relationship conditions.",
    ],
    visual: {
      type: "choice",
      prompt: "Weekly lectures have not improved fidelity. Observations show staff need practice during live sessions. What should change?",
      choices: [
        "Add modeling, rehearsal, in-vivo feedback, and mastery checks.",
        "Continue lectures only because attendance is high.",
        "Stop supervision because staff attended training.",
        "Change the client goal before addressing fidelity.",
      ],
      answer:
        "Add modeling, rehearsal, in-vivo feedback, and mastery checks.",
      feedback:
        "Correct. Data suggest active performance training is needed.",
      hint:
        "Match the supervision change to the observed performance barrier.",
    },
  },
  {
    slug: "collaboration-during-supervision",
    label: "I.2",
    title: "Collaboration During Supervision",
    body: [
      "Collaboration includes [active listening, seeking input, coordinating roles, and communicating respectfully].",
      "Collaboration supports services while preserving scope, confidentiality, and accountability.",
    ],
    visual: {
      type: "select-all",
      prompt: "Select collaborative supervision behaviors.",
      choices: [
        { label: "Ask the teacher what barriers occur during implementation", correct: true },
        { label: "Clarify who will collect integrity data", correct: true },
        { label: "Dismiss caregiver concerns because fidelity improved", correct: false },
        { label: "Coordinate feedback with the interdisciplinary team when appropriate", correct: true },
      ],
      feedback:
        "Correct. Collaboration uses input and role clarity to improve service delivery.",
    },
  },
  {
    slug: "ethical-supervision-scenarios",
    label: "I.2",
    title: "Ethical Supervision Scenarios",
    body: [
      "Ethical supervision requires [competence, documentation, confidentiality, appropriate delegation, and continuity].",
      "Supervisors should not delegate independent implementation before competence is demonstrated.",
    ],
    visual: {
      type: "choice",
      prompt: "A supervisee watched one model but has not demonstrated the skill. What should happen before independent implementation?",
      choices: [
        "The supervisee should rehearse and meet competency criteria with feedback.",
        "The supervisee can implement independently because observation occurred.",
        "The supervisor should remove documentation requirements.",
        "The client should be used for unsupervised practice.",
      ],
      answer:
        "The supervisee should rehearse and meet competency criteria with feedback.",
      feedback:
        "Correct. Delegation requires demonstrated competent performance.",
      hint:
        "Look for verified competence, not just exposure.",
    },
  },
  {
    slug: "treatment-integrity-vs-supervisory-efficacy",
    label: "I.7",
    title: "Treatment Integrity vs Supervisory Efficacy",
    body: [
      "Treatment integrity asks whether staff implemented the client procedure [as designed].",
      "Supervisory efficacy asks whether the supervision plan [improved supervisee performance].",
    ],
    visual: {
      type: "comparison",
      leftTitle: "Treatment integrity",
      leftText: "Did staff implement the behavior plan correctly?",
      rightTitle: "Supervisory efficacy",
      rightText: "Did supervision improve staff implementation?",
      cue: "One measures implementation; the other evaluates supervision effects.",
    },
  },
  {
    slug: "maintenance-generalization-supervisee-skills",
    label: "I.7",
    title: "Maintenance and Generalization of Supervisee Skills",
    body: [
      "Supervisee skills should maintain [over time] and generalize [across clients, settings, materials, and routines].",
      "Role-play mastery is not enough if performance drops with a new client or setting.",
    ],
    visual: {
      type: "choice",
      prompt: "Role-play fidelity reaches 95%, but in-vivo fidelity with a new client drops to 58%. What should the supervisor do?",
      choices: [
        "Train and probe generalization across clients and settings.",
        "Declare the supervisee fully mastered because role-play was high.",
        "Stop measuring fidelity during real sessions.",
        "Move immediately to reinforcement thinning only.",
      ],
      answer: "Train and probe generalization across clients and settings.",
      feedback:
        "Correct. Mastery should be checked across relevant performance contexts.",
      hint:
        "Look for a generalization gap between training and service settings.",
    },
  },
  {
    slug: "reinforcement-thinning-supervisee-performance",
    label: "I.7",
    title: "Reinforcement Thinning for Supervisee Performance",
    body: [
      "When staff performance is stable, supports can be [thinned gradually while monitoring maintenance].",
      "Abruptly removing feedback or reinforcement may reduce performance.",
    ],
    visual: {
      type: "choice",
      prompt: "Fidelity falls after feedback stops abruptly. What decision is most appropriate?",
      choices: [
        "Return to feedback, then thin it gradually with maintenance probes.",
        "End supervision because fidelity was once high.",
        "Punish all errors without re-teaching.",
        "Ignore the drop because staff attended training.",
      ],
      answer:
        "Return to feedback, then thin it gradually with maintenance probes.",
      feedback:
        "Correct. Thinning should be gradual and data-based.",
      hint:
        "Think about maintenance after support is reduced.",
    },
  },
  {
    slug: "feedback-systems-acceptability",
    label: "I.7",
    title: "Staff Feedback Systems and Acceptability",
    body: [
      "Acceptability data can reveal whether feedback systems are [usable, respectful, timely, and sustainable].",
      "Social-validity concerns should guide modifications without abandoning objective performance goals.",
    ],
    visual: {
      type: "choice",
      prompt: "Fidelity is stable, but supervisee satisfaction with feedback drops sharply. What should the supervisor do?",
      choices: [
        "Treat the feedback as social-validity data and adjust the process while maintaining standards.",
        "Ignore the feedback because fidelity is stable.",
        "Stop all feedback permanently.",
        "Lower competency criteria to increase satisfaction.",
      ],
      answer:
        "Treat the feedback as social-validity data and adjust the process while maintaining standards.",
      feedback:
        "Correct. Acceptability is data that can improve supervision design.",
      hint:
        "Balance objective performance criteria with social validity.",
    },
  },
  {
    slug: "supervision-contextual-fit",
    label: "I.4",
    title: "Supervision Contextual Fit",
    body: [
      "Contextual fit means supervision procedures match [setting resources, workflows, culture, schedules, and supervisee needs].",
      "A technically sound plan may fail if it cannot be implemented in the actual service context.",
    ],
    visual: {
      type: "choice",
      prompt: "Which supervision plan has the strongest contextual fit?",
      choices: [
        "Brief in-vivo observations during existing sessions with same-day feedback and a simple fidelity checklist.",
        "Two-hour daily meetings that remove staff from required client coverage.",
        "A complex data system that staff cannot access at the school.",
        "Feedback delivered only in a format the supervisee cannot use.",
      ],
      answer:
        "Brief in-vivo observations during existing sessions with same-day feedback and a simple fidelity checklist.",
      feedback:
        "Correct. Contextual fit supports feasible, acceptable, and effective supervision.",
      hint:
        "Look for a plan that works with real service constraints.",
    },
  },
];

const sectionIPracticeQuestions: QuestionContent[] = [
  {
    type: "matching",
    prompt: "Match each staff-performance barrier to the most aligned supervision support.",
    pairs: [
      { term: "No skill yet", definition: "Behavioral skills training with rehearsal and feedback." },
      { term: "Unclear when to act", definition: "Task clarification, prompts, or a job aid." },
      { term: "Materials unavailable", definition: "Resource or process change." },
      { term: "Correct work contacts no consequence", definition: "Performance feedback and reinforcement." },
    ],
    answer: "All staff-performance barriers matched correctly",
    explanation:
      "Performance diagnostics match supports to [training, task clarification, resources/processes, or consequences/effort barriers].",
    hint:
      "Do not make every staff performance problem a training problem.",
  },
  {
    type: "sorting",
    prompt: "Sort each supervision behavior.",
    categories: ["Effective supervisory relationship", "Ineffective supervision"],
    items: [
      { label: "Uses clear agendas and timely feedback", category: "Effective supervisory relationship" },
      { label: "Cancels observations without rescheduling", category: "Ineffective supervision" },
      { label: "Clarifies roles and documentation expectations", category: "Effective supervisory relationship" },
      { label: "Gives vague criticism after problems escalate", category: "Ineffective supervision" },
    ],
    answer: "All supervision behaviors sorted correctly",
    explanation:
      "Effective relationships require [clear expectations, communication, feedback, and accountability].",
    hint:
      "Look for observable support versus vague or delayed supervision.",
  },
  {
    type: "select-all",
    prompt:
      "A supervisor has many trainees, delayed feedback, missed documentation, and weak client progress. Select the risks present.",
    choices: [
      "Capacity problem",
      "Documentation risk",
      "Delayed performance feedback",
      "Client outcome risk",
      "Proof that supervision is effective",
    ],
    answers: [
      "Capacity problem",
      "Documentation risk",
      "Delayed performance feedback",
      "Client outcome risk",
    ],
    answer:
      "Capacity, documentation, delayed feedback, and client outcome risks are present.",
    explanation:
      "Supervision quality depends on [capacity, timely feedback, documentation, and client-related outcomes].",
    hint:
      "Identify risks created by the current supervision conditions.",
  },
  {
    type: "fill-blank",
    prompt:
      "Complete the active training package: Behavioral skills training includes instructions, modeling, rehearsal, and ____.",
    answer: "feedback",
    explanation:
      "BST includes [instructions, modeling, rehearsal, and feedback].",
    hint:
      "Think about the component delivered after the supervisee practices.",
  },
  {
    type: "scenario",
    prompt:
      "An RBT can describe a protocol accurately but scores 42% fidelity during sessions. What is the best next supervision action?",
    choices: [
      "Use active practice with immediate descriptive feedback in the service context.",
      "Assign more reading only because the RBT can state the protocol.",
      "Declare the client intervention ineffective.",
      "Stop measuring fidelity until the RBT feels confident.",
    ],
    answer:
      "Use active practice with immediate descriptive feedback in the service context.",
    explanation:
      "Low implementation fidelity after verbal knowledge suggests a need for [rehearsal, feedback, and in-vivo support].",
    hint:
      "Separate knowing about a procedure from performing it accurately.",
  },
  {
    type: "scenario",
    prompt:
      "Staff stopped entering data because the new form is slow and confusing. Which intervention best fits the barrier?",
    choices: [
      "Simplify the form, clarify steps, and monitor completion.",
      "Repeat a lecture on behavior principles only.",
      "Ignore data entry because sessions are still happening.",
      "Lower all performance expectations permanently.",
    ],
    answer: "Simplify the form, clarify steps, and monitor completion.",
    explanation:
      "A confusing, effortful form suggests [task clarification and response-effort/process supports].",
    hint:
      "Look for the environmental feature blocking performance.",
  },
  {
    type: "scenario",
    graphId: "supervision-generalization-drop",
    prompt:
      "Role-play fidelity reaches mastery, but fidelity drops with a new client. What supervision decision is best supported?",
    choices: [
      "Program generalization and conduct follow-up competency checks.",
      "Declare full mastery because role-play performance was high.",
      "Stop monitoring in-vivo implementation.",
      "Change the client intervention before addressing staff performance.",
    ],
    answer: "Program generalization and conduct follow-up competency checks.",
    explanation:
      "A drop from role play to new-client implementation shows a [generalization problem] in supervisee performance.",
    hint:
      "Compare performance across training and natural contexts.",
  },
  {
    type: "select-all",
    prompt: "Select elements that belong in a supervision contract.",
    choices: [
      "Roles and responsibilities",
      "Communication expectations",
      "Documentation requirements",
      "Performance criteria",
      "Permission to ignore professional boundaries",
    ],
    answers: [
      "Roles and responsibilities",
      "Communication expectations",
      "Documentation requirements",
      "Performance criteria",
    ],
    answer:
      "Contracts should include roles, communication expectations, documentation, and performance criteria.",
    explanation:
      "Supervision contracts clarify [roles, scope, expectations, criteria, documentation, communication, and boundaries].",
    hint:
      "Look for elements that make supervision expectations clear and accountable.",
  },
  {
    type: "scenario",
    prompt:
      "A supervisee reports that feedback feels culturally dismissive, although fidelity is improving. What should the supervisor do?",
    choices: [
      "Treat the concern as social-validity data, collaborate on feedback delivery, and keep objective criteria.",
      "Ignore the report because fidelity improved.",
      "Stop giving corrective feedback.",
      "Lower competency criteria to avoid discomfort.",
    ],
    answer:
      "Treat the concern as social-validity data, collaborate on feedback delivery, and keep objective criteria.",
    explanation:
      "Culturally responsive supervision adapts [communication and support] while maintaining measurable standards.",
    hint:
      "Balance responsiveness with objective performance expectations.",
  },
  {
    type: "sorting",
    prompt: "Sort each competency example.",
    categories: ["Knowledge-based competency", "Performance-based competency"],
    items: [
      { label: "Defines differential reinforcement", category: "Knowledge-based competency" },
      { label: "Implements DRA with 90% fidelity", category: "Performance-based competency" },
      { label: "Describes preference assessment types", category: "Knowledge-based competency" },
      { label: "Conducts paired-stimulus trials accurately", category: "Performance-based competency" },
    ],
    answer: "All competency examples sorted correctly",
    explanation:
      "Knowledge means the supervisee can state concepts; performance means the supervisee can [implement accurately].",
    hint:
      "Separate describing a skill from doing it with fidelity.",
  },
  {
    type: "scenario",
    prompt:
      "A supervisee repeatedly misses meeting agendas. Assessment suggests unclear expectations and no reminders. What should the supervisor do first?",
    choices: [
      "Define the agenda expectation and add prompts or a checklist.",
      "Use intensive BST for all clinical procedures.",
      "Assume the supervisee is not committed.",
      "Discontinue supervision without clarifying expectations.",
    ],
    answer: "Define the agenda expectation and add prompts or a checklist.",
    explanation:
      "Unclear expectations and missing reminders suggest [task clarification and prompting].",
    hint:
      "Match the intervention to the assessed barrier.",
  },
  {
    type: "scenario",
    graphId: "supervision-attendance-low-integrity",
    prompt:
      "Training attendance is consistently high, but implementation fidelity remains low. What is the best interpretation?",
    choices: [
      "Attendance alone has not established accurate performance.",
      "The supervisee has mastered the skill because attendance is high.",
      "Client outcomes should be ignored because training occurred.",
      "The graph proves feedback should be removed.",
    ],
    answer: "Attendance alone has not established accurate performance.",
    explanation:
      "Supervision should evaluate [performance], not only attendance or exposure to training.",
    hint:
      "Compare attending training with implementing correctly.",
  },
  {
    type: "scenario",
    prompt:
      "A supervisor notices one supervisee receives fewer observation opportunities because of assumptions about family obligations. What is the best response?",
    choices: [
      "Analyze and correct access barriers while maintaining the same competency standards.",
      "Keep the schedule unchanged because opportunities are optional.",
      "Lower criteria for that supervisee instead of changing access.",
      "Avoid discussing the pattern because intent was not harmful.",
    ],
    answer:
      "Analyze and correct access barriers while maintaining the same competency standards.",
    explanation:
      "Equity involves [fair access to learning opportunities] without reducing objective competence expectations.",
    hint:
      "Look for access correction, not lowered standards.",
  },
  {
    type: "scenario",
    prompt:
      "A staff member performs a procedure accurately only when the supervisor is present. Which support best promotes maintenance?",
    choices: [
      "Thin supervisor presence gradually and add natural feedback or self-monitoring.",
      "Remove all supports immediately.",
      "Stop measuring fidelity because performance occurred once.",
      "Change to lecture-only training.",
    ],
    answer:
      "Thin supervisor presence gradually and add natural feedback or self-monitoring.",
    explanation:
      "Maintenance requires [gradual support thinning and follow-up checks].",
    hint:
      "Think about durable performance after supervision support changes.",
  },
  {
    type: "scenario",
    graphId: "supervision-integrity-client-outcome",
    prompt:
      "Fidelity improves to high levels, but client target behavior remains unchanged. What is the best data-based decision?",
    choices: [
      "Evaluate the clinical intervention, client variables, and assessment fit.",
      "Blame staff implementation first because fidelity is high.",
      "Stop collecting client outcome data.",
      "Assume supervision is ineffective because client data did not change.",
    ],
    answer:
      "Evaluate the clinical intervention, client variables, and assessment fit.",
    explanation:
      "When fidelity is high but outcomes are weak, analyze [intervention effectiveness and client variables].",
    hint:
      "Ask whether implementation is strong enough to shift attention to the intervention itself.",
  },
  {
    type: "scenario",
    graphId: "supervision-feedback-thinning",
    prompt:
      "Fidelity rises with frequent feedback but falls after feedback stops. What should the supervisor do?",
    choices: [
      "Reintroduce feedback and thin it gradually while monitoring maintenance.",
      "End supervision because fidelity was once high.",
      "Use only a written policy from now on.",
      "Ignore the decrease because the staff member attended training.",
    ],
    answer:
      "Reintroduce feedback and thin it gradually while monitoring maintenance.",
    explanation:
      "Abrupt support removal can reduce performance; thinning should be [gradual and data-based].",
    hint:
      "Think about support fading, not sudden removal.",
  },
  {
    type: "scenario",
    prompt:
      "A supervisor wants to know whether their supervision plan is working. Which data stream is most direct?",
    choices: [
      "Repeated measures of supervisee implementation fidelity after supervision changes.",
      "The number of meetings scheduled only.",
      "The supervisor's preference for the training format.",
      "A list of articles sent to the supervisee.",
    ],
    answer:
      "Repeated measures of supervisee implementation fidelity after supervision changes.",
    explanation:
      "Supervisory efficacy is evaluated with [data on supervisee behavior and relevant outcomes].",
    hint:
      "Look for behavior change linked to the supervision plan.",
  },
  {
    type: "matching",
    prompt: "Match each BST component to its supervision example.",
    pairs: [
      { term: "Instructions", definition: "Describe steps and criteria before practice." },
      { term: "Modeling", definition: "Demonstrate the procedure." },
      { term: "Rehearsal", definition: "Have the supervisee practice the procedure." },
      { term: "Feedback", definition: "Describe accurate and inaccurate performance after practice." },
    ],
    answer: "All BST components matched correctly",
    explanation:
      "BST is an active package of [instructions, modeling, rehearsal, and feedback].",
    hint:
      "Identify what happens before, during, and after supervisee practice.",
  },
  {
    type: "scenario",
    prompt:
      "A caregiver and teacher provide different reports about barriers to implementation. What should the supervisor do?",
    choices: [
      "Collaborate respectfully, gather direct data, and clarify roles before changing supports.",
      "Choose one report and ignore the other.",
      "Stop collaboration because reports conflict.",
      "Change the plan without verifying implementation barriers.",
    ],
    answer:
      "Collaborate respectfully, gather direct data, and clarify roles before changing supports.",
    explanation:
      "Collaboration uses [input, direct data, and role clarification] to support services.",
    hint:
      "Look for respectful collaboration plus verification.",
  },
  {
    type: "fill-blank",
    prompt:
      "Complete the supervision discrimination: Treatment integrity measures whether staff implement procedures as ____.",
    answer: "designed",
    explanation:
      "Treatment integrity measures whether procedures are implemented [as designed].",
    hint:
      "Think about comparing implementation to the written procedure.",
  },
  {
    type: "scenario",
    prompt:
      "A supervisor has high client demands, delayed responses to trainees, and incomplete supervision logs. What should be evaluated before taking additional supervisees?",
    choices: [
      "Supervisory capacity and quality-control systems.",
      "Whether trainees can work without contracts.",
      "Whether documentation can be discontinued.",
      "How to reduce observation requirements for all trainees.",
    ],
    answer: "Supervisory capacity and quality-control systems.",
    explanation:
      "Capacity includes [time, caseload, logistics, documentation, and response time].",
    hint:
      "Focus on whether the supervisor can maintain quality supervision.",
  },
  {
    type: "select-all",
    prompt: "Select data that can be used to evaluate supervision.",
    choices: [
      "Supervisee procedural fidelity",
      "Client outcome data when relevant",
      "Supervisee satisfaction or acceptability",
      "Permanent products such as session notes",
      "Supervisor intention without performance data",
    ],
    answers: [
      "Supervisee procedural fidelity",
      "Client outcome data when relevant",
      "Supervisee satisfaction or acceptability",
      "Permanent products such as session notes",
    ],
    answer:
      "Supervision can be evaluated with fidelity, client outcomes, acceptability, and permanent-product data.",
    explanation:
      "Data-based supervision integrates [multiple data streams] rather than relying on supervisor intention.",
    hint:
      "Look for observable or reportable data streams tied to supervision quality.",
  },
  {
    type: "scenario",
    prompt:
      "A supervisee has never conducted a paired-stimulus preference assessment. What supervision procedure best establishes the skill?",
    choices: [
      "Behavioral skills training to mastery with practice and feedback.",
      "Performance feedback only after independent implementation.",
      "A job aid without modeling or rehearsal.",
      "Assigning the supervisee to train others immediately.",
    ],
    answer:
      "Behavioral skills training to mastery with practice and feedback.",
    explanation:
      "A new skill requires [active training with mastery criteria], not feedback alone.",
    hint:
      "Ask whether the supervisee already has the skill in repertoire.",
  },
  {
    type: "scenario",
    prompt:
      "A supervisor gives feedback two weeks after observation and says only, 'Be more professional.' What is the main weakness?",
    choices: [
      "The feedback is delayed and not behavior-specific.",
      "The feedback includes too much modeling.",
      "The feedback uses too many objective criteria.",
      "The feedback is too culturally responsive.",
    ],
    answer: "The feedback is delayed and not behavior-specific.",
    explanation:
      "Effective feedback should be [timely, descriptive, and behavior-focused].",
    hint:
      "Evaluate timing and specificity.",
  },
  {
    type: "scenario",
    prompt:
      "A supervisee reports the supervision agenda does not match current case demands. What is the best use of that feedback?",
    choices: [
      "Review the data and revise agenda priorities while preserving required supervision activities.",
      "Ignore the feedback because the agenda was already written.",
      "Remove all structure from supervision.",
      "Cancel observations until the supervisee is satisfied.",
    ],
    answer:
      "Review the data and revise agenda priorities while preserving required supervision activities.",
    explanation:
      "Supervisee feedback can guide [contextual fit and social validity] without abandoning supervision responsibilities.",
    hint:
      "Use feedback as data, not as a reason to remove accountability.",
  },
  {
    type: "scenario",
    prompt:
      "A technician reads the behavior plan and watches the supervisor run one trial but has not practiced. Which BST component is missing?",
    choices: [
      "Rehearsal with feedback",
      "Written instructions",
      "Initial modeling",
      "A task-analysis label",
    ],
    answer: "Rehearsal with feedback",
    explanation:
      "BST requires the supervisee to [practice the target performance and receive feedback], not only observe it.",
    hint:
      "Look for the active practice component after instructions and modeling.",
  },
  {
    type: "scenario",
    prompt:
      "An RBT previously scored 95% fidelity on discrete-trial teaching, but current fidelity is 55% when sessions are scheduled during cleanup time. What is the most likely issue?",
    choices: [
      "A performance deficit affected by competing contingencies",
      "A skill deficit requiring teaching the skill from the beginning",
      "A respondent extinction process",
      "A generalized conditioned punisher",
    ],
    answer: "A performance deficit affected by competing contingencies",
    explanation:
      "Previously demonstrated skill with poor performance under current conditions suggests [performance barriers], not absent skill.",
    hint:
      "Use the history of accurate performance to discriminate skill from performance deficits.",
  },
  {
    type: "select-all",
    prompt:
      "Select features of effective corrective feedback after an observed implementation error.",
    choices: [
      "Describes the specific staff response observed",
      "States the expected next response",
      "Occurs close enough to guide the next opportunity",
      "Uses only a global label such as unprofessional",
      "Avoids any chance for rehearsal",
    ],
    answers: [
      "Describes the specific staff response observed",
      "States the expected next response",
      "Occurs close enough to guide the next opportunity",
    ],
    answer:
      "Effective corrective feedback is specific, timely, and linked to the next response opportunity.",
    explanation:
      "Useful feedback should be [descriptive, timely, behavior-focused, and actionable].",
    hint:
      "Look for feedback that tells the supervisee exactly what happened and what to do next.",
  },
  {
    type: "scenario",
    prompt:
      "A team wants to increase accurate data entry. Staff who submit accurate notes by 5 p.m. receive specific praise and first choice of prep materials. Which procedure is being used?",
    choices: [
      "A reinforcement system for supervisee performance",
      "Lecture-only training",
      "Task clarification without consequences",
      "A preference assessment for the client",
    ],
    answer: "A reinforcement system for supervisee performance",
    explanation:
      "The supervisor arranges preferred consequences following [accurate, timely staff performance].",
    hint:
      "Look at what happens after the staff behavior.",
  },
  {
    type: "scenario",
    graphId: "supervision-bst-fidelity",
    prompt:
      "Procedural integrity rises after active training is introduced. What supervision decision is best supported?",
    choices: [
      "Continue active training until mastery is stable, then probe maintenance.",
      "Stop supervision after the first improved session.",
      "Conclude that attendance caused the improvement.",
      "Remove integrity monitoring because performance improved once.",
    ],
    answer:
      "Continue active training until mastery is stable, then probe maintenance.",
    explanation:
      "Improving fidelity supports continuing the supervision package until [stable mastery and maintenance checks] are in place.",
    hint:
      "Focus on what the graph suggests about staff performance and next steps.",
  },
  {
    type: "scenario",
    prompt:
      "A supervision plan requires staff to complete a 14-step form during fast-paced teaching, and data are often missing. Which change best targets response effort?",
    choices: [
      "Simplify the form and pre-fill stable fields while keeping essential data requirements.",
      "Add a lecture about why data are important.",
      "Tell staff to try harder without changing the form.",
      "Stop collecting data because the form is long.",
    ],
    answer:
      "Simplify the form and pre-fill stable fields while keeping essential data requirements.",
    explanation:
      "Response-effort manipulations make correct performance [easier while preserving the needed behavior].",
    hint:
      "Look for a change that reduces unnecessary effort without removing accountability.",
  },
  {
    type: "scenario",
    prompt:
      "A supervisor uses examples that do not match the supervisee's service setting, and the supervisee asks for examples involving bilingual caregiver meetings. What is the best response?",
    choices: [
      "Collaborate to adapt examples to the service context while keeping the same performance criteria.",
      "Refuse because all supervisees should receive identical examples.",
      "Remove performance criteria because cultural responsiveness requires flexibility.",
      "Avoid caregiver-meeting examples because they are too specific.",
    ],
    answer:
      "Collaborate to adapt examples to the service context while keeping the same performance criteria.",
    explanation:
      "Culturally responsive supervision uses [contextually relevant examples and clear standards].",
    hint:
      "Choose responsiveness without lowering objective expectations.",
  },
  {
    type: "matching",
    prompt: "Match each performance diagnostic cue to the best first support.",
    pairs: [
      { term: "No model or practice history", definition: "BST with rehearsal and feedback." },
      { term: "Unclear decision rule", definition: "Task clarification or job aid." },
      { term: "Supplies missing in the room", definition: "Resource or process fix." },
      { term: "Accurate work never receives feedback", definition: "Feedback and reinforcement." },
    ],
    answer: "All diagnostic cues matched correctly",
    explanation:
      "Performance diagnostics guide supervisors to [function-matched staff supports].",
    hint:
      "Match each barrier to the smallest supervision change likely to improve performance.",
  },
  {
    type: "scenario",
    prompt:
      "A supervisee misses data during group instruction because the data sheet is across the room. Which intervention best fits?",
    choices: [
      "Move the data sheet to the teaching area and add a simple prompt.",
      "Require the supervisee to memorize all data after the session.",
      "Provide a full ethics lecture as the only support.",
      "Change the client's target behavior because data are inconvenient.",
    ],
    answer:
      "Move the data sheet to the teaching area and add a simple prompt.",
    explanation:
      "The barrier is practical access to materials, so a [resource/process and response-effort adjustment] fits.",
    hint:
      "Look for the environmental arrangement that makes data collection easier.",
  },
  {
    type: "scenario",
    prompt:
      "A supervisor gives all feedback through long written reports, but staff implement changes only after brief in-vivo demonstrations. What should the supervisor modify?",
    choices: [
      "Shift to direct modeling, rehearsal, and immediate feedback in the work setting.",
      "Keep written reports as the only method because they are detailed.",
      "Stop giving feedback because staff did not use the reports.",
      "Lower all fidelity goals to match current performance.",
    ],
    answer:
      "Shift to direct modeling, rehearsal, and immediate feedback in the work setting.",
    explanation:
      "Supervision should be modified when data show that [active, contextual performance support] is more effective.",
    hint:
      "Use staff response to supervision as data for changing the support.",
  },
];

const sectionIMasteryQuestions: QuestionContent[] = [
  {
    type: "scenario",
    prompt:
      "A supervisor is asked to add three trainees but already misses observation and feedback deadlines. Which response is most appropriate?",
    choices: [
      "Decline or delay new supervision until quality, capacity, and documentation can be maintained.",
      "Accept the trainees and reduce observations for everyone.",
      "Stop documenting supervision to create more meeting time.",
      "Let trainees supervise each other without oversight.",
    ],
    answer:
      "Decline or delay new supervision until quality, capacity, and documentation can be maintained.",
    explanation:
      "Supervisory capacity must protect [feedback quality, documentation, responsiveness, and client service outcomes].",
    hint:
      "Focus on quality and capacity before expanding supervision volume.",
  },
  {
    type: "scenario",
    prompt:
      "A supervisee defensively rejects correction and stops bringing cases to meetings. What should the supervisor do first?",
    choices: [
      "Assess feedback conditions and the supervisory relationship, then model expected feedback behavior and make a plan.",
      "Remove the supervisee from all cases immediately without assessing the barrier.",
      "Stop giving corrective feedback to preserve rapport.",
      "Ignore the pattern because supervision meetings still occur.",
    ],
    answer:
      "Assess feedback conditions and the supervisory relationship, then model expected feedback behavior and make a plan.",
    explanation:
      "Feedback resistance may reflect [relationship, feedback-delivery, or performance-contingency variables] that should be assessed.",
    hint:
      "Look for assessment and repair of the supervision conditions.",
  },
  {
    type: "scenario",
    prompt:
      "A staff member has never implemented a preference assessment. Which procedure best establishes the skill?",
    choices: [
      "Behavioral skills training with instructions, modeling, rehearsal, feedback, and mastery criteria.",
      "A single emailed checklist with no practice.",
      "Performance feedback after independent implementation only.",
      "A verbal reminder to be more accurate.",
    ],
    answer:
      "Behavioral skills training with instructions, modeling, rehearsal, feedback, and mastery criteria.",
    explanation:
      "New supervisee skills are best established with [active performance training to mastery].",
    hint:
      "Choose the option that teaches and verifies performance.",
  },
  {
    type: "scenario",
    prompt:
      "Staff are trained and capable, but they do not know which data sheet to use for each program. What should the supervisor prioritize?",
    choices: [
      "A clear decision rule, job aid, and prompts for selecting the correct sheet.",
      "Full retraining on every measurement procedure as the first step.",
      "Punishment for choosing the wrong form.",
      "Ignoring the issue because staff are capable.",
    ],
    answer:
      "A clear decision rule, job aid, and prompts for selecting the correct sheet.",
    explanation:
      "When performance is blocked by unclear cues, task clarification and prompts fit better than broad retraining.",
    hint:
      "Identify whether the issue is skill absence or unclear conditions for using the skill.",
  },
  {
    type: "scenario",
    prompt:
      "A diagnostic assessment shows the main barriers are performance consequences, high effort, and competing tasks. Which intervention is most aligned?",
    choices: [
      "Add performance feedback, reinforcement, outcome visibility, and response-effort changes.",
      "Use lecture-only training because all barriers are knowledge deficits.",
      "Change the client goal before addressing staff performance.",
      "Remove all monitoring so staff feel less pressured.",
    ],
    answer:
      "Add performance feedback, reinforcement, outcome visibility, and response-effort changes.",
    explanation:
      "Consequence, effort, and competing-task barriers call for [feedback, reinforcement, monitoring, and effort/process supports].",
    hint:
      "Match the intervention to the diagnosed performance barrier.",
  },
  {
    type: "scenario",
    graphId: "supervision-bst-fidelity",
    prompt:
      "Implementation fidelity is low during baseline and improves after active training is introduced. What decision is most supported?",
    choices: [
      "Continue until mastery is stable, then program maintenance and generalization checks.",
      "End supervision after the first improved data point.",
      "Declare training unnecessary because baseline was measured.",
      "Ignore fidelity and evaluate only meeting attendance.",
    ],
    answer:
      "Continue until mastery is stable, then program maintenance and generalization checks.",
    explanation:
      "Improved fidelity after active training supports supervisory efficacy, followed by [maintenance and generalization planning].",
    hint:
      "Look for improved staff performance and the next durability step.",
  },
  {
    type: "scenario",
    prompt:
      "One supervisee consistently receives fewer client-observation opportunities because of scheduling assumptions. What should the supervisor do?",
    choices: [
      "Analyze and correct the access barrier while maintaining objective competency requirements.",
      "Lower the competency standard for that supervisee.",
      "Keep opportunities unchanged because the difference was unintentional.",
      "Stop tracking observation opportunities.",
    ],
    answer:
      "Analyze and correct the access barrier while maintaining objective competency requirements.",
    explanation:
      "Equity requires [fair access to learning opportunities] while preserving competence standards.",
    hint:
      "Choose access correction, not lowered expectations.",
  },
  {
    type: "scenario",
    prompt:
      "A supervisor notices examples and feedback formats do not fit the supervisee's context, and the supervisee avoids feedback. What is the best response?",
    choices: [
      "Collaborate to adapt examples and feedback delivery, measure effects, and keep performance criteria clear.",
      "Ignore the concern because the criteria are objective.",
      "Remove performance criteria to improve comfort.",
      "Avoid feedback and rely only on client outcome data.",
    ],
    answer:
      "Collaborate to adapt examples and feedback delivery, measure effects, and keep performance criteria clear.",
    explanation:
      "Culturally responsive supervision adapts [support and communication] while maintaining measurable performance expectations.",
    hint:
      "Look for collaboration plus objective standards.",
  },
  {
    type: "scenario",
    prompt:
      "A supervisee watched one model but has not demonstrated competency. Can the supervisor delegate independent implementation?",
    choices: [
      "No; competent performance should be verified before independent delegation.",
      "Yes; observing a model is the same as mastery.",
      "Yes; delegation is appropriate if the client needs services quickly.",
      "No; supervisees should never implement procedures.",
    ],
    answer:
      "No; competent performance should be verified before independent delegation.",
    explanation:
      "Appropriate delegation requires [demonstrated competence and ongoing oversight].",
    hint:
      "Distinguish exposure to training from verified performance.",
  },
  {
    type: "scenario",
    prompt:
      "Client outcomes improve, but the supervisee reports supervision is disorganized and goals are unclear. What should the supervisor do?",
    choices: [
      "Use the feedback as process and social-validity data to improve supervision structure.",
      "Ignore the report because client outcomes improved.",
      "End supervision because the client data are positive.",
      "Remove all goals so supervision feels less structured.",
    ],
    answer:
      "Use the feedback as process and social-validity data to improve supervision structure.",
    explanation:
      "Supervisory efficacy includes [supervisee performance, relevant outcomes, process quality, and acceptability].",
    hint:
      "Do not ignore supervision-process data just because one outcome improved.",
  },
  {
    type: "scenario",
    prompt:
      "A supervisor takes unexpected leave. Which action best protects services and supervisee progress?",
    choices: [
      "Communicate a transition plan, identify coverage, preserve documentation, and minimize disruption.",
      "Leave cases uncovered until the supervisor returns.",
      "Delete supervision records to protect privacy.",
      "Tell supervisees to make independent clinical decisions outside their competence.",
    ],
    answer:
      "Communicate a transition plan, identify coverage, preserve documentation, and minimize disruption.",
    explanation:
      "Continuity requires [transition planning, documentation, coverage, and protection of clients and supervisees].",
    hint:
      "Look for continuity of care and supervision support.",
  },
  {
    type: "scenario",
    prompt:
      "A trainee repeatedly misses agendas. Assessment suggests unclear expectations and no reminders. What is the best intervention?",
    choices: [
      "Operationally define agenda submission, add prompts or a checklist, monitor, and reinforce meeting prep.",
      "Use punishment without clarifying the expected behavior.",
      "Assign more reading about ethics as the only support.",
      "Ignore the pattern because agenda submission is not client-facing.",
    ],
    answer:
      "Operationally define agenda submission, add prompts or a checklist, monitor, and reinforce meeting prep.",
    explanation:
      "Task clarification problems call for [observable expectations, prompts, monitoring, and performance consequences].",
    hint:
      "Match the support to unclear expectations and missing reminders.",
  },
  {
    type: "scenario",
    graphId: "supervision-generalization-drop",
    prompt:
      "Role-play performance meets criterion, but in-vivo performance with a different client is much lower. Which interpretation is strongest?",
    choices: [
      "The skill has not generalized adequately to the service context.",
      "The supervisee mastered all relevant contexts.",
      "The clinical intervention is ineffective because role-play was high.",
      "Supervision should end because one context reached criterion.",
    ],
    answer: "The skill has not generalized adequately to the service context.",
    explanation:
      "Supervisee mastery should be evaluated across [clients, settings, materials, and routines] when those contexts matter.",
    hint:
      "Compare training-context performance with real-context performance.",
  },
  {
    type: "scenario",
    graphId: "supervision-attendance-low-integrity",
    prompt:
      "Staff attend nearly all trainings, but implementation fidelity remains low. Which conclusion is best?",
    choices: [
      "Training attendance alone is not evidence of competent implementation.",
      "Attendance proves the supervision plan is effective.",
      "Fidelity data should be removed because attendance is high.",
      "The client procedure should be changed before staff performance is addressed.",
    ],
    answer:
      "Training attendance alone is not evidence of competent implementation.",
    explanation:
      "Supervision should evaluate [observable performance], not only exposure or attendance.",
    hint:
      "Separate participation in training from accurate implementation.",
  },
  {
    type: "scenario",
    graphId: "supervision-feedback-thinning",
    prompt:
      "Fidelity improves with frequent feedback but declines after feedback is removed. Which modification is most data-based?",
    choices: [
      "Reintroduce feedback, then thin it gradually with maintenance probes.",
      "Stop all feedback permanently because it once worked.",
      "Use only lecture-based supervision.",
      "Ignore the decline because previous fidelity was high.",
    ],
    answer:
      "Reintroduce feedback, then thin it gradually with maintenance probes.",
    explanation:
      "Performance maintenance often requires [gradual thinning, natural supports, and follow-up checks].",
    hint:
      "Look for a plan that maintains performance as support is reduced.",
  },
  {
    type: "scenario",
    graphId: "supervision-integrity-client-outcome",
    prompt:
      "Staff fidelity improves to high levels, but client behavior does not improve. What should the supervisor analyze next?",
    choices: [
      "The clinical procedure, assessment accuracy, client variables, and intervention fit.",
      "Staff implementation as the primary barrier because fidelity is high.",
      "Whether to stop all client data collection.",
      "Whether attendance at supervision meetings was high enough.",
    ],
    answer:
      "The clinical procedure, assessment accuracy, client variables, and intervention fit.",
    explanation:
      "When staff fidelity is high but outcomes are poor, the next analysis shifts to [intervention effectiveness and client variables].",
    hint:
      "Use fidelity data to decide whether implementation is still the main concern.",
  },
  {
    type: "scenario",
    prompt:
      "A supervisor wants staff to complete session notes accurately and quickly. Which target is most measurable?",
    choices: [
      "Submit session notes within 24 hours with all required fields accurate on 90% of audits.",
      "Be better at documentation.",
      "Care more about paperwork.",
      "Understand why notes matter.",
    ],
    answer:
      "Submit session notes within 24 hours with all required fields accurate on 90% of audits.",
    explanation:
      "Supervision goals should define [observable behavior, timing, quality criteria, and measurement].",
    hint:
      "Choose the target someone could measure reliably.",
  },
  {
    type: "scenario",
    prompt:
      "A feedback system improves fidelity but staff report it is embarrassing in front of peers. What should the supervisor do?",
    choices: [
      "Modify delivery to protect dignity and acceptability while keeping objective performance feedback.",
      "Ignore the concern because the system improved fidelity.",
      "Stop all feedback permanently.",
      "Lower implementation criteria to reduce embarrassment.",
    ],
    answer:
      "Modify delivery to protect dignity and acceptability while keeping objective performance feedback.",
    explanation:
      "Acceptability and dignity are supervision data; the supervisor can adjust [feedback delivery] without abandoning performance goals.",
    hint:
      "Balance effective feedback with dignity and social validity.",
  },
  {
    type: "scenario",
    prompt:
      "A supervisee can perform a skill when materials are arranged but misses steps when materials are scattered. Which support is most precise?",
    choices: [
      "Reduce response effort by organizing materials and using a pre-session setup checklist.",
      "Teach the entire procedure from scratch as the only intervention.",
      "Assume poor motivation and remove the supervisee from the case.",
      "Change the client treatment goal before adjusting materials.",
    ],
    answer:
      "Reduce response effort by organizing materials and using a pre-session setup checklist.",
    explanation:
      "Materials and workflow barriers often require [resource, process, and response-effort changes].",
    hint:
      "Look at what changes when performance succeeds versus fails.",
  },
  {
    type: "scenario",
    prompt:
      "Which supervision plan best reflects contextual fit?",
    choices: [
      "Uses brief in-vivo observations during existing sessions, same-day feedback, and a simple fidelity checklist.",
      "Requires daily two-hour meetings that remove staff from client coverage.",
      "Uses a data platform staff cannot access in the service setting.",
      "Uses feedback only in a format the supervisee cannot understand.",
    ],
    answer:
      "Uses brief in-vivo observations during existing sessions, same-day feedback, and a simple fidelity checklist.",
    explanation:
      "Contextual fit means the plan is [feasible, acceptable, resource-sensitive, and aligned with service conditions].",
    hint:
      "Choose the supervision plan that can actually be implemented well in context.",
  },
  {
    type: "scenario",
    prompt:
      "A supervisor gives corrective feedback but never observes whether performance changes afterward. What is missing?",
    choices: [
      "Data-based evaluation of supervisory efficacy.",
      "A multiple relationship.",
      "A preference assessment for the client.",
      "A punishment procedure for staff behavior.",
    ],
    answer: "Data-based evaluation of supervisory efficacy.",
    explanation:
      "Supervisory practices should be evaluated with [follow-up performance data].",
    hint:
      "Ask whether the supervisor measured the effect of supervision.",
  },
  {
    type: "scenario",
    prompt:
      "Which action best represents professional boundaries in supervision?",
    choices: [
      "Keeping communication professional, documented, and focused on supervisee performance.",
      "Using personal favors as consequences for meeting clinical goals.",
      "Sharing confidential client updates through personal social media.",
      "Avoiding role clarity because the supervisor and supervisee are friendly.",
    ],
    answer:
      "Keeping communication professional, documented, and focused on supervisee performance.",
    explanation:
      "Professional boundaries protect [objectivity, confidentiality, client welfare, and supervisee welfare].",
    hint:
      "Look for role clarity and protection of professional responsibilities.",
  },
  {
    type: "scenario",
    prompt:
      "A supervisor chooses goals based only on personal preference, without observing skills or reviewing context. What is the main problem?",
    choices: [
      "Goals are not based on assessment of supervisee skills and environmental variables.",
      "Goals are too measurable.",
      "The supervisor used too much direct observation.",
      "The supervision plan is too culturally responsive.",
    ],
    answer:
      "Goals are not based on assessment of supervisee skills and environmental variables.",
    explanation:
      "Supervision goals should be selected from [skills, cultural variables, learning history, and environmental conditions].",
    hint:
      "Look for whether the goal is assessment-based.",
  },
  {
    type: "scenario",
    prompt:
      "A staff member implements a behavior plan at 95% fidelity for three weeks and maintains performance when feedback is thinned. What should the supervisor plan next?",
    choices: [
      "Continue maintenance probes and check generalization across relevant clients or settings.",
      "End all monitoring permanently.",
      "Return to baseline by removing the client intervention.",
      "Assume all other staff have mastered the skill too.",
    ],
    answer:
      "Continue maintenance probes and check generalization across relevant clients or settings.",
    explanation:
      "Stable performance supports [maintenance and generalization checks], not abrupt removal of all monitoring.",
    hint:
      "Think about durability and transfer of supervisee performance.",
  },
  {
    type: "scenario",
    prompt:
      "A supervisor finds that the supervision procedure is producing accurate staff performance but creating excessive documentation burden. What is the best next step?",
    choices: [
      "Evaluate efficiency and simplify documentation while preserving essential accountability and data quality.",
      "Stop documenting supervision entirely.",
      "Keep the burden unchanged because accuracy improved.",
      "Lower client-service standards to reduce paperwork.",
    ],
    answer:
      "Evaluate efficiency and simplify documentation while preserving essential accountability and data quality.",
    explanation:
      "Effective supervision should balance [efficacy, feasibility, accountability, and contextual fit].",
    hint:
      "Look for preserving quality while improving feasibility.",
  },
  {
    type: "scenario",
    prompt:
      "A technician's late session notes contact no consequence, but on-time notes are never acknowledged. Which performance-management change is most aligned?",
    choices: [
      "Add monitoring, feedback, and reinforcement for accurate on-time notes.",
      "Use BST for preference assessments as the first step.",
      "Ignore documentation because clinical sessions occurred.",
      "Change the client's treatment procedure.",
    ],
    answer:
      "Add monitoring, feedback, and reinforcement for accurate on-time notes.",
    explanation:
      "When consequences for desired performance are weak, arrange [feedback and reinforcement] for the target staff behavior.",
    hint:
      "Focus on what follows the staff behavior.",
  },
  {
    type: "scenario",
    graphId: "supervision-integrity-client-outcome",
    prompt:
      "A supervision package raises implementation fidelity to 95%, but client behavior remains unchanged. Which modification is most defensible?",
    choices: [
      "Keep fidelity supports in place and evaluate the clinical intervention, target, and assessment results.",
      "Increase staff training intensity because low fidelity is still the most likely problem.",
      "Stop all supervision because staff performance is high.",
      "Conclude the client cannot benefit from behavior-analytic services.",
    ],
    answer:
      "Keep fidelity supports in place and evaluate the clinical intervention, target, and assessment results.",
    explanation:
      "High integrity with weak client outcomes shifts the next decision toward [intervention effectiveness and assessment fit].",
    hint:
      "Use both staff-performance data and client-outcome data before changing the plan.",
  },
  {
    type: "scenario",
    graphId: "supervision-attendance-low-integrity",
    prompt:
      "A supervisor documents high training attendance but low implementation fidelity across sessions. Which supervision failure is most likely?",
    choices: [
      "The supervision system measured exposure but did not establish or verify performance.",
      "The staff member has demonstrated mastery because attendance is high.",
      "The client intervention should be abandoned before staff performance is addressed.",
      "The supervisor should remove all fidelity measures from future trainings.",
    ],
    answer:
      "The supervision system measured exposure but did not establish or verify performance.",
    explanation:
      "Attendance is not the same as [competent implementation]; supervision should verify observable performance.",
    hint:
      "Separate training participation from performance mastery.",
  },
  {
    type: "scenario",
    graphId: "supervision-feedback-thinning",
    prompt:
      "Staff performance decreases after feedback is removed, even though it had previously met criterion. What is the best data-based supervision modification?",
    choices: [
      "Reinstate feedback, thin it gradually, and add maintenance supports such as self-monitoring.",
      "Remove all monitoring because the skill was once mastered.",
      "Switch to punishment because feedback previously worked.",
      "Conclude that the behavior plan is ineffective.",
    ],
    answer:
      "Reinstate feedback, thin it gradually, and add maintenance supports such as self-monitoring.",
    explanation:
      "The graph suggests performance was not maintaining after abrupt support removal, so supervision should include [gradual thinning and maintenance supports].",
    hint:
      "Think about what changed immediately before performance declined.",
  },
  {
    type: "scenario",
    prompt:
      "A technician skips integrity checklist steps because completing them delays access to preferred peer conversation and no one reviews the checklist. Which analysis is strongest?",
    choices: [
      "Competing contingencies and weak performance consequences are affecting staff behavior.",
      "The technician has a pure skill deficit requiring only lecture-based training.",
      "The client procedure has demonstrated external validity.",
      "The checklist steps are unnecessary because the technician is busy.",
    ],
    answer:
      "Competing contingencies and weak performance consequences are affecting staff behavior.",
    explanation:
      "Performance may be affected by [effort, competing tasks, and lack of feedback or reinforcement].",
    hint:
      "Look at the consequences for completing versus skipping the staff response.",
  },
  {
    type: "scenario",
    prompt:
      "A supervisor discovers they delegated a complex assessment task after one observation and no competency check. What is the most ethical next step?",
    choices: [
      "Pause independent delegation, assess competence, provide training as needed, and protect client services.",
      "Continue delegation because the supervisee saw the task once.",
      "Avoid documenting the concern to prevent embarrassment.",
      "Ask the supervisee to train another staff member immediately.",
    ],
    answer:
      "Pause independent delegation, assess competence, provide training as needed, and protect client services.",
    explanation:
      "Ethical supervision requires [verified competence, documentation, and appropriate oversight] before independent implementation.",
    hint:
      "Prioritize client protection and demonstrated competence.",
  },
  {
    type: "scenario",
    prompt:
      "A supervisor assigns complex cases only to staff who share the supervisor's communication style, leaving other qualified staff without advancement opportunities. What is the best response?",
    choices: [
      "Audit assignment patterns, define objective criteria, and correct inequitable access to learning opportunities.",
      "Keep assignments unchanged because the supervisor feels more comfortable.",
      "Lower performance criteria for excluded staff instead of changing access.",
      "Stop tracking assignments to avoid bias concerns.",
    ],
    answer:
      "Audit assignment patterns, define objective criteria, and correct inequitable access to learning opportunities.",
    explanation:
      "Equity barriers should be addressed through [data review, objective criteria, and fair access to opportunities].",
    hint:
      "Look for correcting access barriers while keeping standards objective.",
  },
  {
    type: "scenario",
    prompt:
      "After two weeks of email reminders, staff still omit safety checks because materials are stored in another building and sessions start immediately. Which intervention package best fits?",
    choices: [
      "Move materials to the session location, add a pre-session checklist, and monitor safety-check completion.",
      "Send longer email reminders about safety-check definitions.",
      "Punish omissions without changing material access.",
      "Remove the safety checks from the procedure.",
    ],
    answer:
      "Move materials to the session location, add a pre-session checklist, and monitor safety-check completion.",
    explanation:
      "The best package addresses [resources, task clarification, response effort, and monitoring].",
    hint:
      "Choose the package that changes the conditions blocking correct performance.",
  },
  {
    type: "scenario",
    prompt:
      "A behavior plan is implemented with 98% integrity, but staff still require daily supervisor prompts to complete it. Which conclusion is most accurate?",
    choices: [
      "Treatment integrity is high, but staff performance may not yet maintain without supervisory prompts.",
      "Staff performance has generalized and maintained fully.",
      "The client intervention is ineffective because integrity is high.",
      "Supervisory efficacy cannot be evaluated with staff data.",
    ],
    answer:
      "Treatment integrity is high, but staff performance may not yet maintain without supervisory prompts.",
    explanation:
      "Treatment integrity measures current implementation; staff-performance programming must also evaluate [maintenance without intensive prompts].",
    hint:
      "Distinguish correct implementation now from durable supervisee performance over time.",
  },
  {
    type: "scenario",
    prompt:
      "A supervisee implements FCT accurately with one learner, but fidelity drops when the same procedure is used with a learner who uses a speech-generating device. What is the best next step?",
    choices: [
      "Program generalization with device-specific modeling, rehearsal, feedback, and follow-up probes.",
      "Declare the supervisee incompetent across all FCT procedures.",
      "Stop using speech-generating devices in treatment.",
      "End supervision because one learner context was mastered.",
    ],
    answer:
      "Program generalization with device-specific modeling, rehearsal, feedback, and follow-up probes.",
    explanation:
      "A context-specific drop in fidelity calls for [generalization training across relevant clients, materials, and routines].",
    hint:
      "Look for transfer of staff performance across materials and client contexts.",
  },
  {
    type: "scenario",
    prompt:
      "Supervision data show that staff performance improves only when the supervisor is present, and client outcomes vary when the supervisor is absent. Which decision best evaluates supervisory efficacy?",
    choices: [
      "Collect supervisor-present and supervisor-absent fidelity data, then program maintenance supports if needed.",
      "Use only client outcome averages and stop observing staff.",
      "Assume supervision is effective because performance improves sometimes.",
      "Remove the supervisor immediately to test staff without supports and stop data collection.",
    ],
    answer:
      "Collect supervisor-present and supervisor-absent fidelity data, then program maintenance supports if needed.",
    explanation:
      "Supervisory efficacy should be evaluated with [condition-relevant staff performance data and maintenance planning].",
    hint:
      "Ask whether the data show performance under the conditions that matter.",
  },
];

const moduleContent: Record<string, ModuleContent> = {
  a: {
    miniLessons: [...sectionAMiniLessons, ...sectionAExpandedMiniLessons],
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
    miniLessons: [
      ...sectionCExpandedMiniLessons,
      ...sectionCMeasurementExpansionMiniLessons,
      ...sectionCValidityIntegrityMiniLessons,
    ],
    practiceQuestions: [
      ...sectionCPracticeQuestions,
      ...sectionCMeasurementExpansionPracticeQuestions,
      ...sectionCValidityIntegrityPracticeQuestions,
    ],
    masteryQuestions: [
      ...sectionCMasteryQuestions,
      ...sectionCMeasurementExpansionMasteryQuestions,
      ...sectionCValidityIntegrityMasteryQuestions,
    ],
  },
  d: {
    miniLessons: [
      ...sectionDVariablesAndValidityMiniLessons,
      ...sectionDRelocatedFromCMiniLessons,
      ...sectionDMiniLessons,
      ...sectionDAnalysisApplicationMiniLessons,
      ...sectionDAdditionalMiniLessons,
    ],
    practiceQuestions: excludeMovedModuleDPracticeQuestions([
      ...sectionDRelocatedFromCPracticeQuestions,
      ...sectionDAdditionalPracticeQuestions,
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
        type: "scenario",
        prompt:
          "A researcher needs strong individual-level analysis of one learner's responding across repeated sessions. Which relative design strength is most relevant?",
        choices: [
          "Single-case designs can show change in individual behavior through repeated measurement.",
          "Group designs always show the cause for each individual participant.",
          "Single-case designs avoid the need for repeated data collection.",
          "Group designs are the only designs that can use baseline data.",
        ],
        answer:
          "Single-case designs can show change in individual behavior through repeated measurement.",
        explanation:
          "Design comparison asks learners to distinguish [relative strengths] of single-case and group designs.",
        hint:
          "Focus on whether the question values individual behavior patterns or aggregate group comparisons.",
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
    ]),
    masteryQuestions: [
      ...sectionDRelocatedFromCMasteryQuestions,
      ...sectionDAdditionalMasteryQuestions,
      ...sectionDMovedPracticeMasteryQuestions,
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
        prompt:
          "A BCBA wants to know whether one client's behavior changes when the intervention is introduced, withdrawn, and reintroduced across repeated sessions. Which relative design strength is most relevant?",
        choices: [
          "Single-case designs evaluate individual behavior change through repeated measurement.",
          "Group designs always show experimental control for each participant.",
          "Single-case designs avoid visual analysis.",
          "Group designs replace the need for operational definitions.",
        ],
        answer:
          "Single-case designs evaluate individual behavior change through repeated measurement.",
        explanation:
          "Single-case experimental designs are strong for evaluating [individual behavior patterns across repeated measures].",
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
    miniLessons: [
      ...sectionEMiniLessons,
      ...sectionEExpandedMiniLessons,
      ...sectionETcoMappingMiniLessons,
    ],
    practiceQuestions: [
      ...sectionEPracticeQuestions,
      ...sectionEExpandedPracticeQuestions,
      ...sectionETcoMappingPracticeQuestions,
    ],
    masteryQuestions: [
      ...sectionEMasteryQuestions,
      ...sectionEExpandedMasteryQuestions,
      ...sectionETcoMappingMasteryQuestions,
    ],
  },
  f: {
    miniLessons: [
      ...sectionFMiniLessons,
      ...sectionFExpandedMiniLessons,
      ...sectionFTcoAuditMiniLessons,
    ],
    practiceQuestions: [
      ...sectionFPracticeQuestions,
      ...sectionFExpandedPracticeQuestions,
      ...sectionFAdditionalPracticeQuestions,
      ...sectionFTcoAuditPracticeQuestions,
    ],
    masteryQuestions: [
      ...sectionFMasteryQuestions,
      ...sectionFExpandedMasteryQuestions,
      ...sectionFAdditionalMasteryQuestions,
      ...sectionFTcoAuditMasteryQuestions,
    ],
  },
  g: {
    miniLessons: sectionGMiniLessons,
    practiceQuestions: sectionGPracticeQuestions,
    masteryQuestions: sectionGMasteryQuestions,
  },
  h: {
    miniLessons: sectionHMiniLessons,
    practiceQuestions: sectionHPracticeQuestions,
    masteryQuestions: sectionHMasteryQuestions,
  },
  i: {
    miniLessons: sectionIMiniLessons,
    practiceQuestions: sectionIPracticeQuestions,
    masteryQuestions: sectionIMasteryQuestions,
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
