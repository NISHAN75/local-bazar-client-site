import React from "react";
import { Link } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading"

const Product = ({ product }) => {
  if(!product){
    return <Loading></Loading>
  }
  const { img, description, name, kg, price ,_id} = product;
  return (
    <div className="card w-96 bg-base-100 shadow-xl ">
      <figure>
        <img src={img} alt="Shoes" />
      </figure>
      <div className="card-body relative">
        <h2 className="card-title">
          {name}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>{description}</p>
        <p>Per kg: {price}Tk.</p>
        <p>Avilable: {kg} Kg.</p>
        <div className="card-actions mt-2">
        <Link className="btn btn-primary w-full mx-auto" to={`/products/${_id}`}><button>Order Now</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
