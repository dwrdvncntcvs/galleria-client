import React from "react";
import { Link } from "react-router-dom";
import { SignUpForm } from "../../components/SignUp";
import "./signUp.scss";

const SignUp = () => {
  return (
    <div className="su__main-container">
      <h1>Sign Up</h1>
      <SignUpForm />
      <Link to="/">Already have an account?</Link>
    </div>
  );
};

export default SignUp;
