import React from 'react'
import '../nav.scss'
import { useNavigate } from 'react-router'

function Nav() {
    const navigate = useNavigate()
  return (
    <nav className='nav-bar'>
        <p>Insta</p>
        <button 
        onClick={() => navigate('/post') }
        className='button primary-button'>new post</button>
    </nav>
  )
}

export default Nav
