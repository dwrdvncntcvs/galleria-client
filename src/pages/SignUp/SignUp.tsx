import React from "react";
import { Link } from "react-router-dom";
import { SignUpForm } from "./components";
import "./signUp.scss";

const SignUp = () => {
  return (
    <div>
      <Link to="/">Forgot Password?</Link>
      <Link to="/">Already have an account?</Link>
      <h1>Sign Up</h1>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
