import { useEffect, useRef, useState } from 'react';
import produce from 'immer';
import { add, isEqual } from 'date-fns';

import styles from './EnduroGrip.module.css';
import { useSState } from '../../hooks/useSState';
import { InitProps, SessionProps, TP } from '../data-types';
import Input from '../../components/UI-elements/Input/Input';
import ScheduleVisual from '../common-components/ScheduleVisual/ScheduleVisual';
import { CircularArray } from '../../util/array';
import { roundDate } from '../../util/date';
import Card from '../../components/UI-elements/Card/Card';
import CircularButton from '../common-components/CircularButton/CircularButton';
import CountdownTimer from '../common-components/CountdownTimer/CountdownTimer';
import Metronome from '../common-components/Metronome/Metronome';
import Info from '../common-components/Info/Info';
import {
  EnduroGripAchieved,
  EnduroGripInit,
  EnduroGripState,
} from './enduro-grip-types';

const trainingRotation = [4, 1, 6, 2, 8, 3, 5, 1, 7, 2, 9, 3];

export const enduroGrip: TP<'EnduroGrip', true> = {
  // Basic data
  id: 'EnduroGrip',
  active: true,
  state: {} as EnduroGripState,
  version: '',

  // Metadata
  name: 'EnduroGrip',
  shortDesc: 'Slow twitch endurance protocol for the grip',
  longDesc:
    'This training protocol uses hangs between 30s and 60s, always to failure. You will be in pain. You will be able to hang for longer in the end.',

  // Initializing training program
  InitComponent: ({ value, onChange }: InitProps<'EnduroGrip'>) => {
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
        onChange({ startDate: startDate, schedule: schedule });
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
              label: 'Two times a week',
              value: [4, 3],
            },
            {
              label: 'Every four days',
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
  getInitData: ({ startDate, schedule }: EnduroGripInit): EnduroGripState => {
    return {
      sessionDate: startDate.getTime(),
      sessionIndex: 0,
      lastHeavySessionAchieved: 9,
      schedule,
      currentScheduleIndex: 0,
    };
  },

  getNextState: (
    prevState: EnduroGripState,
    achieved: EnduroGripAchieved | null,
    { forceProgress = false, fromToday = true } = {
      forceProgress: false,
      fromToday: true,
    }
  ): EnduroGripState => {
    const {
      sessionDate: sessionDateUtc,
      sessionIndex,
      lastHeavySessionAchieved,
      schedule,
      currentScheduleIndex,
    } = prevState;

    const sessionDate = new Date(sessionDateUtc);

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
    let heavySessionAchieved = achieved?.sets || 0;

    // If the session was heavy always move to the next session and record the achieved result
    if (sessionIndex % 2 === 0) {
      nextSessionIndex = trainingPlan.getIndex(+1);
      heavySessionAchieved = achieved?.sets || 0;
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
      sessionDate: nextSessionDate.getTime(),
      sessionIndex: nextSessionIndex,
      lastHeavySessionAchieved: heavySessionAchieved,
      schedule,
      currentScheduleIndex: nextScheduleIndex,
    };
  },
  getDescFromState: (state: EnduroGripState) =>
    `Do x${trainingRotation[state.sessionIndex]} sets to failure`,

  SessionComponent: ({
    program,
    onAchievedChanged,
  }: SessionProps<'EnduroGrip'>) => {
    // this will be inferred as `CountdownHandle`
    type CountdownHandle = React.ElementRef<typeof CountdownTimer>;
    const timerRef = useRef<CountdownHandle>(null);

    const [sets, setSets] = useState<boolean[]>(
      Array(trainingRotation[program.state.sessionIndex]).fill(false)
    );

    useEffect(() => {
      const goalAchieved =
        sets.reduce((sum, set) => sum + Number(set), 0) === sets.length;

      if (goalAchieved) {
        const achieved = { sets: sets.length };
        onAchievedChanged(achieved);
      }
    }, [sets, onAchievedChanged]);

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
          <h1 className={styles.h1}>{program.name}</h1>
          <Info>Prepare to do x{sets} Sets of dead hangs.</Info>
          <Info>
            Every set should last between 30s and 60s. Strap weight to yourself
            if needed, to get in that range.
          </Info>
        </Card>
        <Card>
          <h2 className={styles.h2}>Sets:</h2>
          <div className={styles.sets}>
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
        <Card>
          <Metronome timing={1000} />
          <Info>This metronome will help you count out the set duration</Info>
        </Card>
      </>
    );
  },
};
