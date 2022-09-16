import React from "react";

const Review = ({ review }) => {
  const { comment, ratting, img, name } = review;

  return (
    <div className="card w-max-lg bg-base-100 shadow-xl my-10 ">
      <figure>
        <div className="avatar">
          <div className="w-24 rounded">
            <img src={img} alt="" />
          </div>
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          <span className="text-primary mr-2 font-bold">Name:</span>
          <span className="font-bold text-secondary">{name}</span>
        </h2>
        <p>
          <span className="text-primary mr-2 font-bold">Comment:</span>
          <span className="font-bold text-secondary">{comment}</span>
        </p>
        <p>
          <span className="text-primary mr-2">Ratting:</span>
          <span className=" text-secondary">{ratting}</span>
        </p>
      </div>
    </div>
  );
};

export default Review;