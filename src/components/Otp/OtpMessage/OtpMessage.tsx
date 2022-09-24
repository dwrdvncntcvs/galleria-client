import React from "react";
import style from "./otpMessage.module.scss";

interface OtpMessageProps {
  value?: string | number;
}

export default function OtpMessage({ value }: OtpMessageProps) {
  return (
    <>
      <p>
        Good day! We had sent you your one-time-password code that you could
        access on your email.
      </p>
      <p>
        <b>
          <i>{value}</i>
        </b>
      </p>
      <p>
        The OTP will be expired after{" "}
        <b>
          <i>5 minutes</i>
        </b>
      </p>
    </>
  );
}
