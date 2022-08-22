import { TrainingProgram } from "../data-types";
import { useForm } from "../../hooks/useForm/useForm";
import Input from "../../components/UI-elements/Input/Input";
import { useSState } from "../../hooks/useSState";

export const enduroGrip: TrainingProgram = {
  // Basic data
  id: "EnduroGrip",
  active: false,

  // Metadata
  name: "EnduroGrip",
  shortDesc: "Slow twitch endurance protocol for the grip",
  longDesc:
    "This training protocol uses hangs between 30s and 60s, always to failure. You will be in pain. You will be able to hang for longer in the end.",

  // Initializing training program
  InitComponent: ({ value, onChange }) => {
    const [startToday, setStartToday, { setStateTo: setStartTodayTo }] =
      useSState(true);

    console.log(startToday);

    return (
      <Input
        label="Start today"
        type="checkbox"
        value={startToday}
        onChange={setStartToday}
      />
    );
  },
  getInitData: (vals) => ({}),
};
