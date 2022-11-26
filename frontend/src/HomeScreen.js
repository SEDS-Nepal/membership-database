import React from "react";

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
      <a href="/membership"><button className="btn btn-light membership-button" >JOIN MEMBERSHIP</button></a>
      </div>
    </div>
  );
};

export default HomeScreen;
