import React, { useEffect, useState } from "react";
import AllProductrView from "../../AllProductView/AllProductrView";
import { productData } from "../../../DataStatic/Data";

const SugestedPrpducts = ({ data }) => {
  const newProductData = productData;
  const [productDataState, setProductData] = useState([]);
  useEffect(() => {
    const d =
      newProductData && newProductData.filter((i) => i.category === data);
    setProductData(d);
  }, []);

  return (
    <div>
      {data ? (
        <div className={`p-4`}>
          <h2 className={`text-[25px] font-[500] border-b mb-5`}>
            Related Product
          </h2>
          {/* <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12"> */}
          <AllProductrView data={productDataState} />
          {/* </div> */}
        </div>
      ) : null}
    </div>
  );
};

export default SugestedPrpducts;
