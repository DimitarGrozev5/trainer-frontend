import React from 'react';
import {
  EnduroGripAchieved,
  EnduroGripInit,
  EnduroGripState,
} from './enduro-grip/enduro-grip-types';

// All valid programIds will be stored here
export type ProgramId = 'EnduroGrip' | 'ees';

// All valid program states wll be stored here
type ProgramStateMap = {
  EnduroGrip: EnduroGripState;
  ees: any;
};
type ProgramInitMap = {
  EnduroGrip: EnduroGripInit;
  ees: any;
};
type ProgramAchievedMap = {
  EnduroGrip: EnduroGripAchieved;
  ees: any;
};

export interface InitProps<id extends ProgramId> {
  value: ProgramInitMap[id];
  onChange: (initData: ProgramInitMap[id]) => void;
}

export type InitComponent<id extends ProgramId> = React.FC<InitProps<id>>;

export interface SessionProps<id extends ProgramId> {
  program: TrainingProgram<id>;
  onAchievedChanged: (val: ProgramAchievedMap[id]) => void;
}
export type SessionComponent<id extends ProgramId> = React.FC<SessionProps<id>>;

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
