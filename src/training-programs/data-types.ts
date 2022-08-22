// All valid programIds will be stored here
export type ProgramId = "EnduroGrip" | "Q&D";

export interface TrainingProgram {
  id: ProgramId;
  active: boolean;

  name: string;
  shortDesc: string;
  longDesc: string;
}
