import React, { useEffect, useState } from "react";
import "./Login.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import { UseUserContext } from "../../ContextAoi/Context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { LoginUser, loading, Authanticated } = UseUserContext();
  const [passShow, setPassShow] = useState(false);
  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (Authanticated === true) {
      navigate("/");
    }
  }, [Authanticated]);

  const dataChange = (e) => {
    const { name, value } = e.target;
    setdata({
      ...data,
      [name]: value,
    });
  };

  const datasend = () => {
    LoginUser(data.email, data.password, navigate);
  };

  return (
    <>
      {loading ? (
        "Loading"
      ) : (
        <div className="login bg-gray-200">
          <div className="login_child">
            <h1 className="text-2xl font-bold text-center mt-2">
              Login to your account
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
                    <AiFillEyeInvisible
                      onClick={() => setPassShow(!passShow)}
                    />
                  )}
                </div>
              </div>
              <span className="text-[#0F48DD] float-right my-2 cursor-pointer">
                Forgot password?
              </span>
              <button onClick={datasend}>login</button>
              <NavLink to="/signup">
                <p>
                  Not have any account? <font>Singn Up</font>{" "}
                </p>
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
