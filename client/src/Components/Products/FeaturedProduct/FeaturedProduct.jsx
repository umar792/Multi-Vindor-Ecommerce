import React from "react";
import AllProductrView from "../../AllProductView/AllProductrView";
import { productData } from "../../../DataStatic/Data";
import { useSelector } from "react-redux";
import DashboardAllProductView from "../../SellerPages/SellerDashboard/DashboardAllProductView/DashboardAllProductView";

const FeaturedProduct = () => {
  const AllProductsData = useSelector((state) => state.owner.AllProductsData);

  return (
    <div className="my-[50px]">
      <div className={``}>
        <div className={``}>
          <h1 className="my-3 font-bold text-[30px] mx-[20px]">
            Featured Products
          </h1>
        </div>
        {productData && productData.length !== 0 && (
          <>
            <DashboardAllProductView data={AllProductsData} />
          </>
        )}
      </div>
    </div>
  );
};

export default FeaturedProduct;
