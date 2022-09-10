import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { SignUpForm } from "../../components/SignUp";
import { setMessage, setStatus } from "../../features/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import "./signUp.scss";

const SignUp = () => {
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
    <div className="su__main-container">
      {userState.status === "error" && <p>{userState.message}</p>}
      <h1>Sign Up</h1>
      <SignUpForm />
      <Link to="/">Already have an account?</Link>
    </div>
  );
};

export default SignUp;
