import React, { useState } from "react";
import "./Cart.css";
import { RxCross1 } from "react-icons/rx";
import { productData } from "../../DataStatic/Data";

const Cart = ({ setOpenCart }) => {
  return (
    <div className="cart">
      <div className="items_cart">
        <p>Total Item : {productData && productData.length}</p>
        <RxCross1 onClick={() => setOpenCart(false)} />
      </div>
      {/* ------------- content  */}
      {productData &&
        productData.map((item) => {
          return <CartItems data={item} />;
        })}
      <button className="checkout">Check Out</button>
    </div>
  );
};

// ------------ cart item

const CartItems = ({ data }) => {
  const [count, setCount] = useState(1);
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
          <RxCross1 className="remove" />
          <img src={data.image_Url && data.image_Url[0].url} alt="" />
          <p className="font-bold my-2 mx-1 cursor-pointer">{data.name}</p>
        </div>
        <p className="text-[gray] ">{`${data.discount_price} * ${count}`}</p>
        <p className="font-bold">Total: {data.discount_price * count}</p>
      </div>
    </div>
  );
};

export default Cart;
