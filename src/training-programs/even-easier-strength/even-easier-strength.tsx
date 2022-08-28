import { add } from "date-fns";
import { now, roundDate } from "../../util/date";
import { TrainingProgram } from "../data-types";

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
      sessionDate: now,
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
    const {
      sessionDate,
      setsDone: { push, pull, squat, ab, accessory },
    } = state;

    const cDate = fromToday ? now() : sessionDate;
    const nextSessionDate = add(cDate, { days: 1 });

    return {
      sessionDate: nextSessionDate,
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
      sessionDate,
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
    
    return <div>EES</div>;
  },
};
