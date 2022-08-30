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

    switch (action.type) {
      case "programs/add":
        const add: { id: ProgramId; state: any } = action.payload;
        let response: ProgramState;
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

      case "programs/remove":
        break;
      case "programs/update":
        break;
      default:
        break;
    }
    return next(action);
  };
