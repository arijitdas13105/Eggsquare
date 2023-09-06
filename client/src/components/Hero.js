import React from "react";
import "./Hero.css";
import { files } from "./Files";

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-left">
        <div>
          <h1>egg that stand out</h1>
        </div>
        <div>
          <span>Nutrition that empowers you</span>
        </div>
      </div>
      <div className="video-container">
        <video autoPlay loop muted>
          <source src={files.video1} type="video/mp4" autoplay />
        </video>
      </div>
    </div>
  );
};

export default Hero;
