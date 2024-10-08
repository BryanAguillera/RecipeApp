import React, { useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const authentication = () => {
  return (
    <div>
      <Register />
      <Login />
    </div>
  )
}
export default authentication


const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/auth/register', { username, password })
      alert("registration completed")
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Form username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="REGISTER"
      onSubmit={onSubmit}
    />
  )
}

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const [_, setCookies] = useCookies(["access_token"])

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/auth/login', { username, password })
      setCookies("access_token", response.data.token) //in user.js
      window.localStorage.setItem("userID", response.data.userID);
      navigate('/')
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="LOGIN"
      onSubmit={onSubmit}

    />
  )
}

const Form = ({ username, setUsername, password, setPassword, label, onSubmit }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <h2>{label}</h2>

        <div>
          <label htmlFor="username">Username: </label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div>
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button type='submit'>{label}</button>
      </form>

    </div>
  )


}

