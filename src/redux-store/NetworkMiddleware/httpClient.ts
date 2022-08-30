import { MiddlewareAPI } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { networkActions } from "../networkSlice";
import { userActions } from "../userSlice";

type HttpMethod = "GET" | "POST" | "DELETE" | "PATCH";

interface HttpHeaders {
  "Content-Type"?: string;
  Authorization?: string;
}

interface Config {
  addUserRoute?: boolean;
  body?: any;
  method?: HttpMethod;
  headers?: HttpHeaders;
  auth?: boolean;
  strategy?: "fetch-first" | "sync-first" | "fetch-only" | "sync-only";
}

export const httpClient = ({ getState, dispatch }: MiddlewareAPI) => {
  const state = getState();
  const userData = state.user;

  const setIsLoading = (to: boolean) =>
    dispatch(networkActions.setIsLoading(to));

  const setError = (to: string | null) => dispatch(networkActions.setError(to));

  // Abort controllers shouln't be neccessery in a Middleware
  // let activeHttpRequests: AbortController[] = [];

  const sendRequest = async (
    url: string,
    {
      addUserRoute = true,
      body = null,
      method,
      headers,
      auth = true,
      strategy = "fetch-only",
    }: Config = {}
  ) => {
    setIsLoading(true);

    // const httpAbortCtrl = new AbortController();
    // activeHttpRequests.push(httpAbortCtrl);

    // Setup config object for fetch request
    const config: RequestInit = {
      method: "GET",
    };
    const headersObj: HttpHeaders = {};

    // Set http method
    if (method) {
      config.method = method;
    }
    if (!method && body) {
      config.method = "POST";
    }

    // Convert body to json and attach it
    if (body) {
      config.body = JSON.stringify(body);
    }

    // Set Content-Type to json
    if (!headers?.["Content-Type"] && body) {
      headersObj["Content-Type"] = "application/json";
    }

    // Add Authorization token
    if (auth !== false && userData.token) {
      headersObj["Authorization"] = userData.token;
    }

    // Merge provided headers and preconfigured headers
    config.headers = { ...headersObj, ...headers };

    // Attach httpAbort controller
    // config.signal = httpAbortCtrl.signal;

    try {
      const userRoute = addUserRoute ? `/users/${userData.userId}` : "";
      const fullUrl = process.env.REACT_APP_BACKEND_API + userRoute + url;

      // Fetch data
      const response = await fetch(fullUrl, config);

      // Convert to json
      const responseData = await response.json();

      // Remove http abort controller from list of active controllers
      // activeHttpRequests = activeHttpRequests.filter(
      //   (reqCtrl) => reqCtrl !== httpAbortCtrl
      // );

      if (!response.ok) {
        // Auto logout if the status code is 401 - Unauthorized
        if (response.status === 401) {
          dispatch(userActions.clearUserData());
        }

        // TODO: Redirect to login if the status code is 511 - Network Authentication Required
        // This happens when a new user is created but JWT generation failed
        // if (response.status === 511) {
        //   // TODO: Global error handler
        //   navigate("/login");
        // }

        throw new Error(responseData.message);
      }

      setIsLoading(false);
      return responseData;
    } catch (err: any) {
      // err.name !== "TypeError" && setError(err.message);
      setError(err.message);
      setIsLoading(false);
      throw err;
    }
  };

  // useEffect(
  //   () => () => {
  //     activeHttpRequests.forEach((abortCtrl) => abortCtrl.abort());
  //   },
  //   []
  // );

  return sendRequest;
};
