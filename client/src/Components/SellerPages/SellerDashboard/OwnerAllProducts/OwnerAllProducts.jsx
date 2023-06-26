import React, { useEffect, useState } from "react";
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

  // const [currentPage, setCurrentPage] = useState(1);
  // const productPerPage = 4; // 5 - 2
  // const lastIndex = currentPage * productPerPage;
  // const firstIndex = lastIndex - productPerPage;
  // const products =
  //   OwnerAllProducts && OwnerAllProducts.slice(firstIndex, lastIndex);
  // const numberOfPage = Math.ceil(
  //   OwnerAllProducts && OwnerAllProducts.length / productPerPage
  // );
  // const numbers = [...Array(numberOfPage + 1).keys()].slice(1);

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
              <>
                <DashboardAllProductView
                  data={OwnerAllProducts}
                  select={select}
                  setSelect={setSelect}
                />
                {/* // ----------------  */}

                {/* <div className="flex justify-center align-middle m-4 flex-wrap">
                  {numbers.map((item, index) => {
                    return (
                      <div key={index}>
                        <ul className="flex justify-center align-middle">
                          <li
                            onClick={() => setCurrentPage(index + 1)}
                            style={{
                              border: "1px solid gray",
                              padding: "5px 10px",
                              margin: "2px 5px",
                              cursor: "pointer",
                            }}
                          >
                            {item}
                          </li>
                        </ul>
                      </div>
                    );
                  })}
                </div> */}
              </>
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
