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
      "Q&D": { id: "Q&D", active: false, state: null },
    },
    arr: ["EnduroGrip", "Q&D"],
  } as ProgramsState,

  reducers: {
    updateProgramsState: (state, action: PayloadAction<ProgramState[]>) => {
      action.payload.forEach((program) => {
        const id = program.id;
        state.byId[id] = { ...state.byId[id], ...program };
      });
    },
  },
});

export const programsActions = programsSlice.actions;
export const programsReducer = programsSlice.reducer;

// const authKey = process.env.REACT_APP_LOCALSTORAGE_AUTH_KEY || "userData";

// export const userMiddleware: Middleware = (storeAPI) => (next) => (action) => {
//   switch (action.type) {
//     case "user/setUserData":
//       // Save userData to local storage
//       localStorage.setItem(authKey, JSON.stringify(action.payload));
//       break;

//     case "user/clearUserData":
//       // Remove userData from local storage
//       localStorage.removeItem(authKey);
//       break;

//     default:
//       break;
//   }
//   return next(action);
// };
