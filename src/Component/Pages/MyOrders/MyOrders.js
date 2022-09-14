import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { Table, Thead, Tbody, Tr, Th } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import { useNavigate } from "react-router-dom";

import MyOrder from "../MyOrder/MyOrder";
import OrderDelete from "../OrderDelete/OrderDelete";
import useAuth from "../../../Hooks/useAuth";


const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [removeOrder, setRemoveOrder] = useState(null);
  const [auth] = useAuth();
  const [user] = useAuthState(auth);
  
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      const url = `http://localhost:5000/orders?email=${user.email}`;
      fetch(url, {
        method: "Get"
      })
        .then((res) => res.json())
        .then((data) => {
          setOrders(data);
        });
    }
  }, [user]);
  console.log(orders)

  return (
    <section >
      <div>
        <h2 className="text-center font-bold text-3xl text-primary mt-5">
          Your Order : {orders.length}
        </h2>
        <Table className="text-center mt-10">
          <Thead>
            <Tr className="bg-primary text-white uppercase">
              <Th className="px-5 py-4">S.L</Th>
              <Th  className="px-5 py-4">Seller</Th>
              <Th  className="px-5 py-4">Vegetables</Th>
              <Th  className="px-5 py-4">Payment</Th>
              <Th  className="px-5 py-4">Statues</Th>
              <Th  className="px-5 py-4"> Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((order, index) => (
              <MyOrder
                index={index}
                key={order._id}
                setRemoveOrder={setRemoveOrder}
                order={order}
              ></MyOrder>
            ))}
          </Tbody>
        </Table>
      </div>
      {removeOrder && (
        <OrderDelete
          orders={orders}
          setRemoveOrder={setRemoveOrder}
          setOrders={setOrders}
          removeOrder={removeOrder}
        ></OrderDelete>
      )}
    </section>
  );
};

export default MyOrders;