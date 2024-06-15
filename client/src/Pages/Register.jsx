import { useNavigate } from "react-router";
import "../assets/css/login.css";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const resData = await response.json();
      if (!response.ok) throw new Error("Error in register!");
      Cookies.set("token", resData.token);
      navigate("/");
      console.log(resData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="login_container">
      <div>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <label>
            <span>Username</span>
            <input
              required
              type="text"
              placeholder="eg. John Doe"
              name="name"
            />
          </label>
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
            Already have an account? <Link to={"/login"}>Login Here.</Link>
          </p>
          <button className="btn-success" type="submit">
            Create an account
          </button>
        </form>
      </div>
    </section>
  );
}
