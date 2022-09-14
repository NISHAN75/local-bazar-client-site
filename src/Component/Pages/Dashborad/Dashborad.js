import React, { useEffect } from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useTypes from "../../../Hooks/useTypes";

const Dashboard = () => {
const [auth]=useAuth();
const [user]=useAuthState(auth);
const [types]=useTypes(user);


  return (
    <div className="drawer drawer-mobile ">
      <input id="dashBoard-sideBar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <h2 className="text-5xl text-primary justify-center font-bold text-center mt-5">
          Welcome Dashboard
        </h2>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label htmlFor="dashBoard-sideBar" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-70 bg-primary text-base-content">
          {/* <!-- Sidebar content here --> */}
          <li className="bg-white hover:text-primary mr-3  mb-2 rounded-lg">
            <Link to="/dashborad" className="font-bold">
              Profile update
            </Link>
          </li>
          {
            types === "client" ? <li className="bg-white hover:text-primary mr-3  mb-2 rounded-lg">
            <Link to="myOrders" className="font-bold">
              My orders
            </Link>
          </li>:''
          }
      
          {
            types === "seller" ? <li className="bg-white hover:text-primary mr-3  mb-2 rounded-lg">
            <Link to="allOrder" className="font-bold">
              All Orders
            </Link>
          </li>: ''
          }
          {
            types === "seller" ? <li className="bg-white hover:text-primary mr-3  mb-2 rounded-lg">
            <Link to="/chatRoom" className="font-bold">
              Message
            </Link>
          </li>: ''
          }
       
          {
            types === "seller" ? <li className="bg-white hover:text-primary mr-3  mb-2 rounded-lg">
            <Link to="addProduct" className="font-bold">
              AddProduct
            </Link>
          </li>: ''
          }
        
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
