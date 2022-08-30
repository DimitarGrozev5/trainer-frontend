import { Middleware } from "@reduxjs/toolkit";
import { ProgramId } from "../../training-programs/data-types";
import { programsActions, ProgramState } from "../programsSlice";
import { httpClient } from "./httpClient";

export const networkMiddleware: Middleware =
  ({ getState, dispatch }) =>
  (next) =>
  async (action) => {
    // Get http client
    const sendRequest = httpClient({ getState, dispatch });

    // Add
    let response: ProgramState;
    switch (action.type) {
      case "programs/add":
        const add: { id: ProgramId; state: any } = action.payload;
        try {
          const res = await sendRequest("/", {
            body: { id: add.id, state: add.state },
          });

          response = { id: res.id, active: true, state: res.state };
        } catch (err) {
          console.log(err);
          return;
        }
        return dispatch(programsActions.updateProgramsState([response]));

      // Remove
      case "programs/remove":
        const removeId: ProgramId = action.payload;
        try {
          const res = await sendRequest(`/${removeId}`, {
            method: "DELETE",
          });

          response = { id: res.id, active: false, state: null };
        } catch (err) {
          console.log(err);
          return;
        }
        return dispatch(programsActions.updateProgramsState([response]));

      // Update
      case "programs/update":
        const update: { id: ProgramId; state: any } = action.payload;
        try {
          const res = await sendRequest(`/${update.id}`, {
            body: { id: update.id, state: update.state },
            method: "PATCH",
          });

          response = { id: res.id, active: true, state: res.state };
        } catch (err) {
          console.log(err);
          return;
        }
        return dispatch(programsActions.updateProgramsState([response]));

      default:
        break;
    }
    return next(action);
  };
