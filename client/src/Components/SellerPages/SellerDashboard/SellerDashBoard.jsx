import React, { useState } from "react";
import "./SellerDashBoard.css";
import SellerDashBoardSidebar from "./sidebar/SellerDashBoardSidebar";
import SellerDashBoardContent from "./Content/SellerDashBoardContent";

const SellerDashBoard = () => {
  const [select, setSelect] = useState(0);
  return (
    <div className="dashboard">
      <div>
        <SellerDashBoardSidebar select={select} setSelect={setSelect} />
      </div>
      <div>
        <SellerDashBoardContent select={select} setSelect={setSelect} />
      </div>
    </div>
  );
};

export default SellerDashBoard;
