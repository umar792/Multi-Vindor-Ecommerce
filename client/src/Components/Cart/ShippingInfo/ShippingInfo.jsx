import React, { useEffect, useState } from "react";
import { UseUserContext } from "../../../ContextAoi/Context/UserContext";
import { useNavigate } from "react-router-dom";
import "./ShippingInfo.css";
import ShippingInfoCard from "./ShippingInfoCard";
import Paymrent from "../ConformOrder/Paymrent";

const ShippingInfo = () => {
  const [select, setSelect] = useState(0);

  const { Authanticated } = UseUserContext();

  const navigate = useNavigate();
  useEffect(() => {
    if (!Authanticated) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div className="status">
        <div
          className={
            select >= 0 ? "status_box_1 status_box_active" : "status_box_1"
          }
        >
          1.ShippingInfo
        </div>
        <div
          className={
            select >= 1 ? "status_box_1 status_box_active" : "status_box_1"
          }
        >
          2.Payment
        </div>
        <div
          className={
            select >= 2 ? "status_box_1 status_box_active" : "status_box_1"
          }
        >
          3.Success Order
        </div>
      </div>

      {/* ---------------------------------- ShippingInfoCard */}
      {select === 0 ? (
        <ShippingInfoCard select={select} setSelect={setSelect} />
      ) : null}

      {/* ----------------------- conform order  */}
      {select === 1 ? <Paymrent /> : null}
    </>
  );
};

export default ShippingInfo;
