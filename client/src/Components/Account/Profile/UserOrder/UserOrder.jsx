import React, { useEffect } from "react";
import "./UserOrder.css";
import ProfileSideBar from "../ProfileSideBar";
import { NavLink } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { LoginUserOrder } from "../../../../redux/actions/OrderAction";
import Loading from "../../../Loading/Loading";

const UserOrder = () => {
  const UserAllOrderData = useSelector((state) => state.order.UserAllOrderData);
  const orderLoading = useSelector((state) => state.order.orderLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(LoginUserOrder());
  }, []);
  // console.log(UserAllOrderData);
  return (
    <>
      {orderLoading ? (
        <Loading />
      ) : (
        <div className="profile">
          <div>
            <ProfileSideBar />
          </div>
          <div>
            <NavLink to="/profile">
              <button
                style={{
                  backgroundColor: "black",
                  color: "white",
                  padding: " 6px 10px",
                  margin: "10px",
                }}
              >
                Profile
              </button>
            </NavLink>
            <h1 className="text-center mt-3 font-bold text-3xl">Your Order</h1>
            <div className="invintory_item">
              {/* ---------------- table  */}
              <table>
                <tr
                  style={{
                    borderTop: "2px solid red",
                    borderBottom: "2px solid red",
                  }}
                >
                  <th>id</th>
                  {/* <th>Image</th>
              <th>Name</th> */}
                  <th>price</th>
                  <th>Status</th>
                  {/* <th>Image</th> */}
                  <th>Action</th>
                </tr>
                {UserAllOrderData &&
                UserAllOrderData.length > 0 &&
                UserAllOrderData ? (
                  UserAllOrderData.map((item, index) => {
                    return (
                      <tr key={item._id}>
                        <td>{index + 1}</td>
                        {/* <td>
                      {item &&
                        item.orderItem &&
                        item.orderItem.length > 0 &&
                        item.orderItem.map((item, innerIndex) => (
                          <span key={innerIndex}>
                            {
                              <img
                                src={
                                  item.images &&
                                  item.images[item.images.length - 1].url
                                }
                                alt=""
                                style={{ width: "50px", height: "50px" }}
                              />
                            }
                          </span>
                        ))}
                    </td>
                    <td>
                      {item &&
                        item.orderItem &&
                        item.orderItem.length > 0 &&
                        item.orderItem.map((item, innerIndex) => (
                          <span key={innerIndex}>
                            {item &&
                              item &&
                              item.name &&
                              item.name.slice(0, 15)}
                          </span>
                        ))}
                    </td> */}
                        <td>${item.totalPrice}</td>
                        <td
                          style={
                            item.orderStatus === "Processing"
                              ? { color: "red" }
                              : { color: "green" }
                          }
                        >
                          {item.orderStatus}
                        </td>
                        <td>
                          <NavLink to={`/single/order/${item._id}`}>
                            <AiFillEye className="svg1" />
                          </NavLink>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <p
                    className="seractdata"
                    style={{
                      marginTop: 10,
                      backgroundColor: "gray",
                      padding: 10,
                    }}
                  >
                    No Order Found
                  </p>
                )}
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserOrder;
