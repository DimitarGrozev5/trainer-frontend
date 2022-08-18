import { createSlice, Middleware } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  // Null if not logged in
  // JWT if logged in
  userId: string | null;
  token: string | null;
};

const userSlice = createSlice({
  name: "user",

  initialState: {
    userId: null,
    token: null,
  } as UserState,

  reducers: {
    setUserData: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearUserData: (state) => {
      state.token = null;
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;

export const userMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  switch (action.type) {
    case "user/setUserData":
      // Save userData to local storage
      localStorage.setItem("userData", JSON.stringify(action.payload));
      break;

    case "user/clearUserData":
      // Remove userData from local storage
      localStorage.removeItem("userData");
      break;

    default:
      break;
  }
  return next(action);
};
