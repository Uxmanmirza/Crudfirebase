import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Headers from "../components/Header";
import Footer from "../components/Footer";
import Authentication from "../Authentication";

import AddProduct from "./AddProduct";
import ReadProduct from "./ReadProduct";
import PrivateRoutes from "../important/PrivateRoutes";

export default function index() {
  return (
    <>
      <BrowserRouter>
        <Headers />
        <main>
          <Routes>
            <Route path="/" element={<PrivateRoutes Component={Home} />} />
            <Route path="addProduct" element={<AddProduct />} />
            <Route path="readProduct" element={<ReadProduct />} />
            <Route path="/authentication/*" element={<Authentication />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}
