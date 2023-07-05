import React from "react";
import "./OrderSuccess.css";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <FaCheckCircle className="text-3xl" />
      <parent>Your Order has been Placed successfully </parent>
      <Link to="/order">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
