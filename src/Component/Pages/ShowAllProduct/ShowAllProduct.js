import React from "react";
import { Td, Tr } from "react-super-responsive-table";

const ShowAllProduct = ({ setDeleteProduct, index, product, setAllProducts }) => {
  console.log(product);
  return (
    <Tr className="p-20 border-b-4  border-primary">
      <Td className="p-5 text-primary font-bold">{index + 1}</Td>
      <Td className="p-5">
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={product?.img} alt="" />
          </div>
        </div>
      </Td>
      <Td className="p-5 text-primary font-bold">{product?.name}</Td>
      <Td className="p-5 text-primary font-bold">{product?.kg} Kg</Td>
      <Td className="p-5 text-primary font-bold">${product?.price}Tk</Td>
      <Td className="p-5">
        {!product?.paid && (
          <label
            onClick={() => setDeleteProduct(product)}
            htmlFor="order-products-delete-conform"
            className="btn  bg-red-500 hover:bg-white hover:text-black px-10 mt-2"
          >
            Delete
          </label>
        )}
      </Td>
    </Tr>
  );
};

export default ShowAllProduct;