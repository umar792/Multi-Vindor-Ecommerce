import React, { useEffect, useState } from "react";
import "./BottomHeader.css";
import { BsChevronDown } from "react-icons/bs";
import { MdOutlineAccountCircle } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

const BottomHeader = ({ showmenus, setShowMenu, showSearch, setSearch }) => {
  return (
    <div className="bottomHeader">
      <div className="left_bootom">
        <div
          className="bottomHeader__left_allcagetory text-[black] flex justify-between align-[center] w-[200px] bg-[white]"
          onClick={() => setShowMenu(!showmenus)}
        >
          <p>ALL Category</p>
          <BsChevronDown />
        </div>

        <div className={showmenus ? "menus" : "menus mob"}>
          <RxCross1 onClick={() => setShowMenu(!showmenus)} />
          <ul>
            <NavLink to="/">
              <div>
                <img src="https://cdn.shopify.com/s/files/1/1706/9177/products/NEWAppleMacbookProwithM1ProChip14InchLaptop2021ModelMKGQ3LL_A_16GB_1TBSSD_custommacbd.jpg?v=1659592838" />
                <li>Computer & Laptops</li>
              </div>
            </NavLink>
            <NavLink to="/">
              <div>
                <img
                  src="https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2021-07/kosme1.png"
                  alt=""
                />
                <li>Conmetics</li>
              </div>
            </NavLink>
            <NavLink to="/">
              <div>
                <img
                  src="https://img.freepik.com/free-vector/ordering-goods-online-internet-store-online-shopping-niche-e-commerce-website-mother-buying-babies-clothes-footwear-toys-infant-accessories_335657-2345.jpg?w=2000"
                  alt=""
                />
                <li>Accesories</li>
              </div>
            </NavLink>
            <NavLink to="/">
              <div>
                <img
                  src="https://www.shift4shop.com/2015/images/industries/clothing/clothing-apparel.png"
                  alt=""
                />
                <li>Cloths</li>
              </div>
            </NavLink>
            <NavLink to="/">
              <div>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvBQPQMVNRd6TtDkGs2dCri0Y-rxKkFOiEWw&usqp=CAU"
                  alt=""
                />
                <li>Shoes</li>
              </div>
            </NavLink>
            <NavLink to="/">
              <div>
                <img
                  src="https://img.freepik.com/free-vector/3d-gift-box-wrapped-golden-ribbon_173207-1906.jpg?w=2000"
                  alt=""
                />
                <li>Gifts</li>
              </div>
            </NavLink>
            <NavLink to="/">
              <div>
                <img src="https://cdn.openpr.com/T/c/Tc15444071_g.jpg" alt="" />
                <li>Pet Care</li>
              </div>
            </NavLink>
            <NavLink to="/">
              <div>
                <img
                  src="https://st-troy.mncdn.com/mnresize/1500/1500/Content/media/ProductImg/original/mpwp3tua-apple-iphone-14-256gb-mavi-mpwp3tua-637986832343472449.jpg"
                  alt=""
                />
                <li>Mobile & Tablets</li>
              </div>
            </NavLink>
            <NavLink to="/">
              <div>
                <img
                  src="https://static.vecteezy.com/system/resources/previews/011/996/555/original/3d-black-headphone-illustration-ecommerce-icon-png.png"
                  alt=""
                />
                <li>Music & Gaming</li>
              </div>
            </NavLink>
            <NavLink to="/">
              <div>
                <img
                  src="https://searchspring.com/wp-content/uploads/2022/10/Hero-Image-Platform-Others-2.png"
                  alt=""
                />
                <li>Others</li>
              </div>
            </NavLink>
          </ul>
        </div>
      </div>

      {/* ------------ middle  */}
      <div className="middle_bottom">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/bestSelling">Best Selling</NavLink>
          </li>
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
          <li>
            <NavLink to="/Events">Event</NavLink>
          </li>
          {/* <li>
            <NavLink to="/">FAQ</NavLink>
          </li> */}
        </ul>
      </div>
      {/* ---------------- right  */}

      <div className="right_bottom">
        <div className="relative">
          <span>0</span>
          <AiOutlineHeart />
        </div>
        <div className="relative">
          <span>0</span>
          <AiOutlineShoppingCart />
        </div>
        <NavLink to="/signup">
          <MdOutlineAccountCircle />
        </NavLink>
        <BsSearch
          className="bottom_serach"
          onClick={() => setSearch(!showSearch)}
        />
      </div>
    </div>
  );
};

export default BottomHeader;
