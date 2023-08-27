
import React, { useContext, useEffect, useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { registerUser, login } from '../Services/UserServices'
import Cookies from 'js-cookie';


function Login(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState(false)
  const [openLoginForm, setOpenLoginForm] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const cookie = Cookies.get('token')
    const username = localStorage.getItem('username')
    if(cookie && username){
      navigate('/')
    }
  },[])

  const handleUsernameChange = (event) => {
    setUsername(event.target.value.trim())
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value.trim())
  }
  const handleEmailChange = (event) => {
    setEmail(event.target.value.trim())
  }

  const openSignUpForm = () => {
    setEmail('')
    setUsername('')
    setPassword('')
    setOpenLoginForm(!openLoginForm)
  }
    
  const handleSubmit = async (event) => {
    event.preventDefault()
    if (username.trim() !== '' && password.trim() !== ''){
      setError(false)
      try {
        const response =  await login({name: username, password})
        console.log('Login Response', response)
        localStorage.setItem('username', username)
        Cookies.set('token', response.data.token, {expires: 1})
        navigate('/')
      } catch (error) {
        setError(true)
        console.log('Login Failed', error)
      }
    }
  }

  const handleSignUpSubmit = async(event) => {
    event.preventDefault()
    try {
      const data = {email, password, name: username}
      const response = await registerUser(data)
      setOpenLoginForm(true)
      setEmail('')
      setUsername('')
      setPassword('')
      console.log('response', response)
    } catch (error) {
      console.log('User Creation Failed', error)
    }
  }


  const renderLoginForm = () => {
    return (
        <div className='bg-container'>
            <h1 className='signinBtn'>Sign in</h1>
            <form className='form-container' onSubmit={handleSubmit}>
                {error && <span style={{color: 'red', fontWeight: 500}}>Invalid valid password/username.</span>}
                <label className='label' htmlFor='username'>Username</label>
                <input onChange={handleUsernameChange} value={username} className='input-el' id='username' type='text' />
                <label className='label' htmlFor='password'>Password</label>
                <input onChange={handlePasswordChange} value={password} className='input-el' id='password' type='password' />
                <button className='login-button' type='submit' disabled={username ==='' || password===''}>Login</button>
                <p>Create Account 
                <span style={{cursor: 'pointer', margin: '10px'}} onClick={openSignUpForm}><strong onClick={openSignUpForm}>Sign up</strong></span>
                </p>
            </form>
        </div>
    )
  }

  const renderSignUpForm = () => {
    return (
        <div className='bg-container'>
            <h1 className='signinBtn'>Sign Up</h1>
            <form className='form-container' onSubmit={handleSignUpSubmit}>
                {error && <span style={{color: 'red', fontWeight: 500}}>Invalid valid password/username.</span>}
                <label className='label' htmlFor='username'>Email</label>
                <input onChange={handleEmailChange} value={email} className='input-el' id='email' type='email' />
                <label className='label' htmlFor='username'>Username</label>
                <input onChange={handleUsernameChange} value={username} className='input-el' id='username' type='text' />
                <label className='label' htmlFor='password'>Password</label>
                <input onChange={handlePasswordChange} value={password} className='input-el' id='password' type='password' />
                <button className='login-button' type='submit' disabled={username ==='' || password==='' || email===''}>Create Account</button>
                <p>Already Account Exist
                    <span style={{cursor: 'pointer', margin: '10px'}} onClick={openSignUpForm}><strong>Sign In</strong></span>
                </p>
            </form>
        </div>
    )
  }

  return (
    <div className='bg-container'>
        {openLoginForm ? renderLoginForm() : renderSignUpForm()}
    </div>
  )
}

export default Login