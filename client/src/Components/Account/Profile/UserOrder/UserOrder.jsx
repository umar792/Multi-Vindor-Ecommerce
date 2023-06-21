import React from "react";
import "./UserOrder.css";
import ProfileSideBar from "../ProfileSideBar";
import { NavLink } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";

const allProductData = [
  {
    _id: 1,
    name: "Laptop",
    category: "Technical",
    price: 2000,
    Status: "process",
  },
  {
    _id: 2,
    name: "Laptop",
    category: "Technical",
    price: 2000,
    Status: "complete",
  },
];

const UserOrder = ({ setShowProfile }) => {
  return (
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
              <th>Name</th>
              <th>price</th>
              <th>Status</th>
              {/* <th>Image</th> */}
              <th>Action</th>
            </tr>
            {allProductData.length && allProductData ? (
              allProductData.map((item, index) => {
                return (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.name.slice(0, 15)}</td>
                    <td>{item.price}</td>
                    <td
                      style={
                        item.Status === "process"
                          ? { color: "red" }
                          : { color: "green" }
                      }
                    >
                      {item.Status}
                    </td>

                    <td>
                      <NavLink to={`/singleproduct/${item._id}`}>
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
                No Product Found
              </p>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserOrder;
