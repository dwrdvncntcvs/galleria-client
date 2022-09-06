import React from "react";
import { Footer } from "../../components";
import { MainImage, SignIn, SignUp } from "./components";

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
