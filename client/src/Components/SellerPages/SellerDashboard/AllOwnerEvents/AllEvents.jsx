import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OwnerAllEvenstGetFunc } from "../../../../redux/actions/OwnerDashboardAction";
import EventCard from "../../../Home/Events/EventCard";
import Loading from "../../../Loading/Loading";

const AllEvents = () => {
  const dispatch = useDispatch();
  const OwnerAllEvensts = useSelector((state) => state.owner.OwnerAllEvensts);
  const ownerLoading = useSelector((state) => state.owner.ownerLoading);
  useEffect(() => {
    dispatch(OwnerAllEvenstGetFunc());
  }, []);

  return (
    <>
      {ownerLoading ? (
        <Loading />
      ) : OwnerAllEvensts && OwnerAllEvensts.length !== 0 ? (
        OwnerAllEvensts.map((item) => {
          return <EventCard data={item} days={30} key={item._id} />;
        })
      ) : (
        <p className="text-white bg-[gray] p-4 m-3">No Evenet found</p>
      )}
    </>
  );
};

export default AllEvents;
