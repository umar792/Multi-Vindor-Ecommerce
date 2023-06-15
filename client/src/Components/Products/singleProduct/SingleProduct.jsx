import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./SingleProduct.css";

const SingleProduct = () => {
  const { id } = useParams();
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className="single_page">
      <div className="single_image">
        <img
          src="https://i0.wp.com/eccocibd.com/wp-content/uploads/2022/01/1802NL02_1.png?fit=550%2C550&ssl=1"
          alt=""
        />
      </div>
      <div className="single_content">
        <h2>Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour</h2>
        <p className="dicription">
          Product details are a crucial part of any eCommerce website or online
          marketplace. These details help the potential customers to make an
          informed decision about the product they are interested in buying. A
          well-written product description can also be a powerful marketing tool
          that can help to increase sales.Product details typically include
          information about the product's features, specifications, dimensions,
          weight, materials, and other relevant information that can help
          customers to understand the product better. The product details
          section should also include high-quality images and videos of the
          product, as well as customer reviews and ratings.
        </p>
        <p className="my-3 font-bold">Price: $1990</p>
        <button className="count" onClick={decrementCount}>
          -
        </button>
        <span>{count}</span>
        <button className="count" onClick={incrementCount}>
          +
        </button>
        <div className="single_buttons">
          <button>Ad to card</button>
          <button className="mx-[20px] by_single">By Now</button>
        </div>
        {/* ----------- shop name  */}
        <div className="shopname_single">
          <div className="shopname_single_img">
            <img
              src="https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png"
              alt=""
            />
            <p>Shop: Amazone products</p>
          </div>
          <button>Send Message</button>
        </div>
      </div>
      {/* ----------------- product details */}
      <div className="sellere_information"></div>
    </div>
  );
};

export default SingleProduct;
