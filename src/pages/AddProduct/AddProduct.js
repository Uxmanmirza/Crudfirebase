import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../../Config/Firebase";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const initialState = { title: "", description: "", price: "" };

export default function AddProduct() {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);

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
        <div className="py-5 w-100">
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
