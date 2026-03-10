export type UserProfile = 'teacher' | 'student' | null;
export type AppTab = 'home' | 'explore' | 'learn' | 'academy' | 'profile';

export interface AITool {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  category: string;
  icon: string;
  url: string;
  tags: string[];
  difficulty: 'Fácil' | 'Intermedio' | 'Avanzado';
  educationalUses: string[];
  warnings: string[];
  isNew?: boolean;
  isTrending?: boolean;
  isRecommended?: boolean;
}

export interface PromptExample {
  id: string;
  title: string;
  weak: string;
  improved: string;
  explanation: string;
}

export interface AssessmentQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    score: number;
  }[];
}

export interface TeacherProfileResult {
  name: string;
  description: string;
  recommendations: string[];
  activities: string[];
}

export interface ClassroomActivity {
  id: string;
  title: string;
  objective: string;
  duration: string;
  category: string;
  dynamics: string[];
  questions: string[];
  learning: string;
  icon: string;
}

export interface Course {
  id: string;
  title: string;
  level: 'Explorador' | 'Usuario práctico' | 'Diseñador pedagógico' | 'Mentor';
  duration: string;
  description: string;
  isSaved?: boolean;
  isCompleted?: boolean;
}
