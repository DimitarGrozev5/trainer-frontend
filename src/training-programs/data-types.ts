import React from 'react';
import {
  EnduroGripAchieved,
  EnduroGripInit,
  EnduroGripState,
} from './enduro-grip/enduro-grip-types';
import {
  eesAchieved,
  eesInit,
  eesState,
} from './even-easier-strength/ees-types';

// All valid programIds will be stored here
export type ProgramId = 'EnduroGrip' | 'ees';

// Type maps for the different programs
type ProgramStateMap = {
  EnduroGrip: EnduroGripState;
  ees: eesState;
};
type ProgramInitMap = {
  EnduroGrip: EnduroGripInit;
  ees: eesInit;
};
type ProgramAchievedMap = {
  EnduroGrip: EnduroGripAchieved;
  ees: eesAchieved;
};

// Init Props and Init Component data types
export interface InitProps<id extends ProgramId> {
  value: ProgramInitMap[id];
  onChange: (initData: ProgramInitMap[id]) => void;
}

export type InitComponent<id extends ProgramId> = React.FC<InitProps<id>>;

// Session Props and Session Component data types
export interface SessionProps<id extends ProgramId> {
  program: TrainingProgram<id>;

  onAchievedChanged: (val: ProgramAchievedMap[id]) => void;
}
export type SessionComponent<id extends ProgramId> = React.FC<SessionProps<id>>;

// Training Program data type
export interface TrainingProgram<id extends ProgramId> {
  id: id;
  active: boolean;
  state: ProgramStateMap[id];
  version: string;

  name: string;
  shortDesc: string;
  longDesc: string;

  InitComponent: InitComponent<id>;
  getInitData: (val: ProgramInitMap[id]) => ProgramStateMap[id];

  getNextState: (
    state: ProgramStateMap[id],
    achieved: ProgramAchievedMap[id],
    options?: {
      forceProgress?: boolean;
      fromToday?: boolean;
    }
  ) => ProgramStateMap[id];
  getDescFromState: (state: ProgramStateMap[id]) => string;

  SessionComponent: SessionComponent<id>;
}
