export interface User {
  id: string;
  name: string;
  role: 'student' | 'interviewer';
  avatar: string;
}

export interface Question {
  id: string;
  title: string;
  description: string;
  tags: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: 'Algorithm' | 'System Design' | 'Behavioral' | 'Java' | 'Spring';
}

export interface InterviewSession {
  id: string;
  questionId: string;
  status: 'created' | 'recording' | 'processing' | 'completed';
  date: string;
  durationSeconds: number;
}

export interface EvaluationScore {
  score: number;
  note: string;
}

export interface EvaluationResult {
  id: string;
  sessionId: string;
  overallScore: number;
  details: {
    technical: EvaluationScore;
    structure: EvaluationScore;
    clarity: EvaluationScore;
    depth: EvaluationScore;
  };
  transcript: string;
  feedbackSummary: string;
  suggestedPractice: {
    questionId: string;
    reason: string;
  }[];
}

export interface StatMetric {
  subject: string;
  A: number; // Current User
  fullMark: number;
}