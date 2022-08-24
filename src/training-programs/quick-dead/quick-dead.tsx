import { TrainingProgram } from "../data-types";

export const quickDead: TrainingProgram = {
  id: "Q&D",
  active: false,
  state: {},

  name: "Q&D",
  shortDesc: "The Quick and The Dead",
  longDesc:
    "A kettlebell based training program for improving you strength endurance, anaerobic alactic power and promote mitochondria growth in fast twitch fibers",

  InitComponent: ({ value, onChange }) => <></>,
  getInitData: (val) => val,

  getNextState: (val: any) => val,
  getDescFromState: (val: any) => "Do stuff",
};
