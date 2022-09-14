import React from "react";
import { Link } from "react-router-dom";

const FindSeller = ({ seller }) => {
  
  const {city,email,img,name,phone,roadName,types,ward,_id}=seller
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <div className="avatar online">
          <div className="w-44 rounded-full">
            <img src={img} />
          </div>
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title font-bold">
          Name: {name}
        </h2>
        <p className="font-bold">Phone number: {phone}</p>
        <p className="font-bold">Email: {email}</p>
        <p className="font-bold">Ward: {ward}</p>
        <p className="font-bold">City: {city}</p>
        <p className="font-bold text-primary">Present Location:  {roadName}</p>
        <div className="card-actions justify-center my-5">
          <div>
            <button><Link to={`/seller/${_id}`}  className="btn btn-primary text-white">Profile</Link></button>
          </div>
          <div>
          <button><Link to={`/pList/${email}`} className="btn btn-primary text-white">Products</Link></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindSeller;
