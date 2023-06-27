import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Events.css";
import CountDown from "./CountDown";
import { AiOutlineDelete } from "react-icons/ai";
import { UseShopContext } from "../../../ContextAoi/Context/ShopContext";
import { useDispatch } from "react-redux";
import {
  OwnerAllEvenstGetFunc,
  deleteEventbyOwner,
} from "../../../redux/actions/OwnerDashboardAction";

const EventCard = ({ data }) => {
  console.log(data);
  const { ShopOwner } = UseShopContext();
  const dispatch = useDispatch();

  const deleteevent = async (id) => {
    await dispatch(deleteEventbyOwner(id));
    dispatch(OwnerAllEvenstGetFunc());
  };
  return (
    <>
      {data ? (
        <div
          className={`w-full block bg-white rounded-lg lg:flex p-2 border-spacing-1 border-gray-400 Event relative`}
        >
          {ShopOwner && data.owner && ShopOwner._id === data.owner._id && (
            <AiOutlineDelete
              onClick={() => deleteevent(data._id)}
              className="text-2xl mb-3 absolute right-[10px] top-[10px] cursor-pointer text-[red]"
            />
          )}{" "}
          <div className="w-full lg:-w[50%] m-auto image_event">
            <img
              style={{ width: "350px", height: "350px", objectFit: "contain" }}
              src={`${data.images && data.images[data.images.length - 1].url}`}
              alt=""
            />
          </div>
          <div className="w-full lg:[w-50%] flex flex-col justify-center">
            <h2 className="my-[10px] font-bold text-[25px] mx-[0px] cursor-pointer">
              {data.name && data.name.slice(0, 70)}....
            </h2>
            <p>{data.description && data.description.slice(0, 500)}.....</p>

            <div className="flex py-2 justify-between">
              <div className="flex">
                <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
                  {data && data.originalPrice ? data.originalPrice + "$" : null}
                </h5>
                <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
                  {data && data.discountPrice}$
                </h5>
              </div>
              <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
                {data.sold_out} sold
              </span>
            </div>
            <div className="timer_parent">
              <p className="t_show">Time Remaning</p>
              <CountDown
                // startDate={data.startDate && data.startDate.slice(0, 10)}
                endDate={data.endDate && data.endDate.slice(0, 10)}
              />
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
      ) : (
        <p className="m-5 bg-[gray] text-white p-5">No Event found</p>
      )}
    </>
  );
};

export default EventCard;
