import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OwnerOrderFunc } from "../../../../redux/actions/OrderAction";
import Loading from "../../../Loading/Loading";
import { NavLink } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";

function OwnerAllOrder() {
  const dispatch = useDispatch();
  const ownerOrder = useSelector((state) => state.order.ownerOrder);
  const orderLoading = useSelector((state) => state.order.orderLoading);
  useEffect(() => {
    dispatch(OwnerOrderFunc());
  }, []);

  return (
    <>
      {orderLoading ? (
        <Loading />
      ) : (
        <>
          <div>
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
                  <th>Date</th>
                  <th>price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
                {ownerOrder && ownerOrder.length > 0 && ownerOrder ? (
                  ownerOrder.map((item, index) => {
                    let cartTotal = 0;
                    item.cart &&
                      item.cart.forEach((orderItem) => {
                        const totalPrice =
                          orderItem.discountPrice * orderItem.quantity;
                        cartTotal += totalPrice;
                      });
                    return (
                      <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td className="font-bold">
                          {item.createdAt && item.createdAt.slice(0, 10)}
                        </td>

                        <td>${cartTotal}</td>
                        <td
                          style={
                            item.Orderstatus === "Processing"
                              ? { color: "red" }
                              : { color: "green" }
                          }
                        >
                          {item.Orderstatus}
                        </td>
                        <td>
                          <NavLink to={`/owner/single/order/${item._id}`}>
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
        </>
      )}
    </>
  );
}

export default OwnerAllOrder;
