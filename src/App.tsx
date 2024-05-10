import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Welcome from "./Pages/Welcome";

function App() {
  return (
    <>
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/welcome" />} />
      </Routes>
    </>
  );
}

export default App;
