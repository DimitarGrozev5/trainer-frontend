import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { userActions, UserState } from "../redux-store/userSlice";
import { useAppDispatch, useAppSelector } from "./redux-hooks";
import { useHttpClient } from "./useHttpClient";

const authKey = process.env.REACT_APP_LOCALSTORAGE_AUTH_KEY || "userData";

const clearUserData = () => localStorage.removeItem(authKey);

interface JWT {
  userId: string;
  exp: number;
  iat: number;
}

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { sendRequest } = useHttpClient();

  const userData = useAppSelector((state) => state.user);

  useEffect(() => {
    (async () => {
      // Retreive auth data
      const storageData = localStorage.getItem(authKey);
      if (!storageData) {
        return;
      }

      let userData: { userId: string; token: string };
      try {
        userData = JSON.parse(storageData);
      } catch (error) {
        // TODO: Global error handling
        clearUserData();
        console.log(error);
        return;
      }

      // Decode token
      let decodedToken: JWT;
      try {
        decodedToken = jwtDecode(userData.token);
      } catch (error) {
        // TODO: Global error handling
        clearUserData();
        console.log(error);
        return;
      }

      // Validate token expiration date
      const now = +new Date();
      if (now >= decodedToken.exp * 1000) {
        clearUserData();
        return;
      }

      // Request token refresh if the token has less than 5 days left
      let receivedData: UserState | null = null;

      if (decodedToken.exp * 1000 < now + 5 * 24 * 60 * 60) {
        try {
          receivedData = await sendRequest(
            `/users/${userData.userId}/refresh`,
            { method: "POST", headers: { Authorization: userData.token } }
          );
        } catch (error) {
          console.log(error);
        }
      }

      // Update state
      const newState = !!receivedData
        ? new UserState(receivedData.userId, receivedData.token)
        : new UserState(userData.userId, userData.token);

      dispatch(userActions.setUserData(newState));
    })();
  }, [dispatch, sendRequest]);

  return userData;
};
