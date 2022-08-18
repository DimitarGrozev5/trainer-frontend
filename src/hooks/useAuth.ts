import { useEffect } from "react";
import { UserState } from "../redux-store/userSlice";

const authKey = process.env.REACT_APP_LOCALSTORAGE_AUTH_KEY || "userData";

const clearUserData = () => localStorage.removeItem(authKey);

export const useAuth = () => {
  useEffect(() => {
    // Retreive auth data
    const storageData = localStorage.getItem(authKey);
    if (!storageData) {
      return;
    }

    let userData: UserState;
    try {
      userData = JSON.parse(storageData);
    } catch (error) {
      // TODO: Global error handling
      clearUserData();
      console.log(error);
    }

    // Decode token

    // Update state
    // Request token refresh
  }, []);
};
