import { Middleware } from "@reduxjs/toolkit";

export const userMiddleware: Middleware =
  ({ getState, dispatch }) =>
  (next) =>
  (action) => {
    switch (action.type) {
      case "programs/setUserData":
        break;
      default:
        break;
    }
    return next(action);
  };
