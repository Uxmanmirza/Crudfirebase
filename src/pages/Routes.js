import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AddProducts from './AddProducts'
import ReadProducts from './ReadProducts'
import Home from "./Home"
import Headers from "../components/Header"
import Footer from '../components/Footer'

export default function index() {
  return (
    <>
    
    <BrowserRouter>
    <Headers/>
    <Routes>
    <Route path='/' element = {<Home/>}/>
     <Route path='readProducts' element = {<ReadProducts/>}/>
    <Route path='addProducts' element = {<AddProducts/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>


    </>
  )
}
