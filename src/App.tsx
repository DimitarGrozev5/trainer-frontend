import { Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import ActiveSession from "./components/route-endpoints/ActiveSession/ActiveSession";
import HomePage from "./components/route-endpoints/HomePage/HomePage";
import Logout from "./components/route-endpoints/Logout/Logout";
import ManagePrograms from "./components/route-endpoints/ManagePrograms/ManagePrograms";
import TrainingHub from "./components/route-endpoints/TrainingHub/TrainingHub";
import BaseTemplate from "./components/templates/BaseTemplate/BaseTemplate";
import FullScreenTemplate from "./components/templates/FullScreenTemplate/FullScreenTemplate";
import LoadingSpinner from "./components/UI-elements/LoadingSpinner/LoadingSpinner";
import ErrorModal from "./components/UI-elements/Modal/ErrorModal";
import { useAppDispatch, useAppSelector } from "./hooks/redux-hooks";
import { useAuth } from "./hooks/useAuth";
import { useGetInitialData } from "./hooks/useGetInitialData";
import { networkActions } from "./redux-store/networkSlice";

function App() {
  const dispatch = useAppDispatch();

  // Get authorization data from localStorage
  const token = useAuth().token;
  // const token = true;

  // Get programs data from the backend on first app load
  // const { isLoading, error, clearError } =
  useGetInitialData();

  // const isLoading = useAppSelector((state) => state.network.isLoading);
  const error = useAppSelector((state) => state.network.error);
  const clearError = () => dispatch(networkActions.clearError());

  return (
    <>
      {/* {isLoading && <LoadingSpinner asOverlay />} */}
      <ErrorModal show={!!error} error={error || ""} onClose={clearError} />

      <Routes>
        <Route path="/" element={<BaseTemplate />}>
          {!token && <Route index element={<HomePage />} />}
          {!!token && (
            <>
              <Route index element={<TrainingHub />} />
              <Route path="/manage-programs" element={<ManagePrograms />} />
            </>
          )}
        </Route>

        {!!token && (
          <Route path="/active" element={<FullScreenTemplate />}>
            <Route path=":programId" element={<ActiveSession />} />
          </Route>
        )}

        {!!token && <Route path="/logout" element={<Logout />} />}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
