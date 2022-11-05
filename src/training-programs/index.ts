import { ProgramId, TP } from './data-types';
import { enduroGrip } from './enduro-grip/enduro-grip';
import { ees } from './even-easier-strength/even-easier-strength';
import { quickDead } from './quick-dead/quick-dead';
import { RTK } from './rtk/rtk';
// import { quickDead } from "./quick-dead/quick-dead";

export const programs = new Map<ProgramId, TP<ProgramId, boolean>>();

// programs.set("Q&D", quickDead);
programs.set('EnduroGrip', enduroGrip as TP<ProgramId, boolean>);
programs.set('ees', ees as TP<ProgramId, boolean>);
programs.set('quick-dead', quickDead as TP<ProgramId, boolean>);
programs.set('rtk', RTK as TP<ProgramId, boolean>);
