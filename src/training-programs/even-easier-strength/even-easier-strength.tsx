import { add } from "date-fns";
import { useEffect } from "react";
import Card from "../../components/UI-elements/Card/Card";
import LoadingSpinner from "../../components/UI-elements/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../components/UI-elements/Modal/ErrorModal";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { useHttpClient } from "../../hooks/useHttpClient";
import { programsActions, ProgramState } from "../../redux-store/programsSlice";
import { now, roundDate } from "../../util/date";
import CircularButton from "../common-components/CircularButton/CircularButton";
import { H1, H2 } from "../common-components/Headings/H";
import Info from "../common-components/Info/Info";
import { TrainingProgram } from "../data-types";
import styles from "./Styles.module.css";

export const ees: TrainingProgram = {
  id: "ees",
  active: false,
  state: {},

  name: "EES",
  shortDesc: "Even Easier Strength",
  longDesc:
    "A nice easy program, based on a handfull of movements and a small daily volume of 2 sets of 5-10 reps",

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
  getInitData: () => {
    const now = roundDate(new Date());
    return {
      sessionDate: now.getTime(),
      setsDone: {
        push: 0,
        pull: 0,
        squat: 0,
        ab: 0,
        accessory: 0,
      },
    };
  },

  getNextState: (
    state: any,
    achieved: any,
    { forceProgress = false, fromToday = true } = {
      forceProgress: false,
      fromToday: true,
    }
  ) => {
    // Destructure session data
    const { sessionDate: UTCDate } = state;

    const sessionDate = new Date(UTCDate);

    const cDate = fromToday ? now() : sessionDate;
    const nextSessionDate = add(cDate, { days: 1 });

    return {
      sessionDate: nextSessionDate.getTime(),
      setsDone: {
        push: 0,
        pull: 0,
        squat: 0,
        ab: 0,
        accessory: 0,
      },
    };
  },
  getDescFromState: (state: any): string => {
    // Destructure session data
    const {
      setsDone: { push, pull, squat, ab, accessory },
    } = state;

    const dos = [];
    push < 2 && dos.push("push");
    pull < 2 && dos.push("pull");
    squat < 2 && dos.push("squat");
    ab < 2 && dos.push("ab");
    accessory < 2 && dos.push("accessory");

    return `Scheduled: ${dos.join(", ")}`;
  },
  SessionComponent: ({ program, onAchievedChanged }) => {
    const dispatch = useAppDispatch();

    const { isLoading, error, clearError, sendRequest } = useHttpClient();

    const { setsDone } = program.state;
    const { push, pull, squat, ab, accessory } = setsDone;

    const updateSetsDone = (target: string, sets: number) => async () => {
      if (setsDone[target] + 1 === sets) {
        const newSetsDone = {
          push,
          pull,
          squat,
          ab,
          accessory,
          [target]: sets,
        };
        try {
          const response = await sendRequest(`/${program.id}`, {
            body: {
              id: program.id,
              state: {
                sessionDate: program.state.sessionDate,
                setsDone: newSetsDone,
              },
            },
            method: "PATCH",
          });

          dispatch(
            programsActions.updateProgramsState([
              {
                id: response.id,
                active: true,
                state: response.state,
              } as ProgramState,
            ])
          );
        } catch (err) {
          console.log(err);
        }
      }
    };

    useEffect(() => {
      const done =
        push === 2 && pull === 2 && squat === 2 && ab === 2 && accessory === 2;

      const achieved = !!done && { push, pull, squat, ab, accessory };

      onAchievedChanged(achieved);
    }, [push, pull, squat, ab, accessory, onAchievedChanged]);

    return (
      <>
        {isLoading && <LoadingSpinner centerPage />}
        <ErrorModal show={!!error} error={error} onClose={clearError} />

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
              checked={push > 0}
              onClick={updateSetsDone("push", 1)}
            />
            <CircularButton
              text="2"
              checked={push > 1}
              onClick={updateSetsDone("push", 2)}
            />
          </div>
          <Info>(Pushup, press, handstand press, etc.)</Info>
        </Card>

        <Card>
          <H2>Pull</H2>
          <div className={styles.buttons}>
            <CircularButton
              text="1"
              checked={pull > 0}
              onClick={updateSetsDone("pull", 1)}
            />
            <CircularButton
              text="2"
              checked={pull > 1}
              onClick={updateSetsDone("pull", 2)}
            />
          </div>
          <Info>(Pullup, row, clean, etc.)</Info>
        </Card>

        <Card>
          <H2>Squat or Hip Hinge</H2>
          <div className={styles.buttons}>
            <CircularButton
              text="1"
              checked={squat > 0}
              onClick={updateSetsDone("squat", 1)}
            />
            <CircularButton
              text="2"
              checked={squat > 1}
              onClick={updateSetsDone("squat", 2)}
            />
          </div>
          <Info>(Squat, deadlift, one leg deadlift, pistol, lunge, etc.)</Info>
        </Card>

        <Card>
          <H2>Abdominal</H2>
          <div className={styles.buttons}>
            <CircularButton
              text="1"
              checked={ab > 0}
              onClick={updateSetsDone("ab", 1)}
            />
            <CircularButton
              text="2"
              checked={ab > 1}
              onClick={updateSetsDone("ab", 2)}
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
              checked={accessory > 0}
              onClick={updateSetsDone("accessory", 1)}
            />
            <CircularButton
              text="2"
              checked={accessory > 1}
              onClick={updateSetsDone("accessory", 2)}
            />
          </div>
          <Info>(Have fun. Curls and such.)</Info>
        </Card>
      </>
    );
  },
};
