import React from "react";
import { productData } from "../../DataStatic/Data";
import AllProductrView from "../AllProductView/AllProductrView";
import { useSelector } from "react-redux";
import DashboardAllProductView from "../SellerPages/SellerDashboard/DashboardAllProductView/DashboardAllProductView";

const Products = () => {
  const AllProductsData = useSelector((state) => state.owner.AllProductsData);

  return (
    <>
      <h2 className="text-center font-bold text-3xl my-3">All Products</h2>
      <p>Total Prducts: {AllProductsData && AllProductsData.length}</p>
      <DashboardAllProductView data={AllProductsData} />
    </>
  );
};

export default Products;
