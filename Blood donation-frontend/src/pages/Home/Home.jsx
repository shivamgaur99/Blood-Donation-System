import React from "react";
import "./home.css";
import Testimonials from "./components/Testimonials/Testimonials";
import Overview from "./components/Overview/Overview";
import JoinUs from "./components/JoinUs/JoinUs";
import Newsletter from "./components/Newsletter/Newsletter";
import Events from "./components/Events/Events";
import Mission from "./components/Mission/Mission";
import ImpactStats from "./components/ImpactStats/ImpactStats";
import { Carousel } from "./components/Carousel/Carousel";

const Home = () => {
  return (
    <div className="home">
      <Overview/>


      <Mission/>
      
      {/* <Events/> */}

      <JoinUs/>

      {/* <Carousel/> */}

      {/* <ImpactStats/> */}

      <Testimonials/>

      <Newsletter/>
    </div>
  );
};

export default Home;
