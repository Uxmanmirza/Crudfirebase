import React, { useEffect, useState , useContext } from "react";
import { auth } from "../../config/Firebase";
import {Link , useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import AOS from 'aos';
import 'aos/dist/aos.css';
 

import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
const initials = { email: "", password: "" };



export default function Register() {
  const { dispatch } = useContext(AuthContext)

const navigate = useNavigate();
AOS.init();
  const [state, setState] = useState(initials);
  const [user, setUser] = useState();
  const [isProcessing, setIsProcessing] = useState(false);
  console.log(user)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        
        setUser(user);
        console.log(user);

      } else {
        console.error("error");
        
      }
    });
  }, []);

  // setUser(user);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(state);
    const { email, password } = state;
    setIsProcessing(true);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        
        let user = userCredential.user;
        console.log(user)
       
        console.log("user has been created");
        toast.success("User has been Registered", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });

        setIsProcessing(false);
       
        navigate("/authentication/login");
        dispatch({type: "LOGIN"}
       
        )
      })
      .catch((error) => {
        console.error(error);
        
      });

  };


  return (
    <main>
      <div className="py-5 w-100" data-aos="fade-down">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
              <div className="card p-2 p-md-4 p-lg-5">
                <h1 className="text-center mb-3">Register</h1>
                <form onSubmit={handleRegister}>
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
                      <div className="col text-center">
                        <button
                          className="btn btn-primary w-50 my-3"
                          onClick={handleRegister}
                          disabled={isProcessing}
                        >
                          {!isProcessing ? (
                            "Register"
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
                <p className="mb-0 text-center">Already have an Account <Link to="/authentication/login" className="btn btn-link text-dark">Login</Link></p>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </main>
  );
}

