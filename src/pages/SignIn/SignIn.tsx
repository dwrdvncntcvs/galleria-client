import React from "react";
import { Link } from "react-router-dom";
import { SignInForm } from "../../components/SignIn";
import { useAppSelector } from "../../hooks/reduxHook";
import "./signIn.scss";

const SignIn = () => {
  const { userState } = useAppSelector((state) => state);

  return (
    <div className="si__main-container">
      {userState.isAuth ? <p>Authenticated</p> : <p>Not Authenticated</p>}
      <h1>Sign In</h1>
      <SignInForm />
      <Link to="/sign-up">Doesn't have and account?</Link>
      <Link to="/">Forgot Password</Link>
    </div>
  );
};

export default SignIn;
