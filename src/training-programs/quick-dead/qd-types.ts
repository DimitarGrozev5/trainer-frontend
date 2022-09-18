export type qdVolume = 40 | 60 | 80 | 100;

export interface qdState {
  sessionDate: number;
  scheduleIndex: number;
  lastVolume: qdVolume;
}

export interface qdInit {
  startDate: number;
}

export interface qdAchieved {
  volume: qdVolume;
}
