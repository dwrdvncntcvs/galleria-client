import React from "react";
import { Footer } from "../../components";
import { MainImage, SignIn, SignUp } from "./components";
import "./portal.scss";

const Portal = () => {
  return (
    <div>
      <MainImage />
      <SignIn />
      <SignUp />
      <Footer />
    </div>
  );
};

export default Portal;
