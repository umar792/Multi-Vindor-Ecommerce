import React, { useState } from "react";
import "../../../../AllProductView/AllProductrView.css";
import { AiOutlineEye, AiOutlineShoppingCart } from "react-icons/ai";
import QuickView from "../../../../Products/QuickView/QuickView";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addTocart } from "../../../../../redux/actions/CartAction";

const ShopProductView = ({ data }) => {
  const [showQuick, SetShowQuick] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    SetShowQuick(true);
  };
  const dispatch = useDispatch();
  const additemTocard = (i) => {
    const quantity = 1;
    const alldata = { ...i, quantity };
    dispatch(addTocart(alldata));
    toast.success("Product add to card successfuly");
  };
  return (
    <div className="All_product_data ]">
      {data &&
        data.products.length &&
        data.products.map((item) => {
          return (
            <>
              <div className="All_product_data_child w-[250px]" key={item.id}>
                <NavLink
                  to={`/singleProduct/${item._id}`}
                  className="All_product_data_image"
                >
                  <img
                    src={
                      item &&
                      item.images &&
                      item.images[item.images.length - 1].url
                    }
                    alt=""
                  />
                </NavLink>
                {/* ----------- content  */}
                <div className="All_product_data_content">
                  <NavLink to={`/shop/${item.owner}`}>
                    <p className="shop_name">
                      {data.shopName && data.shopName}
                    </p>
                  </NavLink>
                  <NavLink to={`/singleProduct/${item._id}`}>
                    <h2>
                      {item.description && item.description.slice(0, 55)}..
                    </h2>
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
                  {/* <AiOutlineEye
                    title="Quick View"
                    onClick={() => handleQuickView(item)}
                  />
                  <AiOutlineShoppingCart
                    title="Buy Now"
                    onClick={() => additemTocard(item)}
                  /> */}
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
