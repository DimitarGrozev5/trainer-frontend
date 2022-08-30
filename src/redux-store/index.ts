import { configureStore } from "@reduxjs/toolkit";
import { programsReducer } from "./programsSlice";
import {
  scheduleCacheMiddleware,
  scheduleCacheReducer,
} from "./scheduleCacheSlice";
import { userMiddleware, userReducer } from "./userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    programs: programsReducer,
    scheduleCache: scheduleCacheReducer,
  },
  middleware: [userMiddleware, scheduleCacheMiddleware],
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
