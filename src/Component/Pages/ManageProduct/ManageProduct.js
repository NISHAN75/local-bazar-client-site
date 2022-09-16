import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import useAuth from "../../../Hooks/useAuth";
import useTypes from "../../../Hooks/useTypes";




const ManageProduct = ({
  allProducts,
  setDeleteProduct,
  setAllProducts,
  deleteProduct,
}) => {
  const { _id, name } = deleteProduct;
  const [auth] = useAuth();
  const [user] = useAuthState(auth);
  const [types] = useTypes(user);
  console.log(deleteProduct);
  const handleDelete = (_id) => {
    console.log("click", _id);
    const url = `http://localhost:5000/products/${_id}`;
    console.log(url);

    fetch(url, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          console.log("hi");
          const remaining = allProducts.filter(
            (product) => product._id !== _id
          );
          toast.success(
            <p className="text-primary">Delete Successfully</p>
          );
          setDeleteProduct(null);
          setAllProducts(remaining);
        }
      });
  };
  return (
    <div>
      <input
        type="checkbox"
        id="order-products-delete-conform"
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-red-500">
            Are You Sure You Want to Delete
            <br /> <span className="text-green-500">{}</span>?
          </h3>
          <p className="py-4"></p>
          <div className="modal-action">
            <button
              onClick={() => handleDelete(deleteProduct?._id)}
              className="btn bg-red-500  hover:bg-white hover:text-black px-10"
            >
              Delete
            </button>
            <label
              htmlFor="order-products-delete-conform"
              className="btn bg-green-500   hover:bg-white hover:text-black px-10"
            >
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProduct;