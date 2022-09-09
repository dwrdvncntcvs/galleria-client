import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormContainer, TextInput } from "../../components/global";
import { OTP } from "../../models/User";
import { httpService } from "../../services/httpService";

export default function Otp() {
  const [otp, setOtp] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const params = useParams();
  const navigate = useNavigate();

  const submitOtp = async (e: FormEvent) => {
    e.preventDefault();

    const body: OTP = { otp, email: params.email! };

    try {
      await httpService.post<OTP>("/user/verify", body);
      setOtp("");
      navigate("/");
    } catch (e) {
      console.log(e);
      setErrorMsg("OTP Expired");
    }
  };

  return (
    <div>
      <h1>OTP</h1>
      {errorMsg.length > 0 && <p>{errorMsg}</p>}
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
      </FormContainer>
    </div>
  );
}
