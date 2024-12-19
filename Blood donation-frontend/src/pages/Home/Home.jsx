import React from "react";
import Testimonials from "./components/Testimonials/Testimonials";
import Overview from "./components/Overview/Overview";
import JoinUs from "./components/JoinUs/JoinUs";
import Newsletter from "./components/Newsletter/Newsletter";
import Mission from "./components/Mission/Mission";
import ImpactStats from "./components/ImpactStats/ImpactStats";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import GetInvolved from "../GetInvolved/GetInvolved";

const Home = ({ theme }) => {
  return (
    <div className="home">
      {/* <Carousel theme={theme}/> */}
      <Overview theme={theme}/>
      <Mission theme={theme}/>
      <GetInvolved theme={theme}/>
      <HowItWorks theme={theme}/>
      <ImpactStats theme={theme}/>
      <Testimonials theme={theme}/>
      <JoinUs theme={theme}/>
      <Newsletter theme={theme}/>
    </div>
  );
};

export default Home;
