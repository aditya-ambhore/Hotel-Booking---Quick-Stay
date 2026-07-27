import React from "react";
import Hero from "../components/Hero";
import FeaturedDestination from "../components/FeaturedDestination";
import ExclusiveOffers from "../components/ExclusiveOffers";
import Stats from "../components/Stats";
import WhyChooseUs from "../components/WhyChooseUs";

const Home = () => {
  return (
    <>
      <Hero />
      <Stats />
      <FeaturedDestination />
      <ExclusiveOffers />
      <WhyChooseUs />
    </>
  );
};

export default Home;
