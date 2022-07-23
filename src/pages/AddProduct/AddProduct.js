import React, { useState , useContext } from "react";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../../config/Firebase";
import { ToastContainer, toast } from "react-toastify";
import AOS from 'aos';
import 'aos/dist/aos.css';
import {AuthContext} from "../../context/AuthContext"

import "react-toastify/dist/ReactToastify.css";
 

const initialState = { title: "", description: "", price: "" };

export default function AddProduct() {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  AOS.init();
  const { user } = useContext(AuthContext);
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(state);

    let { title, description, price } = state;

    title = title.trim();
    description = description.trim();
    price = Number(price);

    if (title.length < 3) {
      alert("Title ki length km hai");
      return;
    }
    if (description.length < 10) {
      alert("Description ki length km hai");
      return;
    }
    if (!price || price < 0) {
      alert("Price km hai");
      return;
    }

    let formData = { title, description, price };
    formData.createdBy = {
      email: user.email,
      uid: user.uid
    }

    // const formData2 = {...formData}

    // const {createdBy} = formData;

    setLoading(true);
    try {
      const docRef = await addDoc(collection(firestore, "products"), formData);
      console.log("Doucment ID: ", docRef.id);
      toast.success("User Has Been Added", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setState(initialState);
    } catch (e) {
      console.error("Error", e);
      toast.error("Product addtion is unsuccessful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setLoading(false);
  };

  return (
    <>
      <main>
        <div className="py-5 w-100"  data-aos="flip-up"  data-aos-duration="1500" data-aos-easing="linear">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                <div className="card p-2 p-md-4 p-lg-5">
                  <h2 className="text-center mb-4 text-primary">
                    <b>Add Product Form</b>
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                      <div className="col">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Title"
                          name="title"
                          onChange={handleChange}
                          value={state.title}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Description"
                          name="description"
                          onChange={handleChange}
                          value={state.description}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Price"
                          name="price"
                          onChange={handleChange}
                          value={state.price}
                        />
                      </div>
                    </div>
                    {loading ? (
                      <div className="row">
                        <div className="col text-center">
                          <div class="spinner-border text-info" role="status">
                            <span class="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="row">
                        <div className="col text-center">
                          <button className="btn btn-outline-danger w-50 text-center">
                            Add User
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ToastContainer />
    </>
  );
}
