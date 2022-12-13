import React from "react";
import { Link } from "react-router-dom";
const HomeScreen = () => {
  return (
    <div className="container-1">
      <img
      
        className="home-img"
        src="homeSpace.jpg"
        width="100%"
        alt="SpaceRealm"
      />
      <div className="box-caption">
      <h3 className="home-text">
        I don’t believe in astrology; I’m a Sagittarius and we’re skeptical.
      </h3>
      <Link to="/membership"><button className="btn btn-light membership-button" >JOIN MEMBERSHIP</button></Link>
      </div>
    </div>
  );
};

export default HomeScreen;
