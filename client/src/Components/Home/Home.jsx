import React from "react";
import { UseUserContext } from "../../ContextAoi/Context/UserContext";
import Hero from "./Hero/Hero";
import UnderHero from "./UnderHero/UnderHero";
import BestDeals from "./BestDeals/BestDeals";

const Home = () => {
  return <div>

    <Hero/>
   <UnderHero/>
   <BestDeals/>
  </div>;
};

export default Home;
