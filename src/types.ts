export type QuestionType = 'fraction-to-decimal' | 'decimal-to-fraction' | 'recurring-to-fraction' | 'patterns';

export interface FractionValue {
  numerator: number;
  denominator: number;
}

export interface Question {
  id: string;
  section: QuestionType;
  questionTextEn: string;
  questionTextTh: string;
  hintEn: string;
  hintTh: string;
  answerType: 'decimal' | 'fraction' | 'choice' | 'text';
  // If answerType is 'decimal'
  correctDecimal?: string; // e.g. "0.375" or "0.8333..." or "0.83\u0307" (with dot above 3)
  // If answerType is 'fraction'
  correctFraction?: FractionValue;
  // If answerType is 'choice'
  options?: {
    value: string;
    labelEn: string;
    labelTh: string;
  }[];
  correctChoiceValue?: string;
  // If answerType is 'text'
  correctText?: string[]; // array of acceptable texts
  
  explanationEn: string;
  explanationTh: string;
}

export interface SectionInfo {
  id: QuestionType;
  titleEn: string;
  titleTh: string;
  descriptionEn: string;
  descriptionTh: string;
  color: string;
  icon: string;
}

export interface UserStats {
  score: number;
  completedCount: number;
  correctCount: number;
  streak: number;
  sectionProgress: Record<QuestionType, {
    completed: boolean[];
    score: number;
  }>;
}
