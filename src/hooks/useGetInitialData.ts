import { useEffect } from 'react';
import { programsActions } from '../redux-store/programsSlice';
import { ProgramId, TPState } from '../training-programs/data-types';
import { useAppDispatch, useAppSelector } from './redux-hooks';
import { useHttpClient } from './useHttpClient';

export const useGetInitialData = () => {
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector((state) => state.user.token);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    (async () => {
      let res: TPState<ProgramId, boolean>[] = [];
      try {
        const response = await sendRequest(`/`);
        res = response.map((r: any) => ({
          id: r.id,
          active: true,
          state: r.state,
          version: r.version,
        }));
      } catch (err) {
        console.log(err);
      }

      dispatch(programsActions.updateProgramsState(res));
    })();
  }, [isLoggedIn, dispatch, sendRequest]);

  return { isLoading, error, clearError };
};
