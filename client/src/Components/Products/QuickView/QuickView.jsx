import React, { useState } from "react";
import "./QuickView.css";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../../redux/actions/CartAction";
import { toast } from "react-toastify";

const QuickView = ({ showQuick, SetShowQuick, item }) => {
  const [counter, setCounter] = useState(1);
  const decrement = () => {
    if (counter === 1) {
      setCounter(1);
    } else {
      setCounter(counter - 1);
    }
  };

  const increament = () => {
    if (counter >= `${item.stock}`) {
      setCounter(`${item.stock}`);
    } else {
      setCounter(counter + 1);
    }
  };
  const dispatch = useDispatch();
  const cart = useSelector((state)=> state.cart.cart)
  const addDataToCart = async (i) => {
    const isProductInCart =cart && cart.some((item) => item._id === i._id);

    if (isProductInCart) {
      toast.error("Product already in cart");
    } else {
      const quantity = counter;
      const alldata = { ...i, quantity };
      await dispatch(addTocart(alldata));
      await toast.success("Product add to card successfuly");
    }
   
  };

  return (
    <>
      {showQuick && (
        <div className="quick_View_product">
          <RxCross1 onClick={() => SetShowQuick(!showQuick)} />
          <div className="Quick_View_Content">
            <div className="qucik_image">
              <img
                src={item.images && item.images[item.images.length - 1].url}
                alt=""
              />
            </div>
            <div className="Quick_Content">
              <h2>{item.name.slice(0, 100)}...</h2>
              <p>{item.description.slice(0, 500)}....</p>
              <p className="quick_price">{item.discountPrice}$</p>
              <div className="buttons">
                <div className="qucik_counter">
                  <font onClick={decrement}>-</font>
                  <span>{counter}</span>
                  <font onClick={increament}>+</font>
                </div>
                <button onClick={() => addDataToCart(item)}>Add to cart</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickView;
