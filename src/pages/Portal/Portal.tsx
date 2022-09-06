import React from "react";
import { Footer } from "../../components";
import { MainImage } from "./components";
import { Outlet } from "react-router-dom";
import "./portal.scss";

const Portal = () => {
  return (
    <div>
      <MainImage />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Portal;
