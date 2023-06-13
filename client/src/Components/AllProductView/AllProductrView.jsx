import React from "react";
import "./AllProductrView.css";

const AllProductrView = ({ data }) => {
  console.log(data);
  return (
    <div className="All_product_data">
      {data &&
        data.map((item) => {
          return (
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
                    <p className="line_price">{item.price}$</p>
                  </div>
                  <div className="sold">
                    <p>{item.total_sell}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default AllProductrView;
