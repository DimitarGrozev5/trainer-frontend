import { Routes, Route, Navigate } from "react-router-dom";
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
import { useAppSelector } from "./hooks/redux-hooks";
import ScheduleCacheProvider from "./hooks/ScheduleService/schedule-cache-context";
import { useAuth } from "./hooks/useAuth";
import { useGetInitialData } from "./hooks/useGetInitialData";

function App() {
  // Get authorization data from localStorage
  const token = useAuth().token;
  // const token = true;

  // Get programs data from the backend on first app load
  const { isLoading, error, clearError } = useGetInitialData();

  const cache = useAppSelector((state) => state.scheduleCahce);
  console.log(cache);

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal show={!!error} error={error} onClose={clearError} />

      <ScheduleCacheProvider>
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
      </ScheduleCacheProvider>
    </>
  );
}

export default App;
