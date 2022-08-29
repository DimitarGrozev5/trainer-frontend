import { createSlice, Middleware } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

import { ProgramId } from "../training-programs/data-types";

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
export type ScheduleCacheState = {
  [programId in ProgramId]: ScheduledSession[];
};

const scheduleCacheSlice = createSlice({
  name: "programs",

  initialState: {} as ScheduleCacheState,

  reducers: {
    clearCache: (state) => {
      state = {} as ScheduleCacheState;
    },
  },
});

export const scheduleCacheActions = scheduleCacheSlice.actions;
export const scheduleCacheReducer = scheduleCacheSlice.reducer;

export const scheduleCacheMiddleware: Middleware =
  (storeAPI) => (next) => (action) => {
    switch (action.type) {
      case "programs/updateProgramsState":
        console.log(storeAPI);
        break;

      default:
        break;
    }
    return next(action);
  };
