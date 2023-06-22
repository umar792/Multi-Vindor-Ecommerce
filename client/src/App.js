import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./Components/Home/Home";
import Registration from "./Components/Account/Registration";
import Login from "./Components/Account/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ActivateAccount from "./Components/Account/ActivateAccount";
import { UseUserContext } from "./ContextAoi/Context/UserContext";
import Header from "./Components/Layout/Header/Header";
import BottomHeader from "./Components/Layout/BottomHeader/BottomHeader";
import Allevents from "./Components/Home/Events/Allevents";
import Products from "./Components/Products/Products";
import Footer from "./Components/Layout/Footer/Footer";
import BestSelling from "./Components/Products/BestSelling";
import SingleProduct from "./Components/Products/singleProduct/SingleProduct";
import { ScrollToTop } from "react-router-scroll-to-top";
import Profile from "./Components/Account/Profile/Profile";
import UserOrder from "./Components/Account/Profile/UserOrder/UserOrder";
import CategoryProducts from "./Components/Products/CategosryProduct/CategoryProducts";
import ShopOTPVerify from "./Components/SellerPages/ShopOTPVerify";
import SellerLogin from "./Components/SellerPages/SellerLogin";
import SellerDashBoard from "./Components/SellerPages/SellerDashboard/SellerDashBoard";
import { UseShopContext } from "./ContextAoi/Context/ShopContext";
import SellerAccountCreate from "./Components/SellerPages/SellerDashboard/SellerAccountCreate";

const App = () => {
  const { Authanticated, loadUser } = UseUserContext();
  const { getOwner, ShopAuthanticated, ShopOwner } = UseShopContext();
  const [showmenus, setShowMenu] = useState(false);
  const [showSearch, setSearch] = useState(true);
  const [cartOpen, setOpenCart] = useState(false);
  const [searchitem, SetSearchItem] = useState("");
  const [showProfiletoggle, setShowProfile] = useState(false);

  const PrivateRoute = () => {
    return !Authanticated ? <Navigate to="/" replace /> : <Outlet />;
  };
  const ShopOwnerPrivateRoute = () => {
    return !ShopAuthanticated ? <Navigate to="/" replace /> : <Outlet />;
  };

  useEffect(() => {
    loadUser();
    getOwner();
  }, []);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ToastContainer position="top-right" theme="dark" />
      <Header
        showmenus={showmenus}
        setShowMenu={setShowMenu}
        showSearch={showSearch}
        setSearch={setSearch}
        cartOpen={cartOpen}
        setOpenCart={setOpenCart}
        searchitem={searchitem}
        SetSearchItem={SetSearchItem}
      />
      <BottomHeader
        showmenus={showmenus}
        setShowMenu={setShowMenu}
        showSearch={showSearch}
        setSearch={setSearch}
        cartOpen={cartOpen}
        setOpenCart={setOpenCart}
      />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<Registration />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/Events" element={<Allevents />} />
        <Route exact path="/products" element={<Products />} />
        <Route
          exact
          path="/categosryProduct/:category"
          element={<CategoryProducts />}
        />
        <Route exact path="/bestSelling" element={<BestSelling />} />
        <Route exact path="/singleProduct/:id" element={<SingleProduct />} />
        {/* ---------------- profile Routes  */}
        <Route path="/profile" exact element={<PrivateRoute />}>
          <Route
            path="/profile"
            exact
            element={
              <Profile
                showProfiletoggle={showProfiletoggle}
                setShowProfile={setShowProfile}
              />
            }
          />
        </Route>
        <Route path="/user/order" exact element={<PrivateRoute />}>
          <Route
            path="/user/order"
            exact
            element={
              <UserOrder
                showProfiletoggle={showProfiletoggle}
                setShowProfile={setShowProfile}
              />
            }
          />
        </Route>

        {/* ------------------------- Active Account  */}
        <Route
          exact
          path="/activation/:activation_Token"
          element={<ActivateAccount />}
        />

        {/* -------------------------- seller routes  */}
        <Route
          path="/Create/seller/account"
          exact
          element={<SellerAccountCreate />}
        />
        <Route path="/shop/OTP/verify" exact element={<ShopOTPVerify />} />
        <Route path="/shop/login" exact element={<SellerLogin />} />
        <Route
          path="/Shop/Owner/Dashboard"
          exact
          element={<ShopOwnerPrivateRoute />}
        >
          <Route
            path="/Shop/Owner/Dashboard"
            exact
            element={<SellerDashBoard />}
          />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
