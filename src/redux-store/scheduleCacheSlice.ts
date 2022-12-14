import { createSlice, Middleware } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { add, compareAsc } from 'date-fns';
import { programs } from '../training-programs';

import { ProgramId, TPActive, TPState } from '../training-programs/data-types';
import { SessionDate } from '../training-programs/extra-types';

interface ScheduledSession {
  id: ProgramId;
  name: string;
  shortDesc: string;
  sessionDesc: any;
  state: any;
}

const getScheduledSession = (
  id: ProgramId,
  name: string,
  shortDesc: string,
  sessionDesc: any,
  state: any
) => ({
  id,
  name,
  shortDesc,
  sessionDesc,
  state,
});

// Redux type
type ScheduledDate = {
  [date: number]: ScheduledSession | null;
};
type ScheduleCacheState = {
  [programId in ProgramId]: ScheduledDate;
};

type Payload = {
  program: ProgramId;
  dates: ScheduledDate;
};

const scheduleCacheSlice = createSlice({
  name: 'scheduleCache',

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
    if (!action.type.startsWith('programs/')) {
      return next(action);
    }

    let payload: TPState<ProgramId, boolean>[];
    switch (action.type) {
      case 'programs/updateProgramsState':
        payload = action.payload;
        break;
      case 'programs/add':
        payload = [action.payload];
        break;
      case 'programs/remove':
        dispatch(scheduleCacheActions.removeProgram(action.payload.id));
        return next(action);
      case 'programs/update':
        payload = [action.payload];
        break;

      default:
        payload = [];
        break;
    }

    payload.forEach((programData: TPState<ProgramId, boolean>) => {
      // If the program is changed to inactive, remove it from the cache and exit
      if ('active' in programData && !programData.active) {
        return dispatch(scheduleCacheActions.removeProgram(programData.id));
      }

      // Get full program data
      const programMethods = programs.get(programData.id);
      if (!programMethods) {
        return;
      }

      // If the function got to here, then the program is active and it's safe to coerce it
      const program = { ...programMethods, ...programData } as TPActive;

      // Init cahce for program
      let cache = {} as ScheduledDate;

      //// Create a cache for the next three months
      let currentDate = SessionDate.toDate(program.state.sessionDate);
      const endDate = add(currentDate, { months: 3 });

      let nextState = program.state;

      while (compareAsc(currentDate, endDate) <= 0) {
        let today: ScheduledDate = {
          [currentDate.getTime()]: null,
        };

        if (compareAsc(currentDate, SessionDate.toDate(nextState.sessionDate)) === 0) {
          today = {
            [currentDate.getTime()]: getScheduledSession(
              program.id,
              program.name,
              program.shortDesc,
              program.getDescFromState(nextState),
              nextState
            ),
          };

          nextState = program.getNextScheduleState(nextState);
        }

        cache = { ...cache, ...today };

        currentDate = add(currentDate, { days: 1 });
      }

      dispatch(
        scheduleCacheActions.addToCache({
          program: programData.id,
          dates: cache,
        })
      );
    });

    return next(action);
  };
