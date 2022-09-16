import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Table, Tbody, Th, Thead, Tr } from "react-super-responsive-table";
import useAuth from "../../../Hooks/useAuth";

import ManageProduct from "../ManageProduct/ManageProduct";
import ShowAllProduct from "../ShowAllProduct/ShowAllProduct";







const AllProducts = () => {
  const [auth] = useAuth();
  const [user] = useAuthState(auth);
  
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  console.log(deleteProduct);
  
  useEffect(() => {
    const url = `https://local-bazar-server-site.onrender.com/products?email=${user.email}`;
    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  }, [user.email]);
  return (
    <section>
      <h2 className="text-center font-bold mt-5 text-primary text-4xl">
        All Order : {allProducts.length}
      </h2>
      <Table className="text-center my-10">
        <Thead>
          <Tr className="bg-primary text-white uppercase">
            <Th>S.L</Th>
            <Th>Image</Th>
            <Th>Name</Th>
            <Th>available</Th>
            <Th>Price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {allProducts.map((product, index) => (
            <ShowAllProduct
              key={product._id}
              setDeleteProduct={setDeleteProduct}
              index={index}
              product={product}
              setAllProducts={setAllProducts}
            ></ShowAllProduct>
          ))}
        </Tbody>
      </Table>
      {deleteProduct && (
        <ManageProduct
          allProducts={allProducts}
          setDeleteProduct={setDeleteProduct}
          setAllProducts={setAllProducts}
          deleteProduct={deleteProduct}
        ></ManageProduct>
      )}
    </section>
  );
};

export default AllProducts;