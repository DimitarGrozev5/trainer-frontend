import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./components/route-endpoints/HomePage/HomePage";
import BaseTemplate from "./components/templates/BaseTemplate/BaseTemplate";

function App() {
  const accessToken = null;
  return (
    <Routes>
      {!accessToken && (
        <Route path="/" element={<BaseTemplate />}>
          <Route index element={<HomePage />} />
        </Route>
      )}
    </Routes>
  );
}

export default App;
