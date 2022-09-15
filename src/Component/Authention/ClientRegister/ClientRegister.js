import React from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSendEmailVerification } from "react-firebase-hooks/auth";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../Shared/Loading/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClientRegister = () => {
  const [auth] = useAuth();

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updatingLoading, updateError] = useUpdateProfile(auth);
  const [sendEmailVerification, verifySending, verifyError] =
    useSendEmailVerification(auth);
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();
  const imgStorageKey = "1917252678d6bb9e9686c386e330234a";
  const onSubmit = async (data) => {
   const displayName=data.name;
   const locaalBazarUser={
    email: data.email,
    types:data.types
  }
  fetch("https://local-bazar-server-site.onrender.com/users", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(locaalBazarUser),
          })
          .then(res => res.json())
          .then(data => console.log(data))

   

    await createUserWithEmailAndPassword(data.email, data.password, data.name);
    await sendEmailVerification();
    await updateProfile({ displayName });
    alert("Please Verify Your Email");
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
          const client = {
            name: data.name,
            email: data.email,
            roadName:data.road,
            ward:data.ward,
            city:data.city,
            phone:data.phone,
            types:data.types,
            img: img,
          };
          

          //  send to database
          fetch("https://local-bazar-server-site.onrender.com/client", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(client),
          })
            .then((res) => res.json())
            .then((inserted) => {
              if (inserted.insertedId) {
                toast.success(
                  <p className="text-primary">Thanks For Your Register in Client? Register is successfully</p>
                );
                reset();
              } else {
                toast.error(
                  <p className="text-primary">Sorry! we can not register your account</p>
                );
              }
            });

             
        }
     
      });

      fetch("https://local-bazar-server-site.onrender.com/users", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(user),
            })
              .then((res) => res.json())
              .then((inserted) => {
                if (inserted.insertedId) {
                  toast.success(
                    <p className="text-primary">Thanks For Your Register in Client? Register is successfully</p>
                  );
                  reset();
                } else {
                  toast.error(
                    <p className="text-primary">Sorry! we can not register your account</p>
                  );
                }
              }); 

    reset();
  };

  const navigate = useNavigate();
  let errorElement;
  if (error || verifyError || updateError) {
    errorElement = (
      <p className="text-red-500 mb-5">
        <small>
          {error?.message || verifyError?.message || updateError?.message}
        </small>
      </p>
    );
  }
  if (loading || verifySending) {
    return <Loading></Loading>;
  }

  return (
    <section className="grid w-full lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-5 items-center justify-center">
      <div className="my-5 w-4/4 ml-10">
        <div className="">
          <div className="">
            <h2 className="card-title  justify-center mb-10">
              Please Register
            </h2>
            <div className="card-actions items-center justify-center p-5">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center justify-center gap-5">
                  <div className="form-control w-80 max-w-xs">
                    <label className="label">
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Your Name"
                      className="input text-black input-bordered w-full"
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
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter Your Email"
                      className="input text-black input-bordered w-full"
                      {...register("email", {
                        required: {
                          value: true,
                          message: "Email Required",
                        },
                        pattern: {
                          value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                          message: "Enter a valid Email",
                        },
                      })}
                    />
                    <label className="label">
                      {errors.email?.type === "required" && (
                        <span className="label-text-alt text-red-500">
                          {errors.email.message}
                        </span>
                      )}
                      {errors.email?.type === "pattern" && (
                        <span className="label-text-alt text-red-500">
                          {errors.email.message}
                        </span>
                      )}
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-5">
                  <div className="form-control w-80 max-w-xs">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="Enter Your password"
                      className="input text-black input-bordered w-full"
                      {...register("password", {
                        required: {
                          value: true,
                          message: "password Required",
                        },
                        minLength: {
                          value: 6,
                          message: "Must Be enter 6 characters or Longer",
                        },
                      })}
                    />
                    <label className="label">
                      {errors.password?.type === "required" && (
                        <span className="label-text-alt text-red-500">
                          {errors.password.message}
                        </span>
                      )}
                      {errors.password?.type === "minLength" && (
                        <span className="label-text-alt text-red-500">
                          {errors.password.message}
                        </span>
                      )}
                    </label>
                  </div>
                  <div className="form-control w-80 max-w-xs">
                    <label className="label">
                      <span className="label-text">Road Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Your Road Name"
                      className="input text-black input-bordered w-full"
                      {...register("road", {
                        required: {
                          value: true,
                          message: "road Required",
                        },
                      })}
                    />
                    <label className="label">
                      {errors.road?.type === "required" && (
                        <span className="label-text-alt text-red-500">
                          {errors.road.message}
                        </span>
                      )}
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-5">
                  <div className="form-control w-80 max-w-xs">
                    <label className="label">
                      <span className="label-text">Ward no</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Your ward no"
                      className="input text-black input-bordered w-full"
                      {...register("ward", {
                        required: {
                          value: true,
                          message: "ward no Required",
                        },
                      })}
                    />
                    <label className="label">
                      {errors.ward?.type === "required" && (
                        <span className="label-text-alt text-red-500">
                          {errors.ward.message}
                        </span>
                      )}
                    </label>
                  </div>
                  <div className="form-control w-80 max-w-xs">
                    <label className="label">
                      <span className="label-text">City</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Your city"
                      className="input text-black input-bordered w-full"
                      {...register("city", {
                        required: {
                          value: true,
                          message: "city Required",
                        },
                      })}
                    />
                    <label className="label">
                      {errors.city?.type === "required" && (
                        <span className="label-text-alt text-red-500">
                          {errors.city.message}
                        </span>
                      )}
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-5">
                  <div className="form-control w-80 max-w-xs">
                    <label className="label">
                      <span className="label-text">Phone number</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Your phone number"
                      className="input text-black input-bordered w-full"
                      {...register("phone", {
                        required: {
                          value: true,
                          message: "phone number Required",
                        },
                      })}
                    />
                    <label className="label">
                      {errors.phone?.type === "required" && (
                        <span className="label-text-alt text-red-500">
                          {errors.phone.message}
                        </span>
                      )}
                    </label>
                  </div>
                  <div className="form-control w-80 max-w-xs">
                    <label className="label">
                      <span className="label-text">Types</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter user or seller"
                      readOnly
                      value="client"
                      className="input text-black input-bordered w-full"
                      {...register("types", {
                        required: {
                          value: true,
                          message: "types Required",
                        },
                      })}
                    />
                    <label className="label">
                      {errors.types?.type === "required" && (
                        <span className="label-text-alt text-red-500">
                          {errors.types.message}
                        </span>
                      )}
                    </label>
                  </div>
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
                <div className="flex items-center justify-center">
                  {errorElement}
                  <input
                    className="btn my-3 btn-primary px-10 w-full max-w-xs  text-white hover:bg-white hover:text-black"
                    type="submit"
                    value="Register"
                  />
                </div>
              </form>
              <p className="text-xl text-primary text-center">
                <small>
                  <span className="text-black font-bold">
                    Already Have a Account?{" "}
                  </span>
                  <Link to="/login" className="font-bold text-primary ml-2">
                    please Login
                  </Link>
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="register-page">
        <img
          src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg?w=740&t=st=1662787246~exp=1662787846~hmac=0575619d2240109ce9cd938cb0c5a208ae82062eb1e715fa65c174a6b293eb42"
          className="h-auto w-full"
        ></img>
      </div>
    </section>
  );
};

export default ClientRegister;
