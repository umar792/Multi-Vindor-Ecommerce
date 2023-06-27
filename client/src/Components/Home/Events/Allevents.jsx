import React from "react";
import { productData } from "../../../DataStatic/Data";
import EventCard from "./EventCard";
import { useSelector } from "react-redux";
const Allevents = () => {
  // const EventProduct = productData.filter((item) => {
  //   return item.Event === true;
  // });

  const AllEventsData = useSelector((state) => state.owner.AllEventsData);

  return (
    <div>
      <div>
        <div>
          <h1 className="my-3 font-bold text-[30px] mx-[20px]">
            Popular Events
          </h1>
        </div>

        <div className="w-full grid">
          {AllEventsData &&
            AllEventsData.length !== 0 &&
            AllEventsData &&
            AllEventsData.map((item) => {
              return <EventCard data={item} days={30} />;
            })}
          <h4>
            {AllEventsData && AllEventsData?.length === 0 && "No Events have!"}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Allevents;
