import { Middleware } from "@reduxjs/toolkit";
import { ProgramId } from "../../training-programs/data-types";
import { programsActions } from "../programsSlice";
import { httpClient } from "./httpClient";

export const networkMiddleware: Middleware =
  ({ getState, dispatch }) =>
  (next) =>
  async (action) => {
    // Get http client
    const sendRequest = httpClient({ getState, dispatch });

    // Add
    let response: any;
    switch (action.type) {
      case "programs/add":
        const add: { id: ProgramId; state: any } = action.payload;
        try {
          const res = await sendRequest("/", {
            body: { id: add.id, state: add.state },
          });

          response = { id: res.id, state: res.state };
        } catch (err) {
          console.log(err);
          return;
        }
        return next(programsActions.add(response));

      // Remove
      case "programs/remove":
        const removeId: ProgramId = action.payload;
        try {
          const res = await sendRequest(`/${removeId}`, {
            method: "DELETE",
          });

          response = res.id;
        } catch (err) {
          console.log(err);
          return;
        }
        return next(programsActions.remove(response));

      // Update
      case "programs/update":
        const update: { id: ProgramId; state: any } = action.payload;
        try {
          const res = await sendRequest(`/${update.id}`, {
            body: { id: update.id, state: update.state },
            method: "PATCH",
          });

          response = { id: res.id, state: res.state };
        } catch (err) {
          console.log(err);
          return;
        }
        return next(programsActions.update(response));

      default:
        break;
    }
    return next(action);
  };
