import React, { useEffect, useState } from "react";
import DashboardAllProductView from "../../SellerPages/SellerDashboard/DashboardAllProductView/DashboardAllProductView";
import { useSelector } from "react-redux";

const SugestedPrpducts = ({ data }) => {
  const AllProductsData = useSelector((state) => state.owner.AllProductsData);
  const newProductData = AllProductsData && AllProductsData;
  const [productDataState, setProductData] = useState([]);
  let d = [];
  useEffect(() => {
    d = newProductData && newProductData.filter((i) => i.category === data);
    setProductData(d);
  }, [data]);
  return (
    <div>
      {data ? (
        <div className={`p-4`}>
          <h2 className={`text-[25px] font-[500] border-b mb-5`}>
            Related Product
          </h2>
          {/* <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12"> */}
          <DashboardAllProductView
            data={productDataState && productDataState}
          />
          {/* </div> */}
        </div>
      ) : null}
    </div>
  );
};

export default SugestedPrpducts;
