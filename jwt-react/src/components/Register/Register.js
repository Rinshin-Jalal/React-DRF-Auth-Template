import React,{useState, useContext,} from "react"
import { useParams } from 'react-router-dom'
import { UserContext } from '../../contexts/userContext.js'
import { loginUser, logoutUser } from '../../api/auth.js'
import jwt_decode from "jwt-decode";
import { useHistory, useLocation } from "react-router-dom";

function useQueryParams () {
    return new URLSearchParams(useLocation().search);
  }

export default function Register(){
    const queryParams = useQueryParams();
    const history = useHistory();
    const {token} = useParams()
    const decoded = jwt_decode(token);
    const email = decoded.main.email;
    const username = decoded.main.username;
    // eslint-disable-next-line no-unused-vars
    const {user, setUser, isUserLoggedIn,server} = useContext(UserContext)
    const [fName,setFName] = useState("")
    const [lName,setLName] = useState("")
    const [password,setPassword] = useState("")
    const [conPassword,setConPassword] = useState("")
    const [errorDisplay, setErrorDisplay] = useState("")

    const getRouteAfterLogin = () => {
        let route = queryParams.get("next")
        if (route === null) {
          route = "/";
        }
        return route
      }

    const onRegisterFormSubmit = (event) => {

        event.preventDefault();
        const form_data = new FormData();
        form_data.append('username',username);
        form_data.append('email',email);
        form_data.append('first_name',fName);
        form_data.append('last_name',lName);
        form_data.append('password',password);
        if (password === conPassword){

        
          fetch(`${server}/user/new/`,{
              method:'POST',
              body: form_data, 
          })
          .then(res => {
              loginUser(username, password).then((data)=>{
                  setUser({username: username})
                  history.push(getRouteAfterLogin());
                }).catch((error)=> {
                  setErrorDisplay()
                })
          })
          .then(data => console.log(data))
          .catch(err=> setErrorDisplay('error'))
        }else{
          setErrorDisplay("Password and Confirm Password are not same")
        }
    }
    
      const logout = () => {
        logoutUser()
        setUser(null);
      }

    return(
        <div>
          {isUserLoggedIn() ? (     
              <div className="">
                  <h1>Already Registered</h1>
                  <button onClick={logout}>Logout</button>
              </div>
            ):(
            <div>
              <h1>Hi {username}</h1>
              <p>We want some of your details</p>
              <form onSubmit={onRegisterFormSubmit} method="POST">
                  <label htmlFor="first_name">First Name:</label>
                  <input
                  onChange={(event)=>{setFName(event.target.value)}}
                  type="text"
                  id="first_name"
                  name="first_name"
                  placeholder="First name..."
                  required
                  value={fName}/>
                  <label htmlFor="last_name">Last Name:</label>
                  <input
                  onChange={(event)=>{setLName(event.target.value)}}
                  type="last_name"
                  id="last_name"
                  name="last_name"
                  placeholder="Last name..."
                  required
                  value={lName}/>
                  <label htmlFor="password">Password:</label>                
                  <input
                  onChange={(event)=>{setPassword(event.target.value)}}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password..."
                  required
                  value={password}/>
                  <label htmlFor="conPassword">Confirm Password:</label>
                  <input
                  onChange={(event)=>{setConPassword(event.target.value)}}
                  type="password"
                  id="conPassword"
                  name="conPassword"
                  required
                  placeholder="Confirm Password..."
                  value={conPassword}/>
                  <br />
                  <input type="submit"/>
                  <br />
                  <p style={{color: 'red'}}>{errorDisplay}</p>
              </form>
            </div>
          )}
        </div>
    )
}