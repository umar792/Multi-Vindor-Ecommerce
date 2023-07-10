import React, { useEffect, useState } from "react";
import "../../../../Cart/SingleOrder/SingleOrder.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  SingleOrderFunc,
  UpdateOrderStatus,
} from "../../../../../redux/actions/OrderAction";
import Loading from "../../../../Loading/Loading";
import "./SingleOwnerOrder.css";

const OwnerSingleOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const SingleOrderdata = useSelector((state) => state.order.SingleOrderdata);
  const orderLoading = useSelector((state) => state.order.orderLoading);
  // ----------- usestate
  const [status, setStatus] = useState("");
  useEffect(() => {
    dispatch(SingleOrderFunc(id));
  }, []);

  let cartTotal = 0;
  SingleOrderdata &&
    SingleOrderdata.cart &&
    SingleOrderdata.cart.forEach((orderItem) => {
      const totalPrice = orderItem.discountPrice * orderItem.quantity;
      cartTotal += totalPrice;
    });

  const navigate = useNavigate();

  const updateStatus = () => {
    dispatch(UpdateOrderStatus(status, id, navigate));
    dispatch(SingleOrderFunc(id));
  };

  return (
    <>
      {orderLoading ? (
        <Loading />
      ) : (
        <div className="SingleOrder">
          <h2>Order Id : #{SingleOrderdata && SingleOrderdata._id}</h2>
          <div className="flex justify-between align-middle gap-7 px-10">
            <div>
              {/* ----------------------- shipping info  */}
              <div className="shippingInfo_SingleOrder">
                <h2>Shipping Info</h2>
                <p>
                  Name :{" "}
                  <span>
                    {SingleOrderdata &&
                      SingleOrderdata.shippingAddress &&
                      SingleOrderdata.shippingAddress.name}
                  </span>
                </p>
                <p>
                  Mobile NO :{" "}
                  <span>
                    +92
                    {SingleOrderdata &&
                      SingleOrderdata.shippingAddress &&
                      SingleOrderdata.shippingAddress.number}
                  </span>
                </p>
                <p>
                  Adress :{" "}
                  <span>
                    {SingleOrderdata &&
                      SingleOrderdata.shippingAddress &&
                      SingleOrderdata.shippingAddress.Adress}
                  </span>
                </p>
                <p>
                  Country :{" "}
                  <span>
                    {SingleOrderdata &&
                      SingleOrderdata.shippingAddress &&
                      SingleOrderdata.shippingAddress.country}
                  </span>
                </p>
                <p>
                  State :{" "}
                  <span>
                    {SingleOrderdata &&
                      SingleOrderdata.shippingAddress &&
                      SingleOrderdata.shippingAddress.state}
                  </span>
                </p>
                <p>
                  City :{" "}
                  <span>
                    {SingleOrderdata &&
                      SingleOrderdata.shippingAddress &&
                      SingleOrderdata.shippingAddress.city}
                  </span>
                </p>
              </div>
              {/* ------------------------ payment  */}
              <div className="payment_SingleOrder">
                <h2>Payment</h2>
                <p>
                  Status:{" "}
                  <span>
                    {SingleOrderdata && SingleOrderdata.paymentstatus}
                  </span>
                </p>
                <p>
                  Total Amount: <span>${cartTotal}</span>
                </p>
              </div>
              {/* ------------------------ order status  */}
              <div className="Order_SingleOrder">
                <h2>OrderStatus</h2>

                <p>
                  OrderStatus :{" "}
                  <span
                    className={
                      SingleOrderdata &&
                      SingleOrderdata.Orderstatus === "Processing"
                        ? "text-[red]"
                        : "text-[green]"
                    }
                  >
                    {SingleOrderdata && SingleOrderdata.Orderstatus}
                  </span>
                </p>
              </div>
            </div>
            <div>
              {/* ---------------------- order status update  */}
              <p className="mb-[30px] text-3xl font-bold">Order Status</p>
              {SingleOrderdata &&
              SingleOrderdata.Orderstatus &&
              SingleOrderdata.Orderstatus === "Delivered" ? (
                <p className="bg-[gray] px-10 py-3 text-2xl text-white">
                  Order Complete
                </p>
              ) : (
                <>
                  <select
                    onClick={(e) => setStatus(e.target.value)}
                    className="w-[200px]"
                    style={{ border: "2px solid gray" }}
                  >
                    <option value="">Update Staus</option>
                    {SingleOrderdata &&
                    SingleOrderdata &&
                    SingleOrderdata.Orderstatus !== "Shipped" ? (
                      <>
                        <option value={"Canceled"}>Canceled</option>
                        <option value={"Working"}>Working</option>
                        <option value={"Shipped"}>Shipped</option>
                      </>
                    ) : null}
                    {SingleOrderdata &&
                    SingleOrderdata &&
                    SingleOrderdata.Orderstatus === "Shipped" ? (
                      <option value={"Delivered"}>Delivered</option>
                    ) : null}
                  </select>
                  <div className="my-4">
                    <button
                      className="bg-[black] text-white px-5 py-2"
                      onClick={updateStatus}
                    >
                      Update Order
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          {/* ----------------------------- order item  */}
          <div className="order_single_item">
            <h2 className="mb-3">Items</h2>
            {SingleOrderdata &&
              SingleOrderdata.cart &&
              SingleOrderdata.cart.map((item) => {
                return (
                  <div className="single_order_child" key={item._id}>
                    <div className="single_order_child_1">
                      <img
                        src={
                          item &&
                          item.images &&
                          item.images[item.images.length - 1].url
                        }
                        alt=""
                      />
                      <p>{item && item.name && item.name.slice(0, 30)}</p>

                      <p className="ml-[15px]">
                        {item && item.quantity} X ${item && item.discountPrice}{" "}
                        = ${item && item && item.discountPrice * item.quantity}
                      </p>
                    </div>
                    <div>{}</div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default OwnerSingleOrder;
