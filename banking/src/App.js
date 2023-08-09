import { Route, Routes } from "react-router-dom";
import Landing from "./components/landing/Landing.jsx";
import Login from "./components/login/Login.jsx";

function App() {
  return (
    <Routes>
      <Route index path="/" element={<Landing />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default App;
