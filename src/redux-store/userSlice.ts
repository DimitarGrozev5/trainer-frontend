import { createSlice, Middleware } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  // Null if not logged in
  // JWT if logged in
  userId: string | null;
  token: string | null;
}

const userSlice = createSlice({
  name: 'user',

  initialState: {
    userId: null,
    token: null,
  } as UserState,

  reducers: {
    setUserData: {
      reducer: (state, action: PayloadAction<UserState>) => {
        state.userId = action.payload.userId;
        state.token = action.payload.token;
      },
      prepare: (userId: string | null, token: string | null) => {
        return {
          payload: { userId, token },
        };
      },
    },
    clearUserData: (state) => {
      state.userId = null;
      state.token = null;
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;

const authKey = process.env.REACT_APP_LOCALSTORAGE_AUTH_KEY || 'userData';

export const userMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  switch (action.type) {
    case 'user/setUserData':
      // Save userData to local storage
      localStorage.setItem(authKey, JSON.stringify(action.payload));
      break;

    case 'user/clearUserData':
      // Remove userData from local storage
      localStorage.removeItem(authKey);
      break;

    default:
      break;
  }
  return next(action);
};
