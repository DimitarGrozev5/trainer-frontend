import { SessionDate } from '../extra-types';

export type qdVolume = 40 | 60 | 80 | 100;

export interface qdState {
  sessionDate: SessionDate;
  scheduleIndex: number;
  lastVolume: qdVolume;
}

export interface qdInit {
  startDate: SessionDate;
}

export interface qdAchieved {
  volume: qdVolume;
}
