import { Routes, Route } from "react-router-dom";
import "./App.css";
import BaseTemplate from "./components/templates/BaseTemplate/BaseTemplate";
import Card from "./components/UI-elements/Card/Card";

function App() {
  const accessToken = null;
  return (
    <Routes>
      {!accessToken && (
        <Route path="/" element={<BaseTemplate />}>
          <Route index element={<Card>Test react app</Card>} />
        </Route>
      )}
    </Routes>
  );
}

export default App;
