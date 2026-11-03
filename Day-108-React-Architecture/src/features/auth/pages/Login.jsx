import React, { useState } from "react";
import "../style/form.scss";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

function Login() {
  const { user, loading, handelLogin } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate()

  const handelSubmit = async (e) => {
    e.preventDefault();
    await handelLogin(username, password)
    console.log("user loggedin")
    navigate('/')
  };

  if(loading){
    return (
        <main>
            <h1>Loading...</h1>
        </main>
    )
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handelSubmit}>
          <input
            onInput={(e) => setUsername(e.target.value)}
            type="text"
            name="username"
            id="username"
            placeholder="Enter username"
          />
          <input
            onInput={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
          />
          <button type="submit" className="button primary-button">
            Login
          </button>
        </form>
        <p>
          Don't have an acount ? <Link to={"/register"}>Create One.</Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
