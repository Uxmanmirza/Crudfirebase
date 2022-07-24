import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="mb-0 text-center text-white">CRUD APP</h1>
          <div className="p-3 text-center" data-aos="zoom-in">
            {" "}
            <Link className="btn btn-primary" to="/addProduct">
              AddProduct
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
