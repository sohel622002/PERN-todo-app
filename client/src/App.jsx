import "./App.css";
import { Route, Routes, useNavigate } from "react-router";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState();

  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
      </Routes>
    </div>
  );
}

export default App;
