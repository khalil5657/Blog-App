// import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'

function App(props) {
    const location = useLocation()
    // if (location && props.kk == true){
    //     props.setKK(false)

    // }
    const [test, setTest] = useState(0)
    useEffect(()=>{
        if (!props.name){
            console.log("ookokokok")
        }

    }, [])
    async function logOut() {
        await fetch(`http://localhost:3002/logout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
    })
    props.setName("")
}

  return <>
    <div>
        <button onClick={()=>logOut()}>logout</button>
        {props.name.username&&'logout'}
        {props.name.username ? 'Hi ' +props.name.username:"you are not logged in"}
    </div>
  </>
}

export default App
