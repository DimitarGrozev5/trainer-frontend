// All valid programIds will be stored here
export type ProgramId = "ETK" | "Q&D";

export interface TrainingProgram {
  id: ProgramId;

  name: string;
  shortDesc: string;
  longDesc: string;
}
