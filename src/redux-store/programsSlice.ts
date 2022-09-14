import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

import { ProgramId, TPState } from '../training-programs/data-types';

// Type of individual program
export type ProgramState =
  | {
      id: ProgramId;
      active: true;
      state: any;
      version: string;
    }
  | {
      id: ProgramId;
      active: false;
      state: null;
      version: null;
    };

// Redux type
// export type ProgramsState = {
//   byId: {
//     [programId in ProgramId]: ProgramState;
//   };
//   arr: ProgramId[];
// };
export type ProgramsState = {
  byId: {
    [programId in ProgramId]: TPState<ProgramId, boolean>;
  };
  arr: ProgramId[];
};

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
    updateProgramsState: (state, action: PayloadAction<ProgramState[]>) => {
      action.payload.forEach((program) => {
        const id = program.id;
        state.byId[id] = { ...state.byId[id], ...program };
      });
    },

    add: (
      state,
      action: PayloadAction<{
        id: ProgramId;
        initData: any;
        state: any;
        version: string;
      }>
    ) => {
      const id = action.payload.id;
      state.byId[id] = {
        id,
        active: true,
        state: action.payload.state,
        version: action.payload.version,
      };
    },
    remove: (
      state,
      action: PayloadAction<{ id: ProgramId; version: string }>
    ) => {
      const programId = action.payload.id;
      state.byId[programId] = {
        id: programId,
        active: false,
        state: null,
        version: null,
      };
    },
    update: (
      state,
      action: PayloadAction<{
        id: ProgramId;
        state: any;
        achieved: any;
        version: string;
      }>
    ) => {
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

export const programsActions = programsSlice.actions;
export const programsReducer = programsSlice.reducer;
