import { Middleware } from "@reduxjs/toolkit";
import { httpClient } from "./httpClient";

export const networkMiddleware: Middleware =
  ({ getState, dispatch }) =>
  (next) =>
  async (action) => {
    // Get http client
    const sendRequest = httpClient({ getState, dispatch });

    switch (action.type) {
      case "programs/add":
        break;
      case "programs/remove":
        break;
      case "programs/update":
        break;
      default:
        break;
    }
    return next(action);
  };
