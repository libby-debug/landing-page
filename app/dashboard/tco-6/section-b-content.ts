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
      "A neutral stimulus becomes a conditioned stimulus [after pairing].",
    ],
    visual: {
      type: "flow",
      prompt: "What is the correct sequence in respondent conditioning?",
      steps: [
        "Neutral stimulus",
        "Paired with unconditioned stimulus",
        "Conditioned stimulus",
        "Conditioned response",
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
    title: "Pavlovian vs operant learning",
    body: [
      "Pavlovian learning is based on events that come [before behavior].",
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
    title: "US, UR, NS, CS, CR",
    body: [
      "Respondent conditioning starts with a neutral stimulus that does not elicit the target response.",
      "After pairings, the neutral stimulus becomes [a conditioned stimulus].",
    ],
    visual: {
      type: "matching",
      prompt: "Match each respondent term to its role.",
      pairs: [
        {
          term: "Unconditioned stimulus",
          definition: "Elicits a response without prior learning.",
        },
        {
          term: "Unconditioned response",
          definition: "Unlearned response elicited by the US.",
        },
        {
          term: "Neutral stimulus",
          definition: "Does not yet elicit the target response.",
        },
        {
          term: "Conditioned stimulus",
          definition: "Elicits the conditioned response after pairing.",
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
        { label: "Answering after a teacher presents an SD", category: "Discrete trial" },
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
    slug: "shaping-crf-intermittent",
    label: "B.4 / B.9",
    title: "Shaping and reinforcement schedules",
    body: [
      "Shaping teaches new behavior by reinforcing [successive approximations].",
      "New behavior often starts on CRF, then shifts toward intermittent reinforcement.",
    ],
    visual: {
      type: "flow",
      prompt: "Order the teaching sequence for a new operant response.",
      steps: [
        "Reinforce closer approximations",
        "Use CRF while behavior is new",
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
      "Interval schedules are [time based].",
      "Ratio schedules are [response based].",
    ],
    visual: {
      type: "matching",
      prompt: "Match each schedule to its discrimination cue.",
      pairs: [
        { term: "FI", definition: "Fixed time interval." },
        { term: "VI", definition: "Variable time interval." },
        { term: "FR", definition: "Fixed response requirement." },
        { term: "VR", definition: "Variable response requirement." },
      ],
    },
  },
  {
    slug: "sd-vs-motivating-operation",
    label: "B.16-B.17",
    title: "SD vs motivating operation",
    body: [
      "An SD signals [reinforcement is available for a response].",
      "A motivating operation changes [reinforcer value and current behavior].",
    ],
    visual: {
      type: "comparison",
      leftTitle: "SD",
      leftText: "Signals availability",
      rightTitle: "Motivating operation",
      rightText: "Changes value",
      cue: "SD = can get it now. MO = how much it matters now.",
    },
  },
  {
    slug: "sd-vs-sdelta",
    label: "B.11-B.15",
    title: "SD vs S-delta",
    body: [
      "An SD signals [reinforcement is available] for a response.",
      "An S-delta signals that the response [will not be reinforced].",
    ],
    visual: {
      type: "comparison",
      leftTitle: "SD",
      leftText: "Response -> reinforcement available",
      rightTitle: "S-delta",
      rightText: "Response -> no reinforcement",
      cue: "SD = reinforcement available. S-delta = reinforcement not available.",
    },
  },
  {
    slug: "three-term-contingency",
    label: "B.11-B.15",
    title: "Three-term contingency",
    body: [
      "The three-term contingency connects antecedent, response, and consequence.",
      "Read it as [SD -> R -> Sr].",
    ],
    visual: {
      type: "flow",
      prompt: "Put the three-term contingency in order.",
      steps: ["SD", "Response", "Reinforcing consequence"],
    },
  },
  {
    slug: "eo-ao-setting-events",
    label: "B.16-B.17",
    title: "EO, AO, and setting events",
    body: [
      "An EO increases [reinforcer value and current behavior].",
      "An AO decreases [reinforcer value and current behavior].",
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
      "The tone becomes a conditioned stimulus that elicits a conditioned response. This is respondent conditioning.",
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
    prompt: "Match each concept to its fastest discrimination cue.",
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
    prompt: "Sort each phrase by what controls the behavior.",
    categories: ["Respondent", "Operant"],
    items: [
      { label: "Elicited by antecedent stimuli", category: "Respondent" },
      { label: "Selected by consequences", category: "Operant" },
      { label: "Stimulus-stimulus pairing", category: "Respondent" },
      { label: "Behavior-consequence relation", category: "Operant" },
    ],
    answer: "All respondent and operant cues sorted correctly",
    explanation:
      "Respondent behavior is elicited by antecedent stimuli. Operant behavior is selected by consequences.",
  },
  {
    type: "matching",
    prompt: "Match each respondent-conditioning symbol to its role.",
    pairs: [
      {
        term: "US",
        definition: "Stimulus that elicits a response without prior learning.",
      },
      {
        term: "UR",
        definition: "Unlearned response elicited by the US.",
      },
      {
        term: "NS",
        definition: "Stimulus that does not yet elicit the target response.",
      },
      {
        term: "CS",
        definition: "Stimulus that elicits a learned conditioned response.",
      },
    ],
    answer: "All respondent-conditioning symbols matched correctly",
    explanation:
      "The NS becomes a CS after pairing with a US. The CS then elicits the CR.",
  },
  {
    type: "scenario",
    prompt:
      "A green traffic light signals that continuing to drive will contact reinforcement for moving with traffic. In this context, the green light functions as what?",
    choices: ["SD", "S-delta", "Abolishing operation", "Unconditioned response"],
    answer: "SD",
    explanation:
      "An SD signals that reinforcement is available for a response in its presence.",
  },
  {
    type: "scenario",
    prompt:
      "A red traffic light signals that continuing to drive will not contact reinforcement and may contact punishment. For continuing to drive, the red light is best described as what?",
    choices: ["S-delta", "SD", "Conditioned reinforcer", "CRF"],
    answer: "S-delta",
    explanation:
      "An S-delta signals that a response will not be reinforced in its presence.",
  },
  {
    type: "sorting",
    prompt: "Sort each schedule by what controls reinforcement availability.",
    categories: ["Time based", "Response based"],
    items: [
      { label: "Fixed interval", category: "Time based" },
      { label: "Variable interval", category: "Time based" },
      { label: "Fixed ratio", category: "Response based" },
      { label: "Variable ratio", category: "Response based" },
    ],
    answer: "All schedules sorted correctly",
    explanation:
      "Interval schedules are time based. Ratio schedules are response based.",
  },
  {
    type: "fill-blank",
    prompt:
      "Complete the cue: Shaping teaches new behavior by reinforcing successive ____.",
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
      "Establishing operation",
      "S-delta",
      "Response cost",
      "Conditioned response",
    ],
    answer: "Establishing operation",
    explanation:
      "An establishing operation increases reinforcer value and evokes behavior that has produced that reinforcer.",
  },
];

export const sectionBMasteryQuestions: QuestionContent[] = [
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
      "Complete the technical cue: Negative means a stimulus is removed, reduced, delayed, or ____.",
    answer: "avoided",
    explanation:
      "Negative refers to removal, reduction, delay, or avoidance of a stimulus. It does not mean bad.",
  },
  {
    type: "select-all",
    prompt: "Select all statements that correctly describe positive punishment.",
    choices: [
      "A stimulus is added after the response.",
      "Future behavior decreases.",
      "A stimulus is removed after the response.",
      "Future behavior increases.",
    ],
    answers: [
      "A stimulus is added after the response.",
      "Future behavior decreases.",
    ],
    answer: "A stimulus is added after the response; future behavior decreases.",
    explanation:
      "Positive punishment combines an added stimulus with a decrease in future responding.",
  },
  {
    type: "scenario",
    prompt:
      "A neutral tone is paired with an air puff several times. Later, the tone alone elicits blinking. What is the tone after pairing?",
    choices: [
      "Conditioned stimulus",
      "Unconditioned stimulus",
      "S-delta",
      "Negative reinforcer",
    ],
    answer: "Conditioned stimulus",
    explanation:
      "After pairing, the formerly neutral stimulus becomes a conditioned stimulus that elicits a conditioned response.",
  },
  {
    type: "matching",
    prompt: "Match each stimulus-control term to its discrimination cue.",
    pairs: [
      {
        term: "SD",
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
        term: "Motivating operation",
        definition: "Changes reinforcer value and current behavior.",
      },
    ],
    answer: "All stimulus-control and motivating-operation terms matched correctly",
    explanation:
      "SD and S-delta signal availability of reinforcement. Motivating operations change value; setting events alter how antecedents function.",
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
    type: "scenario",
    prompt:
      "A new skill is reinforced after every correct response until responding is stable. Which schedule is being used?",
    choices: [
      "Continuous reinforcement",
      "Variable interval",
      "Extinction",
      "S-delta",
    ],
    answer: "Continuous reinforcement",
    explanation:
      "Continuous reinforcement, or CRF, reinforces each correct response and is often used when teaching new behavior.",
  },
  {
    type: "scenario",
    prompt:
      "A substitute teacher changes the classroom context, and teacher prompts no longer occasion the usual on-task behavior. Which concept best captures this contextual effect?",
    choices: [
      "Setting event",
      "Unconditioned response",
      "Fixed ratio schedule",
      "Positive punishment",
    ],
    answer: "Setting event",
    explanation:
      "A setting event is a contextual or environmental variable that can alter the effect of antecedent events.",
  },
];
