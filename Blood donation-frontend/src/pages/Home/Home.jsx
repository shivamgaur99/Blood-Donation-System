import React from "react";
import "./home.css";
import Testimonials from "./components/Testimonials/Testimonials";
import Overview from "./components/Overview/Overview";
import JoinUs from "./components/JoinUs/JoinUs";
import GetInvolved from "./components/GetInvolved/GetInvolved";
import Newsletter from "./components/Newsletter/Newsletter";
import Events from "./components/Events/Events";
import Mission from "./components/Mission/Mission";
import ImpactStats from "./components/ImpactStats/ImpactStats";

const Home = () => {
  return (
    <div className="home">
      <Overview/>


      <Mission/>
      
      <Events/>

      <JoinUs/>



      {/* <ImpactStats/> */}

      <Testimonials/>


      {/* <GetInvolved/> */}

      <Newsletter/>
    </div>
  );
};

export default Home;
