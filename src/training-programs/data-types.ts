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
export type ProgramStateMap = {
  EnduroGrip: EnduroGripState;
  ees: eesState;
};
export type ProgramInitMap = {
  EnduroGrip: EnduroGripInit;
  ees: eesInit;
};
export type ProgramAchievedMap = {
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
  program: TP<id, true>;

  onAchievedChanged: (val: ProgramAchievedMap[id]) => void;
}
export type SessionComponent<id extends ProgramId> = React.FC<SessionProps<id>>;

// Training Program data types
export interface TPState<id extends ProgramId, A extends boolean> {
  id: id;
  active: boolean;
  state: A extends true ? ProgramStateMap[id] : null;
  version: A extends true ? string : null;
}

export interface TP<id extends ProgramId, A extends boolean>
  extends TPState<id, A> {
  id: id;
  active: boolean;
  state: A extends true ? ProgramStateMap[id] : null;
  version: A extends true ? string : null;

  name: string;
  shortDesc: string;
  longDesc: string;

  InitComponent: InitComponent<id>;
  getInitData: (val: ProgramInitMap[id]) => ProgramStateMap[id];

  getDescFromState: (state: ProgramStateMap[id]) => string;
  getNextState: (
    state: ProgramStateMap[id],
    achieved: ProgramAchievedMap[id],
    options?: {
      forceProgress?: boolean;
      fromToday?: boolean;
    }
  ) => ProgramStateMap[id];

  SessionComponent: SessionComponent<id>;
}

export type TPActive = TP<ProgramId, true>;
export type TPInactive = TP<ProgramId, false>;
