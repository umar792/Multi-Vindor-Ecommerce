import React, { useEffect } from "react";
import "./OwnerAllProducts.css";
import { useDispatch, useSelector } from "react-redux";
import { OwnerAllProductsGetFunc } from "../../../../redux/actions/OwnerDashboardAction";
import DashboardAllProductView from "../DashboardAllProductView/DashboardAllProductView";
import Loading from "../../../Loading/Loading";

const OwnerAllProducts = ({ select, setSelect }) => {
  const dispatch = useDispatch();

  const OwnerAllProducts = useSelector((state) => state.owner.OwnerAllProducts);
  const ownerLoading = useSelector((state) => state.owner.ownerLoading);
  // console.log(OwnerAllProducts);

  useEffect(() => {
    dispatch(OwnerAllProductsGetFunc());
  }, []);

  return (
    <>
      {ownerLoading ? (
        <Loading />
      ) : (
        <div className="OwnerAllProducts">
          <h1
            style={{ textAlign: "center" }}
            className="m-4 text-3xl font-bold"
          >
            Total Products : {OwnerAllProducts && OwnerAllProducts.length}
          </h1>
          <div className="">
            {OwnerAllProducts && OwnerAllProducts.length > 0 ? (
              <DashboardAllProductView
                data={OwnerAllProducts}
                select={select}
                setSelect={setSelect}
              />
            ) : (
              <p className="text-white bg-[gray] p-4 m-3">
                You have no products
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default OwnerAllProducts;
