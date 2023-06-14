import React from "react";
import { productData } from "../../../DataStatic/Data";
import EventCard from "./EventCard";
const Allevents = () => {
  const EventProduct = productData.filter((item) => {
    return item.Event === true;
  });
  return (
    <div>
      <div>
        <div>
          <h1 className="my-3 font-bold text-[30px] mx-[20px]">
            Popular Events
          </h1>
        </div>

        <div className="w-full grid">
          {EventProduct.length !== 0 &&
            EventProduct.map((item) => {
              return <EventCard data={item} />;
            })}
          <h4>{EventProduct?.length === 0 && "No Events have!"}</h4>
        </div>
      </div>
    </div>
  );
};

export default Allevents;
