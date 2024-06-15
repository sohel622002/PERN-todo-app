import React from "react";
import Cookies from "js-cookie";
import Todo from "../components/Todo/Todo";
import { useNavigate } from "react-router";

export default function Home() {
  const redirect = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    redirect("/login");
  };

  return (
    <div className="wrapper">
      <div className="app-header">
        <button className="btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <h1>This is some todo app</h1>
      <Todo />
    </div>
  );
}
