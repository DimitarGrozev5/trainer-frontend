import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { useHttpClient } from "../../../hooks/useHttpClient";
import { userActions } from "../../../redux-store/userSlice";
import LoadingSpinner from "../../UI-elements/LoadingSpinner/LoadingSpinner";

const Logout = () => {
  const { isLoading, sendRequest } = useHttpClient();

  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.userId);

  useEffect(() => {
    (async () => {
      try {
        await sendRequest(`/users/${userId}/logout`, { method: "POST" });
      } catch (err) {
        console.log(err);
      }
      dispatch(userActions.clearUserData());
    })();
  }, [sendRequest, dispatch, userId]);

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <div
        style={{
          position: "fixed",
          left: "0px",
          right: "0px",
          top: "0px",
          bottom: "0px",
          zIndex: -1,
          backgroundColor: "#fff",
        }}
      ></div>
    </>
  );
};

export default Logout;
