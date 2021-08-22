import React,{useState, useContext} from "react"
import { UserContext } from '../../contexts/userContext.js'
import { logoutUser } from '../../api/auth.js'

export default function VerifyEmail(){
    // eslint-disable-next-line no-unused-vars
    const {user, setUser, isUserLoggedIn,server} = useContext(UserContext)
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [checkmail,setCheckmail] = useState(false)
    const [errorDisplay, setErrorDisplay] = useState("")    
    const onSubmit = (event) => {

        event.preventDefault();
        const form_data = new FormData();
        form_data.append('username',username);
        form_data.append('email',email);
        fetch(`${server}/verify/email/`,{
            method:'POST',
            body: form_data, 
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if ( data?.username?.[0] === "email verify with this username already exists." && data?.email?.[0] === "email verify with this email already exists."){
                setErrorDisplay('Username & Email is already used | Try to sign In')
            }
            else if( data?.email?.[0] === "email verify with this email already exists."){
                setErrorDisplay('Email is already used')
            }else if ( data?.username?.[0] === "email verify with this username already exists."){
                setErrorDisplay('Username is already used')
            }else{
                setCheckmail(true)
            }
        })
        .catch(err=> console.log('err',err))

    }
    const logout = () => {
        logoutUser()
        setUser(null);
      }
    return(
        <div>
            {isUserLoggedIn() ? 
            (  
                <div className="">
                    <h1>Already Registered</h1>
                    <button onClick={logout}>Logout</button>

                </div>
            ):(
            (!checkmail ? (
            <div className="form">
                <form onSubmit={onSubmit}>
                    <br />
                    <input
                    onChange={(event)=>{setUsername(event.target.value)}}
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    required
                    value={username}/>
                    <br />
                    <input
                    onChange={(event)=>{setEmail(event.target.value)}}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={email}/>
                    <br />
                    <p style={{color: 'red'}}>{errorDisplay}</p>
                    <br />
                    <input type="submit"/>
                </form>
            </div>
            ):(
                <div className="checkmail">
                    <h1>We have send verification link to Email `{email}` </h1>
                    <button onClick={()=>setCheckmail(false)}>Change Email</button>
                </div>
            ))
            )}
        </div>
    )
}