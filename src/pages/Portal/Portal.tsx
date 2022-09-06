import React from "react";
import { Footer } from "../../components";
import { MainImage } from "./components";
import { Outlet } from "react-router-dom";
import "./portal.scss";

const Portal = () => {
  return (
    <div className="p__main-container">
      <div className="p__content-container">
        <section>
          <MainImage />
        </section>
        <section>
          <Outlet />
        </section>
      </div>
      <section className="p__footer-container">
        <Footer />
      </section>
    </div>
  );
};

export default Portal;
