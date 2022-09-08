import React from "react";
import { Link } from "react-router-dom";
import { SignUpForm } from "../../components/SignUp";
import "./signUp.scss";

const SignUp = () => {
  return (
    <div className="su__main-container">
      <Link to="/">Already have an account?</Link>
      <h1>Sign Up</h1>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
