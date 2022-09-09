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
  name: "scheduleCache",

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
    if (!action.type.startsWith("programs/")) {
      return next(action);
    }

    let payload: ProgramState[];
    switch (action.type) {
      case "programs/updateProgramsState":
        payload = action.payload;
        break;
      case "programs/add":
        payload = [action.payload];
        break;
      case "programs/remove":
        dispatch(scheduleCacheActions.removeProgram(action.payload));
        return next(action);
      case "programs/update":
        payload = [action.payload];
        break;

      default:
        payload = [];
        break;
    }

    payload.forEach((p: ProgramState) => {
      // If the program is changed to inactive, remove it from the cache
      if ("active" in p && !p.active) {
        return dispatch(scheduleCacheActions.removeProgram(p.id));
      }

      // Get full program data
      const fullPr = programs.get(p.id);
      if (!fullPr) {
        return;
      }
      const program: TrainingProgram<ProgramId> = { ...fullPr, ...p };

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

      dispatch(
        scheduleCacheActions.addToCache({ program: p.id, dates: cache })
      );
    });

    return next(action);
  };
