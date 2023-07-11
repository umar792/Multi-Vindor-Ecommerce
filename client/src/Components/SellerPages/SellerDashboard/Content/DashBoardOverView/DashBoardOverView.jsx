import React, { useEffect, useState } from "react";
import "./DashBoardOverView.css";
import { MdAccountBalance } from "react-icons/md";
import { AiOutlineOrderedList } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { OwnerOrderFunc } from "../../../../../redux/actions/OrderAction";
import { NavLink } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import { UseShopContext } from "../../../../../ContextAoi/Context/ShopContext";

const DashBoardOverView = () => {
  const dispatch = useDispatch();

  const [completeOrder, setCompleteOrder] = useState([]);

  const ownerOrder = useSelector((state) => state.order.ownerOrder);
  const owner = useSelector((state) => state.shop.owner);
  const { ShopOwner } = UseShopContext();

  useEffect(() => {
    const filteredOrders =
      ownerOrder && ownerOrder.filter((i) => i.Orderstatus === "Delivered");
    setCompleteOrder(filteredOrders);
  }, [ownerOrder]);

  // Retrieve the last 5 orders
  const lastFiveOrders = ownerOrder && ownerOrder.slice(-5);

  let cartTotal = 0;

  completeOrder &&
    completeOrder.forEach((item) => {
      item.cart &&
        item.cart.forEach((orderItem) => {
          const totalPrice = orderItem.discountPrice * orderItem.quantity;
          cartTotal += totalPrice;
        });
    });

  useEffect(() => {
    dispatch(OwnerOrderFunc());
  }, []);
  return (
    <div className="DashBoardOverView">
      <div className="DashBoardOverView_header">
        <div className="DashBoardOverView_header_box">
          <div className="DashBoardOverView_header_box_child">
            <MdAccountBalance />
            <span>Account Total Sells</span>
          </div>
          <p>${cartTotal}</p>
        </div>
        <div className="DashBoardOverView_header_box">
          <div className="DashBoardOverView_header_box_child">
            <AiOutlineOrderedList />
            <span>Total Orders</span>
          </div>
          <p>{ownerOrder && ownerOrder.length}</p>
        </div>
        <div className="DashBoardOverView_header_box">
          <div className="DashBoardOverView_header_box_child">
            <BsFillBagCheckFill />
            <span>Total Product</span>
          </div>
          <p>
            {ShopOwner && ShopOwner.products.length
              ? ShopOwner.products.length
              : 0}
          </p>
        </div>
      </div>
      {/* --------------------------------- */}
      <div className="latest_order">
        <p className="my-4 font-bold text-3xl">Latest Orders</p>
        <table>
          <tr
            style={{
              borderTop: "2px solid red",
              borderBottom: "2px solid red",
            }}
          >
            <th>id</th>
            <th>Date</th>
            <th>price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          {lastFiveOrders && lastFiveOrders.length > 0 && lastFiveOrders ? (
            lastFiveOrders.map((item, index) => {
              let cartTotal = 0;
              item.cart &&
                item.cart.forEach((orderItem) => {
                  const totalPrice =
                    orderItem.discountPrice * orderItem.quantity + 2;
                  cartTotal += totalPrice;
                });
              return (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td className="font-bold">
                    {item.createdAt && item.createdAt.slice(0, 10)}
                  </td>

                  <td>${cartTotal}</td>
                  <td
                    style={
                      item.Orderstatus === "Processing"
                        ? { color: "red" }
                        : { color: "green" }
                    }
                  >
                    {item.Orderstatus}
                  </td>
                  <td>
                    <NavLink to={`/owner/single/order/${item._id}`}>
                      <AiFillEye className="svg1" />
                    </NavLink>
                  </td>
                </tr>
              );
            })
          ) : (
            <p
              className="seractdata"
              style={{
                marginTop: 10,
                backgroundColor: "gray",
                padding: 10,
              }}
            >
              No Order Found
            </p>
          )}
        </table>
      </div>
    </div>
  );
};

export default DashBoardOverView;
