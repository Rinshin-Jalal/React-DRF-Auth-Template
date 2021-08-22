import React, { useState, useContext } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from '../../contexts/userContext.js'
import { loginUser, logoutUser } from '../../api/auth.js'
import { Link } from 'react-router-dom'
// Hook to get query params.
// this could be refactored to somewhere else for future contributors.
function useQueryParams () {
  return new URLSearchParams(useLocation().search);
}

function Login() {
  const queryParams = useQueryParams();
  const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const {user, setUser, isUserLoggedIn,server} = useContext(UserContext)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorDisplay, setErrorDisplay] = useState("")

  const onLoginFormSubmit = (event) => {
    event.preventDefault();
    loginUser(username, password).then((data)=>{
      setUser({username: username})
      history.push(getRouteAfterLogin());
    }).catch((error)=> {
      setErrorDisplay("error")
      console.log(error)
    })
  }

  const getRouteAfterLogin = () => {
    let route = queryParams.get("next")
    if (route === null) {
      route = "/";
    }
    return route
  }


  // eslint-disable-next-line no-unused-vars
  const logout = () => {
    logoutUser()
    setUser(null);
  }
  return (
    <div>
      {isUserLoggedIn() ? (
        <div className="">
          <h1>Already Logged In</h1>
          <button onClick={logout}>Logout</button>
        </div>
      ):(
      <form onSubmit={onLoginFormSubmit} method="POST">

        <input
          onChange={(event)=>{setUsername(event.target.value)}}
          type="text"
          id="username"
          name="username"
          required
          value={username}/>

        <br/>
        <input
          onChange={(event)=>{setPassword(event.target.value)}}
          type="password"
          id="password"
          name="password"
          required
          value={password}/>

        <input type="submit"/>

        <p style={{color: 'red'}}>{errorDisplay}</p>
        <Link to="/reset/password">Forgot Password</Link>
      </form>
      )}
    </div>
  )
}

export default Login;
