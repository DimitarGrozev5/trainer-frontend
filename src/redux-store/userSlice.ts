import { createSlice } from "@reduxjs/toolkit";
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
