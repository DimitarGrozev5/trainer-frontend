import React from "react";

// All valid programIds will be stored here
export type ProgramId = "EnduroGrip" | "Q&D";

export interface InitProps {
  value: any;
  onChange: (initData: any) => void;
}

export type InitComponent = React.FC<InitProps>;

export interface TrainingProgram {
  id: ProgramId;
  active: boolean;

  name: string;
  shortDesc: string;
  longDesc: string;

  InitComponent: InitComponent;
  getInitData: (val: any) => any;

  getNextState: (state: any, achieved: any) => any;
  getDescFromState: (state: any) => string;
}
