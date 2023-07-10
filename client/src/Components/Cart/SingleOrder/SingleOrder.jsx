import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SingleOrderFunc } from "../../../redux/actions/OrderAction";
import Loading from "../../Loading/Loading";
import "./SingleOrder.css";
import { createReview } from "../../../redux/actions/OwnerDashboardAction";

const SingleOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const SingleOrderdata = useSelector((state) => state.order.SingleOrderdata);
  const orderLoading = useSelector((state) => state.order.orderLoading);
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

  const [open, setOpen] = useState(false);
  const [comment, setcomment] = useState("");

  const sendCommetData = (i) => {
    dispatch(createReview(comment, i._id));
    setOpen(false);
  };

  return (
    <>
      {orderLoading ? (
        <Loading />
      ) : (
        <div className="SingleOrder">
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
                    {SingleOrderdata &&
                    SingleOrderdata.Orderstatus === "Delivered" ? (
                      <div className="mt-2 mb-2">
                        <button
                          className="bg-black text-white px-8 py-2"
                          onClick={() => setOpen(!open)}
                        >
                          Add a review
                        </button>
                        {open ? (
                          <div className="review_add">
                            <div className="revie_image_title">
                              <img
                                src={
                                  item &&
                                  item.images &&
                                  item.images[item.images.length - 1].url
                                }
                                alt=""
                              />
                              <p>
                                {item && item.name && item.name.slice(0, 30)}
                              </p>
                            </div>
                            {/* --------------------  */}
                            <div className="review_inputs">
                              <textarea
                                type="text"
                                value={comment}
                                onChange={(e) => setcomment(e.target.value)}
                                placeholder="Plaese Enter Your Review"
                              />
                              <button
                                className="bg-black text-white px-8 py-2 w-full"
                                onClick={() => sendCommetData(item)}
                              >
                                Add Review
                              </button>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                );
              })}
          </div>

          {/* --------------------------------  */}
          <h2>
            Order Id : #
            {SingleOrderdata &&
              SingleOrderdata._id &&
              SingleOrderdata._id.slice(0, 10)}
          </h2>

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
      )}
    </>
  );
};

export default SingleOrder;
