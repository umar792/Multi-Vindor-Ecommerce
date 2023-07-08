import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import "./SingleProduct.css";
import SugestedPrpducts from "../SuggestProducts/SugestedPrpducts";
import ProductMoreInfo from "../singleProduct/ProductMoreInfo.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getSingleEvent, getSingleProduct } from "../../../redux/actions/OwnerDashboardAction";
import { addTocart } from "../../../redux/actions/CartAction";
import { toast } from "react-toastify";
import Loading from "../../Loading/Loading";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const singleProduct = useSelector((state) => state.owner.singleProduct);
  const ownerLoading = useSelector((state) => state.owner.ownerLoading);
  const { id } = useParams();
  const [count, setCount] = useState(1);
  const [iamge, setImage] = useState(
    singleProduct &&
      singleProduct.images &&
      singleProduct.images[singleProduct.images.length - 1].url
  );

  useEffect(() => {
    dispatch(getSingleProduct(id));
    dispatch(getSingleEvent(id));
  }, [id]);
  useEffect(() => {
    if (
      singleProduct &&
      singleProduct.images &&
      singleProduct.images.length > 0
    ) {
      setImage(singleProduct.images[singleProduct.images.length - 1].url);
    }
  }, [singleProduct]);
  const incrementCount = () => {
    if (singleProduct.stock > count) {
      setCount(count + 1);
      const quantity = count + 1;
      const alldata = { ...singleProduct, quantity };
      dispatch(addTocart(alldata));
    } else {
      setCount(singleProduct.stock);
    }
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
      const quantity = count - 1;
      const alldata = { ...singleProduct, quantity };
      dispatch(addTocart(alldata));
    }
  };

  const additemTocard = (i) => {
    const quantity = count;
    const alldata = { ...i, quantity };
    dispatch(addTocart(alldata));
    toast.success("Product add to card successfuly");
  };

  return (
    <>
      {ownerLoading ? (
        <Loading />
      ) : (
        <>
          <div className="single_page">
            <div className="single_image">
              <img src={iamge} alt="" />
              <div className="other_images flex justify-center align-middle">
                {singleProduct &&
                  singleProduct.images &&
                  singleProduct.images.map((item) => {
                    return (
                      <img
                        src={item && item.url}
                        onClick={() => setImage(item && item.url)}
                      />
                    );
                  })}
              </div>
            </div>
            <div className="single_content">
              <h2>{singleProduct && singleProduct.name}</h2>
              <p className="dicription">
                {singleProduct && singleProduct.description.slice(0, 700)}....
              </p>
              <p className="my-3 font-bold">Price: $1990</p>
              {singleProduct && singleProduct.stock !== 0 ? (
                <p className="my-3 font-bold text-[green]">
                  inStock: {singleProduct && singleProduct.stock}
                </p>
              ) : (
                <p className="my-3 font-bold text-[red]">Out of stock</p>
              )}
              <button className="count" onClick={decrementCount}>
                -
              </button>
              <span>{count}</span>
              <button className="count" onClick={incrementCount}>
                +
              </button>
              {singleProduct && singleProduct.stock !== 0 ? (
                <div className="single_buttons">
                  <button onClick={() => additemTocard(singleProduct)}>
                    Ad to card
                  </button>
                  <button className="mx-[20px] by_single">By Now</button>
                </div>
              ) : (
                <div className="single_buttons">
                  <button className="opacity-5 pointer-events-none ">
                    Ad to card
                  </button>
                  <button className="mx-[20px] by_single pointer-events-none opacity-5">
                    Buy Now
                  </button>
                </div>
              )}

              {/* ----------- shop name  */}
              <div className="shopname_single">
                <NavLink
                  to={`/shop/${
                    singleProduct &&
                    singleProduct.owner &&
                    singleProduct.owner._id
                  }`}
                >
                  <div className="shopname_single_img">
                    <img
                      src={
                        singleProduct &&
                        singleProduct.owner &&
                        singleProduct.owner.avatar.url
                      }
                      alt=""
                    />
                    <p>
                      Shop:{" "}
                      {singleProduct &&
                        singleProduct.owner.shopName &&
                        singleProduct.owner.shopName}
                    </p>
                  </div>
                </NavLink>
                <button>Send Message</button>
              </div>
            </div>

            {/* ----------------- product details */}
            <div className="sellere_information"></div>
          </div>
          {/* --------------- product more info  */}
          {singleProduct ? (
            <ProductMoreInfo data={singleProduct && singleProduct} />
          ) : null}
          {singleProduct ? (
            <SugestedPrpducts data={singleProduct && singleProduct.category} />
          ) : null}
        </>
      )}
    </>
  );
};

export default SingleProduct;
