import React, { useEffect, useState } from "react";
import { auth } from "../../config/Firebase";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const initials = { email: "", password: "" };

export default function Login() {
  AOS.init();
  const [state, setState] = useState(initials);
  const [user, setUser] = useState();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        console.error("error");
      }
    });
  }, []);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setIsProcessing(true);

    try {
      const { email, password } = state;
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          toast.success("User has been Sign-in", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setIsProcessing(false);

          navigate("/");
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <div className="py-5 w-100" data-aos="zoom-out-down">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
              <div className="card p-2 p-md-4 p-lg-5">
                <h1 className="text-center mb-3">Log-in</h1>
                <form onSubmit={handleLogin}>
                  <div class=" row mb-3">
                    <div className="col">
                      <input
                        type="email"
                        class="form-control"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div className="col">
                      <input
                        type="password"
                        class="form-control"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="row ">
                      <div className="col text-center mb-4">
                        <button
                          className="btn btn-primary w-50 my-4"
                          onClick={handleLogin}
                          disabled={isProcessing}
                        >
                          {!isProcessing ? (
                            "Log-in"
                          ) : (
                            <div class="spinner-grow text-info" role="status">
                              <span class="visually-hidden">Loading...</span>
                            </div>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="row">
                  <div className="col">
                    <p className="mb-0 text-center">
                      Need an Account{" "}
                      <Link
                        to="/authentication/register"
                        className="btn btn-link text-dark"
                      >
                        Register
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </main>
  );
}
