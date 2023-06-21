import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Events.css";

const EventCard = ({ data, days }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [futureDate, setFutureDate] = useState(null);
  useEffect(() => {
    calculateFutureDate();
  }, []);

  const calculateFutureDate = () => {
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + days);
    setFutureDate(futureDate);
  };
  const calculateTimeLeft = () => {
    const difference = +futureDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });
  return (
    <div
      className={`w-full block bg-white rounded-lg lg:flex p-2 border-spacing-1 border-gray-400`}
    >
      <div className="w-full lg:-w[50%] m-auto">
        <img src={`${data.image_Url && data.image_Url[0].url}`} alt="" />
      </div>
      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        <h2 className="my-[10px] font-bold text-[25px] mx-[0px] cursor-pointer">
          {data.name}
        </h2>
        <p>{data.description}</p>

        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {data.price ? data.price + "$" : null}
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {data.discount_price}$
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {data.total_sell} sold
          </span>
        </div>
        {/* <CountDown data={data} /> */}
        <div className="timer_parent">
          <p className="t_show">Time Remaning</p>
          <div className="timer">
            <p className="timer_edit">{timeLeft.days} days</p>{" "}
            <p className="timer_edit">{timeLeft.hours} hours</p>
            <p className="timer_edit"> {timeLeft.minutes} minutes</p>
            <p className="timer_edit">{timeLeft.seconds} seconds</p>
          </div>
        </div>
        <br />
        <div className="flex items-center">
          <Link to={`/product/${data._id}?isEvent=true`}>
            <div className={` text-[#fff]`}>See Details</div>
          </Link>
          <div
            className={` text-[#fff] ml-5`}
            // onClick={() => addToCartHandler(data)}
          >
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
