import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import useAuth from "../../../Hooks/useAuth";

const Header = () => {
  const [auth] = useAuth();
    const [user] = useAuthState(auth);
    const navigate=useNavigate();
    const logout = () => {
        signOut(auth);
        navigate('/login')
    };


  return (
    <div className="navbar bg-primary">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li tabIndex={0}>
              <a className="justify-between">
                Parent
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                </svg>
              </a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <a className="text-2xl font-bold text-white">Local Bazar</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link to="/" className="text-white font-bold hover:bg-white hover:text-primary ml-2">Home</Link>
          </li>
          {
            user? <li>
            <Link to="/dashborad" className="text-white font-bold hover:bg-white hover:text-primary ml-2">Dashboard</Link>
          </li>:''
          }
          <li tabIndex={0} >
            <a className="text-white font-bold hover:bg-white hover:text-primary">
            Company
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </a>
            <ul className="bg-primary z-10 text-white my-5">
              <li>
                <Link to="/about" className="font-bold hover:bg-black" >About us</Link>
              </li>
              <li>
                <Link to="/work" className="font-bold hover:bg-black" >How Local Bazar works</Link>
              </li>
              <li>
                <Link to="/citizenship" className="font-bold hover:bg-black" >Gobal citizenship</Link>
              </li>
              <li>
                <Link to="/blog" className="font-bold hover:bg-black" >Blog</Link>
              </li>
              
            </ul>
          </li>
          {
            user ? <li><Link to="/profile" className="bg-white text-primary ml-2 hover:text-black"><AiOutlineUser className="text-xl font-bold"></AiOutlineUser></Link></li>: ""
          }
          {
            user ?  <button onClick={logout} className="text-white font-bold ml-2">
            Log Out
        </button>:<li><Link to="/login" className="text-white ml-2  font-bold hover:bg-white hover:text-primary hover:rounded-full">Login</Link></li>
          }
          {
            user? "": <li tabIndex={1}  className="ml-2">
            <a className="bg-white font-bold hover:text-primary">
            Sing up
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </a>
            <ul className="bg-primary z-10 text-white my-5">
              <li>
                <Link to="/clientRegister" className="font-bold hover:bg-black" >Client</Link>
              </li>
              <li>
                <Link to="/sellerRegister" className="font-bold hover:bg-black" >Seller</Link>
              </li>
              
              
            </ul>
          </li>
          }
       
        </ul>
      </div>
      
    </div>
  );
};

export default Header;
