// components/Home.jsx
import React from "react";
import HeroSection from "./HeroSection";
import WhyWanderlust from "./WhyWanderlust";

const Home = ({ user }) => {
  return (
    <div>
      <HeroSection/>
      <WhyWanderlust/>
    </div>
  );
};

export default Home;
