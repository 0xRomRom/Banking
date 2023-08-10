import { Route, Routes } from "react-router-dom";
import Landing from "./components/landing/Landing";
import Login from "./components/login/Login";
import Bank from "./components/bank/Bank";

function App() {
  return (
    <Routes>
      <Route index path="/" element={<Landing />} />
      <Route path="login" element={<Login />} />
      <Route path="bank" element={<Bank />} />
    </Routes>
  );
}

export default App;
