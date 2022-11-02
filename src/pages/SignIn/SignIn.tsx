import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { SignInForm } from "../../components/SignIn";
import { setMessage, setStatus } from "../../features/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import PortalFormLayout from "../../layout/PortalLayout/PortalFormLayout";
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

  const links: { to: string; label: string }[] = [
    { to: "/sign-up", label: "Doesn't have an account?" },
    { to: "/", label: "Forgot password" },
  ];

  return (
    <PortalFormLayout
      header="Sign In"
      errorMessage={displayErrorMessage()}
      formComponent={<SignInForm />}
      links={links}
    />
  );
};

export default SignIn;
