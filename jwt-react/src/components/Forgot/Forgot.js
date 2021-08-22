import React,{useState, useContext,} from "react"
import { UserContext } from '../../contexts/userContext.js'

export default function Forgot(){
    const [email,setEmail] = useState('')
    const {server,isUserLoggedIn} = useContext(UserContext);
    const [send,setSend] = useState(false)
    const [errDis,setErrDis] = useState('')
    
    const onSubmit = (event) =>{
        event.preventDefault();
        let formdata = new FormData()
        formdata.append('email',email)
        fetch(`${server}/api/password_reset/`,{
            method:'post',
            body: formdata,
        }).then(res => res.json())
        .then(data => {
            if(data?.status === "OK"){
                setSend(true);
            }else{setErrDis("Some Thing error");}
        })
        .catch(err => console.log(err))
    }
    return(
        <div className="">
            {send ? (
                    <h1>Check Your Email to Get Password Change Link</h1>
                ):(
                    (isUserLoggedIn() ? (
                        <div className="">
                            <h1>Change Password?</h1>
                            <p>Type your Registered Email</p>
                            <form onSubmit={onSubmit}>
                                <input type="email" placeholder="Registered Email..." value={email} onChange={(event)=>{setEmail(event.target.value)}} required/>
                                <p style={{color:'red'}}>{errDis}</p>
                                <input type="submit"/>
                            </form>
                        </div>
                    ):(
                        <div className="">
                            <h1>Forgot Password?</h1>
                            <p>Type your Registered Email</p>
                            <form onSubmit={onSubmit}>
                                <input type="email" placeholder="Registered Email..." value={email} onChange={(event)=>{setEmail(event.target.value)}} required/>
                                <p style={{color:'red'}}>{errDis}</p>
                                <input type="submit"/>
                            </form>
                        </div>
                    ))
                )
            }
        </div>
    )
}