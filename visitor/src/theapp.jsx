import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import HomePage from './home.jsx'
import { useState, useEffect } from 'react'
import CreatePostForm from './PostForm.jsx'
import App from './App.jsx'
import SignUp from './signup.jsx'
import LogIn from './login.jsx'
import EditPostForm from './editPostForm.jsx'
import ShowPost from './ShowPost.jsx'
import EditComment from './EditComment.jsx'
 function Start(){
    // const [token, setToken] = useState(localStorage.getItem('token') || '')
    // async function getIt() {
    //   const rawdata = await fetch("http://127.0.0.1:3002/auth", {method:"GET"})
    //   let data =await  rawdata.json()
  
    //   return data
    // }
    // function logOut(){
    //     localStorage.removeItem('token')
    //     setToken('')
    // }
    const [kk, setKK]= useState('')
    const [name, setName]= useState("")
    const [loading, setLoading] = useState(true)
    // const [loggedIn, setLoggedIn]= useState(false)

    console.log("test")
  useEffect(()=>{
    (
        async () =>{
            const response =  await fetch("http://localhost:3002/user/visitor",{
                headers:{"Content-Type":"application/json"},
                credentials:"include"
        })
           
            const contentraw = await response.json()
            const content = contentraw.username
            // console.log("did it", content)
            if (content){
            setName(contentraw)
            }
            setLoading(false)
        }
    )()
  }, [kk])
  if (loading == true){
    return <h1>Loading...</h1>
  }
    return (
      <Router>
        <div>
          
  
          <Routes>

            <Route path='/' element={<HomePage  setName={setName} name={name} setKK={setKK}/>} />
            {/* <Route path='/createPost' element={<CreatePostForm name={name} setName={setName} setKK={setKK} kk={kk}/>} /> */}
            {/* <Route path='/editPost' element={<EditPostForm name={name} setName={setName} setKK={setKK} kk={kk}/>} /> */}
            <Route path='/editComment' element={<EditComment name={name} setName={setName} setKK={setKK} kk={kk}/>} />
            <Route path='/showPost' element={<ShowPost name={name} setName={setName} setKK={setKK} kk={kk}/>} />
            <Route path='/sec' element={<App  name={name} setName={setName} setKK={setKK} kk={kk}/>} />
            <Route path='/signup' element={<SignUp  name={name} setName={setName} setKK={setKK} kk={kk}/>} />
            <Route path='/login' element={<LogIn name={name} setName={setName} setKK={setKK} kk={kk}/>} />


            {/* <Route path='/register' element={<Register setToken={setToken} />} /> */}
            {/* <Route
              path='/manage'
              element={
                <ProtectedRoute token={token}>
                  <PostManager token={token} />
                </ProtectedRoute>
              }
            />
            <Route
              path='/new'
              element={
                <ProtectedRoute token={token}>
                  <NewPost token={token} />
                </ProtectedRoute>
              }
            />
            <Route
              path='/edit/:id'
              element={
                <ProtectedRoute token={token}>
                  <EditPost token={token} />
                </ProtectedRoute>
              }
            /> */}
          </Routes>
        </div>
      </Router>
    )
    // const router = createBrowserRouter([
    //   {
    //     path: "/",
    //     element: <HomePage data={await getIt()} setToken={setToken} />,
    //   },
      // {
      //   path: "store/:item",
      //   element: <ShowItem data={data} />,
      // }
    // ])
    
    // ReactDOM.createRoot(document.getElementById('root')).render(
      // <React.StrictMode>
        // <RouterProvider router={router} />
      // </React.StrictMode>,
    // )
    }


    export default Start