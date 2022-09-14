import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import FindSeller from "../FindSeller/FindSeller";

const Banner = () => {
  const [sellers, setSellers] = useState([]);
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();
  if (!sellers) {
    return "";
  }
  const onSubmit = async (data) => {
    const location = data.location;
    const url = `http://localhost:5000/seller?roadName=${location}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setSellers(data));
    reset();
  };
  return (
    <section className="my-20 ">
      <div className="mx-20 grid lg:grid-cols-2">
        <div className="search-area">
          <div className="search-info">
            <h1 className="text-5xl text-black my-10 font-bold">
            Healthy vegetables are near you....
            </h1>
            <p className="text-2xl text-black my-5">
              search Your Location from vegetable sales man near you?
            </p>
            <div className="input-form">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-80 max-w-xs">
                  <input
                    type="text"
                    placeholder="Enter You Need Location Name.."
                    className="input text-black input-bordered w-full"
                    {...register("location", {
                      required: {
                        value: true,
                        message: "Location name Required",
                      },
                    })}
                  />
                  <label className="label">
                    {errors.location?.type === "required" && (
                      <span className="label-text-alt text-red-500">
                        {errors.location.message}
                      </span>
                    )}
                  </label>
                </div>
                <input
                  className="btn my-3 btn-primary px-10 w-full max-w-xs  text-white hover:bg-white hover:text-black"
                  type="submit"
                  value="Find"
                />
              </form>
            </div>
          </div>
        </div>
        <div className="banner-img-area">
          <img
            src="https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            className="w-full h-auto"
          ></img>
        </div>
      </div>
     

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-10 my-20 mx-10">
        {sellers.map((seller) => (
          <FindSeller seller={seller} key={seller._id}></FindSeller>
        ))}
      </div>
    </section>
  );
};

export default Banner;
