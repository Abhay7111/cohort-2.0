import "../style/form.scss";
import { Link } from "react-router";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

function register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const {handelRegister} = useAuth()

  async function handelSubmit(e) {
    e.preventDefault()
    handelRegister(username, email, password)
    .then(res => console.log(res))
    
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handelSubmit}>
          <input
            onInput={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            name="username"
            placeholder="Enter your username"
          />

          <input
            onInput={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            name="email"
            placeholder="Enter your Email"
          />

          <input
            onInput={(e) => {
              setPassword(e.target.value);
            }}
            type="text"
            name="password"
            placeholder="Enter your password"
          />
          <div className="buttons">
            <button type="submit">register</button>
          </div>
          <p>
            You have an acount{" "}
            <Link to={`/login`} className="link">
              login
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default register;
