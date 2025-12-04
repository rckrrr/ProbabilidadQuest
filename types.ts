export enum ViewState {
  MENU = 'MENU',
  LEVEL_SELECT = 'LEVEL_SELECT',
  TUTORIAL = 'TUTORIAL',
  QUIZ = 'QUIZ',
  RESULTS = 'RESULTS'
}

export interface Question {
  id: number;
  question: string;
  options: string[]; // 4 options
  correctAnswerIndex: number; // 0-3
  explanation: string;
}

export interface LevelData {
  id: number;
  title: string;
  description: string;
  tutorialTitle: string;
  tutorialContent: string[]; // Array of paragraphs/bullets
  questions: Question[];
}

export interface UserProgress {
  unlockedLevels: number; // Highest level unlocked (1-based)
  scores: Record<number, number>; // Level ID -> High Score (0-5)
}