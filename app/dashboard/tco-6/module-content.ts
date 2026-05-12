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
      prompt: "Match each assumption to its key distinction.",
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
        { label: "Withdrawal", detail: "[Intervention is removed].", tone: "pink" },
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
        { label: "A1 - Baseline", detail: "[High baseline] problem behavior.", tone: "pink" },
        { label: "B1 - Intervention", detail: "[Low behavior] during intervention.", tone: "green" },
        { label: "A2 - Withdrawal", detail: "Behavior increases [after withdrawal].", tone: "pink" },
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
        { label: "Verification", detail: "A2 tests [the baseline prediction again].", tone: "pink" },
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
        { label: "Participant 3", detail: "Latest intervention and latest behavior change.", tone: "pink" },
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
        { label: "Small Group", detail: "Intervention begins last.", tone: "pink" },
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
        { label: "Behavior 3", detail: "Changes after late intervention.", tone: "pink" },
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
        { label: "Intervention B", detail: "Improves more quickly.", tone: "pink" },
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
        { label: "Criteria", detail: "Horizontal criterion lines change by phase.", tone: "pink" },
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
        { label: "High baseline", detail: "Initial level is elevated.", tone: "pink" },
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
        { label: "Variability", detail: "How much do data [bounce around]?", tone: "pink" },
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
        { label: "Overlap", detail: "How much phases [share the same data range].", tone: "pink" },
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
        { label: "Verification", detail: "Return to baseline [tests the prediction].", tone: "pink" },
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
        { label: "Intervention B", detail: "Another condition produces [a second data path].", tone: "pink" },
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
        prompt: "Match each philosophical assumption to its key distinction.",
        pairs: [
          { term: "Selectionism", definition: "Behavior is shaped across consequences and history." },
          { term: "Empiricism", definition: "Knowledge comes from objective observation." },
          { term: "Parsimony", definition: "Start with the simplest adequate explanation." },
        ],
        answer: "All terms matched to their definitions",
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
        answer: "All descriptions sorted correctly",
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
        prompt: "Complete the statement: Empiricism means decisions are based on ____.",
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
        prompt: "Complete the statement: Cultural humility requires ongoing self-____.",
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
        prompt: "Match each ethics term to its definition.",
        pairs: [
          { term: "Competence", definition: "Practice within training and experience." },
          { term: "Confidentiality", definition: "Protect identifying information." },
          { term: "Cultural humility", definition: "Ongoing self-reflection and responsiveness." },
        ],
        answer: "All ethics terms matched correctly",
        explanation:
          "These definitions help discriminate common ethics concepts on exam scenarios.",
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
