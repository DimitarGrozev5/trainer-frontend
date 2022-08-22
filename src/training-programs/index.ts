import { ProgramId, TrainingProgram } from "./data-types";
import { enduroGrip } from "./enduro-grip/enduro-grip";
import { quickDead } from "./quick-dead/quick-dead";

export const programs = new Map<ProgramId, TrainingProgram>();

programs.set("Q&D", quickDead);
programs.set("EnduroGrip", enduroGrip);