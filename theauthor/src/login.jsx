import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate, Navigate, redirect } from "react-router-dom";
import styles from "./styles.module.css"
function LogIn(props){
    const [username, setUsername] = useState(true)
    const [password, setPassword] = useState(true)
    const navigate = useNavigate()
    function handleUsername(value){
        setUsername(value)
    }
    function handlePassword(value){
        setPassword(value)
    }
    async function logIn(e){
        e.preventDefault()
        try{
    const raw = await fetch(`http://localhost:3002/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(
          { username,
             password }
        )
      })
      const user = await raw.json()
      if (user.username){
        props.setName(user)
      }else{
        console.log(user.message)
      }
    }catch{
        console.log("try again!")
        // const user = raw.json()
    }
      
      
       
    }
    useEffect(()=>{
        if (props.name){
            props.setKK({})
            return navigate("/")
        }
    }, [props.name])
    
    return <>
                    <div className={styles.content}>
                        <h1>Log in</h1>
                        <form action="" method="post" onSubmit={logIn}>
                            <label htmlFor="">Username</label>
                            <input type="text" name="username" onChange={(e)=>handleUsername(e.target.value)}/>
                            <label htmlFor="">Passsword</label>
                            <input type="text" name="password" onChange={(e)=>handlePassword(e.target.value)}/>
                            <button type="submit" className={styles.subbtn}>Submit</button>
                        </form>
                    </div>
                </>
}


export default LogIn