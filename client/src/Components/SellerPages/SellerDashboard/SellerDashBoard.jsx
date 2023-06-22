import React from "react";
import "./SellerDashBoard.css";
import SellerDashBoardSidebar from "./sidebar/SellerDashBoardSidebar";
import SellerDashBoardContent from "./Content/SellerDashBoardContent";

const SellerDashBoard = () => {
  return (
    <div className="dashboard">
      <div>
        <SellerDashBoardSidebar />
      </div>
      <div>
        <SellerDashBoardContent />
      </div>
    </div>
  );
};

export default SellerDashBoard;
