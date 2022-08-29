import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux-hooks";
import { useHttpClient } from "./useHttpClient";

export const useGetInitialData = () => {
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector((state) => state.user.token);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    (async () => {
      try {
        const response = await sendRequest(`/`);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [isLoggedIn]);
};
