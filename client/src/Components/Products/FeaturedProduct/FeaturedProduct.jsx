import React from "react";
import AllProductrView from "../../AllProductView/AllProductrView";
import { productData } from "../../../DataStatic/Data";

const FeaturedProduct = () => {
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
            <AllProductrView data={productData} />
          </>
        )}
      </div>
    </div>
  );
};

export default FeaturedProduct;
