import React, { useEffect, useState } from "react";
import { UseUserContext } from "../../../ContextAoi/Context/UserContext";
import { useNavigate } from "react-router-dom";
import "./ShippingInfo.css";
import { Country, State } from "country-state-city";

const ShippingInfo = () => {
  const { Authanticated, user } = UseUserContext();
  const [name, setName] = useState(user && user.name && user.name);
  const [userEmail, setUserEmail] = useState(user && user.email && user.email);
  const [city, setCity] = useState("");
  const [number, setnumber] = useState();
  const [zipCode, setzipCode] = useState();
  const [countonrysate, setCountrySate] = useState("Chose Country");
  const [countryState, setCountryState] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (!Authanticated) {
      navigate("/login");
    }
  }, []);

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
          type="text"
          required={true}
          placeholder="Please Enter Your City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
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

        <select
          value={countonrysate}
          required
          onChange={(e) => setCountryState(e.target.value)}
        >
          {/* <option value="">chose Country</option> */}
          {Country &&
            Country.getAllCountries().map((item) => {
              return (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              );
            })}
        </select>

        {/* -------------------  */}
        {countonrysate && (
          <select
            required
            value={countryState}
            onChange={(e) => setCountrySate(e.target.value)}
          >
            {State &&
              State.getStatesOfCountry(countonrysate).map((item) => {
                return (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                );
              })}
          </select>
        )}
      </div>
      {/* ------------------------- shipping_cart  */}
      <div className="shipping_cart_info"></div>
    </div>
  );
};

export default ShippingInfo;
