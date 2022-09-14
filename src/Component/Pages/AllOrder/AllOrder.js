import React, { useState } from "react";
import { Td, Tr } from "react-super-responsive-table";

const AllOrder = ({ order, index, setRemoveOrder }) => {
  const{_id} = order;
  const [processing, setProcessing] = useState(false);
  const deleveredHandle =()=>{
    const payment = {
      shipment: "delevered",
    };
    fetch(`http://localhost:5000/orders/${_id}`, {
      method: "PATCH",
      body: JSON.stringify(payment),
    })
      .then((res) => res.json())
      .then((data) => {
        setProcessing(false);
      });
  }

  return (
    <Tr className="p-20 border-b-4  border-primary">
      <Td className="p-5 text-primary font-bold">{index + 1}</Td>
      <Td className="p-5 text-primary font-bold">{order?.clientEmail}</Td>
      <Td className="p-5 text-primary font-bold">{order?.name}</Td>
      <Td className="p-5 text-primary font-bold">${order?.payment}</Td>
      
      <Td>
       
        {order?.shipment === "shifting" && (
          <label
            onClick={()=>deleveredHandle(order)}
            htmlFor="order-delete-conform"
            className="btn  bg-primary hover:bg-white hover:text-black px-10 mt-2"
          >
            Deleverd
          </label>
        )}
        {order?.shipment === "delevered" && (
          <p
            className="bg-primary text-white  p-5 mt-2"
          >
            Deleverd Products Successfully
          </p>
        )}
      </Td>
      <Td className="p-5">
        {order?.shipment === "shifting" && (
          <label
            onClick={() => setRemoveOrder(order)}
            htmlFor="order-delete-conform"
            className="btn  bg-red-500 hover:bg-white hover:text-black px-10 mt-2"
          >
            Delete
          </label>
        )}
       
      </Td>
    </Tr>
  );
};

export default AllOrder;