import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useAuth from "../../../../Hooks/useAuth";

const AddProduct = () => {
  const [auth]=useAuth();
  const [user]=useAuthState(auth);
  console.log(user)
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    const products = {
      kg:data.kg,
      email:user.email,
      description: data.description,
      img: data.img,
      name: data.vegetable,
      price: data.price,
    };
    console.log(products)
    fetch("https://local-bazar-server-site.onrender.com/products", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(products),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("Products added Successfully!");
      });
    reset();
  };
  return (
    <section>
      <h2 className="text-primary font-bold text-2xl text-center mt-5">
        Add a vegetables
      </h2>
      <div className="flex h-3/4 justify-center items-center mt-10 mb-20">
        <form className="px-10" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-80 max-w-xs">
            <label className="label">
              <span className="label-text"> Vegetable Name</span>
            </label>
            <input
              name="vegetable"
              type="text"
              placeholder="Enter Your Vegetable Name"
              className="input input-bordered w-full text-black"
              {...register("vegetable", {
                required: {
                  value: true,
                  message: "vegetable Name Required",
                },
              })}
            />
            <label className="label">
              {errors.vegetable?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.vegetable.message}
                </span>
              )}
            </label>
          </div>
          <div className="form-control w-80 max-w-xs">
            <label className="label">
              <span className="label-text">description</span>
            </label>
            <textarea
              type="text"
              placeholder="Enter Your Comment"
              className="input input-bordered w-full text-black"
              {...register("description", {
                required: {
                  value: true,
                  message: "description Required",
                },
              })}
            />
            {errors.description?.type === "required" && (
              <span className="label-text-alt text-red-500">
                {errors.description.message}
              </span>
            )}
          </div>
          <div className="form-control w-80 max-w-xs">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              placeholder="Enter Your minimum"
              className="input input-bordered w-full text-black"
              {...register("price", {
                required: {
                  value: true,
                  message: "price Required",
                },
                max: {
                  value: 100,
                  message: "Enter price  digit $50 than less", // JS only: <p>error message</p> TS only support string
                },
              })}
            />
            <label className="label">
              {errors.price?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.price.message}
                </span>
              )}
              {errors.price?.type === "max" && (
                <span className="label-text-alt text-red-500">
                  {errors.price.message}
                </span>
              )}
            </label>
          </div>
          <div className="form-control w-80 max-w-xs">
            <label className="label">
              <span className="label-text">Kg</span>
            </label>
            <input
              type="number"
              placeholder="Enter Your available kg"
              className="input input-bordered w-full text-black"
              {...register("kg", {
                required: {
                  value: true,
                  message: "available kg Required",
                },
                max: {
                  value: 5000,
                  message: "Enter 5000 less than digit",
                },
              })}
            />
            <label className="label">
              {errors.kg?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.kg.message}
                </span>
              )}
              {errors.kg?.type === "max" && (
                <span className="label-text-alt text-red-500">
                  {errors.kg.message}
                </span>
              )}
            </label>
          </div>
          <div className="form-control w-80 max-w-xs">
            <label className="label">
              <span className="label-text">Your img url</span>
            </label>
            <input
              type="text"
              placeholder="Enter photo url"
              className="input input-bordered w-full text-black"
              {...register("img", {
                required: {
                  value: true,
                  message: "Url Required",
                },
              })}
            />
            <label className="label">
              {errors.img?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.img.message}
                </span>
              )}
            </label>
          </div>

          <input
            className="btn my-3 btn-primary px-10 w-full max-w-xs  text-white hover:bg-white hover:text-black"
            type="submit"
            value="Add a Product"
          />
        </form>
      </div>
    </section>
  );
};

export default AddProduct;