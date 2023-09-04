import React from "react";
import HeroSection from "./components/HeroSection";
import Services from "./components/Services";
import Trusted from "./components/Trusted";

function Home() {
  const data = {
    name: "Fasih Store",
  };
  return (
    <>
      <HeroSection data={data} />
      <Services />
      <Trusted />
    </>
  );
}

export default Home;
