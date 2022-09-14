import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface NetworkState {
  isLoading: boolean;
  error: string | null;
}

const networkSlice = createSlice({
  name: "user",

  initialState: {
    isLoading: false,
    error: null,
  } as NetworkState,

  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const networkActions = networkSlice.actions;
export const networkReducer = networkSlice.reducer;
