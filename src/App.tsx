import { Routes, Route } from "react-router-dom";
import "./App.css";
import BaseTemplate from "./components/templates/BaseTemplate/BaseTemplate";

function App() {
  const accessToken = null;
  return (
    <Routes>
      {!accessToken && (
        <Route path="/" element={<BaseTemplate />}>
          <Route index element={<div>Test react app</div>} />
        </Route>
      )}
    </Routes>
  );
}

export default App;
