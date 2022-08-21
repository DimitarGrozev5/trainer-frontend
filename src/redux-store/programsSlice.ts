import { createSlice, Middleware } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

// All valid programIds will be stored here
export type ProgramId = "ETK" | "Q&D";

// Type of individual program
export type ProgramState =
  | {
      id: ProgramId;
      active: true;
      data: Object;
    }
  | {
      id: ProgramId;
      active: false;
      data: null;
    };

// Redux type
type ProgramsState = {
  [programId in ProgramId]: ProgramState;
};

const programsSlice = createSlice({
  name: "programs",

  initialState: {
    ETK: { id: "ETK", active: false, data: null },
  } as ProgramsState,

  reducers: {
    updateProgramsState: (state, action: PayloadAction<ProgramState[]>) => {
      action.payload.forEach((program) => {
        const id = program.id;
        state[id] = { ...state[id], ...program };
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
