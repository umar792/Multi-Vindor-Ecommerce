import React, { useEffect, useState } from "react";
import { UseUserContext } from "../../../ContextAoi/Context/UserContext";
import { useNavigate } from "react-router-dom";
import "./ShippingInfo.css";
import { City, Country, State } from "country-state-city";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ShippingInfoCard = ({ setSelect }) => {
  const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo"));
  const { Authanticated, user } = UseUserContext();
  const [name, setName] = useState(user && user.name && user.name);
  const [userEmail, setUserEmail] = useState(user && user.email && user.email);
  const [Adress, setAdress] = useState(
    shippingInfo && shippingInfo.Adress ? shippingInfo.Adress : ""
  );
  const [city, setCity] = useState(
    shippingInfo && shippingInfo.city ? shippingInfo.city : ""
  );
  const [number, setnumber] = useState(
    shippingInfo && shippingInfo.number ? shippingInfo.number : ""
  );
  const [zipCode, setzipCode] = useState(
    shippingInfo && shippingInfo.zipCode ? shippingInfo.zipCode : ""
  );
  const [countonry, setCountry] = useState(
    shippingInfo && shippingInfo.countonry ? shippingInfo.countonry : ""
  );
  const [countryState, setCountryState] = useState(
    shippingInfo && shippingInfo.countryState ? shippingInfo.countryState : ""
  );

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

  const sendShippingInfo = () => {
    if (
      !city ||
      !name ||
      !userEmail ||
      !Adress ||
      !countonry ||
      !countryState ||
      !zipCode
    ) {
      return toast.error("Plaese fill al fields");
    }
    localStorage.setItem(
      "shippingInfo",
      JSON.stringify({
        name: name,
        email: userEmail,
        Adress: Adress,
        number: number,
        city: city,
        country: countonry,
        state: countryState,
        zipCode: zipCode,
        total: total,
        shippingcharges: shippingcharges,
      })
    );

    setSelect(1);
  };

  return (
    <div className="shippig_info">
      <div className="shipping_info_child">
        <h2>Shipping Information</h2>
        <input
          type="text"
          value={name}
          placeholder="User Name"
          onChange={(e) => setName(e.target.value)}
          required={true}
        />
        <input
          type="text"
          value={userEmail}
          placeholder="Email Adress"
          onChange={(e) => setUserEmail(e.target.value)}
          required={true}
        />
        <input
          type="number"
          required={true}
          placeholder="Please Enter Your Mobile Number"
          value={number}
          onChange={(e) => setnumber(e.target.value)}
        />
        <input
          type="number"
          required={true}
          placeholder="Please Enter zipCode"
          value={zipCode}
          onChange={(e) => setzipCode(e.target.value)}
        />

        <input
          type="text"
          value={Adress}
          placeholder="Your Complete Adress"
          onChange={(e) => setAdress(e.target.value)}
          required={true}
        />

        <div>
          <select
            required
            value={countonry}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">Country</option>
            {Country &&
              Country.getAllCountries().map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>

        {/* -------------------  state */}
        {countonry && (
          <select
            required
            value={countryState}
            onChange={(e) => setCountryState(e.target.value)}
          >
            {State &&
              State.getStatesOfCountry(countonry).map((item) => {
                return (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                );
              })}
          </select>
        )}

        {/* Select City */}
        {countryState && (
          <select
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">City</option>
            {City.getCitiesOfState(countonry, countryState).map((item) => (
              <option key={item.isoCode} value={item.isoCode}>
                {item.name}
              </option>
            ))}
          </select>
        )}
        <button
          className="mt-3 w-full bg-black text-white py-2"
          onClick={sendShippingInfo}
        >
          Continue
        </button>
      </div>
      {/* ------------------------- shipping_cart  */}
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
  );
};

export default ShippingInfoCard;
