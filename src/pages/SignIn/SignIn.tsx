import React from "react";
import { SignInForm } from "./components";
import "./signIn.scss";

const SignIn = () => {
  return (
    <div className="si__main-container">
      <h1>Sign In</h1>
      <SignInForm  />
    </div>
  );
};

export default SignIn;
