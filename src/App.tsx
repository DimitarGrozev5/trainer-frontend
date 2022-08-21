import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./components/route-endpoints/HomePage/HomePage";
import Logout from "./components/route-endpoints/Logout/Logout";
import TrainingHub from "./components/route-endpoints/TrainingHub/TrainingHub";
import BaseTemplate from "./components/templates/BaseTemplate/BaseTemplate";
import { useAuth } from "./hooks/useAuth";

function App() {
  // Get authorization data from localStorage
  const token = useAuth().token;
  // const token = true;

  return (
    <Routes>
      <Route path="/" element={<BaseTemplate />}>
        {!token && <Route index element={<HomePage />} />}
        {!!token && (
          <>
            <Route index element={<TrainingHub />} />
          </>
        )}
      </Route>

      {!!token && <Route path="/logout" element={<Logout />} />}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
