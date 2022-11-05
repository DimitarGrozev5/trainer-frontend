import { AnyAction, createSlice, ThunkAction } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

import {
  Addable,
  Deleteable,
  ProgramId,
  ThunkAddable,
  ThunkDeleteable,
  ThunkUpdatable,
  TPState,
  Updatable,
} from '../training-programs/data-types';
import { httpClient } from './http-client/httpClient';

// Data types
type ProgramsState = {
  byId: {
    [programId in ProgramId]: TPState<ProgramId, boolean>;
  };
  arr: ProgramId[];
};

// ProgramsSlice
const programsSlice = createSlice({
  name: 'programs',

  initialState: {
    byId: {
      EnduroGrip: {
        id: 'EnduroGrip',
        active: false,
        state: null,
        version: null,
      },
      ees: { id: 'ees', active: false, state: null, version: null },
      'quick-dead': {
        id: 'quick-dead',
        active: false,
        state: null,
        version: null,
      },
      rtk: { id: 'rtk', active: false, state: null, version: null },
    },
    arr: ['EnduroGrip', 'ees', 'quick-dead', 'rtk'],
  } as ProgramsState,

  reducers: {
    updateProgramsState: (
      state,
      action: PayloadAction<TPState<ProgramId, boolean>[]>
    ) => {
      action.payload.forEach((program) => {
        const id = program.id;
        state.byId[id] = { ...state.byId[id], ...program };
      });
    },

    add: (state, action: PayloadAction<Addable<ProgramId>>) => {
      const id = action.payload.id;
      state.byId[id] = {
        id,
        active: true,
        state: action.payload.state,
        version: action.payload.version,
      };
    },
    remove: (state, action: PayloadAction<Deleteable>) => {
      const programId = action.payload.id;
      state.byId[programId] = {
        id: programId,
        active: false,
        state: null,
        version: null,
      };
    },
    update: (state, action: PayloadAction<Updatable<ProgramId, boolean>>) => {
      const program = action.payload;
      state.byId[program.id] = {
        id: program.id,
        active: true,
        state: program.state,
        version: action.payload.version,
      };
    },
  },
});

const sliceActions = programsSlice.actions;

// Data fetching thunks
const addThunk =
  (
    data: ThunkAddable<ProgramId>
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch, getState) => {
    // Get http client
    const sendRequest = httpClient({ getState, dispatch });

    // Optimistically update the state
    dispatch(
      sliceActions.add({
        id: data.id,
        state: data.state,
        version: '',
      })
    );

    try {
      const res = await sendRequest('/', {
        body: {
          id: data.id,
          initData: data.initData,
          initState: data.state,
        },
      });

      // Update version after successful request
      dispatch(
        sliceActions.update({
          id: data.id,
          state: data.state,
          version: res.version,
        })
      );
    } catch (err) {
      console.log(err);
      // Remove program if request failed
      dispatch(sliceActions.remove({ id: data.id }));
      return;
    }
  };

const removeThunk =
  (data: ThunkDeleteable): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch, getState) => {
    // Get http client
    const sendRequest = httpClient({ getState, dispatch });

    // Optimistically remove the program
    const originalState = getState().programs.byId[data.id];
    dispatch(
      sliceActions.remove({
        id: data.id,
      })
    );

    try {
      await sendRequest(`/${data.id}`, {
        method: 'DELETE',
        body: { version: data.version },
      });

      // Do nothing after successful request
    } catch (err) {
      console.log(err);

      // Restore program after a failed request
      dispatch(
        sliceActions.add({
          id: data.id,
          state: originalState.state!,
          version: originalState.version!,
        })
      );
      return;
    }
  };

const updateThunk =
  (
    data: ThunkUpdatable<ProgramId>
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch, getState) => {
    // Get http client
    const sendRequest = httpClient({ getState, dispatch });

    // Optimistically update the program
    const originalState = getState().programs.byId[data.id];
    dispatch(
      sliceActions.update({
        id: data.id,
        state: data.state,
        version: '',
      })
    );

    try {
      const res = await sendRequest(`/${data.id}`, {
        body: {
          id: data.id,
          state: data.state,
          achieved: data.achieved,
          version: data.version,
        },
        method: 'PATCH',
      });

      // Update version after successful request
      dispatch(
        sliceActions.update({
          id: data.id,
          state: data.state,
          version: res.version,
        })
      );
    } catch (err) {
      console.log(err);

      // Remove program if request failed
      dispatch(
        sliceActions.update({
          id: data.id,
          state: originalState.state!,
          version: originalState.version!,
        })
      );
      return;
    }
  };

// Export Actions and Reducers
export const programsActions = {
  ...sliceActions,
  addThunk,
  removeThunk,
  updateThunk,
};
export const programsReducer = programsSlice.reducer;
