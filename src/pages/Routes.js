import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Headers from "../components/Header";
import Footer from "../components/Footer";

 
import AddProduct from "./AddProduct";
import ReadProduct from "./ReadProduct";

export default function index() {
  return (
    <>
      <BrowserRouter>
        <Headers />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="addProduct" element={<AddProduct />} />
            <Route path="readProduct" element={<ReadProduct/>} />
            
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}
