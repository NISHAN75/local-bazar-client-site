import logo from "./logo.svg";
import "./App.css";
import Header from "./Component/Pages/Header/Header";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Component/Pages/Home/Home";
import Login from "./Component/Authention/Login/Login";
import { ToastContainer } from "react-toastify";
import SellerRegister from "./Component/Authention/SellerRegister/SellerRegister";
import ClientRegister from "./Component/Authention/ClientRegister/ClientRegister";
import Dashboard from "./Component/Pages/Dashborad/Dashborad";
import Profile from "./Component/Pages/Dashborad/Profile";
import AddProduct from "./Component/Pages/Seller/AddProduct/AddProduct";
import Footer from "./Component/Shared/Footer/Footer";
import ProductsDetails from "./Component/Pages/ProductsDetails/ProductsDetails";
import SingleSeller from "./Component/Pages/SingleSeller/SingleSeller";
import io from "socket.io-client";
import SingleProduct from "./Component/Pages/SingleProduct/SingleProduct";
import UserInput from "./Component/Pages/UserInput/UserInput";
import MyOrders from "./Component/Pages/MyOrders/MyOrders";
import ChatHeader from "./Component/Pages/ChatHeader/ChatHeader";
import AllOrders from "./Component/Pages/AllOrders/AllOrders"





function App() {

  
  return (
    <div>
      <Header></Header>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashborad" element={<Dashboard />} />
        <Route path="/dashborad" element={<Dashboard />}>
          <Route index element={<UserInput />} />
          <Route path="allOrder" element={<AllOrders/>}></Route>
          <Route path="myOrders" element={<MyOrders />}></Route>
          <Route path="addProduct" element={<AddProduct />}></Route>
          
        </Route>

        <Route path="/chatRoom" element={<ChatHeader />} />
        <Route path="/seller/:id" element={<SingleSeller />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/pList/:email" element={<ProductsDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/clientRegister" element={<ClientRegister />} />
        <Route path="/sellerRegister" element={<SellerRegister />} />
      </Routes>
      <Footer></Footer>
      
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
