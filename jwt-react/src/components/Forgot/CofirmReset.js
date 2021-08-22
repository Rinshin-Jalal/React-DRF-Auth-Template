import React,{useState, useContext,} from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { UserContext } from '../../contexts/userContext.js'

export default function ConfirmReset(){
    const [password,setPassword] = useState('')
    const [conPassword,setConPassword] = useState('')
    const { token } = useParams() 
    const {server} = useContext(UserContext);
    const [errDis,setErrDis] = useState('')
    const [done,setDone] = useState(false)

    const onSubmit = (event) =>{
        event.preventDefault();
        if(password === conPassword){
            let formdata = new FormData()
            formdata.append('password',password)
            formdata.append('token',token)
            fetch(`${server}/api/password_reset/confirm/`,{
                method:'post',
                body: formdata,
            }).then(res => res.json())
            .then(data => {
                if(data.status === "OK"){
                    setDone(true)
                }else if(data.detail === "Not found."){
                    setErrDis('Token Already Used!')
                }else{
                    setErrDis(data.password[0])
                }
            })
            .catch(err => console.log(err))
        }else{
            setErrDis('New Password & Confirm New Password are not same');
        }
    }
    return(
        <div className="">
            {done ? (
                    <div>
                        <h3>Login with new password</h3>                
                        <Link to="/login">Login</Link>
                    </div>
                ):
                (
                <div>
                    <h1>Change Password?</h1>
                    <p>Type your New Password</p>
                    <form onSubmit={onSubmit}>
                        <input type="password" placeholder="New Password" value={password} onChange={(event)=>{setPassword(event.target.value)}} required/>
                        <input type="password" placeholder="Confirm New Password" value={conPassword} onChange={(event)=>{setConPassword(event.target.value)}} required/>
                        <p style={{color:'red'}}>{errDis}</p>
                        <input type="submit"/>
                    </form>
                </div>
                )
            }
        </div>
    )
}