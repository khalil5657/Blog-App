import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, Navigate, redirect } from "react-router-dom";


function HomePage(props) {
  let navigate = useNavigate()
    // console.log(props.data.data)
    const [state, setState] = useState(true)
    const [username, setUsername] = useState(true)
    const [password, setPassword] = useState(true)
    const [user, setUser] = useState('')
    const [loading, setLoading] = useState(true)
    const [changed, setChanged] = useState({})

    useEffect(()=>{
      // setLoading(true)
      fetch("http://localhost:3002/posts",
         {method:"get", headers:{"Content-Type": "application/json"}}).then(res=>res.json()).then(data=>setUser(data.data))
      // data = await raw.json()
        setLoading(false)
    }, [changed])
    console.log(user)
    // function test() {
    //     fetch("http://localhost:3002/auth").then(raw=>raw.json()).then(dt=>setUser(dt))
    // }
    
    function changeState(){
        if (state == true){
            setState(false)
        }else{
            setState(true)
        }
    }
    function handleUsername(value){
        setUsername(value)
    }
    function handlePassword(value){
        setPassword(value)
    }
    async function signUp(e){
        e.preventDefault()
        // var ol = 99
        // fetch("http://localhost:3002/signup", {
        //      method:"POST",
        //      headers:{'Content-Type': 'application/json',
        //     'Accept':'application/json'},
        //      body: JSON.stringify({
        //         username: username,
        //         password:password
        // })})

        // try {
        // setLoading(true)
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
      
            // if (res.ok) {
            //   localStorage.setItem('token', data.token)
            //   props.setToken(data.token)
            // } else {
            //   setError(data.message || 'Registration failed.')
            // }
          // } catch (err) {
          //   console.error(err)
          //   setError('An unexpected error occurred.')
          // }

            setLoading(false)
    }
    async function logIn(e){
        e.preventDefault()
    //     fetch("http://localhost:3002/login", {
    //         method:"post",
    //         credentials: "include",
    //         headers:{"Content-Type": "application/json", 'Accept':'application/json', 'Access-Control-Allow-Origin': 'http://localhost:5173'},
    //         body: JSON.stringify({
    //            username: username,
    //            password:password
    //    })}).then(raw=>raw.json()).then(data=>test())
    // setLoading(true)
    const raw = await fetch(`http://localhost:3002/login/visitor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(
          { username,
             password }
        )
      })
      const user = raw.json()
      
      props.setName(user)
    setLoading(false)
    }
    
    async function logOut() {
      // setLoading(true)
      await fetch(`http://localhost:3002/logout/visitor`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
  })
  props.setName("")
  setLoading(false)
}
async function deletePost(postId) {
  await fetch("http://localhost:3002/posts/post/" + postId, {
    headers: {'Content-Type': 'application/json'},
    method: 'DELETE',

  })
  setChanged({})
}
function listIt(post){
  // console.log(post)
  console.log(post)
  let comments = post.comments
  let commentsLength = post.comments.length
  return <div key={post.id}>
    <h3>{post.writer.username} AT: {post.posteddate}</h3>
    <hr />
    <h4>{post.title}</h4>
    <p>{post.content}</p>
    <Link to="/showPost" state={{post:post}}>Comments: {commentsLength}</Link><br />
    {/* <button onClick={()=>deletePost(post.id)}>delete</button> */}
    {/* <Link to="/editPost" state={{post:post}}>Edit</Link> */}
  </div>
}
    if (loading == true){
      return <>
              <h1>Loading...</h1>
            </>
    }
    if (props.name){
        return <>
            welcome to home page {props.name.username}!!
            {/* array1.map((x) => x * 2) */}
            <button onClick={()=>logOut()}>Log out</button><br />
            {/* <Link to="/createPost">Create a Post</Link> */}
            <h4>Posts:</h4>
            {user&&user.map((post)=>listIt(post))}

        </>
    }else{
      return <>
              <dir>You are not logged In</dir>
              <Link to="/signup">Sign Up?</Link><br />
              <Link to="/login">Log In?</Link>
            </>
        if (state == true){
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
                        <button onClick={()=>changeState()}>already have an account?</button>
                    </div>
                </>
        }else{
            return <>
                    <div>
                        <h1>Log in</h1>
                        <form action="" method="post" onSubmit={logIn}>
                            <label htmlFor="">Username</label>
                            <input type="text" name="username" onChange={(e)=>handleUsername(e.target.value)}/>
                            <label htmlFor="">Passsword</label>
                            <input type="text" name="password" onChange={(e)=>handlePassword(e.target.value)}/>
                            <button type="submit" >Submit</button>
                        </form>
                        <button onClick={()=>changeState()}>dont have an account?</button>
                    </div>
                </>
        }
    }
}


export default HomePage