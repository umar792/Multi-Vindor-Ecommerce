import React, { useState } from "react";
import "./Payment.css";

const Paymrent = () => {
  const [method, setmethods] = useState(0);
  return (
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
            </div>
          ) : null}
        </div>
        <div className="card_payment">
          <button onClick={() => setmethods(1)}>Cash on Devilery </button>
        </div>
      </div>
    </div>
  );
};

export default Paymrent;
