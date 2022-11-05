import { SessionDate } from '../extra-types';

export type LadderRung = { topSet: number };
export type Ladder = LadderRung[];

export type BlockType = 'grind' | 'balistic';

export type WeightCombo = {
  left: number;
  right: number;
};

export type WeightVariations = {
  heavy: WeightCombo;
  medium: WeightCombo;
  light: WeightCombo;
};

export type progressionIndex = number;

export interface rtkState {
  sessionDate: SessionDate;
  scheduleIndex: number;

  currentBlock: BlockType;
  sessionInBlock: number;

  // The index of the Progression array from rtk.tsx
  lastGrindAchievement: progressionIndex;
  lastThreeGrindTimes: [number, number, number];
  lastBalisticAchievement: progressionIndex;
  lastThreeBalisticTimes: [number, number, number];

  grindWeights: WeightVariations;
  balisticWeights: WeightVariations;

  bestGrindTest: WeightCombo;
  bestBalistic: WeightCombo & { reps: number };
}

export interface rtkInit {
  startDate: SessionDate;

  grindWeights: WeightVariations;
  balisticWeights: WeightVariations;
}

export type RTKIntent = 'stay' | 'progress';

export type rtkAchieved =
  | {
      achieved: progressionIndex;
      nextWeights: WeightVariations;
      intent: RTKIntent;
    }
  | {
      block: 'grind';
      testAchieved: WeightCombo;
    }
  | {
      block: 'balistic';
      testAchieved: WeightCombo & { reps: number };
    };
