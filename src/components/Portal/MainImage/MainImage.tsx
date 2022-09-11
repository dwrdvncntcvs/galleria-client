import React from "react";
import { backgroundImage1 } from "../../../assets/images";
import "./mainImage.scss";

const MainImage = () => {
  return (
    <div className="mi__main-container">
      <img src={backgroundImage1} alt="" />
    </div>
  );
};

export default MainImage;
