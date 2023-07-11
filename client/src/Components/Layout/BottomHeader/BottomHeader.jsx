import React, { useEffect, useState } from "react";
import "./BottomHeader.css";
import { BsChevronDown } from "react-icons/bs";
import { MdOutlineAccountCircle } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { MdDashboard } from "react-icons/md";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { UseUserContext } from "../../../ContextAoi/Context/UserContext";
import Cart from "../../Cart/Cart";
import { useSelector } from "react-redux";
import { UseShopContext } from "../../../ContextAoi/Context/ShopContext";

const server = "localhost/4000/";

const BottomHeader = ({
  showmenus,
  setShowMenu,
  showSearch,
  setSearch,
  cartOpen,
  setOpenCart,
}) => {
  const { user } = UseUserContext();
  const ShowHideSerach = () => {
    setSearch(!showSearch);
  };

  const category = [
    {
      id: 17,
      value: "Computers and Laptops",
      image:
        "https://cdn.ttgtmedia.com/rms/onlineimages/hp_elitebook_mobile.jpg",
    },
    {
      id: 1,
      value: "Groceries & Pets",
      image:
        "https://i.pinimg.com/originals/5e/dd/9c/5edd9cb9c4fa86dbb9f5d3de688fc250.jpg",
    },
    {
      id: 2,
      value: "Health & Beauty",
      image:
        "https://media.istockphoto.com/id/1141698953/photo/spa-products-for-home-skin-care.webp?b=1&s=170667a&w=0&k=20&c=JzqLCaVnKh237TY-4ldl8yfPNPh-u13oCBlPPGYcFDA=",
    },
    {
      id: 3,
      value: "Men's Fashion",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4maXVa1Uu3ry-I3NW3CqIEnn44ByGnl0WRQ&usqp=CAU",
    },
    {
      id: 4,
      value: "Women's Fashion",
      image:
        "https://d2line.com/thatlook/wp-content/uploads/sites/4/2022/09/women-fashion-and-women-clothing-800x600.png",
    },
    {
      id: 5,
      value: "Mother & Baby",
      image:
        "https://img.freepik.com/free-photo/young-mom-holding-her-baby-air-blank-space_53876-97233.jpg",
    },
    {
      id: 6,
      value: "Home & Lifestyle",
      image:
        "data:image/jpeg;base64,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",
    },
    {
      id: 7,
      value: "Electronic Devices",
      image:
        "data:image/jpeg;base64,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",
    },
    {
      id: 8,
      value: "Electronic Accessories",
      image:
        "https://thumbs.dreamstime.com/b/gadgets-accessories-gadgets-accessories-isolated-white-background-133429004.jpg",
    },
    {
      id: 9,
      value: "TV & Home Appliances",
      image:
        "https://c8.alamy.com/comp/RKJ16M/home-appliances-gas-cooker-tv-cinema-refrigerator-air-conditioner-microwave-laptop-and-washing-machine-3d-RKJ16M.jpg",
    },
    {
      id: 10,
      value: "Sports & Outdoor",
      image:
        "https://www.aplustopper.com/wp-content/uploads/2021/10/Outdoor-Sports-Activities-1.png",
    },
    {
      id: 11,
      value: "Watches, Bags & Jewellery",
      image:
        "https://www.thesun.ie/wp-content/uploads/sites/3/2020/05/VP-COMP-FOSSIL-SALE-4-1.jpg?strip=all&quality=100&w=1500&h=1000&crop=1",
    },
    {
      id: 12,
      value: "Automotive & Motorbike",
      image:
        "https://hips.hearstapps.com/hmg-prod/images/po-motorcycles-index-1586887896.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*",
    },
    {
      id: 13,
      value: "Other",
      image:
        "https://hips.hearstapps.com/hmg-prod/images/po-motorcycles-index-1586887896.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*",
    },
  ];

  const { ShopAuthanticated } = UseShopContext();

  const cart = useSelector((state) => state.cart.cart);

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
            <li onClick={() => setShowMenu(!showmenus)}>
              <NavLink to="/">Home</NavLink>
            </li>
            <li onClick={() => setShowMenu(!showmenus)}>
              <NavLink to="/bestSelling">Best Selling</NavLink>
            </li>
            <li onClick={() => setShowMenu(!showmenus)}>
              <NavLink to="/products">Products</NavLink>
            </li>
            <li onClick={() => setShowMenu(!showmenus)}>
              <NavLink to="/Events">Event</NavLink>
            </li>
            {/* <NavLink to="/categosryProduct/Computers and Laptops">
              <div>
                <img src="https://cdn.shopify.com/s/files/1/1706/9177/products/NEWAppleMacbookProwithM1ProChip14InchLaptop2021ModelMKGQ3LL_A_16GB_1TBSSD_custommacbd.jpg?v=1659592838" />
                <li onClick={() => setShowMenu(!showmenus)}>
                  Computer & Laptops
                </li>
              </div>
            </NavLink>
            <NavLink to="/categosryProduct/Mobile and Tablets">
              <div>
                <img
                  src="https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2021-07/kosme1.png"
                  alt=""
                />
                <li onClick={() => setShowMenu(!showmenus)}>Conmetics</li>
              </div>
            </NavLink>
            <NavLink to="/categosryProduct/Accesories">
              <div>
                <img
                  src="https://img.freepik.com/free-vector/ordering-goods-online-internet-store-online-shopping-niche-e-commerce-website-mother-buying-babies-clothes-footwear-toys-infant-accessories_335657-2345.jpg?w=2000"
                  alt=""
                />
                <li onClick={() => setShowMenu(!showmenus)}>Accesories</li>
              </div>
            </NavLink>
            <NavLink to="/categosryProduct/Cloths">
              <div>
                <img
                  src="https://www.shift4shop.com/2015/images/industries/clothing/clothing-apparel.png"
                  alt=""
                />
                <li onClick={() => setShowMenu(!showmenus)}>Cloths</li>
              </div>
            </NavLink>
            <NavLink to="/categosryProduct/Shoes">
              <div>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvBQPQMVNRd6TtDkGs2dCri0Y-rxKkFOiEWw&usqp=CAU"
                  alt=""
                />
                <li onClick={() => setShowMenu(!showmenus)}>Shoes</li>
              </div>
            </NavLink>
            <NavLink to="/categosryProduct/Gifts">
              <div>
                <img
                  src="https://img.freepik.com/free-vector/3d-gift-box-wrapped-golden-ribbon_173207-1906.jpg?w=2000"
                  alt=""
                />
                <li onClick={() => setShowMenu(!showmenus)}>Gifts</li>
              </div>
            </NavLink>
            <NavLink to="/categosryProduct/PetCare">
              <div>
                <img src="https://cdn.openpr.com/T/c/Tc15444071_g.jpg" alt="" />
                <li onClick={() => setShowMenu(!showmenus)}>Pet Care</li>
              </div>
            </NavLink>
            <NavLink to="/categosryProduct/Mobile and Tablets">
              <div>
                <img
                  src="https://st-troy.mncdn.com/mnresize/1500/1500/Content/media/ProductImg/original/mpwp3tua-apple-iphone-14-256gb-mavi-mpwp3tua-637986832343472449.jpg"
                  alt=""
                />
                <li onClick={() => setShowMenu(!showmenus)}>
                  Mobile & Tablets
                </li>
              </div>
            </NavLink>
            <NavLink to="/categosryProduct/Music and Gaming">
              <div>
                <img
                  src="https://static.vecteezy.com/system/resources/previews/011/996/555/original/3d-black-headphone-illustration-ecommerce-icon-png.png"
                  alt=""
                />
                <li onClick={() => setShowMenu(!showmenus)}>Music & Gaming</li>
              </div>
            </NavLink>
            <NavLink to="/categosryProduct/Others">
              <div>
                <img
                  src="https://searchspring.com/wp-content/uploads/2022/10/Hero-Image-Platform-Others-2.png"
                  alt=""
                />
                <li onClick={() => setShowMenu(!showmenus)}>Others</li>
              </div>
            </NavLink> */}

            {category &&
              category.map((item) => {
                return (
                  <NavLink to={`/categosryProduct/${item.value}`} key={item.id}>
                    <div key={item.id}>
                      <img src={item.image} alt="" />
                      <li onClick={() => setShowMenu(!showmenus)}>
                        {item.value}
                      </li>
                    </div>
                  </NavLink>
                );
              })}
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
      {/* --------------- middle responsive  */}

      {/* ---------------- right  */}

      <div className="right_bottom">
        <div className="relative">
          <span>{cart.length}</span>
          <AiOutlineShoppingCart onClick={() => setOpenCart(!cartOpen)} />
        </div>
        {user.avatar && user.avatar ? (
          <NavLink to="/profile">
            <img
              className="user_img"
              src={`http://localhost:4000/${user.avatar}`}
            />
          </NavLink>
        ) : (
          <NavLink to="/login">
            <MdOutlineAccountCircle />
          </NavLink>
        )}
        {ShopAuthanticated && (
          <NavLink to="/Shop/Owner/Dashboard">
            <div className="relative">
              <MdDashboard />
            </div>
          </NavLink>
        )}
        <BsSearch className="bottom_serach" onClick={ShowHideSerach} />
      </div>
      {cartOpen && <Cart setOpenCart={setOpenCart} />}
    </div>
  );
};

export default BottomHeader;
