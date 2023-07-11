import React, { useState } from "react";
import "../../../AllProductView/AllProductrView.css";
import {
  AiOutlineEye,
  AiOutlineShoppingCart,
  AiOutlineDelete,
} from "react-icons/ai";
import QuickView from "../../../Products/QuickView/QuickView";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AllProductsfun,
  deleteproductbyOwnerredux,
  getAllEvents,
} from "../../../../redux/actions/OwnerDashboardAction";
import Loading from "../../../Loading/Loading";
import { OwnerAllProductsGetFunc } from "../../../../redux/actions/OwnerDashboardAction";
import { UseShopContext } from "../../../../ContextAoi/Context/ShopContext";
import { addTocart } from "../../../../redux/actions/CartAction";
import { toast } from "react-toastify";

const DashboardAllProductView = ({ data, select, setSelect }) => {
  const [showQuick, SetShowQuick] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { ShopOwner } = UseShopContext();

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    SetShowQuick(true);
  };
  //   ------------------- deleteproductbyOwner
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteproductbyOwner = async (id) => {
    await dispatch(deleteproductbyOwnerredux(id, navigate, setSelect));
    await dispatch(OwnerAllProductsGetFunc());
    await dispatch(AllProductsfun());
    await dispatch(getAllEvents());
  };

  const ownerLoading = useSelector((state) => state.owner.ownerLoading);
  const cart = useSelector((state) => state.cart.cart);

  const addItemtotheCart = async (item) => {
    const isProductInCart = cart && cart.some((i) => i._id === item._id);

    if (isProductInCart) {
      toast.error("Product already in cart");
    } else {
      const quantity = 1;
      const allData = { ...item, quantity };
      await dispatch(addTocart(allData));
      await toast.success("Product add to card successfuly");
    }
  };

  return (
    <>
      {ownerLoading ? (
        <Loading />
      ) : (
        <div className="All_product_data">
          {data &&
            data.length > 0 &&
            data.map((item) => {
              return (
                <div key={item._id && item._id}>
                  <div className="All_product_data_child w-[250px]">
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
                      <NavLink to={`/shop/${item.owner && item.owner._id}`}>
                        <p className="shop_name">
                          {item.owner && item.owner.shopName}
                        </p>
                      </NavLink>
                      <NavLink to={`/singleProduct/${item._id}`}>
                        <h2>{item.name.slice(0, 55)}..</h2>
                      </NavLink>
                      <div className="All_product_data_price">
                        <div className="price_all">
                          <p>{item.discountPrice}$</p>
                          <p className="line_price">
                            {item.originalPrice
                              ? item.originalPrice + "$"
                              : null}
                          </p>
                        </div>
                        <div className="sold">
                          <p>Sold {item.sold_out}</p>
                        </div>
                      </div>
                      <p>
                        {item &&
                        item.owner &&
                        item.owner._id === ShopOwner._id ? (
                          <p className=" font-bold text-[red] text-center">
                            stock : {item.stock}{" "}
                          </p>
                        ) : null}
                      </p>
                    </div>

                    {/* ------------- icons  */}
                    <div className="All_product_data_icon">
                      <AiOutlineEye
                        title="Quick View"
                        onClick={() => handleQuickView(item)}
                      />
                      <AiOutlineShoppingCart
                        title="Buy Now"
                        onClick={() => addItemtotheCart(item)}
                      />
                      {item &&
                      item.owner &&
                      item.owner._id === ShopOwner._id ? (
                        <AiOutlineDelete
                          className="text-[red]"
                          onClick={() => deleteproductbyOwner(item._id)}
                        />
                      ) : null}
                    </div>
                  </div>
                  <QuickView
                    showQuick={showQuick}
                    SetShowQuick={SetShowQuick}
                    item={selectedProduct}
                  />
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};

export default DashboardAllProductView;
