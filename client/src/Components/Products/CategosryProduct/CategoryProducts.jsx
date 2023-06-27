import React from "react";
import { productData } from "../../../DataStatic/Data";
import { useParams } from "react-router-dom";
import DashboardAllProductView from "../../SellerPages/SellerDashboard/DashboardAllProductView/DashboardAllProductView";
import { useSelector } from "react-redux";

const CategoryProducts = () => {
  const { category } = useParams();

  const AllProductsData = useSelector((state) => state.owner.AllProductsData);

  var decodedCategory = decodeURIComponent(category);
  const filtercategory =
    AllProductsData &&
    AllProductsData.filter((item) => item.category === decodedCategory);
  return (
    <>
      <p>Total Prducts: {filtercategory && filtercategory.length}</p>
      {filtercategory && filtercategory.length !== 0 ? (
        <DashboardAllProductView data={filtercategory} />
      ) : (
        <p className="ml-4 w-[95%] mt-4 mb-4  p-3 bg-[gray] text-white">
          No Product Avalilable
        </p>
      )}
    </>
  );
};

export default CategoryProducts;
