import React, { useState } from "react";
import "./Cart.css";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, removeFromCart } from "../../redux/actions/CartAction";
import { toast } from "react-toastify";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

const Cart = ({ setOpenCart }) => {
  const cart = useSelector((state) => state.cart.cart);

  return (
    <div className="cart">
      <div className="items_cart">
        <p>Total Item : {cart && cart.length}</p>
        <RxCross1 onClick={() => setOpenCart(false)} />
      </div>
      {/* ------------- content  */}
      {cart.length !== 0 ? (
        <>
          {cart &&
            cart.map((item) => {
              return <CartItems data={item} />;
            })}
          <button className="checkout">Check Out</button>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80%",
            color: "red",
            fontSize: "20px",
          }}
        >
          <p className="font-bold mr-2">No item in card</p>
          <MdOutlineRemoveShoppingCart className="text-2xl" />
        </div>
      )}
    </div>
  );
};

// ------------ cart item

const CartItems = ({ data }) => {
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const removeitemfromCart = (i) => {
    dispatch(removeFromCart(i));
    toast.success("Product remove from card successfuly");
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
      const quantity = count + 1;
      const allData = { ...data, quantity };
      dispatch(addTocart(allData));
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
