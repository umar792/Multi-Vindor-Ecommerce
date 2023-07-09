import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SingleOrderFunc } from "../../../redux/actions/OrderAction";
import Loading from "../../Loading/Loading";
import "./SingleOrder.css";

const SingleOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const SingleOrderdata = useSelector((state) => state.order.SingleOrderdata);
  const orderLoading = useSelector((state) => state.order.orderLoading);
  useEffect(() => {
    dispatch(SingleOrderFunc(id));
  }, []);

  let cartTotal = 0;
  SingleOrderdata && SingleOrderdata.cart && SingleOrderdata.cart.forEach(orderItem => {
    const totalPrice = orderItem.discountPrice * orderItem.quantity;
    cartTotal += totalPrice;
  });

  return (
    <>
      {orderLoading ? (
        <Loading />
      ) : (
        <div className="SingleOrder">
          <h2>Order Id : #{SingleOrderdata && SingleOrderdata._id}</h2>
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
              Mobile NO :{" "}
              <span>
                {SingleOrderdata &&
                  SingleOrderdata.shippingAddress &&
                  SingleOrderdata.shippingAddress.Adress}
              </span>
            </p>
          </div>
          {/* ------------------------ payment  */}
          <div className="payment_SingleOrder">
            <h2>Payment</h2>
            <p>
              Status:{" "}
              <span>{SingleOrderdata && SingleOrderdata.paymentstatus}</span>
            </p>
            <p>
              Total Amount:{" "}
              <span>${cartTotal}</span>
            </p>
          </div>
          {/* ------------------------ order status  */}
          <div className="Order_SingleOrder">
            <h2>OrderStatus</h2>

            <p>
              OrderStatus :{" "}
              <span className={SingleOrderdata && SingleOrderdata.Orderstatus === "Processing" ? "text-[red]" : "text-[green]"}>{SingleOrderdata && SingleOrderdata.Orderstatus}</span>
            </p>
          </div>
          {/* ----------------------------- order item  */}
          <div className="order_single_item">
            <h2 className="mb-3">Items</h2>
            {SingleOrderdata &&
              SingleOrderdata.cart && SingleOrderdata.cart.map((item) => {
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

export default SingleOrder;
