import React, { useState, ChangeEvent, FormEvent } from "react";
import { Navigate, useParams } from "react-router-dom";
import { userOtpRequest } from "../../api/userRequest";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { OTP } from "../../models/User";
import { FormContainer, TextInput } from "../global";

export default function OtpForm() {
    const {userState} = useAppSelector(state => state)
  const dispatch = useAppDispatch();
  const [otp, setOtp] = useState<string>("");
  const params = useParams();

  const submitOtp = async (e: FormEvent) => {
    e.preventDefault();

    const body: OTP = { otp, email: params.email! };

    await dispatch(userOtpRequest(body));
  };

  return (
    <FormContainer onSubmit={submitOtp}>
      <TextInput
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (/[^0-9]/g.test(e.target.value)) return;
          setOtp(e.target.value);
        }}
        placeholder="Enter Otp"
        type="text"
        value={otp!}
      ></TextInput>
      <button type="submit">Submit</button>
      {userState.status === "success" && <Navigate to="/" />}
    </FormContainer>
  );
}
