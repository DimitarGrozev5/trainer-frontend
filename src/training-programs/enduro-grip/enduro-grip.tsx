import { TrainingProgram } from "../data-types";
import Input from "../../components/UI-elements/Input/Input";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { add, isEqual } from "date-fns";
import { useSState } from "../../hooks/useSState";

import ScheduleVisual from "../common-components/ScheduleVisual/ScheduleVisual";
import { CircularArray } from "../../util/array";
import { roundDate } from "../../util/date";
import Card from "../../components/UI-elements/Card/Card";
import CircularButton from "../common-components/CircularButton/CircularButton";
import produce from "immer";
import CountdownTimer from "../common-components/CountdownTimer/CountdownTimer";

const trainingRotation = [4, 1, 6, 2, 8, 3, 5, 1, 7, 2, 9, 3];

export const enduroGrip: TrainingProgram = {
  // Basic data
  id: "EnduroGrip",
  active: false,
  state: {},

  // Metadata
  name: "EnduroGrip",
  shortDesc: "Slow twitch endurance protocol for the grip",
  longDesc:
    "This training protocol uses hangs between 30s and 60s, always to failure. You will be in pain. You will be able to hang for longer in the end.",

  // Initializing training program
  InitComponent: ({ value, onChange }) => {
    const [startToday, setStartToday] = useState(true);
    const [startDate, setStartDate] = useState(roundDate(new Date()));
    const [schedule, , { setStateTo: setScheduleTo }] = useSState<number[]>([
      4, 3,
    ]);

    // Run on first try to init the data
    useEffect(() => {
      onChange({ startDate, schedule: schedule });
      // eslint-disable-next-line
    }, []);

    // Reset startDate to today when startToday is false
    useEffect(() => {
      !startToday && setStartDate(roundDate(new Date()));
    }, [startToday]);

    // Update value when settings change
    useEffect(() => {
      if (!isEqual(value.startDate, startDate) || value.schedule !== schedule) {
        onChange({ startDate, schedule: schedule });
      }
    }, [startDate, schedule, value.startDate, value.schedule, onChange]);

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
              value: [4, 3],
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
  getInitData: ({
    startDate,
    schedule,
  }: {
    startDate: Date;
    schedule: number[];
  }) => {
    return {
      sessionDate: startDate,
      sessionIndex: 0,
      lastHeavySessionAchieved: 9,
      schedule,
      currentScheduleIndex: 0,
    };
  },

  getNextState: (
    prevState: any,
    achieved: any,
    { forceProgress = false, fromToday = true } = {
      forceProgress: false,
      fromToday: true,
    }
  ) => {
    const {
      sessionDate,
      sessionIndex,
      lastHeavySessionAchieved,
      schedule,
      currentScheduleIndex,
    } = prevState;

    const trainingPlan = new CircularArray(trainingRotation, sessionIndex);

    const schedulePlan = new CircularArray<number>(
      schedule,
      currentScheduleIndex
    );

    const fromDate = fromToday ? new Date() : sessionDate;
    const nextSessionDate = roundDate(
      add(fromDate, { days: schedulePlan.i(0) })
    );

    const nextScheduleIndex = schedulePlan.getIndex(+1);

    let nextSessionIndex = sessionIndex;
    let heavySessionAchieved = achieved;

    // If the session was heavy always move to the next session and record the achieved result
    if (sessionIndex % 2 === 0) {
      nextSessionIndex = trainingPlan.getIndex(+1);
      heavySessionAchieved = achieved;
    }

    // If the session was light decide wheter to move to the next session or the previous and don't record the achieved result
    else {
      heavySessionAchieved = lastHeavySessionAchieved;

      // If the last heavy session the user achieved the required number of sets, progress
      if (forceProgress || lastHeavySessionAchieved === trainingPlan.i(-1)) {
        nextSessionIndex = trainingPlan.getIndex(+1);
      } else {
        nextSessionIndex = trainingPlan.getIndex(-1);
      }
    }

    return {
      sessionDate: nextSessionDate,
      sessionIndex: nextSessionIndex,
      lastHeavySessionAchieved: heavySessionAchieved,
      schedule,
      currentScheduleIndex: nextScheduleIndex,
    };
  },
  getDescFromState: (state: any) =>
    `Do x${trainingRotation[state.sessionIndex]} sets to failure`,

  SessionComponent: ({ program }) => {
    // this will be inferred as `CountdownHandle`
    type CountdownHandle = React.ElementRef<typeof CountdownTimer>;
    const timerRef = useRef<CountdownHandle>(null);

    const [sets, setSets] = useState(
      Array(trainingRotation[program.state.sessionIndex]).fill(false)
    );

    const nextSet = (i: number) => () => {
      if (sets[i]) {
        return;
      }

      if (i === 0) {
        setSets(
          produce((draft) => {
            draft[i] = true;
          })
        );
        timerRef.current?.start();
        return;
      }

      if (sets[i - 1] && !sets[i]) {
        setSets(
          produce((draft) => {
            draft[i] = true;
          })
        );
        i === sets.length - 1
          ? timerRef.current?.pause()
          : timerRef.current?.restart();
      }
    };
    return (
      <>
        <Card>
          <h1>{program.name}</h1>
          <div>Prepare to do x{sets} Sets of dead hangs.</div>
          <div>
            Every set should last between 30s and 60s. Strap weight to yourself
            if needed, to get in that range.
          </div>
        </Card>
        <Card>
          <h2>Sets:</h2>
          <div>
            {sets.map((set, i) => (
              <CircularButton
                key={i}
                text={(i + 1).toString()}
                onClick={nextSet(i)}
                checked={set}
              />
            ))}
          </div>
          <CountdownTimer ref={timerRef} initTime={10 * 60} step={60} />
        </Card>
      </>
    );
  },
};
