export type MultipleChoiceQuestion = {
  id: string;
  type: 'multiple_choice';
  prompt: string;
  choices: string[];
  answerIndex: number;
  explanation?: string;
};

export type FillBlankQuestion = {
  id: string;
  type: 'fill_blank';
  prompt: string; // include blank markers in prompt
  answerText: string;
  explanation?: string;
};

export type ListeningQuestion = {
  id: string;
  type: 'listening';
  prompt: string;
  audioUrl: string;
  transcript?: string;
  answerText: string;
  explanation?: string;
};

export type QuizQuestion = MultipleChoiceQuestion | FillBlankQuestion | ListeningQuestion;

export type Quiz = {
  id: string;
  title: string;
  category?: string;
  questions: QuizQuestion[];
};
