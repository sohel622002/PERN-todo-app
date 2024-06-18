import { useNavigate } from "react-router";
import "../assets/css/login.css";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

export default function Login({ setUser }) {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const resData = await response.json();
      console.log(resData);
      if (!response.ok) throw new Error("Error in login!");
      setUser(resData.user);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="login_container">
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>
            <span>Email</span>
            <input
              required
              type="email"
              placeholder="example@gmail.com"
              name="email"
            />
          </label>
          <label>
            <span>Password</span>
            <input
              required
              type="password"
              placeholder="password"
              name="password"
            />
          </label>
          <p>
            Dont have an account? <Link to={"/register"}>Register Here.</Link>
          </p>
          <button className="btn-success" type="submit">
            Login
          </button>
        </form>
      </div>
    </section>
  );
}
