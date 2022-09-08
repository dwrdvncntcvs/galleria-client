import React from "react";
import { Link } from "react-router-dom";
import { SignInForm } from "../../components/SignIn";
import "./signIn.scss";

const SignIn = () => {
  return (
    <div className="si__main-container">
      <h1>Sign In</h1>
      <SignInForm />
      <Link to="/sign-up">Doesn't have and account?</Link>
      <Link to="/">Forgot Password</Link>
    </div>
  );
};

export default SignIn;
