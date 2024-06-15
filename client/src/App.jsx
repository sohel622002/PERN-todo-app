import "./App.css";
import { Route, Routes, useNavigate } from "react-router";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Cookies from "js-cookie";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const isAuthanticated = Cookies.get("token");
    if (!isAuthanticated) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
