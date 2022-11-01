import { UserAuth } from "../../../models/User";
import { ChangeEvent, SyntheticEvent } from "react";

export const signInFields = (
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
  data: UserAuth,
  errorMsg: UserAuth,
  toggle: boolean,
  handleBlur: (e: any) => void
) => [
  {
    placeholder: "Email",
    type: "email",
    name: "email",
    value: data.email,
    onChange: handleChange,
    error: errorMsg.email,
    onBlur: handleBlur,
  },
  {
    placeholder: "Password",
    type: toggle ? "text" : "password",
    name: "password",
    value: data.password,
    onChange: handleChange,
    error: errorMsg.password,
    onBlur: handleBlur,
  },
];
