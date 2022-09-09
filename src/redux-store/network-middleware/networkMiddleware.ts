import { Middleware } from '@reduxjs/toolkit';
import { ProgramId } from '../../training-programs/data-types';
import { programsActions } from '../programsSlice';
import { httpClient } from './httpClient';

export const networkMiddleware: Middleware =
  ({ getState, dispatch }) =>
  (next) =>
  async (action) => {
    // Get http client
    const sendRequest = httpClient({ getState, dispatch });

    // Add
    let response: any;
    switch (action.type) {
      case 'programs/add':
        const add: {
          id: ProgramId;
          state: any;
          initData: any;
          version: string;
        } = action.payload;

        try {
          const res = await sendRequest('/', {
            body: {
              id: add.id,
              initData: add.initData,
              initState: add.state,
            },
          });

          response = {
            id: add.id,
            initData: add.initData,
            state: add.state,
            version: res.nextVersion,
          };
        } catch (err) {
          console.log(err);
          return;
        }
        return next(programsActions.add(response));

      // Remove
      case 'programs/remove':
        const remove: { id: ProgramId; version: string } = action.payload;

        try {
          const res = await sendRequest(`/${remove.id}`, {
            method: 'DELETE',
            body: { version: action.payload.version },
          });

          response = {
            id: remove.id,
            version: '',
          };
        } catch (err) {
          console.log(err);
          return;
        }
        return next(programsActions.remove(response));

      // Update
      case 'programs/update':
        const update: {
          id: ProgramId;
          state: any;
          achieved: any;
          version: string;
        } = action.payload;
        try {
          const res = await sendRequest(`/${update.id}`, {
            body: {
              id: update.id,
              state: update.state,
              achieved: update.achieved,
              version: update.version,
            },
            method: 'PATCH',
          });

          response = { id: update.id, state: update.state, version: res.version };
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
