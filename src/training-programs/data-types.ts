import React from "react";

// All valid programIds will be stored here
export type ProgramId = "EnduroGrip" | "Q&D";

interface InitProps {
  value: Object;
  onChange: (initData: Object) => void;
}
export type InitComponent = React.FC<InitProps>;

export interface TrainingProgram {
  id: ProgramId;
  active: boolean;

  name: string;
  shortDesc: string;
  longDesc: string;

  InitComponent: InitComponent;
  getInitData: (initVals: Object) => Object;
}
