import { configureStore } from "@reduxjs/toolkit";
import { networkMiddleware } from "./network-middleware/networkMiddleware";
import { networkReducer } from "./networkSlice";
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
    network: networkReducer,
  },
  middleware: [userMiddleware, networkMiddleware, scheduleCacheMiddleware],
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
