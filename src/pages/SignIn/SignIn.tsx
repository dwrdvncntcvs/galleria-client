import React from "react";
import { SignInForm } from "../../components/SignIn";
import "./signIn.scss";

const SignIn = () => {
  return (
    <div className="si__main-container">
      <SignInForm />
    </div>
  );
};

export default SignIn;
