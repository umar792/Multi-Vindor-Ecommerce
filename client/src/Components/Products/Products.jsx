import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardAllProductView from "../SellerPages/SellerDashboard/DashboardAllProductView/DashboardAllProductView";
import { AllProductsfun } from "../../redux/actions/OwnerDashboardAction";

const Products = () => {
  const AllProductsData = useSelector((state) => state.owner.AllProductsData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AllProductsfun());
  }, []);

  return (
    <>
      <h2 className="text-center font-bold text-3xl my-3">All Products</h2>
      <p>Total Prducts: {AllProductsData && AllProductsData.length}</p>
      <DashboardAllProductView data={AllProductsData} />
    </>
  );
};

export default Products;
