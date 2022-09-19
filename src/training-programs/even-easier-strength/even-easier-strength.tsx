import { add } from 'date-fns';
import { useEffect, useState } from 'react';
import Card from '../../components/UI-elements/Card/Card';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { programsActions } from '../../redux-store/programsSlice';
import { now, roundDate } from '../../util/date';
import CircularButton from '../common-components/CircularButton/CircularButton';
import { H1, H2 } from '../common-components/Headings/H';
import Info from '../common-components/Info/Info';
import { SessionProps, TP } from '../data-types';
import { SessionDate } from '../extra-types';
import { eesAchieved, eesState, SetName } from './ees-types';
import styles from './Styles.module.css';

export const ees: TP<'ees', true> = {
  id: 'ees',
  active: true,
  state: {} as eesState,
  version: '',

  name: 'EES',
  shortDesc: 'Even Easier Strength',
  longDesc:
    'A nice easy program, based on a handfull of movements and a small daily volume of 2 sets of 5-10 reps',

  InitComponent: () => {
    return (
      <>
        <div>You will be performing a daily or almost daily routine.</div>
        <div>
          Pick an exercise from each category:
          <ul>
            <li>A Push (pushup, overhead press, bench press, etc.)</li>
            <li>A Pull (rows, pullups, etc.)</li>
            <li>A Squat or Hip Hinge</li>
            <li>An Abdominal exercise</li>
            <li>Something else</li>
          </ul>
        </div>
        <div>
          It's recomended you do the a varaiation of the same exercise every
          day.
        </div>
        <div>
          Performe two easy sets of 5-10 reps. If it feels too easy, it's just
          right.
        </div>
      </>
    );
  },
  getInitData: (): eesState => {
    const now = roundDate(new Date());
    return {
      sessionDate: SessionDate.from(now),
      setsDone: {
        push: 0,
        pull: 0,
        squat: 0,
        ab: 0,
        accessory: 0,
      },
    };
  },

  getNextState: (state: eesState, achieved: eesAchieved | 'skip'): eesState => {
    const skip = achieved === 'skip';

    // If achieved is null, set it to no sets
    let achievedSets = skip
      ? {
          push: 0,
          pull: 0,
          squat: 0,
          ab: 0,
          accessory: 0,
        }
      : { ...achieved };

    const allSets = Object.values(achievedSets).reduce(
      (sum: number, sets: number) => sum + sets,
      0
    );

    // Destructure session data
    const { sessionDate: UTCDate } = state;

    // Convert sessionDate to Date object
    const sessionDate = SessionDate.toDate(UTCDate);

    // If *skip* calcualte next date based on last session date
    const cDate = skip ? sessionDate : now();

    // Set nextSessionDate to current session date
    let nextSessionDate = sessionDate;

    // If the required sets are achieved or *skip*, move to the next date
    if (allSets === 10 || skip) {
      nextSessionDate = add(cDate, { days: 1 });
    }

    // Set the sets
    let setsDone = {
      push: achievedSets.push,
      pull: achievedSets.pull,
      squat: achievedSets.squat,
      ab: achievedSets.ab,
      accessory: achievedSets.accessory,
    };

    // If *skip* set sets to zero
    if (skip) {
      setsDone = {
        push: 0,
        pull: 0,
        squat: 0,
        ab: 0,
        accessory: 0,
      };
    }

    // If the required sets are achived the next state will be zero, else it will be plus one
    if (allSets === 10) {
      setsDone = {
        push: achievedSets.push % 2,
        pull: achievedSets.pull % 2,
        squat: achievedSets.squat % 2,
        ab: achievedSets.ab % 2,
        accessory: achievedSets.accessory % 2,
      };
    }

    return {
      sessionDate: SessionDate.from(nextSessionDate),
      setsDone,
    };
  },
  getNextScheduleState: (state: eesState) => {
    // Destructure session data
    const { sessionDate: UTCDate } = state;

    // Convert sessionDate to Date object
    const sessionDate = SessionDate.toDate(UTCDate);

    // Set nextSessionDate to current session date
    const nextSessionDate = add(sessionDate, { days: 1 });

    // Set sets
    const setsDone = {
      push: 0,
      pull: 0,
      squat: 0,
      ab: 0,
      accessory: 0,
    };

    return {
      sessionDate: SessionDate.from(nextSessionDate),
      setsDone,
    };
  },
  getDescFromState: (state: eesState): string => {
    // Destructure session data
    const {
      setsDone: { push, pull, squat, ab, accessory },
    } = state;

    const dos = [];
    push < 2 && dos.push('push');
    pull < 2 && dos.push('pull');
    squat < 2 && dos.push('squat');
    ab < 2 && dos.push('ab');
    accessory < 2 && dos.push('accessory');

    return `Scheduled: ${dos.join(', ')}`;
  },

  SessionComponent: ({ program, onAchievedChanged }: SessionProps<'ees'>) => {
    const dispatch = useAppDispatch();

    const [allSetsAreDone, setAllSetsAreDone] = useState(false);

    // const { setsDone } = program.state;
    // const { push, pull, squat, ab, accessory } = setsDone;
    const [setsDone, setSetsDone] = useState(program.state.setsDone);

    const updateSetsDone = (target: SetName, sets: number) => async () => {
      if (setsDone[target] + 1 === sets) {
        const newSetsDone = {
          ...setsDone,
          [target]: sets,
        };

        const done =
          newSetsDone.push === 2 &&
          newSetsDone.pull === 2 &&
          newSetsDone.squat === 2 &&
          newSetsDone.ab === 2 &&
          newSetsDone.accessory === 2;

        setSetsDone(newSetsDone);
        if (done) {
          setAllSetsAreDone(true);
          return;
        }

        const nextState = program.getNextState(program.state, newSetsDone);

        dispatch(
          programsActions.updateThunk({
            id: program.id,
            state: nextState,
            version: program.version,
            achieved: newSetsDone,
          })
        );
      }
    };

    useEffect(() => {
      const done =
        setsDone.push +
          setsDone.pull +
          setsDone.squat +
          setsDone.ab +
          setsDone.accessory ===
        10;

      const achieved = !!done && setsDone;

      achieved && onAchievedChanged(achieved);
    }, [setsDone, onAchievedChanged]);

    return (
      <>
        <Card>
          <H1>Even Easier Strenght</H1>
          <Info>
            Pick an exercise in each category and perform two sets of 5-10 reps
          </Info>
          <Info>If it feels too easy to work, then it's just right</Info>
        </Card>

        <Card>
          <H2>Push</H2>
          <div className={styles.buttons}>
            <CircularButton
              text="1"
              checked={setsDone.push > 0 || allSetsAreDone}
              onClick={updateSetsDone('push', 1)}
            />
            <CircularButton
              text="2"
              checked={setsDone.push > 1 || allSetsAreDone}
              onClick={updateSetsDone('push', 2)}
            />
          </div>
          <Info>(Pushup, press, handstand press, etc.)</Info>
        </Card>

        <Card>
          <H2>Pull</H2>
          <div className={styles.buttons}>
            <CircularButton
              text="1"
              checked={setsDone.pull > 0 || allSetsAreDone}
              onClick={updateSetsDone('pull', 1)}
            />
            <CircularButton
              text="2"
              checked={setsDone.pull > 1 || allSetsAreDone}
              onClick={updateSetsDone('pull', 2)}
            />
          </div>
          <Info>(Pullup, row, clean, etc.)</Info>
        </Card>

        <Card>
          <H2>Squat or Hip Hinge</H2>
          <div className={styles.buttons}>
            <CircularButton
              text="1"
              checked={setsDone.squat > 0 || allSetsAreDone}
              onClick={updateSetsDone('squat', 1)}
            />
            <CircularButton
              text="2"
              checked={setsDone.squat > 1 || allSetsAreDone}
              onClick={updateSetsDone('squat', 2)}
            />
          </div>
          <Info>(Squat, deadlift, one leg deadlift, pistol, lunge, etc.)</Info>
        </Card>

        <Card>
          <H2>Abdominal</H2>
          <div className={styles.buttons}>
            <CircularButton
              text="1"
              checked={setsDone.ab > 0 || allSetsAreDone}
              onClick={updateSetsDone('ab', 1)}
            />
            <CircularButton
              text="2"
              checked={setsDone.ab > 1 || allSetsAreDone}
              onClick={updateSetsDone('ab', 2)}
            />
          </div>
          <Info>
            (Plank, L-sit, hanging leg lift, full contact twist, etc.)
          </Info>
        </Card>

        <Card>
          <H2>Accessory</H2>
          <div className={styles.buttons}>
            <CircularButton
              text="1"
              checked={setsDone.accessory > 0 || allSetsAreDone}
              onClick={updateSetsDone('accessory', 1)}
            />
            <CircularButton
              text="2"
              checked={setsDone.accessory > 1 || allSetsAreDone}
              onClick={updateSetsDone('accessory', 2)}
            />
          </div>
          <Info>(Have fun. Curls and such.)</Info>
        </Card>
      </>
    );
  },
};
