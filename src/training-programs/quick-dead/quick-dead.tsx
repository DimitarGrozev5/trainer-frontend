import { TrainingProgram } from "../data-types";

export const quickDead: TrainingProgram = {
  id: "Q&D",
  active: false,

  name: "Q&D",
  shortDesc: "The Quick and The Dead",
  longDesc:
    "A kettlebell based training program for improving you strength endurance, anaerobic alactic power and promote mitochondria growth in fast twitch fibers",

  InitComponent: ({ onSubmit }) => <></>,
  getInitData: (vals) => ({}),
};
