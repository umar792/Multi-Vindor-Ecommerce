import React from "react";
import { productData } from "../../DataStatic/Data";
import AllProductrView from "../AllProductView/AllProductrView";

const Products = () => {
  return (
    <>
      <h2 className="text-center font-bold text-3xl my-3">All Products</h2>
      <p>Total Prducts: {productData && productData.length}</p>
      <AllProductrView data={productData} />
    </>
  );
};

export default Products;
