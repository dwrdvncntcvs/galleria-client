import { UserAuth } from "../../../models/User";
import { ChangeEvent } from "react";

export const signInFields = (
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
  data: UserAuth,
  errorMsg: UserAuth,
  toggle: boolean
) => [
  {
    placeholder: "Email",
    type: "email",
    name: "email",
    value: data.email,
    onChange: handleChange,
    error: errorMsg.email,
  },
  {
    placeholder: "Password",
    type: toggle ? "text" : "password",
    name: "password",
    value: data.password,
    onChange: handleChange,

    error: errorMsg.password,
  },
];
