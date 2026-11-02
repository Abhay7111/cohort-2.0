import { useState } from "react";
import "../style/form.scss"
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const {handelLogin, loading} = useAuth()
    const navigate = useNavigate()

    if(loading) {
        return (<h1>Loading...</h1>)
    }

    async function handelSubmit(e) {
        e.preventDefault()
        handelLogin(username, password)
        .then(
            res => 
                {console.log(res)
                navigate('/')}
        )
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
