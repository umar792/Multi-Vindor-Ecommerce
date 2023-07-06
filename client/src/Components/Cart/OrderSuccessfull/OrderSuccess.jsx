import React from "react";
import "./OrderSuccess.css";
import { Link } from "react-router-dom";
import SuccessOrder from "../../Loading/SuccessOrder";
const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <SuccessOrder />
      <parent>Your Order has been Placed successfully </parent>
      <Link to="/user/order">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
