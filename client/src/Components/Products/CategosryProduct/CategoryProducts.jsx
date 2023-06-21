import React from "react";
import AllProductrView from "../../AllProductView/AllProductrView";
import { productData } from "../../../DataStatic/Data";
import { useParams } from "react-router-dom";

const CategoryProducts = () => {
  const { category } = useParams();

  const filtercategory =
    productData && productData.filter((item) => item.category === category);
  return (
    <>
      <p>Total Prducts: {filtercategory && filtercategory.length}</p>
      {filtercategory.length !== 0 ? (
        <AllProductrView data={filtercategory} />
      ) : (
        <p className="m-4 w-full p-3 bg-[gray] text-white">
          No Product Avalilable
        </p>
      )}
    </>
  );
};

export default CategoryProducts;
