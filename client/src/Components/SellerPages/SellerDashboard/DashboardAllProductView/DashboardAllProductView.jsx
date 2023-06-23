import React, { useState } from "react";
import "../../../AllProductView/AllProductrView.css";
import {
  AiOutlineEye,
  AiOutlineShoppingCart,
  AiOutlineDelete,
} from "react-icons/ai";
import QuickView from "../../../Products/QuickView/QuickView";
import { NavLink } from "react-router-dom";

const DashboardAllProductView = ({ data }) => {
  console.log(data);
  const [showQuick, SetShowQuick] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    SetShowQuick(true);
  };
  return (
    <div className="All_product_data">
      {data &&
        data.length > 0 &&
        data.map((item) => {
          return (
            <>
              <div className="All_product_data_child w-[250px]" key={item.id}>
                <NavLink
                  to={`/singleProduct/${item.id}`}
                  className="All_product_data_image"
                >
                  <img src={item && item.images && item.images[0].url} alt="" />
                </NavLink>
                {/* ----------- content  */}
                <div className="All_product_data_content">
                  <NavLink to={`/shop/${item.owner._id}`}>
                    <p className="shop_name">
                      {item.owner && item.owner.shopName}
                    </p>
                  </NavLink>
                  <NavLink to={`/singleProduct/${item.id}`}>
                    <h2>{item.name.slice(0, 55)}..</h2>
                  </NavLink>
                  <div className="All_product_data_price">
                    <div className="price_all">
                      <p>{item.discountPrice}$</p>
                      <p className="line_price">
                        {item.originalPrice ? item.originalPrice + "$" : null}
                      </p>
                    </div>
                    <div className="sold">
                      <p>Sold {item.sold_out}</p>
                    </div>
                  </div>
                </div>

                {/* ------------- icons  */}
                <div className="All_product_data_icon">
                  <AiOutlineEye
                    title="Quick View"
                    onClick={() => handleQuickView(item)}
                  />
                  <AiOutlineShoppingCart title="Buy Now" />
                  <AiOutlineDelete className="text-[red]" />
                </div>
              </div>
              <QuickView
                showQuick={showQuick}
                SetShowQuick={SetShowQuick}
                item={selectedProduct}
              />
            </>
          );
        })}
    </div>
  );
};

export default DashboardAllProductView;
