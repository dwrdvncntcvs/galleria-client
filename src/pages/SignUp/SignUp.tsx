import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { SignUpForm } from "../../components/SignUp";
import { setMessage, setStatus } from "../../features/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import PortalFormLayout from "../../layout/PortalLayout/PortalFormLayout";
import style from "./signUp.module.scss";

const SignUp = () => {
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

  const links: { to: string; label: string }[] = [
    { to: "/", label: "Already have an account?" },
  ];

  return (
    <PortalFormLayout
      errorMessage={userState.status === "error" ? displayErrorMessage() : null}
      formComponent={<SignUpForm />}
      header="Sign Up"
      links={links}
    />
  );
};

export default SignUp;
