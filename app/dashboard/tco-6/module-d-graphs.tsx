export type ModuleDGraphId =
  | "measurement-level-change"
  | "measurement-variable-trend"
  | "reversal-aba"
  | "reversal-positive-attention"
  | "reversal-pvr"
  | "multiple-baseline-participants"
  | "multiple-baseline-settings"
  | "multiple-baseline-problem-behavior"
  | "alternating-standard"
  | "alternating-academic-skills"
  | "multielement-functional-analysis"
  | "changing-criterion-on-task"
  | "changing-criterion-smoking"
  | "changing-criterion-stacked"
  | "withdrawal-problem-behavior"
  | "withdrawal-aba"
  | "withdrawal-beginner"
  | "supervision-bst-fidelity"
  | "supervision-generalization-drop"
  | "supervision-attendance-low-integrity"
  | "supervision-feedback-thinning"
  | "supervision-integrity-client-outcome";

type GraphTone = "blue" | "teal" | "purple" | "green" | "slate";

type DataPoint = {
  x: number;
  y: number;
};

type GraphSeries = {
  label: string;
  points: DataPoint[];
  tone: GraphTone;
  dashed?: boolean;
  marker?: "circle" | "square" | "triangle" | "diamond";
};

type GraphPhase = {
  label: string;
  start: number;
  end: number;
};

type CriterionLine = {
  label?: string;
  start: number;
  end: number;
  value: number;
};

type GraphCallout = {
  label: string;
  x: number;
  y: number;
  tone: GraphTone;
};

type GraphPanel = {
  criteria?: CriterionLine[];
  phases?: GraphPhase[];
  series: GraphSeries[];
  title?: string;
  yLabel: string;
  yMax: number;
  yMin?: number;
};

type ModuleDGraphExample = {
  callouts?: GraphCallout[];
  description: string;
  id: ModuleDGraphId;
  panels: GraphPanel[];
  title: string;
};

const toneStyles: Record<GraphTone, { line: string; soft: string; text: string }> = {
  blue: { line: "#2563eb", soft: "#dbeafe", text: "#1d4ed8" },
  green: { line: "#16a34a", soft: "#dcfce7", text: "#15803d" },
  teal: { line: "#0d9488", soft: "#ccfbf1", text: "#0f766e" },
  purple: { line: "#9333ea", soft: "#f3e8ff", text: "#7e22ce" },
  slate: { line: "#0f172a", soft: "#e2e8f0", text: "#0f172a" },
};

export const moduleDGraphExamples: Record<ModuleDGraphId, ModuleDGraphExample> = {
  "measurement-level-change": {
    id: "measurement-level-change",
    title: "Measurement Data Pattern",
    description:
      "A neutral repeated-measurement graph for interpreting level, trend, variability, overlap, and immediacy.",
    panels: [
      {
        yLabel: "Responses per session",
        yMax: 20,
        phases: [
          { label: "Initial condition", start: 1, end: 5 },
          { label: "Changed condition", start: 6, end: 10 },
        ],
        series: [
          {
            label: "Measured behavior",
            tone: "slate",
            marker: "circle",
            points: [
              { x: 1, y: 15 },
              { x: 2, y: 16 },
              { x: 3, y: 15 },
              { x: 4, y: 14 },
              { x: 5, y: 15 },
              { x: 6, y: 7 },
              { x: 7, y: 6 },
              { x: 8, y: 5 },
              { x: 9, y: 6 },
              { x: 10, y: 5 },
            ],
          },
        ],
      },
    ],
  },
  "measurement-variable-trend": {
    id: "measurement-variable-trend",
    title: "Variable Measurement Data",
    description:
      "A neutral repeated-measurement graph for interpreting variable data and unclear trends.",
    panels: [
      {
        yLabel: "Responses per session",
        yMax: 30,
        phases: [
          { label: "Initial condition", start: 1, end: 5 },
          { label: "Changed condition", start: 6, end: 10 },
        ],
        series: [
          {
            label: "Measured behavior",
            tone: "slate",
            marker: "square",
            points: [
              { x: 1, y: 14 },
              { x: 2, y: 23 },
              { x: 3, y: 11 },
              { x: 4, y: 20 },
              { x: 5, y: 16 },
              { x: 6, y: 18 },
              { x: 7, y: 12 },
              { x: 8, y: 21 },
              { x: 9, y: 15 },
              { x: 10, y: 19 },
            ],
          },
        ],
      },
    ],
  },
  "supervision-bst-fidelity": {
    id: "supervision-bst-fidelity",
    title: "Supervisee Procedural Integrity",
    description:
      "A supervision graph showing fidelity before and after active performance training.",
    panels: [
      {
        yLabel: "Procedural integrity (%)",
        yMax: 100,
        phases: [
          { label: "Baseline", start: 1, end: 3 },
          { label: "BST", start: 4, end: 8 },
        ],
        series: [
          {
            label: "Implementation fidelity",
            tone: "slate",
            marker: "circle",
            points: [
              { x: 1, y: 38 },
              { x: 2, y: 44 },
              { x: 3, y: 41 },
              { x: 4, y: 72 },
              { x: 5, y: 84 },
              { x: 6, y: 92 },
              { x: 7, y: 94 },
              { x: 8, y: 95 },
            ],
          },
        ],
      },
    ],
  },
  "supervision-generalization-drop": {
    id: "supervision-generalization-drop",
    title: "Supervisee Performance Across Contexts",
    description:
      "A supervision graph showing role-play mastery with lower in-vivo generalization.",
    panels: [
      {
        yLabel: "Procedural integrity (%)",
        yMax: 100,
        phases: [
          { label: "Role play", start: 1, end: 4 },
          { label: "New client", start: 5, end: 8 },
        ],
        series: [
          {
            label: "Implementation fidelity",
            tone: "slate",
            marker: "square",
            points: [
              { x: 1, y: 76 },
              { x: 2, y: 86 },
              { x: 3, y: 94 },
              { x: 4, y: 96 },
              { x: 5, y: 58 },
              { x: 6, y: 62 },
              { x: 7, y: 68 },
              { x: 8, y: 71 },
            ],
          },
        ],
      },
    ],
  },
  "supervision-attendance-low-integrity": {
    id: "supervision-attendance-low-integrity",
    title: "Training Attendance and Fidelity",
    description:
      "A supervision graph comparing attendance with implementation integrity.",
    panels: [
      {
        yLabel: "Percent",
        yMax: 100,
        phases: [{ label: "Training period", start: 1, end: 8 }],
        series: [
          {
            label: "Training attendance",
            tone: "slate",
            marker: "circle",
            points: [
              { x: 1, y: 95 },
              { x: 2, y: 100 },
              { x: 3, y: 95 },
              { x: 4, y: 100 },
              { x: 5, y: 95 },
              { x: 6, y: 100 },
              { x: 7, y: 95 },
              { x: 8, y: 100 },
            ],
          },
          {
            label: "Implementation fidelity",
            tone: "slate",
            marker: "triangle",
            dashed: true,
            points: [
              { x: 1, y: 42 },
              { x: 2, y: 45 },
              { x: 3, y: 39 },
              { x: 4, y: 46 },
              { x: 5, y: 43 },
              { x: 6, y: 48 },
              { x: 7, y: 41 },
              { x: 8, y: 44 },
            ],
          },
        ],
      },
    ],
  },
  "supervision-feedback-thinning": {
    id: "supervision-feedback-thinning",
    title: "Feedback Schedule and Staff Performance",
    description:
      "A supervision graph showing staff performance after feedback is abruptly removed.",
    panels: [
      {
        yLabel: "Procedural integrity (%)",
        yMax: 100,
        phases: [
          { label: "Frequent feedback", start: 1, end: 4 },
          { label: "No feedback", start: 5, end: 8 },
        ],
        series: [
          {
            label: "Implementation fidelity",
            tone: "slate",
            marker: "diamond",
            points: [
              { x: 1, y: 62 },
              { x: 2, y: 74 },
              { x: 3, y: 86 },
              { x: 4, y: 91 },
              { x: 5, y: 78 },
              { x: 6, y: 70 },
              { x: 7, y: 66 },
              { x: 8, y: 64 },
            ],
          },
        ],
      },
    ],
  },
  "supervision-integrity-client-outcome": {
    id: "supervision-integrity-client-outcome",
    title: "Integrity and Client Outcome Data",
    description:
      "A supervision graph comparing staff fidelity and client outcome data.",
    panels: [
      {
        yLabel: "Percent / rate",
        yMax: 100,
        phases: [
          { label: "Baseline", start: 1, end: 3 },
          { label: "Supervision support", start: 4, end: 8 },
        ],
        series: [
          {
            label: "Implementation fidelity",
            tone: "slate",
            marker: "circle",
            points: [
              { x: 1, y: 52 },
              { x: 2, y: 56 },
              { x: 3, y: 54 },
              { x: 4, y: 82 },
              { x: 5, y: 90 },
              { x: 6, y: 94 },
              { x: 7, y: 95 },
              { x: 8, y: 96 },
            ],
          },
          {
            label: "Client target behavior",
            tone: "slate",
            marker: "square",
            dashed: true,
            points: [
              { x: 1, y: 72 },
              { x: 2, y: 70 },
              { x: 3, y: 74 },
              { x: 4, y: 73 },
              { x: 5, y: 71 },
              { x: 6, y: 72 },
              { x: 7, y: 73 },
              { x: 8, y: 74 },
            ],
          },
        ],
      },
    ],
  },
  "reversal-aba": {
    id: "reversal-aba",
    title: "A-B-A Reversal Design",
    description:
      "Stable baseline, clear behavior change during intervention, and return toward baseline when intervention is removed.",
    panels: [
      {
        yLabel: "Responses per session",
        yMax: 20,
        phases: [
          { label: "A - Baseline", start: 1, end: 4 },
          { label: "B - Intervention", start: 5, end: 8 },
          { label: "A - Return to Baseline", start: 9, end: 12 },
        ],
        series: [
          {
            label: "Target behavior",
            tone: "blue",
            marker: "circle",
            points: [
              { x: 1, y: 6 },
              { x: 2, y: 7 },
              { x: 3, y: 6 },
              { x: 4, y: 7 },
              { x: 5, y: 12 },
              { x: 6, y: 15 },
              { x: 7, y: 16 },
              { x: 8, y: 15 },
              { x: 9, y: 9 },
              { x: 10, y: 7 },
              { x: 11, y: 6 },
              { x: 12, y: 7 },
            ],
          },
        ],
      },
    ],
  },
  "reversal-positive-attention": {
    id: "reversal-positive-attention",
    title: "A-B-A-B Reversal Design With Positive Attention",
    description:
      "Study behavior increases when positive attention is introduced, decreases when removed, and increases again when reintroduced.",
    panels: [
      {
        yLabel: "Minutes studying",
        yMax: 40,
        phases: [
          { label: "A - Baseline", start: 1, end: 3 },
          { label: "B - Positive Attention", start: 4, end: 6 },
          { label: "A - Baseline", start: 7, end: 9 },
          { label: "B - Positive Attention", start: 10, end: 12 },
        ],
        series: [
          {
            label: "Study behavior",
            tone: "purple",
            marker: "circle",
            points: [
              { x: 1, y: 8 },
              { x: 2, y: 7 },
              { x: 3, y: 9 },
              { x: 4, y: 20 },
              { x: 5, y: 27 },
              { x: 6, y: 31 },
              { x: 7, y: 15 },
              { x: 8, y: 10 },
              { x: 9, y: 9 },
              { x: 10, y: 23 },
              { x: 11, y: 30 },
              { x: 12, y: 34 },
            ],
          },
        ],
      },
    ],
  },
  "reversal-pvr": {
    id: "reversal-pvr",
    title: "A-B-A-B Withdrawal Design",
    description:
      "A1 predicts baseline responding, A2 verifies the prediction, and B2 replicates the intervention effect.",
    callouts: [
      { label: "Prediction", x: 3, y: 7, tone: "blue" },
      { label: "Verification", x: 8, y: 8, tone: "teal" },
      { label: "Replication", x: 11, y: 22, tone: "green" },
    ],
    panels: [
      {
        yLabel: "Correct responses",
        yMax: 30,
        phases: [
          { label: "A1 - Baseline", start: 1, end: 3 },
          { label: "B1 - Intervention", start: 4, end: 6 },
          { label: "A2 - Withdrawal", start: 7, end: 9 },
          { label: "B2 - Reintroduction", start: 10, end: 12 },
        ],
        series: [
          {
            label: "Skill performance",
            tone: "green",
            marker: "circle",
            points: [
              { x: 1, y: 6 },
              { x: 2, y: 7 },
              { x: 3, y: 6 },
              { x: 4, y: 13 },
              { x: 5, y: 19 },
              { x: 6, y: 23 },
              { x: 7, y: 14 },
              { x: 8, y: 9 },
              { x: 9, y: 8 },
              { x: 10, y: 16 },
              { x: 11, y: 23 },
              { x: 12, y: 25 },
            ],
          },
        ],
      },
    ],
  },
  "multiple-baseline-participants": {
    id: "multiple-baseline-participants",
    title: "Multiple Baseline Across Participants",
    description:
      "Intervention is introduced at staggered sessions. Each participant changes only after intervention begins.",
    panels: [
      multipleBaselinePanel("Participant 1", 4, [3, 4, 4, 10, 14, 16, 17, 18, 18], "Correct responses"),
      multipleBaselinePanel("Participant 2", 6, [4, 4, 3, 4, 5, 12, 15, 17, 18], "Correct responses"),
      multipleBaselinePanel("Participant 3", 8, [3, 4, 4, 3, 4, 4, 5, 13, 16], "Correct responses"),
    ],
  },
  "multiple-baseline-settings": {
    id: "multiple-baseline-settings",
    title: "Multiple Baseline Across Settings",
    description:
      "Behavior improves in each setting only after intervention begins in that setting.",
    panels: [
      multipleBaselinePanel("General Education Classroom", 3, [25, 26, 34, 42, 47, 50, 52, 53], "On-task behavior (%)", 60),
      multipleBaselinePanel("Playground", 5, [22, 21, 23, 22, 33, 41, 48, 51], "On-task behavior (%)", 60),
      multipleBaselinePanel("Small Group Classroom", 7, [24, 25, 23, 24, 25, 24, 39, 48], "On-task behavior (%)", 60),
    ],
  },
  "multiple-baseline-problem-behavior": {
    id: "multiple-baseline-problem-behavior",
    title: "Multiple Baseline With Decreasing Problem Behavior",
    description:
      "Problem behavior remains elevated during baseline and decreases only after intervention begins in each tier.",
    panels: [
      multipleBaselinePanel("Tier 1: Early Intervention", 4, [16, 15, 17, 9, 6, 5, 4, 4, 3], "Problem behavior", 20),
      multipleBaselinePanel("Tier 2: Middle Intervention", 6, [15, 16, 15, 16, 14, 8, 6, 5, 4], "Problem behavior", 20),
      multipleBaselinePanel("Tier 3: Late Intervention", 8, [17, 16, 15, 17, 16, 15, 16, 9, 5], "Problem behavior", 20),
    ],
  },
  "alternating-standard": {
    id: "alternating-standard",
    title: "Alternating Treatments Comparison",
    description:
      "Rapidly alternated conditions show clear separation between Intervention A and Intervention B.",
    panels: [
      {
        yLabel: "Responses per session",
        yMax: 30,
        series: [
          series("Baseline", "slate", [6, 7, 6, 7, 6, 7], "circle", true),
          series("Intervention A", "blue", [12, 14, 15, 16, 17, 18], "square"),
          series("Intervention B", "teal", [20, 22, 23, 25, 26, 27], "triangle"),
        ],
      },
    ],
  },
  "alternating-academic-skills": {
    id: "alternating-academic-skills",
    title: "Adapted Alternating Treatments for Academic Skills",
    description:
      "Control word set remains flat, one intervention improves slowly, and one improves more quickly.",
    panels: [
      {
        yLabel: "Words read correctly",
        yMax: 50,
        series: [
          series("Control Word Set", "slate", [5, 5, 6, 5, 6, 6, 5], "circle", true),
          series("Intervention A Word Set", "blue", [8, 11, 15, 19, 22, 25, 28], "square"),
          series("Intervention B Word Set", "purple", [9, 16, 24, 31, 38, 43, 47], "diamond"),
        ],
      },
    ],
  },
  "multielement-functional-analysis": {
    id: "multielement-functional-analysis",
    title: "Functional Analysis / Multielement Comparison",
    description:
      "One functional analysis condition clearly produces the highest responding.",
    panels: [
      {
        yLabel: "Problem behavior per minute",
        yMax: 12,
        series: [
          series("Attention", "teal", [8, 9, 8, 10, 9, 11], "circle"),
          series("Alone", "purple", [2, 2, 3, 2, 2, 3], "square", true),
          series("Demand", "blue", [4, 5, 4, 5, 4, 5], "triangle"),
          series("Control", "green", [1, 1, 0, 1, 1, 0], "diamond"),
        ],
      },
    ],
  },
  "changing-criterion-on-task": {
    id: "changing-criterion-on-task",
    title: "Changing Criterion With Increasing Performance Criteria",
    description:
      "Data closely track increasing criterion lines across phases.",
    panels: [
      {
        yLabel: "On-task duration (minutes)",
        yMax: 18,
        phases: criterionPhases(["Baseline", "3 min", "4 min", "5 min", "6 min", "8 min", "10 min", "15 min"], 3),
        criteria: criteriaFromValues([3, 4, 5, 6, 8, 10, 15], 4, 2),
        series: [
          {
            label: "Duration",
            tone: "blue",
            marker: "circle",
            points: [
              { x: 1, y: 2 },
              { x: 2, y: 2 },
              { x: 3, y: 2 },
              { x: 4, y: 3 },
              { x: 5, y: 3 },
              { x: 6, y: 4 },
              { x: 7, y: 4 },
              { x: 8, y: 5 },
              { x: 9, y: 5 },
              { x: 10, y: 6 },
              { x: 11, y: 6 },
              { x: 12, y: 8 },
              { x: 13, y: 8 },
              { x: 14, y: 10 },
              { x: 15, y: 10 },
              { x: 16, y: 14 },
              { x: 17, y: 15 },
            ],
          },
        ],
      },
    ],
  },
  "changing-criterion-smoking": {
    id: "changing-criterion-smoking",
    title: "Changing Criterion With Decreasing Performance Criteria",
    description:
      "Criteria gradually decrease and daily cigarettes follow each criterion step.",
    panels: [
      {
        yLabel: "Number of cigarettes per day",
        yMax: 30,
        phases: criterionPhases(["Baseline", "24/day", "20/day", "16/day", "12/day", "8/day"], 3),
        criteria: criteriaFromValues([24, 20, 16, 12, 8], 4, 2),
        series: [
          {
            label: "Cigarettes",
            tone: "teal",
            marker: "circle",
            points: [
              { x: 1, y: 27 },
              { x: 2, y: 26 },
              { x: 3, y: 28 },
              { x: 4, y: 24 },
              { x: 5, y: 25 },
              { x: 6, y: 20 },
              { x: 7, y: 20 },
              { x: 8, y: 16 },
              { x: 9, y: 17 },
              { x: 10, y: 12 },
              { x: 11, y: 12 },
              { x: 12, y: 8 },
              { x: 13, y: 8 },
            ],
          },
        ],
      },
    ],
  },
  "changing-criterion-stacked": {
    id: "changing-criterion-stacked",
    title: "Changing Criterion With Percent of Days Criterion Met",
    description:
      "Each panel stays low until its criterion is introduced, then increases.",
    panels: [
      criterionPanel("Criterion 1", [10, 15, 78, 84, 88, 91]),
      criterionPanel("Criterion 2", [8, 10, 12, 76, 82, 87]),
      criterionPanel("Criterion 3", [6, 8, 9, 12, 74, 83]),
      criterionPanel("Criterion 4", [5, 6, 7, 8, 10, 79]),
    ],
  },
  "withdrawal-problem-behavior": {
    id: "withdrawal-problem-behavior",
    title: "A-B-A-B Withdrawal Design for Problem Behavior",
    description:
      "Problem behavior is high in baseline, low during intervention, high when withdrawn, and low again when reintroduced.",
    panels: [
      {
        yLabel: "Problem behavior",
        yMax: 25,
        phases: [
          { label: "A1 - Baseline", start: 1, end: 3 },
          { label: "B1 - Intervention", start: 4, end: 6 },
          { label: "A2 - Withdrawal", start: 7, end: 9 },
          { label: "B2 - Intervention", start: 10, end: 12 },
        ],
        series: [
          {
            label: "Problem behavior",
            tone: "teal",
            marker: "circle",
            points: [
              { x: 1, y: 19 },
              { x: 2, y: 20 },
              { x: 3, y: 18 },
              { x: 4, y: 9 },
              { x: 5, y: 5 },
              { x: 6, y: 4 },
              { x: 7, y: 13 },
              { x: 8, y: 18 },
              { x: 9, y: 20 },
              { x: 10, y: 10 },
              { x: 11, y: 5 },
              { x: 12, y: 4 },
            ],
          },
        ],
      },
    ],
  },
  "withdrawal-aba": {
    id: "withdrawal-aba",
    title: "A-B-A Withdrawal Design With Return to Baseline",
    description:
      "Behavior changes during treatment and returns toward baseline when treatment is removed.",
    panels: [
      {
        yLabel: "Target behavior",
        yMax: 20,
        phases: [
          { label: "A - Baseline", start: 1, end: 4 },
          { label: "B - Treatment", start: 5, end: 8 },
          { label: "A - Treatment Removed", start: 9, end: 12 },
        ],
        series: [
          {
            label: "Target behavior",
            tone: "purple",
            marker: "circle",
            points: [
              { x: 1, y: 5 },
              { x: 2, y: 6 },
              { x: 3, y: 5 },
              { x: 4, y: 6 },
              { x: 5, y: 11 },
              { x: 6, y: 15 },
              { x: 7, y: 16 },
              { x: 8, y: 15 },
              { x: 9, y: 11 },
              { x: 10, y: 8 },
              { x: 11, y: 6 },
              { x: 12, y: 6 },
            ],
          },
        ],
      },
    ],
  },
  "withdrawal-beginner": {
    id: "withdrawal-beginner",
    title: "Withdrawal Design Identification Practice",
    description:
      "A simple three-phase withdrawal graph for design identification practice.",
    panels: [
      {
        yLabel: "Behavior rate",
        yMax: 15,
        phases: [
          { label: "Baseline data recorded", start: 1, end: 3 },
          { label: "Intervention introduced", start: 4, end: 6 },
          { label: "Intervention withdrawn", start: 7, end: 9 },
        ],
        series: [
          {
            label: "Behavior rate",
            tone: "blue",
            marker: "circle",
            points: [
              { x: 1, y: 4 },
              { x: 2, y: 5 },
              { x: 3, y: 4 },
              { x: 4, y: 9 },
              { x: 5, y: 12 },
              { x: 6, y: 12 },
              { x: 7, y: 8 },
              { x: 8, y: 5 },
              { x: 9, y: 4 },
            ],
          },
        ],
      },
    ],
  },
};

function multipleBaselinePanel(
  title: string,
  interventionStart: number,
  values: number[],
  yLabel: string,
  yMax = 20,
): GraphPanel {
  return {
    title,
    yLabel,
    yMax,
    phases: [
      { label: "Baseline", start: 1, end: interventionStart - 1 },
      { label: "Intervention", start: interventionStart, end: values.length },
    ],
    series: [
      {
        label: title,
        tone: "blue",
        marker: "circle",
        points: values.map((y, index) => ({ x: index + 1, y })),
      },
    ],
  };
}

function series(
  label: string,
  tone: GraphTone,
  values: number[],
  marker: GraphSeries["marker"],
  dashed = false,
): GraphSeries {
  return {
    dashed,
    label,
    marker,
    points: values.map((y, index) => ({ x: index + 1, y })),
    tone,
  };
}

function criterionPhases(labels: string[], baselineLength: number): GraphPhase[] {
  return labels.map((label, index) => {
    if (index === 0) {
      return { label, start: 1, end: baselineLength };
    }

    const start = baselineLength + 1 + (index - 1) * 2;
    return { label, start, end: start + 1 };
  });
}

function criteriaFromValues(
  values: number[],
  firstSession: number,
  phaseLength: number,
): CriterionLine[] {
  return values.map((value, index) => {
    const start = firstSession + index * phaseLength;
    return {
      end: start + phaseLength - 1,
      label: `${value}`,
      start,
      value,
    };
  });
}

function criterionPanel(title: string, values: number[]): GraphPanel {
  return {
    title,
    yLabel: "% days criterion met",
    yMax: 100,
    phases: [
      { label: "Before criterion", start: 1, end: 2 },
      { label: "Criterion introduced", start: 3, end: values.length },
    ],
    series: [
      {
        label: title,
        marker: "circle",
        points: values.map((y, index) => ({ x: index + 1, y })),
        tone: "green",
      },
    ],
  };
}

export function GraphCard({
  className = "",
  genericPanelLabels = false,
  graphId,
  hideCallouts = false,
  monochrome = false,
  titleOverride,
  hideDescription = false,
}: {
  className?: string;
  genericPanelLabels?: boolean;
  graphId: string;
  hideCallouts?: boolean;
  hideDescription?: boolean;
  monochrome?: boolean;
  titleOverride?: string;
}) {
  const graph = moduleDGraphExamples[graphId as ModuleDGraphId];

  if (!graph) {
    return null;
  }

  return (
    <section
      className={`mx-auto w-full max-w-5xl rounded-3xl border border-white/70 bg-white/95 p-5 text-center shadow-sm ${className}`}
    >
      <div className="text-center">
        <h3 className="text-2xl font-black text-slate-950">
          {titleOverride ?? graph.title}
        </h3>
        {hideDescription ? null : (
          <p className="mx-auto mt-2 max-w-3xl text-sm font-semibold leading-6 text-slate-950">
            {graph.description}
          </p>
        )}
      </div>

      <div className="mx-auto mt-5 grid w-full max-w-4xl place-items-center gap-4">
        {graph.panels.map((panel, index) => (
          <GraphPanelView
            key={`${graph.id}-${panel.title ?? index}`}
            callouts={!hideCallouts && index === 0 ? graph.callouts : undefined}
            genericPanelLabels={genericPanelLabels}
            monochrome={monochrome}
            panel={panel}
            panelIndex={index}
          />
        ))}
      </div>
    </section>
  );
}

function GraphPanelView({
  callouts,
  genericPanelLabels,
  monochrome,
  panel,
  panelIndex,
}: {
  callouts?: GraphCallout[];
  genericPanelLabels: boolean;
  monochrome: boolean;
  panel: GraphPanel;
  panelIndex: number;
}) {
  const allPoints = panel.series.flatMap((item) => item.points);
  const maxX = Math.max(...allPoints.map((point) => point.x), 1);
  const minX = Math.min(...allPoints.map((point) => point.x), 1);
  const yMin = panel.yMin ?? 0;
  const yMax = panel.yMax;
  const width = 720;
  const panelTitle = genericPanelLabels
    ? `Panel ${panelIndex + 1}`
    : panel.title;
  const height = panelTitle ? 230 : 260;
  const margin = { bottom: 44, left: 66, right: 26, top: 38 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const xScale = (value: number) =>
    margin.left + ((value - minX) / Math.max(maxX - minX, 1)) * plotWidth;
  const yScale = (value: number) =>
    margin.top + ((yMax - value) / Math.max(yMax - yMin, 1)) * plotHeight;

  return (
    <div className="mx-auto w-full max-w-4xl rounded-3xl border border-slate-200 bg-slate-50 p-4">
      {panelTitle ? (
        <p className="mb-2 text-center text-sm font-black uppercase tracking-wide text-slate-950">
          {panelTitle}
        </p>
      ) : null}
      <svg
        aria-label={`Graph panel ${panelIndex + 1} showing ${panel.yLabel} across sessions`}
        className="mx-auto block h-auto w-full overflow-visible"
        role="img"
        viewBox={`0 0 ${width} ${height}`}
      >
        <rect
          x={margin.left}
          y={margin.top}
          width={plotWidth}
          height={plotHeight}
          rx="14"
          fill="#ffffff"
          stroke="#e2e8f0"
        />

        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const y = margin.top + ratio * plotHeight;
          const value = Math.round(yMax - ratio * (yMax - yMin));
          return (
            <g key={ratio}>
              <line
                x1={margin.left}
                x2={margin.left + plotWidth}
                y1={y}
                y2={y}
                stroke="#e2e8f0"
                strokeDasharray="4 6"
              />
              <text
                x={margin.left - 12}
                y={y + 5}
                textAnchor="end"
                className="fill-slate-700 text-[12px] font-bold"
              >
                {value}
              </text>
            </g>
          );
        })}

        {(panel.phases ?? []).map((phase, index) => {
          const startX = xScale(phase.start);
          const endX = xScale(phase.end);
          const labelX = (startX + endX) / 2;
          return (
            <g key={`${phase.label}-${phase.start}`}>
              {index > 0 ? (
                <line
                  x1={startX}
                  x2={startX}
                  y1={margin.top - 4}
                  y2={margin.top + plotHeight}
                  stroke="#64748b"
                  strokeDasharray="5 5"
                  strokeWidth="2"
                />
              ) : null}
              <text
                x={labelX}
                y={margin.top - 12}
                textAnchor="middle"
                className="fill-slate-950 text-[12px] font-black"
              >
                {phase.label}
              </text>
            </g>
          );
        })}

        {(panel.criteria ?? []).map((criterion) => (
          <g key={`${criterion.start}-${criterion.value}`}>
            <line
              x1={xScale(criterion.start)}
              x2={xScale(criterion.end)}
              y1={yScale(criterion.value)}
              y2={yScale(criterion.value)}
              stroke={monochrome ? "#0f172a" : toneStyles.teal.line}
              strokeDasharray="8 5"
              strokeWidth="3"
            />
            {criterion.label ? (
              <text
                x={xScale(criterion.start)}
                y={yScale(criterion.value) - 7}
                className={`text-[12px] font-black ${
                  monochrome ? "fill-slate-950" : "fill-teal-700"
                }`}
              >
                {criterion.label}
              </text>
            ) : null}
          </g>
        ))}

        {panel.series.map((item, index) => (
          <g key={item.label}>
            <polyline
              fill="none"
              points={item.points
                .map((point) => `${xScale(point.x)},${yScale(point.y)}`)
                .join(" ")}
              stroke={monochrome ? "#0f172a" : toneStyles[item.tone].line}
              strokeDasharray={
                item.dashed
                  ? "8 7"
                  : monochrome && index % 3 === 2
                    ? "2 7"
                    : undefined
              }
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
            />
            {item.points.map((point) => (
              <Marker
                key={`${item.label}-${point.x}`}
                cx={xScale(point.x)}
                cy={yScale(point.y)}
                marker={item.marker ?? "circle"}
                monochrome={monochrome}
                tone={item.tone}
              />
            ))}
          </g>
        ))}

        {(callouts ?? []).map((callout) => (
          <g key={callout.label}>
            <line
              x1={xScale(callout.x)}
              x2={xScale(callout.x)}
              y1={yScale(callout.y) - 36}
              y2={yScale(callout.y) - 8}
              stroke={monochrome ? "#0f172a" : toneStyles[callout.tone].line}
              strokeWidth="2"
            />
            <rect
              x={xScale(callout.x) - 52}
              y={yScale(callout.y) - 62}
              width="104"
              height="28"
              rx="10"
              fill={monochrome ? "#ffffff" : toneStyles[callout.tone].soft}
              stroke={monochrome ? "#0f172a" : toneStyles[callout.tone].line}
            />
            <text
              x={xScale(callout.x)}
              y={yScale(callout.y) - 43}
              textAnchor="middle"
              className="fill-slate-950 text-[11px] font-black"
            >
              {callout.label}
            </text>
          </g>
        ))}

        <line
          x1={margin.left}
          x2={margin.left}
          y1={margin.top}
          y2={margin.top + plotHeight}
          stroke="#0f172a"
          strokeWidth="2"
        />
        <line
          x1={margin.left}
          x2={margin.left + plotWidth}
          y1={margin.top + plotHeight}
          y2={margin.top + plotHeight}
          stroke="#0f172a"
          strokeWidth="2"
        />
        <text
          x={margin.left + plotWidth / 2}
          y={height - 9}
          textAnchor="middle"
          className="fill-slate-950 text-[14px] font-black"
        >
          Sessions
        </text>
        <text
          x="18"
          y={margin.top + plotHeight / 2}
          textAnchor="middle"
          transform={`rotate(-90 18 ${margin.top + plotHeight / 2})`}
          className="fill-slate-950 text-[14px] font-black"
        >
          {panel.yLabel}
        </text>
      </svg>

      <div className="mt-3 flex flex-wrap justify-center gap-3">
        {panel.series.map((item) => (
          <span
            key={item.label}
            className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-black text-slate-950"
          >
            <LegendMarker
              marker={item.marker ?? "circle"}
              monochrome={monochrome}
              tone={item.tone}
            />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function Marker({
  cx,
  cy,
  marker,
  monochrome,
  tone,
}: {
  cx: number;
  cy: number;
  marker: NonNullable<GraphSeries["marker"]>;
  monochrome: boolean;
  tone: GraphTone;
}) {
  const fill = monochrome ? "#0f172a" : toneStyles[tone].line;

  if (marker === "square") {
    return <rect x={cx - 5} y={cy - 5} width="10" height="10" rx="2" fill={fill} />;
  }

  if (marker === "triangle") {
    return (
      <polygon
        points={`${cx},${cy - 6} ${cx - 6},${cy + 5} ${cx + 6},${cy + 5}`}
        fill={fill}
      />
    );
  }

  if (marker === "diamond") {
    return (
      <polygon
        points={`${cx},${cy - 7} ${cx - 7},${cy} ${cx},${cy + 7} ${cx + 7},${cy}`}
        fill={fill}
      />
    );
  }

  return <circle cx={cx} cy={cy} r="5.5" fill={fill} />;
}

function LegendMarker({
  marker,
  monochrome,
  tone,
}: {
  marker: NonNullable<GraphSeries["marker"]>;
  monochrome: boolean;
  tone: GraphTone;
}) {
  const fill = monochrome ? "#0f172a" : toneStyles[tone].line;
  const baseClass = "inline-block h-3 w-3 shrink-0";

  if (marker === "square") {
    return <span className={`${baseClass} rounded-[3px]`} style={{ backgroundColor: fill }} />;
  }

  if (marker === "triangle") {
    return (
      <span
        className={`${baseClass} [clip-path:polygon(50%_0,0_100%,100%_100%)]`}
        style={{ backgroundColor: fill }}
      />
    );
  }

  if (marker === "diamond") {
    return (
      <span
        className={`${baseClass} rotate-45 rounded-[2px]`}
        style={{ backgroundColor: fill }}
      />
    );
  }

  return <span className={`${baseClass} rounded-full`} style={{ backgroundColor: fill }} />;
}
