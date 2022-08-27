import React from "react";

// All valid programIds will be stored here
export type ProgramId = "EnduroGrip" | "Q&D";

export interface InitProps {
  value: any;
  onChange: (initData: any) => void;
}

export type InitComponent = React.FC<InitProps>;

export interface SessionProps {
  program: TrainingProgram;
  onAchievedChanged: (val: any) => void;
}
export type SessionComponent = React.FC<SessionProps>;

export interface TrainingProgram {
  id: ProgramId;
  active: boolean;
  state: any;

  name: string;
  shortDesc: string;
  longDesc: string;

  InitComponent: InitComponent;
  getInitData: (val: any) => any;

  getNextState: (
    state: { sessionDate: Date } & any,
    achieved: any,
    options?: {
      forceProgress?: boolean;
      fromToday?: boolean;
    }
  ) => { sessionDate: Date } & any;
  getDescFromState: (state: any) => string;

  SessionComponent: SessionComponent;
}
