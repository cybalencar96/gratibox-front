import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Avaliation from "./components/pages/Avaliation/Avaliation";
import Home from "./components/pages/Home/Home";
import Login from "./components/pages/Login/Login";
import NewSignature from "./components/pages/NewSignature/NewSignature";
import Plans from "./components/pages/Plans/Plans";
import Signature from "./components/pages/Signature/Signature";
import Signup from "./components/pages/Signup/Signup";
import { UserContext } from "./contexts/Contexts";
import { getUserFromLocalStorage } from "./utils/localStorage";

export default function App() {
  const [user, setUser] = useState(getUserFromLocalStorage());

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/signature" element={<Signature />} />
          <Route path="/signature/new" element={<NewSignature />} />
          <Route path="/avaliation" element={<Avaliation />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
