import React, { useState } from "react";
import "./AllProductrView.css";
import { AiOutlineEye, AiOutlineShoppingCart } from "react-icons/ai";
import QuickView from "../Products/QuickView/QuickView";

const AllProductrView = ({ data }) => {
  const [showQuick, SetShowQuick] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    SetShowQuick(true);
  };
  return (
    <div className="All_product_data">
      {data &&
        data.map((item) => {
          return (
            <>
              <div className="All_product_data_child">
                <div className="All_product_data_image">
                  <img src={item.image_Url && item.image_Url[0].url} alt="" />
                </div>
                {/* ----------- content  */}
                <div className="All_product_data_content">
                  <p className="shop_name">{item.shop.name}</p>
                  <h2>{item.name.slice(0, 38)}..</h2>
                  <div className="All_product_data_price">
                    <div className="price_all">
                      <p>{item.discount_price}$</p>
                      <p className="line_price">
                        {item.price ? item.price + "$" : null}
                      </p>
                    </div>
                    <div className="sold">
                      <p>Sold {item.total_sell}</p>
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

export default AllProductrView;
