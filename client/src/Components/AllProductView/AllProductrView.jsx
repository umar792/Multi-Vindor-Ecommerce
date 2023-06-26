import React, { useState } from "react";
import "./AllProductrView.css";
import { AiOutlineEye, AiOutlineShoppingCart } from "react-icons/ai";
import QuickView from "../Products/QuickView/QuickView";
import { NavLink } from "react-router-dom";

const AllProductrView = ({ data }) => {
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
        data.length &&
        data.map((item) => {
          return (
            <>
              <div className="All_product_data_child" key={item.id}>
                <NavLink
                  to={`/singleProduct/${item.id}`}
                  className="All_product_data_image"
                >
                  <img
                    src={
                      data &&
                      item.images &&
                      item.images[item.image.length - 1].url
                    }
                    alt=""
                  />
                </NavLink>
                {/* ----------- content  */}
                <div className="All_product_data_content">
                  <NavLink to={`/shop/${item.owner && item.owner._id}`}>
                    <p className="shop_name">
                      {item.owner && item.owner.shopName}
                    </p>
                  </NavLink>
                  <NavLink to={`/singleProduct/${item.id}`}>
                    <h2>{item.name && item.name.slice(0, 38)}..</h2>
                  </NavLink>
                  <div className="All_product_data_price">
                    <div className="price_all">
                      <p>{item.discount_price && item.discount_price}$</p>
                      <p className="line_price">
                        {item.price && item.price ? item.price + "$" : null}
                      </p>
                    </div>
                    <div className="sold">
                      <p>Sold {item.total_sell && item.total_sell}</p>
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
