import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate, Navigate, redirect } from "react-router-dom";

function SignUp(props){
    const [username, setUsername] = useState(true)
    const [password, setPassword] = useState(true)
    const navigate = useNavigate()
    function handleUsername(value){
        setUsername(value)
    }
    function handlePassword(value){
        setPassword(value)
    }
    async function signUp(e){
        e.preventDefault()
        

        // try {
            const res = await fetch(`http://localhost:3002/signup`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                username,
                password,
              })
            })
      
            const data = await res.json()


    }
    useEffect(()=>{
        if (props.name){
            return navigate("/")
        }
    }, [props.name])
    
    return <>
                    <div>
                        <h1>Sign up</h1>
                        <form action="" method="post" onSubmit={signUp}>
                            <label htmlFor="">Username</label>
                            <input type="text" name="username" onChange={(e)=>handleUsername(e.target.value)}/>
                            <label htmlFor="">Passsword</label>
                            <input type="text" name="password" onChange={(e)=>handlePassword(e.target.value)}/>
                            <button type="submit" >Submit</button>
                        </form>
                        <Link to="/login">already have an account?</Link>
                    </div>
                </>
}


export default SignUp