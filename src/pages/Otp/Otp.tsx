import React, { useEffect } from "react";
import OtpForm from "../../components/Otp/OtpForm";
import { setMessage, setStatus } from "../../features/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import style from "./otp.module.scss";

export default function Otp() {
  const { userState } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(setStatus("none"));
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
    <div className={style.otp}>
      <h1>OTP</h1>
      <OtpForm />
      {userState.status === "error" && displayErrorMessage()}
    </div>
  );
}
