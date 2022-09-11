import React, { useState, ChangeEvent, FormEvent } from "react";
import { Navigate, Route, useParams } from "react-router-dom";
import { userOtpRequest } from "../../api/userRequest";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { OTP } from "../../models/User";
import { ButtonContainer, FormContainer, TextInput } from "../global";

export default function OtpForm() {
  const { userState } = useAppSelector((state) => state);
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
      <p>
        Good day! We had sent you your one-time-password code that you could
        access on your email.
      </p>
      <p>
        <b>
          <i>{params.email}</i>
        </b>
      </p>
      <p>
        The OTP will be expired after{" "}
        <b>
          <i>5 minutes</i>
        </b>
      </p>
      <TextInput
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (/[^0-9]/g.test(e.target.value)) return;
          if (e.target.value.length > 6) return;
          setOtp(e.target.value);
        }}
        placeholder="Enter Otp"
        type="text"
        value={otp!}
      ></TextInput>
      <ButtonContainer>
        <button type="submit">Submit</button>
      </ButtonContainer>
      {userState.status === "success" && <Navigate to="/" />}
    </FormContainer>
  );
}
