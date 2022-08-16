import { createSlice, Middleware } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  // Null if not logged in
  // JWT if logged in
  accessToken: string | null;
};

const userSlice = createSlice({
  name: "user",

  initialState: {
    accessToken: null,
  } as UserState,

  reducers: {
    setUserData: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    clearUserData: (state) => {
      state.accessToken = null;
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
