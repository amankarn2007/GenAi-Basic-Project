export interface TechnicalQuestion {
  id: string;
  question: string;
  answer: string;
  intention: string;
}

export interface BehavioralQuestion {
  id: string;
  question: string;
  answer: string;
  intention: string;
}

export interface SkillGap {
  id: string;
  skill: string;
  severity: string;
}

export interface PreparationStep {
  id: string;
  day: number;
  focus: string;
  task: string[];
}

export interface InterviewReport {
  id: string;
  title: string;
  matchScore: number;
  jobDescription: string;
  resume: string;
  selfDescription: string;
  technicalQuestion: TechnicalQuestion[];
  behavioralQuestions: BehavioralQuestion[];
  skillGaps: SkillGap[];
  preparationPlan: PreparationStep[];
}

export interface InterviewReportResponse {
  message: string;
  reportId: string;
  report: InterviewReport;
}