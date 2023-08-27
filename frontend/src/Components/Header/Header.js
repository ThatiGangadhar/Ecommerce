import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './HeaderStyle.css'
import Cookies from 'js-cookie'

export default function Header() {
  const navigate = useNavigate()

  const token = Cookies.get('token')

  const handleRoute = () => {
    if (token) navigate('/')
  }

  const handleLogout = () => {
    localStorage.removeItem('username')
    localStorage.removeItem('token')
    Cookies.remove('token')
    navigate('/login')
    window.location.reload()
  }

  return (
    <div className='header-container'>
        <h1 onClick={handleRoute} style={{fontWeight: 'normal', cursor: 'pointer', margin: '0px'}}>E-commerce</h1>
        {token && 
          <div style={{display: 'flex', gap: '15px'}}>
            <Link to='/'><button className='header-button'>Home</button></Link>
            <Link to='/cart'><button className='header-button'>Cart</button></Link>
            <Link to='/orders'><button className='header-button'>Orders</button></Link>
            <button onClick={handleLogout} className='header-button'>Logout</button>
         </div>
        }
    </div>
  )
}
