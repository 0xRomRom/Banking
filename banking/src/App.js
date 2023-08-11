import { Route, Routes } from "react-router-dom";
import Landing from "./components/landing/Landing";
import Login from "./components/login/Login";
import Bank from "./components/bank/Bank";
import { useState } from "react";

function App() {
  const [user, setUser] = useState({});
  return (
    <Routes>
      <Route index path="/" element={<Landing />} />
      <Route path="login" element={<Login setUser={setUser} />} />
      <Route path="bank" element={<Bank user={user} />} />
    </Routes>
  );
}

export default App;
