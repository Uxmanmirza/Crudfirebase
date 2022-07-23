import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../config/Firebase";

export default function Navbar() {
  const { isAuthenticated, dispatch } = useContext(AuthContext);

  // const { isAuthenticated } = authentication;

  // console.log(isAuthenticated);
  // console.log(dispatch);

  // const navigate = useNavigate()

  // navigate("/")

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: "LOGOUT" });
      })
      .catch((e) => console.error(e));

    // alert("Logout");
  };
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
              {isAuthenticated ? (
                <>
                  {" "}
                  <li className="nav-item">
                    <Link
                      to="/"
                      className="nav-link active"
                      aria-current="page"
                    >
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
                </>
              ) : (
                <li className="nav-item">
                  <Link to="/" className="nav-link active" aria-current="page">
                    Home
                  </Link>
                </li>
              )}
            </ul>
            <form className="d-flex">
              {!isAuthenticated ? (
                <Link
                  to="/Authentication/login"
                  className="btn btn-primary me-2"
                  type="submit"
                >
                  Login
                </Link>
              ) : (
                <>
                  <Link
                    to="/Authentication/login"
                    className="btn btn-primary me-2"
                    type="submit"
                  >
                    Login
                  </Link>
                  <Link
                    to="/Authentication/login"
                    className="btn btn-danger btn-sm"
                    type="submit"
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                </>
              )}
              )
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
}
