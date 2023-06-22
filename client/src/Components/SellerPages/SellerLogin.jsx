import React, { useEffect, useState } from "react";
import "../Account/Login.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import { UseShopContext } from "../../ContextAoi/Context/ShopContext";

const SellerLogin = () => {
  const { ShopAuthanticated } = UseShopContext();
  const { LoginUser } = UseShopContext();
  const navigate = useNavigate();
  const [passShow, setPassShow] = useState(false);
  const [data, setdata] = useState({
    email: "",
    password: "",
  });

  const dataChange = (e) => {
    const { name, value } = e.target;
    setdata({
      ...data,
      [name]: value,
    });
  };

  useEffect(() => {
    if (ShopAuthanticated === true) {
      navigate("/Shop/Owner/Dashboard");
    }
  }, []);

  const datasend = () => {
    LoginUser(data.email, data.password, navigate);
  };

  return (
    <div className="login bg-gray-200">
      <div className="login_child">
        <h1 className="text-2xl font-bold text-center mt-2">
          Login to your Shop Account
        </h1>
        <div className="login_inputs ">
          <div>
            <label htmlFor="email">Email Address</label>
            <div className="inputs">
              <input
                className="w-[100%]"
                type="email"
                required
                id="email"
                name="email"
                value={data.email}
                onChange={dataChange}
              />
            </div>
          </div>
          <div>
            <label htmlFor="pass">Password</label>
            <div className="inputs">
              <input
                className="w-[100%]"
                type={passShow ? "text" : "password"}
                required
                id="pass"
                name="password"
                value={data.password}
                onChange={dataChange}
              />
              {passShow ? (
                <AiFillEye
                  className="eye"
                  onClick={() => setPassShow(!passShow)}
                />
              ) : (
                <AiFillEyeInvisible onClick={() => setPassShow(!passShow)} />
              )}
            </div>
          </div>
          <span className="text-[#0F48DD] float-right my-2 cursor-pointer">
            Forgot password?
          </span>
          <button onClick={datasend}>login</button>
          <NavLink to="/Create/seller/account">
            <p>
              Not have any account? <font>Shop Singn Up</font>{" "}
            </p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SellerLogin;
