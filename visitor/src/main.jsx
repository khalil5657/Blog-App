import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './home.jsx'
import { useState } from 'react'
import Start from './theapp.jsx'
// start()
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Start />
//   </StrictMode>,
// )
// ReactDOM.createRoot(document.getElementById('root')).render(
//     <React.StrictMode>
//       <RouterProvider router={router} />
//     </React.StrictMode>,
//   )
// const fetcher = async function(){
//   const raw = await fetch
// }
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Start />
    //i need loading 
)

