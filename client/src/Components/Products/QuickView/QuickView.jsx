import React, { useState } from "react";
import "./QuickView.css";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { addTocart } from "../../../redux/actions/CartAction";

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
  const addDataToCart = (i) => {
    const quantity = counter;
    const alldata = { ...i, quantity };
    dispatch(addTocart(alldata));
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
