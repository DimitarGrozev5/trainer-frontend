import { AnyAction, createSlice, ThunkAction } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

import {
  Addable,
  Deleteable,
  ProgramId,
  ThunkAddable,
  ThunkDeleteable,
  ThunkUpdatable,
  TPState,
  Updatable,
} from '../training-programs/data-types';

// Data types
type ProgramsState = {
  byId: {
    [programId in ProgramId]: TPState<ProgramId, boolean>;
  };
  arr: ProgramId[];
};

// ProgramsSlice
const programsSlice = createSlice({
  name: 'programs',

  initialState: {
    byId: {
      EnduroGrip: {
        id: 'EnduroGrip',
        active: false,
        state: null,
        version: null,
      },
      ees: { id: 'ees', active: false, state: null, version: null },
      // "Q&D": { id: "Q&D", active: false, state: null },
    },
    arr: ['EnduroGrip', 'ees'],
  } as ProgramsState,

  reducers: {
    updateProgramsState: (
      state,
      action: PayloadAction<TPState<ProgramId, boolean>[]>
    ) => {
      action.payload.forEach((program) => {
        const id = program.id;
        state.byId[id] = { ...state.byId[id], ...program };
      });
    },

    add: (state, action: PayloadAction<Addable<ProgramId>>) => {
      const id = action.payload.id;
      state.byId[id] = {
        id,
        active: true,
        state: action.payload.state,
        version: action.payload.version,
      };
    },
    remove: (state, action: PayloadAction<Deleteable>) => {
      const programId = action.payload.id;
      state.byId[programId] = {
        id: programId,
        active: false,
        state: null,
        version: null,
      };
    },
    update: (state, action: PayloadAction<Updatable<ProgramId, boolean>>) => {
      const program = action.payload;
      state.byId[program.id] = {
        id: program.id,
        active: true,
        state: program.state,
        version: action.payload.version,
      };
    },
  },
});

// Data fetching thunks
const addThunk =
  (
    data: ThunkAddable<ProgramId>
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  () => {};

const removeThunk =
  (data: ThunkDeleteable): ThunkAction<void, RootState, unknown, AnyAction> =>
  () => {};

const updateThunk =
  (
    data: ThunkUpdatable<ProgramId, boolean>
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  () => {};

// Export Actions and Reducers
export const programsActions = programsSlice.actions;
export const programsReducer = programsSlice.reducer;
