import React from "react";
import EventCard from "./EventCard";
import { productData } from "../../../DataStatic/Data";

const Events = () => {
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
          {EventProduct.length !== 0 && (
            <EventCard data={EventProduct && EventProduct[0]} />
          )}
          <h4>{EventProduct?.length === 0 && "No Events have!"}</h4>
        </div>
      </div>
    </div>
  );
};

export default Events;
