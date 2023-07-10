import React, { useState } from "react";
import "./Header.css";
import { productData } from "../../../DataStatic/Data";
import { MdMenu } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { UseShopContext } from "../../../ContextAoi/Context/ShopContext";
import { UseUserContext } from "../../../ContextAoi/Context/UserContext";
import { useSelector } from "react-redux";

const Header = ({
  showmenus,
  setShowMenu,
  showSearch,
  setSearc,
  cartOpen,
  searchitem,
  SetSearchItem,
  setOpenCart,
}) => {
  const [serachData, setSerachData] = useState(null);
  const { ShopAuthanticated } = UseShopContext();
  const AllProductsData = useSelector((state) => state.owner.AllProductsData);

  // ------------------SerachItemChange
  const SerachItemChange = (e) => {
    SetSearchItem(e.target.value);

    const filterProduct =
      AllProductsData &&
      AllProductsData.filter((item) =>
        item.name.toLowerCase().includes(searchitem)
      );
    setSerachData(filterProduct);
  };

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
        <div
          className={showSearch ? "header_search showserach" : "header_search"}
        >
          <input
            type="text"
            placeholder="Search"
            value={searchitem}
            onChange={SerachItemChange}
          />
          {/* <BsSearch /> */}
          {/* ------------------- serach Data Show  */}
          {searchitem && searchitem.length !== 0 ? (
            <div className="search_data_show">
              {serachData &&
                serachData.map((item) => (
                  <NavLink to={`/singleProduct/${item._id}`}>
                    <div
                      key={item.name}
                      className="search_data_show_item"
                      onClick={() => SetSearchItem("")}
                    >
                      <img
                        src={
                          item.images && item.images[item.images.length - 1].url
                        }
                        alt=""
                      />
                      <div className="search_data_show_item_text">
                        <h3>{item.name}</h3>
                      </div>
                    </div>
                  </NavLink>
                ))}
            </div>
          ) : null}
        </div>
        {/* -------------- seller button  */}
        {ShopAuthanticated ? (
          <NavLink to="/Shop/Owner/Dashboard">
            <button>DashBoard</button>
          </NavLink>
        ) : (
          <NavLink to="/Create/seller/account">
            <button>Become Seller</button>
          </NavLink>
        )}
      </div>
      {/* ---------------------- repnsive header  */}
      <div className="responsive_header_main">
        <div className="header_responsive">
          <div className="left_r">
            <MdMenu onClick={() => setShowMenu(!showmenus)} />
          </div>
          <div>
            <NavLink to="/">
              <h1>
                Your<font>Shop</font>
              </h1>
            </NavLink>
          </div>
          {/* <div className="right">
            <span>0</span>
            <AiOutlineShoppingCart onClick={() => setOpenCart(!cartOpen)} />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Header;
