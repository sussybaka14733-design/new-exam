export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  createdAt: string;
}

export interface DayProgressDoc {
  dayNum: number;
  attendanceChecked: boolean;
  dataStructuresStudyDone: number[]; // indices of study items completed
  dataStructuresPracticeDone: boolean;
  mathsStudyDone: number[]; // indices of study items completed
  mathsPracticeDone: boolean;
  notes: string;
  updatedAt: string;
}

export interface SubjectStats {
  studyTotal: number;
  studyDone: number;
  practiceTotal: number;
  practiceDone: number;
  completionRate: number;
}
