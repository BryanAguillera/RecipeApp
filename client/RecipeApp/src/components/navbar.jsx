import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate('/auth')
  }
  return (
    <div>
      <Link to={'/'}>HOME</Link>
      <Link to={'/save-recipes'}>SAVE RECIPE</Link>
      <Link to={'/create-recipe'}>CREATE RECIPE</Link>
      {!cookies.access_token ? (<Link to={'/auth'}>LOGIN/REGISTER</Link>) : <button onClick={logout}>LOGOUT</button> }
      
    </div>
  )
}

export default navbar
