import { ProgramId, TrainingProgram } from "./data-types";
import { enduroGrip } from "./enduro-grip/enduro-grip";
import { ees } from "./even-easier-strength/even-easier-strength";
// import { quickDead } from "./quick-dead/quick-dead";

export const programs = new Map<ProgramId, TrainingProgram>();

// programs.set("Q&D", quickDead);
programs.set("EnduroGrip", enduroGrip);
programs.set("ees", ees);
