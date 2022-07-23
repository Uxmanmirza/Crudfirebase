import React from 'react'
import {Routes, Route} from "react-router-dom"
import Login from './Login'
import Register from './Register'
export default function index() {
  return (
    <Routes>
    <Route path='/'>
    <Route path='login' element={<Login/>}/>
    <Route path='Register' element={<Register/>}/>
    
    </Route>
    </Routes>
 
    )
}
