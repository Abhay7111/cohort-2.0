import React from 'react'
import { Link } from 'react-router'

function Register() {
  const handelSubmit = (e) => {
        e.preventDefault()
    }

  return (
    <main>
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={handelSubmit}>
                <input type="text" name='username' id='username' placeholder='Enter username' />
                <input type="email" name='email' id='email' placeholder='Enter email' />
                <input type="password" name='password' id='password' placeholder='Enter password' />
                <button type='submit' className='button primary-button'>Register</button>

            </form>
            <p>Already have an acount ? <Link to={'/login'}>Login to acount.</Link></p>
        </div>
    </main>
  )
}

export default Register
