import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./components/route-endpoints/HomePage/HomePage";
import BaseTemplate from "./components/templates/BaseTemplate/BaseTemplate";
import { useAppSelector } from "./hooks/redux-hooks";
import { useAuth } from "./hooks/useAuth";

function App() {
  // Get authorization data from localStorage
  const token = useAuth().token;

  return (
    <Routes>
      <Route path="/" element={<BaseTemplate />}>
        {!token && <Route index element={<HomePage />} />}
        {!!token && <Route index element={<div>Logged in</div>} />}
      </Route>
    </Routes>
  );
}

export default App;
