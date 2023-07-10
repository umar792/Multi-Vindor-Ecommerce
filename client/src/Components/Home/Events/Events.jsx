import React, { useEffect } from "react";
import EventCard from "./EventCard";
import { productData } from "../../../DataStatic/Data";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../../../redux/actions/OwnerDashboardAction";

const Events = () => {
  const AllEventsData = useSelector((state) => state.owner.AllEventsData);
  const productWithMostSales =
    AllEventsData &&
    AllEventsData &&
    AllEventsData.reduce((maxSalesProduct, currentProduct) => {
      if (currentProduct.soldOut > maxSalesProduct.soldOut) {
        return currentProduct;
      } else {
        return maxSalesProduct;
      }
    });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEvents());
  }, []);
  return (
    <div>
      <div>
        <div>
          <h1 className="my-3 font-bold text-[30px] mx-[20px]">
            Popular Events
          </h1>
        </div>

        <div className="w-full grid">
          {/* {AllEventsData && AllEventsData.length !== 0 && ( */}
          <EventCard data={productWithMostSales} />
          {/* )} */}
          {/* <h4>{AllEventsData?.length === 0 && "No Events have!"}</h4> */}
        </div>
      </div>
    </div>
  );
};

export default Events;
