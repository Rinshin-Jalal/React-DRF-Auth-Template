import React, {useState,useEffect} from 'react';
import { UserContext } from '../../contexts/userContext.js';
import './App.css';
import LoginPage from '../../pages/LoginPage.js';
import HomePage from '../../pages/HomePage.js';
import Register from '../Register/Register.js';
import ConfirmReset from '../Forgot/CofirmReset'
import Forgot from '../Forgot/Forgot.js';
import VerifyEmail from '../Register/VerifyEmail.js';
import jwt_decode from "jwt-decode";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  const [user, setUser] = useState(null);
  const isUserLoggedIn = () => {
    return !!user;
  }
  const server = 'http://127.0.0.1:8000'
  const setUserDetails = id => {
    fetch(`${server}/u/${id}/ser/`)
    .then(res => res.json())
    .then(data => setUser(data))
  }

  useEffect(()=>{
    if(window.localStorage.getItem('access_token') && window.localStorage.getItem('refresh_token')){
      const access = window.localStorage.getItem('access_token');
      const decoded = jwt_decode(access);
      setUserDetails(decoded.user_id)
    }
  },[])

  return (
    <div className="App">
      <UserContext.Provider value={{user, setUser, isUserLoggedIn, server}}>
        <Router>
          <div>
            <Switch>
                <Route exact path="/login">
                  <LoginPage/>
                </Route>
                <Route exact path="/">
                  <HomePage/>
                </Route>
                <Route exact path="/register/:token">
                  <Register/>
                </Route>
                <Route exact path="/register">
                  <VerifyEmail/>
                </Route>
                <Route exact path="/reset/password">
                  <Forgot/>
                </Route>
                <Route exact path="/reset/password/:token">
                  <ConfirmReset/>
                </Route>
            </Switch>
          </div>
        </Router>

      </UserContext.Provider>
    </div>
  );
}

export default App;
