import React, { useState } from "react";
import "./Cart.css";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../redux/actions/CartAction";

const Cart = ({ setOpenCart }) => {
  const cart = useSelector((state) => state.cart.cart);

  return (
    <div className="cart">
      <div className="items_cart">
        <p>Total Item : {cart && cart.length}</p>
        <RxCross1 onClick={() => setOpenCart(false)} />
      </div>
      {/* ------------- content  */}
      {cart &&
        cart.map((item) => {
          return <CartItems data={item} />;
        })}
      <button className="checkout">Check Out</button>
    </div>
  );
};

// ------------ cart item

const CartItems = ({ data }) => {
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const removeitemfromCart = (i) => {
    dispatch(removeFromCart(i));
  };
  const decrement = (data) => {
    if (count === 1) {
      setCount(1);
    } else {
      setCount(count - 1);
    }
  };

  const increament = (data) => {
    if (count >= `${data.stock}`) {
      setCount(`${data.stock}`);
    } else {
      setCount(count + 1);
    }
  };

  return (
    <div className="cart_box">
      <div className="cart_box_buttons">
        <button onClick={() => increament(data)}>+</button>
        <span>{count}</span>
        <button onClick={() => decrement(data)}>-</button>
      </div>
      <div className="cart_content">
        <div>
          <RxCross1
            className="remove"
            onClick={() => removeitemfromCart(data)}
          />
          <img
            src={data.images && data.images[data.images.length - 1].url}
            alt=""
          />
          <p className="font-bold my-2 mx-1 cursor-pointer">
            {data.name.slice(0, 30)}...
          </p>
        </div>
        <p className="text-[gray] ">{`${data.discountPrice}$ * ${data.quantity}`}</p>
        <p className="font-bold">
          Total: {data.discountPrice * data.quantity}$
        </p>
      </div>
    </div>
  );
};

export default Cart;
