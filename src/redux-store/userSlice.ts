import { createSlice, Middleware } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export class UserState {
  // Null if not logged in
  // JWT if logged in
  userId: string | null;
  token: string | null;

  constructor(userId: string | null, token: string | null) {
    this.userId = userId;
    this.token = token;
  }
}

const userSlice = createSlice({
  name: "user",

  initialState: {
    userId: null,
    token: null,
  } as UserState,

  reducers: {
    setUserData: (state, action: PayloadAction<UserState>) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
    },
    clearUserData: (state) => {
      state.userId = null;
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
