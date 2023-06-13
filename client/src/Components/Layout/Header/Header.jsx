import React, { useState } from "react";
import "./Header.css";
import { productData } from "../../../DataStatic/Data";
import { BsSearch } from "react-icons/bs";
import { MdMenu } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const Header = ({showmenus, setShowMenu,showSearch, setSearc}) => {
  const [searchitem, SetSearchItem] = useState("");
  const [serachData, setSerachData] = useState(null);

  // ------------------SerachItemChange
  const SerachItemChange = (e) => {
    SetSearchItem(e.target.value);

    const filterProduct =
      productData &&
      productData.filter((item) =>
        item.name.toLowerCase().includes(searchitem)
      );
    setSerachData(filterProduct);
  };
  console.log(searchitem);

  return (
    <>
      <div className="header">
        <div className="header_left">
         <NavLink to="/">
         <h1>
            Your<font>Shop</font>
          </h1>
         </NavLink>
        </div>
        <div className={showSearch  ? "header_search showserach" : "header_search"}>
          <input
            type="text"
            placeholder="Search"
            value={searchitem}
            onChange={SerachItemChange}
          />
          <BsSearch />
          {/* ------------------- serach Data Show  */}
          {searchitem && searchitem.length !== 0 ? (
            <div className="search_data_show">
              {serachData &&
                serachData.map((item) => (
                  <div key={item.name} className="search_data_show_item" onClick={()=> SetSearchItem("")}>
                    <img src={item.image_Url[0].url} alt="" />
                    <div className="search_data_show_item_text">
                      <h3>{item.name}</h3>
                    </div>
                  </div>
                ))}
            </div>
          ) : null}
        </div>
        {/* -------------- seller button  */}
        <button>Become Seller</button>
      </div>
      {/* ---------------------- repnsive header  */}
      <div className="responsive_header_main">
        <div className="header_responsive">
          <div className="left_r">
            <MdMenu  onClick={()=> setShowMenu(!showmenus)}/>
          </div>
          <div>
            <h1>
              Your<font>Shop</font>
            </h1>
          </div>
          <div className="right">
            <span>0</span>
            <AiOutlineShoppingCart />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
