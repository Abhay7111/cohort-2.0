import { useState } from "react";
import "../style/form.scss"
import { Link } from "react-router";
import axios from "axios";

function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    async function handelSubmit(e) {
        e.preventDefault()

        axios.post('http://localhost:3000/api/auth/login', {
            username,
            password
        }, {
            withCredentials: true
        })
        .then(res => {
            console.log(res.data)
        })
    }
  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handelSubmit}>
                <input 
                onInput={(e) => {setUsername(e.target.value)}}
                type="text" 
                name="username" 
                placeholder="Enter your username" />
                <input 
                onInput={(e) => {setPassword(e.target.value)}}
                type="text" 
                name="password" 
                placeholder="Enter your password" />
                <div className="buttons">
                    <button type="submit">Login</button>
                </div>
                    <p>You don't have an acount <Link to={`/register`} className="link">register</Link></p>
            </form>
        </div>
    </main>
  )
}

export default Login
