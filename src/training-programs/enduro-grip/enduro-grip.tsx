import { TrainingProgram } from "../data-types";
import Input from "../../components/UI-elements/Input/Input";
import { useState } from "react";
import { useEffect } from "react";
import { isEqual } from "date-fns";
import { useSState } from "../../hooks/useSState";

import ScheduleVisual from "../common-components/ScheduleVisual";

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
    const [startToday, setStartToday] = useState(true);
    const [startDate, setStartDate] = useState(new Date());
    const [schedule, , { setStateTo: setScheduleTo }] = useSState<number[]>([
      3, 4,
    ]);

    // Run on first try to init the data
    useEffect(() => {
      onChange({ startDate, weekly: schedule });
    }, []);

    // Reset startDate to today when startToday is false
    useEffect(() => {
      !startToday && setStartDate(new Date());
    }, [startToday]);

    // Update value when settings change
    useEffect(() => {
      if (!isEqual(value.startDate, startDate) || value.weekly !== schedule) {
        onChange({ startDate, weekly: schedule });
      }
    }, [startDate, schedule, value.startDate, value.weekly, onChange]);

    return (
      <>
        <div>
          Test how long you can hang from a bar. If you can hang for longer than
          a minute, add weight so you'll be able to have sets between 30s and
          60s.
        </div>
        <Input
          label="Start today"
          type="checkbox"
          value={startToday}
          onChange={setStartToday}
        />
        {!startToday && (
          <Input
            label="Select start Date:"
            type="date"
            value={startDate}
            onChange={setStartDate}
          />
        )}
        <Input
          label="Schedule mode:"
          type="radio"
          options={[
            {
              label: "Two times a week",
              value: [3, 4],
            },
            {
              label: "Every four days",
              value: [4],
            },
          ]}
          value={schedule}
          onChange={setScheduleTo}
        />
        <ScheduleVisual pattern={schedule} />
      </>
    );
  },
};
