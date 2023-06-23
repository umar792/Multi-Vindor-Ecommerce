import React, { useState } from "react";
import "./QuickView.css";
import { RxCross1 } from "react-icons/rx";

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

  return (
    <>
      {showQuick && (
        <div className="quick_View_product">
          <RxCross1 onClick={() => SetShowQuick(!showQuick)} />
          <div className="Quick_View_Content">
            <div className="qucik_image">
              <img src={item.images && item.images[0].url} alt="" />
            </div>
            <div className="Quick_Content">
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p className="quick_price">{item.discountPrice}$</p>
              <div className="buttons">
                <div className="qucik_counter">
                  <font onClick={decrement}>-</font>
                  <span>{counter}</span>
                  <font onClick={increament}>+</font>
                </div>
                <button>Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickView;
