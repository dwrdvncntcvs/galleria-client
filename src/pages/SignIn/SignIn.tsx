import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { SignInForm } from "../../components/SignIn";
import { setMessage, setStatus } from "../../features/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import "./signIn.scss";

const SignIn = () => {
  const { userState } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(setStatus("none"));
      dispatch(setMessage(""));
    }, 5000);

    return () => {
      dispatch(setStatus("none"));
      dispatch(setMessage(""));
    };
  }, []);

  return (
    <div className="si__main-container">
      {userState.status === "error" && <p>{userState.message}</p>}
      <h1>Sign In</h1>
      <SignInForm />
      <Link to="/sign-up">Doesn't have and account?</Link>
      <Link to="/">Forgot Password</Link>
    </div>
  );
};

export default SignIn;
