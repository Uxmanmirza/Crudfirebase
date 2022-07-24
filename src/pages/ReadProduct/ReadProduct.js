import React, { useState, useEffect, useContext } from "react";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  where,
  query,
} from "firebase/firestore";
import { firestore } from "../../config/Firebase";
import { ToastContainer, toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";
import { AuthContext } from "../../context/AuthContext";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export default function ReadProducts() {
  const [products, setProducts] = useState([]);
  const [productForEdit, setProductForEdit] = useState({});
  const [isProcessingDelete, setIsProcessingDelete] = useState(false);

  AOS.init();
  const { user } = useContext(AuthContext);

  const handleChange = (e) => {
    setProductForEdit({ ...productForEdit, [e.target.name]: e.target.value });
  };

  const fetchDocuments = async () => {
    let array = [];

    const q = query(
      collection(firestore, "products"),
      where("createdBy.uid", "==", user.uid)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      data.id = doc.id;
      array.push(data);
    });
    setProducts(array);
  };

  useEffect(() => {
    fetchDocuments();
  }, [user]);

  const handleEdit = (product) => {
    setProductForEdit(product);
  };

  const handleUpdate = async (product) => {
    await setDoc(doc(firestore, "products", product.id), product, {
      merge: true,
    });

    let newProducts = products.map((oldProduct) => {
      if (oldProduct.id === product.id) {
        return product;
      } else {
        return oldProduct;
      }
    });

    setProducts(newProducts);
    toast.success("Product updated successfully", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setProductForEdit({});
  };
  const handleDelete = async (product) => {
    setIsProcessingDelete(true);
    try {
      await deleteDoc(doc(firestore, "products", product.id));

      let newProducts = products.filter((newProduct) => {
        return product.id !== newProduct.id;
      });

      setProducts(newProducts);
      toast.success("Product Deleted successfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error(error);
    }
    setIsProcessingDelete(false);
  };

  return (
    <>
      <main>
        <div className="py-5 w-100">
          <div className="container">
            <div className="row">
              <div className="col">
                <h1 className="text-primary text-center">
                  <b>Products</b>
                </h1>
                <hr />
                {products.length > 0 ? (
                  <div className="table-responsive">
                    <Table className="table table-light table-striped">
                      <Thead>
                        <Tr className="table-dark">
                          <Th scope="col">#</Th>
                          <Th scope="col">Title</Th>
                          <Th scope="col">Price</Th>
                          <Th scope="col">Description</Th>
                          <Th scope="col">Actions</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {products.map((product, i) => {
                          return (
                            <Tr key={i}>
                              <Th scope="row">{i + 1}</Th>
                              <Td>{product.title}</Td>
                              <Td>{product.price}</Td>
                              <Td>{product.description}</Td>
                              <Td>
                                <button
                                  className="btn btn-sm btn-info me-2"
                                  data-bs-toggle="modal"
                                  data-bs-target="#editModal"
                                  onClick={() => {
                                    handleEdit(product);
                                  }}
                                >
                                  Update
                                </button>
                                <button
                                  className="btn btn-sm btn-danger"
                                  disabled={isProcessingDelete}
                                  onClick={() => {
                                    handleDelete(product);
                                  }}
                                >
                                  {!isProcessingDelete ? (
                                    "Delete"
                                  ) : (
                                    <div
                                      class="spinner-border text-danger"
                                      role="status"
                                    >
                                      <span class="visually-hidden">
                                        Loading...
                                      </span>
                                    </div>
                                  )}
                                </button>
                              </Td>
                            </Tr>
                          );
                        })}
                      </Tbody>
                    </Table>
                  </div>
                ) : (
                  <>
                    <div className="row">
                      <div className="col text-center">
                        <div class="spinner-border text-info" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="p-3 text-center" data-aos="zoom-out-down">
                      {" "}
                      <Link className="btn btn-primary" to="/addProduct">
                        Add New Product
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="editModal" data-aos="zoom-in">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header text-center">
              <h5 className="modal-title text-primary">Edit</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row mb-3">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    name="title"
                    value={productForEdit.title}
                    onChange={handleChange}
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
                    value={productForEdit.description}
                    onChange={handleChange}
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
                    value={productForEdit.price}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-dark"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => {
                  handleUpdate(productForEdit);
                }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
