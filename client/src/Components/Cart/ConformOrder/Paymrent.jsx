import React, { useEffect, useState } from "react";
import "./Payment.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UseUserContext } from "../../../ContextAoi/Context/UserContext";
import { CreateOrder } from "../../../redux/actions/OrderAction";
import Loading from "../../Loading/Loading";

const Paymrent = ({ select, setSelect }) => {
  const [method, setmethods] = useState(6);
  const { Authanticated, user } = UseUserContext();

  // ------------------- cart
  const cart = useSelector((state) => state.cart.cart);

  // ------------------- totalItemQuantity
  const totalItemQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  // ----------------- sub total
  const Subtotal =
    cart &&
    cart.reduce((acc, item) => acc + item.discountPrice * item.quantity, 0);

  // -------------------- shippingcharges
  const shippingcharges = 2;

  // ----------------- total
  const total = Subtotal + shippingcharges;

  const navigate = useNavigate();
  useEffect(() => {
    if (!Authanticated) {
      navigate("/login");
    }
  }, []);
  const ShippingInfouser = JSON.parse(localStorage.getItem("shippingInfo"));

  const dispatch = useDispatch();

  const CODFUNC = async () => {
    setmethods(1);
    const shippingInfo = {
      Adress: ShippingInfouser.Adress,
      city: ShippingInfouser.city,
      country: ShippingInfouser.country,
      number: ShippingInfouser.number,
      name: ShippingInfouser.name,
      email: ShippingInfouser.email,
    };
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    // const itemquantity = cart.map((item) => );

    const alldata = {
      shippingAddress: shippingInfo && shippingInfo,
      cart: cart && cart,
      totalPrice: ShippingInfouser.total,
      user: user,
    };

    await dispatch(CreateOrder(alldata, setSelect));
  };

  const orderLoading = useSelector((state) => state.order.orderLoading);

  return (
    <>
      {orderLoading ? (
        <Loading />
      ) : (
        <div className="payment">
          <div className="methos_payment">
            <div className="card_payment">
              <button onClick={() => setmethods(0)}>
                {" "}
                Pay With Debit/Credit card{" "}
              </button>
              {method === 0 ? (
                <div className="card_payment_inputs">
                  <div className="iputs">
                    <input type="number" placeholder="Card Number" />
                    <input type="number" placeholder="Exp Date" />
                  </div>
                  <div className="iputs">
                    <input type="text" placeholder="Name on Card" />
                    <input type="number" placeholder="Billing Adress" />
                  </div>
                  <button>Submit</button>
                </div>
              ) : null}
            </div>
            <div className="card_payment">
              <button onClick={CODFUNC}>Cash on Devilery </button>
            </div>
          </div>

          {/* -----------------------  */}
          <div className="shipping_cart_info">
            <div
              className="flex justify-between align-middle px-1 py-1 mb-2 font-bold"
              style={{ borderBottom: "1px solid rgb(203, 196, 196)" }}
            >
              <p>Total Item :</p>
              <p>{cart && cart.length}</p>
            </div>
            <div
              className="flex justify-between align-middle px-1 py-1 mb-2 font-bold"
              style={{ borderBottom: "1px solid rgb(203, 196, 196)" }}
            >
              <p>Total Quantity :</p>
              <p>{totalItemQuantity}</p>
            </div>
            <div className="flex justify-between align-middle px-1 py-3 my-2 mb-2">
              <p>Subtotal :</p>
              <p>${Subtotal}</p>
            </div>
            <div
              className="flex justify-between align-middle px-1 py-3 my-2 mb-2"
              style={{ borderBottom: "1px solid rgb(203, 196, 196)" }}
            >
              <p>Shipping Charges :</p>
              <p>${shippingcharges}</p>
            </div>

            <div className="flex justify-between align-middle px-1 py-5 my-2 mb-2">
              <p>Total Amount :</p>
              <p>${total}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Paymrent;
