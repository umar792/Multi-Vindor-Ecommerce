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
                  SingleOrderdata.shippingInfo &&
                  SingleOrderdata.shippingInfo.name}
              </span>
            </p>
            <p>
              Mobile NO :{" "}
              <span>
                +92
                {SingleOrderdata &&
                  SingleOrderdata.shippingInfo &&
                  SingleOrderdata.shippingInfo.number}
              </span>
            </p>
            <p>
              Mobile NO :{" "}
              <span>
                {SingleOrderdata &&
                  SingleOrderdata.shippingInfo &&
                  SingleOrderdata.shippingInfo.Adress}
              </span>
            </p>
          </div>
          {/* ------------------------ payment  */}
          <div className="payment_SingleOrder">
            <h2>Payment</h2>
            <p>
              Status:{" "}
              <span>{SingleOrderdata && SingleOrderdata.paymentStatus}</span>
            </p>
            <p>
              Total Amount:{" "}
              <span>${SingleOrderdata && SingleOrderdata.totalPrice}</span>
            </p>
          </div>
          {/* ------------------------ order status  */}
          <div className="Order_SingleOrder">
            <h2>OrderStatus</h2>

            <p>
              OrderStatus :{" "}
              <span>{SingleOrderdata && SingleOrderdata.orderStatus}</span>
            </p>
          </div>
          {/* ----------------------------- order item  */}
          <div className="order_single_item">
            <h2 className="mb-3">Items</h2>
            {SingleOrderdata &&
              SingleOrderdata.orderItem.map((item) => {
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
