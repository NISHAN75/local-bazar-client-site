import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useParams } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../Shared/Loading/Loading";
import {
  AiFillStar,
  AiFillUnlock,
  AiFillShopping,
  AiOutlineNotification,
  AiFillMessage,
} from "react-icons/ai";

import Product from "../Product/Product";

const ProductsDetails = () => {
  const { email } = useParams();
  const [products, setProducts] = useState([]);
  const [seller, setSeller] = useState();
  useEffect(() => {
    const url = `https://local-bazar-server-site.onrender.com/products?email=${email}`;
    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [email]);
  useEffect(() => {
    const url = `https://local-bazar-server-site.onrender.com/pList/${email}`;
    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => setSeller(data));
  }, [email]);
  if (!products || !seller) {
    return <Loading></Loading>;
  }
  return (
    <section>
      <div className="seller-profile bg-black">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-10 mx-12 py-10">
          <div className="img-area ml-40">
            <div className="avatar online">
              <div className="w-60 rounded-full">
                <img src={seller.img} className="w-full h-auto" />
              </div>
            </div>
            <div className="review-area ml-10 mt-3">
              <Link to="/addReview">
                <button className="btn bg-white text-black hover:bg-primary hover:text-white">Give a Review</button>
              </Link>
            </div>
          </div>
          <div className="seller-info">
            <div>
              <div className="flex">
                <h2 className="text-white font-bold text-3xl mb-5">
                  {seller.name}
                </h2>
                <Link to="/chatRoom">
                  <span>
                    <AiFillMessage className="ml-5 text-white text-4xl"></AiFillMessage>
                  </span>
                </Link>
              </div>
              <p className="text-white text-xl my-2">Call me: {seller.phone}</p>
              <p className="text-white text-xl my-2">
                Active loaction: {seller.roadName}.
              </p>
              <p className="text-white text-xl my-2">City: {seller.city}.</p>
              <p className="text-white text-xl my-2">RoomID: 123</p>
            </div>
            <div className="my-5 grid grid-cols-3 gap-10">
              <Link to="/reviews">
              <div className="ratting-area">
                <div className="icons">
                  <p className="flex items-center font-bold text-xl text-white">
                    <AiFillStar></AiFillStar>
                    <span className="ml-1">4.2</span>
                  </p>
                  <p className="text-white my-2">1K+ Ratings</p>
                </div>
              </div>
              </Link>
              <div className="ratting-area">
                <div className="icons">
                  <p className="flex items-center font-bold text-xl text-white">
                    <AiFillUnlock></AiFillUnlock>
                    <span className="ml-1">30 mins</span>
                  </p>
                  <p className="text-white my-2">Delivery Time</p>
                </div>
              </div>
              <div className="ratting-area">
                <div className="icons">
                  <p className="flex items-center font-bold text-xl text-white">
                    <AiFillShopping></AiFillShopping>
                    <span className="ml-1">5 Taka</span>
                  </p>
                  <p className="text-white my-2">Delivery Cost</p>
                </div>
              </div>
            </div>
          </div>
          <div className="offer-area">
            <div>
              <h3 className="text-2xl font-bold text-white my-2">OFFER :</h3>
            </div>
            <div className="p-5 border-4">
              <ul>
                <li className="flex justify-items-center items-center my-5">
                  <AiOutlineNotification className="text-red-600"></AiOutlineNotification>
                  <span className="ml-2 text-white">
                    The first customer receives{" "}
                  </span>
                  <span className="text-red-400 ml-2">FREE DELIVERY.</span>
                </li>

                <li className="flex justify-items-center items-center my-5">
                  <AiOutlineNotification className="text-red-600 text-xl"></AiOutlineNotification>
                  <span className="text-white ml-2">
                    When you pay in bikash, you get 100TK off.
                  </span>
                   
                </li>
                <li className="flex justify-self-start my-5">
                  <AiOutlineNotification className="text-red-600 text-3xl"></AiOutlineNotification>
                  <span className="text-white ml-2">
                    When you give me a 5 star review, I will give you a 50%
                    discount.
                  </span>
                   
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="product-area">
        <div className="heading">
          <h3 className="text-4xl text-center my-10 text-primary font-bold">
            {" "}
            Vegetables avilable
          </h3>
        </div>
        <div className="my-10 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-5 mx-20">
          {products.map((product) => (
            <Product product={product} key={product._id}></Product>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsDetails;
