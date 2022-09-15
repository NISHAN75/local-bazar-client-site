import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../../Hooks/useAuth";


const UserInput = () => {
  const [auth] = useAuth();
  const [user] = useAuthState(auth);

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  const imgStorageKey = "1917252678d6bb9e9686c386e330234a";

  const onSubmit = async (data) => {

    const image = data.image[0];
    const formDate = new FormData();
    formDate.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;
    fetch(url, {
      method: "POST",
      body: formDate,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const img = result.data.url;
          const number =data.number
          console.log(number)
          const myProfile = {
            name: data.name,
            email: data.email,
            facebook: data.facebook,
            linkdin: data.linkedin,
            adress: data.Address,
            eduction: data.Education,
            number: data.number,
            img: img,
          };
          

          //  send to database
          fetch("https://local-bazar-server-site.onrender.com/profile", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(myProfile),
          })
            .then((res) => res.json())
            .then((inserted) => {
              if (inserted.insertedId) {
                toast.success(
                  <p className="text-primary">Profile information Added Successfully</p>
                );
                reset();
              } else {
                toast.error(
                  <p className="text-primary">Sorry! Did not add Profile</p>
                );
              }
            });
        }
        console.log("imgdb", result);
      });

    // reset();
  };
  return (
    <section>
      <h2 className="text-primary font-bold text-2xl my-10 text-center">
        Update Your Information
      </h2>
      <div className="flex h-3/4 justify-center items-center mt-20 mb-20">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-80 max-w-xs">
            <label className="label">
              <span className="label-text">Profile Name</span>
            </label>
            <input
              name="name"
              value={user?.displayName}
              type="text"
              placeholder="Enter Your Name"
              className="input input-bordered w-full text-black"
              {...register("name", {
                required: {
                  value: true,
                  message: "Name Required",
                },
              })}
            />
            <label className="label">
              {errors.name?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.name.message}
                </span>
              )}
            </label>
          </div>
          <div className="form-control w-80 max-w-xs">
            <label className="label">
              <span className="label-text">Email Address</span>
            </label>
            <input
              type="text"
              value={user?.email}
              placeholder="Enter Your email"
              className="input input-bordered w-full text-black"
              {...register("email", {
                required: {
                  value: true,
                  message: "email Required",
                },
              })}
            />
            {errors.email?.type === "required" && (
              <span className="label-text-alt text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="form-control w-80 max-w-xs">
            <label className="label">
              <span className="label-text">Facebook url</span>
            </label>
            <input
              type="text"
              placeholder="Enter Your facebook url"
              className="input input-bordered w-full text-black"
              {...register("facebook", {
                required: {
                  value: true,
                  message: "facebook url Required",
                },
              })}
            />
            <label className="label">
              {errors.facebook?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.facebook.message}
                </span>
              )}
            </label>
          </div>
          <div className="form-control w-80 max-w-xs">
            <label className="label">
              <span className="label-text">Linkedin url</span>
            </label>
            <input
              type="text"
              placeholder="Enter Your Linkedin url"
              className="input input-bordered w-full text-black"
              {...register("linkedin", {
                required: {
                  value: true,
                  message: "linkedin url Required",
                },
              })}
            />
            <label className="label">
              {errors.linkedin?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.linkedin.message}
                </span>
              )}
            </label>
          </div>
          <div className="form-control w-80 max-w-xs">
            <label className="label">
              <span className="label-text">Present Address</span>
            </label>
            <input
              type="text"
              placeholder="Enter Your Present Address"
              className="input input-bordered w-full text-black"
              {...register("Address", {
                required: {
                  value: true,
                  message: "Address Required",
                },
              })}
            />
            <label className="label">
              {errors.Address?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.Address.message}
                </span>
              )}
            </label>
          </div>
          <div className="form-control w-80 max-w-xs">
            <label className="label">
              <span className="label-text">Education Status</span>
            </label>
            <input
              type="text"
              placeholder="Enter Your Education Status"
              className="input input-bordered w-full text-black"
              {...register("Education", {
                required: {
                  value: true,
                  message: "Education Required",
                },
              })}
            />
            <label className="label">
              {errors.Education?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.Education.message}
                </span>
              )}
            </label>
          </div>
          <div className="form-control w-80 max-w-xs">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="number"
              placeholder="Enter Your Phone"
              className="input input-bordered w-full text-black"
              {...register("number", {
                required: {
                  value: true,
                  message: "Phone Number Required",
                },
              })}
            />
            <label className="label">
              {errors.number?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.number.message}
                </span>
              )}
            </label>
          </div>
          <div className="form-control w-80 max-w-xs">
            <label className="label">
              <span className="label-text">Your Photo</span>
            </label>
            <input
              type="file"
            
              className="input input-bordered w-full"
              {...register("image", {
                required: {
                  value: true,
                  message: "image Url Required",
                },
              })}
            />
            <label className="label">
              {errors.image?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.image.message}
                </span>
              )}
            </label>
          </div>

          <input
            className="btn my-3 btn-primary px-10 w-full max-w-xs  text-white hover:bg-white hover:text-black"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    </section>
  );
};

export default UserInput;