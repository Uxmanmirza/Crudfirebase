import React from 'react'
import {Routes, Route} from "react-router-dom"
import ForgetPassword from './ForgetPassword'
import Login from './Login'
import Register from './Register'
export default function index() {
  return (
    <Routes>
    <Route path='/'>
    <Route path='login' element={<Login/>}/>
    <Route path='Register' element={<Register/>}/>
    <Route path='ForgetPassword' element={<ForgetPassword/>}/>
    </Route>
    </Routes>
 
    )
}
