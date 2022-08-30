import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

import { ProgramId } from "../training-programs/data-types";

// Type of individual program
export type ProgramState =
  | {
      id: ProgramId;
      active: true;
      state: any;
    }
  | {
      id: ProgramId;
      active: false;
      state: null;
    };

// Redux type
export type ProgramsState = {
  byId: {
    [programId in ProgramId]: ProgramState;
  };
  arr: ProgramId[];
};

const programsSlice = createSlice({
  name: "programs",

  initialState: {
    byId: {
      EnduroGrip: { id: "EnduroGrip", active: false, state: null },
      ees: { id: "ees", active: false, state: null },
      // "Q&D": { id: "Q&D", active: false, state: null },
    },
    arr: ["EnduroGrip", "ees"],
  } as ProgramsState,

  reducers: {
    updateProgramsState: (state, action: PayloadAction<ProgramState[]>) => {
      action.payload.forEach((program) => {
        const id = program.id;
        state.byId[id] = { ...state.byId[id], ...program };
      });
    },

    add: (state, action: PayloadAction<{ id: ProgramId; state: any }>) => {
      const id = action.payload.id;
      state.byId[id] = { id, active: true, state: action.payload.state };
    },
    remove: (state, action: PayloadAction<ProgramId[]>) => {
      action.payload.forEach((programId) => {
        state.byId[programId] = { id: programId, active: false, state: null };
      });
    },
    update: (state, action: PayloadAction<{ id: ProgramId; state: any }[]>) => {
      action.payload.forEach((program) => {
        const id = program.id;
        state.byId[id] = { id, active: true, state: program.state };
      });
    },
  },
});

export const programsActions = programsSlice.actions;
export const programsReducer = programsSlice.reducer;
