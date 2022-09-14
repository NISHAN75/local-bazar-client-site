import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../Shared/Loading/Loading";
import { toast } from "react-toastify";

const SingleProduct = () => {
  const [auth]=useAuth();
  const [user]=useAuthState(auth);
  const { id } = useParams();
  const navigate=useNavigate();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery("products", () =>
    fetch(`http://localhost:5000/products/${id}`).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading></Loading>;
  }
 
  const onSubmit = (data) => {
   const name=data.name;
   const kg=data.kg;
   const payment=parseInt(products.price) * parseInt(kg);
   const clientEmail=user.email;
   const sellerEmail=products.email;
   const shipment="shifting";
   const order={
    name,
    kg,
    payment,
    clientEmail,
    sellerEmail,
    shipment
   }
   fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(
            <p className="text-green-500">{`congratulations! Your ${products.name} products Order Successfully`}</p>
          );
         navigate('/')
        }else {
          toast.error(
            <p className="text-red-700">{`This Order already declare!! 
            check  My Order page search products field ${products.name} .Please Try another?`}</p>
          );
        }
      });
    reset();
  };
 
  

  return (
    <section className="my-20 mx-20 grid lg:grid-cols-2 gap-10">
      <div className="card-area">
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
          <figure>
            <img src={products.img} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{products.name}</h2>
            <p>{products.description}</p>
            <p className="font-bold">Per kg: {products.price}Tk.</p>
            <p className="font-bold">Avilable: {products.kg} Kg.</p>
          </div>
        </div>
      </div>
      <div className=" my-10">
        <div className="card card-compact w-96 shadow-xl">
          <div className="card-body w-full">
            <h2 className="card-title  justify-center mb-10 text-primary">
              Ordar Please
            </h2>
            <div className="card-actions justify-center">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-80 max-w-xs">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Your name"
                    value={products.name}
                    readOnly
                    className="input text-black input-bordered w-full"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "name Required",
                      },
                      pattern: {
                        message: "Enter a name",
                      },
                    })}
                  />
                  <label className="label">
                    {errors.name?.type === "required" && (
                      <span className="label-text-alt text-red-500">
                        {errors.name.message}
                      </span>
                    )}
                    {errors.name?.type === "pattern" && (
                      <span className="label-text-alt text-red-500">
                        {errors.name.message}
                      </span>
                    )}
                  </label>
                </div>
                <div className="form-control w-80 max-w-xs">
                  <label className="label">
                    <span className="label-text">How much you will require kg</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Your will require kg"
                    className="input text-black input-bordered w-full"
                    {...register("kg", {
                      required: {
                       value:true,
                        message: "kg Required",
                      },
                      pattern: {
                        message: "Enter a kg",
                      },
                    })}
                  />
                  <label className="label">
                    {errors.kg?.type === "required" && (
                      <span className="label-text-alt text-red-500">
                        {errors.kg.message}
                      </span>
                    )}
                    {errors.kg?.type === "pattern" && (
                      <span className="label-text-alt text-red-500">
                        {errors.kg.message}
                      </span>
                    )}
                  </label>
                </div>
                
                <input
                  className="btn my-3 btn-primary px-10 w-full max-w-xs  text-white hover:bg-white hover:text-black"
                  type="submit"
                  value="Order"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
