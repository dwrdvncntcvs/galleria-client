import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userOtpRequest } from "../../api/userRequest";
import { useAppDispatch } from "../../hooks/reduxHook";
import { ButtonContainer, FormContainer } from "../../layouts";
import { OTP } from "../../models/User";
import { TextInput } from "../global";
import OtpMessage from "./OtpMessage/OtpMessage";

export default function OtpForm() {
  const dispatch = useAppDispatch();
  const [otp, setOtp] = useState<string>("");
  const params = useParams();
  const navigate = useNavigate();

  const submitOtp = async (e: FormEvent) => {
    e.preventDefault();

    const body: OTP = { otp, email: params.email! };

    const response = await dispatch(userOtpRequest(body));

    if (response.meta.requestStatus === "fulfilled") navigate("/");
  };

  const otpInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (/[^0-9]/g.test(e.target.value)) return;
    if (e.target.value.length > 6) return;
    setOtp(e.target.value);
  };

  return (
    <FormContainer onSubmit={submitOtp}>
      <OtpMessage value={params.email} />
      <TextInput
        onChange={otpInputHandler}
        placeholder="Enter Otp"
        type="text"
        value={otp!}
      ></TextInput>
      <ButtonContainer>
        <button type="submit">Submit</button>
      </ButtonContainer>
    </FormContainer>
  );
}
