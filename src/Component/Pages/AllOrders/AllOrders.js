import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import useAuth from "../../../Hooks/useAuth";
import useTypes from "../../../Hooks/useTypes";
import AllOrder from "../AllOrder/AllOrder";
import MangeModal from "../MangeModal/MangeModal";





const AllOrders = () => {
  const [auth] = useAuth();
  const [user] = useAuthState(auth);
  const [types] = useTypes(user);
  const [allOrders, setAllOrders] = useState([]);
  const [removeOrder, setRemoveOrder] = useState(null);
  console.log(types)
  
  useEffect(() => {
    if (types === "seller") {
      const url = "http://localhost:5000/allOrders";
      fetch(url, {
        method: "Get"
      })
        .then((res) => res.json())
        .then((data) => {
          setAllOrders(data);
        });
    }
  }, [types]);
  return (
    <section>
      <h2 className="text-center font-bold mt-5 text-primary text-4xl">
        All Order : {allOrders.length}
      </h2>
      <Table className="my-10 text-center">
        <Thead>
          <Tr className="bg-primary text-white uppercase">
            <Th>S.L</Th>
            <Th>Email</Th>
            <Th>Vegetable</Th>
            <Th>Amount</Th>
            <Th>Statues</Th>
            <Th>Update</Th>
           
          </Tr>
        </Thead>
        <Tbody className="text-center">
          {allOrders.map((order, index) => (
            <AllOrder
              setRemoveOrder={setRemoveOrder}
              index={index}
              order={order}
            ></AllOrder>
          ))}
        </Tbody>
      </Table>
      {removeOrder && (
        <MangeModal
          allOrders={allOrders}
          setRemoveOrder={setRemoveOrder}
          setAllOrders={setAllOrders}
          removeOrder={removeOrder}
        ></MangeModal>
      )}
    </section>
  );
};

export default AllOrders;