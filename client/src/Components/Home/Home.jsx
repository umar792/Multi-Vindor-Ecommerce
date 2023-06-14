import React from "react";
import Hero from "./Hero/Hero";
import UnderHero from "./UnderHero/UnderHero";
import BestDeals from "./BestDeals/BestDeals";
import FeaturedProduct from "../Products/FeaturedProduct/FeaturedProduct";
import Events from "./Events/Events";

const Home = () => {
  return (
    <div>
      <Hero />
      <UnderHero />
      <BestDeals />
      <Events />
      <FeaturedProduct />
    </div>
  );
};

export default Home;
