import React from "react";
import { backgroundImage1 } from "../../../assets/images";
import style from "./mainImage.module.scss";

const MainImage = () => {
  return (
    <div className={style["main-image"]}>
      <img src={backgroundImage1} alt="" />
    </div>
  );
};

export default MainImage;
