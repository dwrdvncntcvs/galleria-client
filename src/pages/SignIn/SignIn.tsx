import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { SignInForm } from "../../components/SignIn";
import { setMessage, setStatus } from "../../features/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import style from "./signIn.module.scss";

const SignIn = () => {
  const { userState } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(setStatus("none"));
      dispatch(setMessage(""));
    };
  }, []);

  const displayErrorMessage = () => {
    if (userState.status === "error")
      setTimeout(() => {
        dispatch(setStatus("none"));
        dispatch(setMessage(""));
        return;
      }, 5000);

    return <p>{userState.message}</p>;
  };

  return (
    <div className={style["sign-in" ]}>
      {userState.status === "error" && displayErrorMessage()}
      <h1>Sign In</h1>
      <SignInForm />
      <Link to="/sign-up">Doesn't have and account?</Link>
      <Link to="/">Forgot Password</Link>
    </div>
  );
};

export default SignIn;
