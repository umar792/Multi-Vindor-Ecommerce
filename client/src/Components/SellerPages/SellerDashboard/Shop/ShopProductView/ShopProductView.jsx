import React, { useState } from "react";
import "../../../../AllProductView/AllProductrView.css";
import { AiOutlineEye, AiOutlineShoppingCart } from "react-icons/ai";
import QuickView from "../../../../Products/QuickView/QuickView";
import { NavLink } from "react-router-dom";

const ShopProductView = ({ data }) => {
  const [showQuick, SetShowQuick] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    SetShowQuick(true);
  };
  return (
    <div className="All_product_data">
      {data &&
        data.length &&
        data.map((item) => {
          return (
            <>
              <div className="All_product_data_child" key={item.id}>
                <NavLink
                  to={`/singleProduct/${item.id}`}
                  className="All_product_data_image"
                >
                  <img src={item && item.avatar && item.avatar[0].url} alt="" />
                </NavLink>
                {/* ----------- content  */}
                <div className="All_product_data_content">
                  <p className="shop_name">{item.name}</p>
                  <NavLink to={`/singleProduct/${item.id}`}>
                    <h2>{item.name.slice(0, 38)}..</h2>
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

export default ShopProductView;
