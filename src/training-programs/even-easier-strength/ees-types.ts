import { SessionDate } from "../extra-types";

export interface eesState {
  sessionDate: SessionDate;
  setsDone: SetsDone;
}

export type SetName = 'push' | 'pull' | 'squat' | 'ab' | 'accessory';

export interface SetsDone {
  push: number;
  pull: number;
  squat: number;
  ab: number;
  accessory: number;
}

export interface eesInit {}

export interface eesAchieved extends SetsDone {}
