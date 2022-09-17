export interface EnduroGripState {
  sessionDate: number;
  sessionIndex: number;
  lastHeavySessionAchieved: number;
  schedule: number[];
  currentScheduleIndex: number;
}

export interface EnduroGripInit {
  startDate: number;
  schedule: number[];
}

export interface EnduroGripAchieved {
  sets: number;
}
