import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container">
          <Link to="/" className="navbar-brand text-icon ">
            <b>CRUD</b>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/readProduct" className="nav-link">
                  ReadProduct
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/addProduct" className="nav-link">
                  AddProduct
                </Link>
              </li>
            </ul>
            <form className="d-flex">
              <Link
                to="/Authentication/login"
                className="btn btn-primary me-2"
                type="submit"
              >
                Login
              </Link>
              <Link
                to="/Authentication/login"
                className="btn btn-danger"
                type="submit"
              >
                Logout
              </Link>
              )
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
}
