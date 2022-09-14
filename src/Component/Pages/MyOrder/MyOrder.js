import React from "react";
import { Link } from "react-router-dom";
import { Tr, Td } from "react-super-responsive-table";

const MyOrder = ({ order, index, setRemoveOrder }) => {
  console.log(order)
  return (
    <Tr className="p-20 border-b-4  border-primary text-center">
      <Td className="p-5 text-primary font-bold">{index + 1}</Td>
      <Td className="p-5 text-primary font-bold">{order?.sellerEmail}</Td>
      <Td className="p-5 text-primary font-bold">{order?.name}</Td>
      <Td className="p-5 text-primary font-bold">${order?.payment} Tk</Td>
      
      <Td className="p-5 ">
      {order?.shipment === "shifting" && (
          <label
            htmlFor="order-delete-conform"
            className="btn  bg-primary text-white hover:bg-white hover:text-black px-10 mt-2"
          >
            Shfting
          </label>
        )}
      
        {order?.shipment === "delevered" && (
          <p
          className="bg-primary text-white  p-2 mt-2"
          >
            Deleverd products Successfully
          </p>
        )}
      </Td>
      <Td className="p-5">
        {order?.shipment === "shifting" && (
          <label
            onClick={() => setRemoveOrder(order)}
            htmlFor="order-delete-conform"
            className="btn  bg-red-500 text-white hover:bg-white hover:text-black px-10"
          >
            Cancal
          </label>
        )}
      </Td>
    </Tr>
  );
};

export default MyOrder;