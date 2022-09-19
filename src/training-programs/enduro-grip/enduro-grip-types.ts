import { SessionDate } from '../extra-types';

export interface EnduroGripState {
  sessionDate: SessionDate;
  sessionIndex: number;
  lastHeavySessionAchieved: number;
  schedule: number[];
  currentScheduleIndex: number;
}

export interface EnduroGripInit {
  startDate: SessionDate;
  schedule: number[];
}

export interface EnduroGripAchieved {
  sets: number;
}
