import { createSlice, Middleware } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { add, compareAsc } from "date-fns";
import { programs } from "../training-programs";

import { ProgramId, TrainingProgram } from "../training-programs/data-types";
import { ProgramState } from "./programsSlice";

export class ScheduledSession {
  constructor(
    public id: ProgramId,
    public name: string,
    public shortDesc: string,
    public sessionDesc: any,
    public state: any
  ) {}
}

// Redux type
export type ScheduledDate = {
  [date: number]: ScheduledSession | null;
};
export type ScheduleCacheState = {
  [programId in ProgramId]: ScheduledDate;
};

type Payload = {
  program: ProgramId;
  dates: ScheduledDate;
};

const scheduleCacheSlice = createSlice({
  name: "programs",

  initialState: {} as ScheduleCacheState,

  reducers: {
    addToCache: (state, action: PayloadAction<Payload>) => {
      state[action.payload.program] = action.payload.dates;
    },
    removeProgram: (state, action: PayloadAction<ProgramId>) => {
      delete state[action.payload];
    },
    clearCache: (state) => {
      state = {} as ScheduleCacheState;
    },
  },
});

export const scheduleCacheActions = scheduleCacheSlice.actions;
export const scheduleCacheReducer = scheduleCacheSlice.reducer;

export const scheduleCacheMiddleware: Middleware =
  ({ getState, dispatch }) =>
  (next) =>
  (action) => {
    if (action.type !== "programs/updateProgramsState") {
      return next(action);
    }

    action.payload.forEach((p: ProgramState) => {
      // If the program is changed to inactive, remove it from the cache
      if (!p.active) {
        return dispatch(scheduleCacheActions.removeProgram(p.id));
      }

      // Get full program data
      const fullPr = programs.get(p.id);
      if (!fullPr) {
        return;
      }
      const program: TrainingProgram = { ...fullPr, ...p };

      // Init cahce for program
      let cache = {} as ScheduledDate;

      //// Create a cache for the next three months
      let currentDate = new Date(program.state.sessionDate);
      const endDate = add(currentDate, { months: 3 });

      let nextState = program.state;

      while (compareAsc(currentDate, endDate) <= 0) {
        let today: ScheduledDate = {
          [currentDate.getTime()]: null,
        };

        if (compareAsc(currentDate, nextState.sessionDate) === 0) {
          today = {
            [currentDate.getTime()]: new ScheduledSession(
              program.id,
              program.name,
              program.shortDesc,
              program.getDescFromState(nextState),
              nextState
            ),
          };

          nextState = program.getNextState(
            nextState,
            {},
            { forceProgress: true, fromToday: false }
          );
        }

        cache = { ...cache, ...today };

        currentDate = add(currentDate, { days: 1 });
      }

      // for (let i = startDate; i < endDate; i += 24 * 60 * 60 * 1000) {
      //   let today: ScheduledDate = {
      //     [i]: null,
      //   };

      //   console.log(i);
      //   console.log(nextState.sessionDate);
      //   console.log(i === nextState.sessionDate);

      //   if (i === nextState.sessionDate) {
      //     today = {
      //       [startDate]: new ScheduledSession(
      //         program.id,
      //         program.name,
      //         program.shortDesc,
      //         program.getDescFromState(program.state),
      //         program.state
      //       ),
      //     };

      //     nextState = program.getNextState(
      //       nextState,
      //       {},
      //       { forceProgress: true, fromToday: false }
      //     );
      //   }

      //   cache = { ...cache, ...today };
      // }

      dispatch(
        scheduleCacheActions.addToCache({ program: p.id, dates: cache })
      );
    });

    return next(action);
  };
