import { UserRegistration } from "../../../models/User";
import { ChangeEvent } from "react";

export const signUpInputFields = (
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
  data: UserRegistration,
  errorMsg: UserRegistration,
  toggle: boolean,
  handleBlur: (e: ChangeEvent<HTMLInputElement>) => void
) => {
  return [
    {
      placeholder: "First Name",
      name: "first_name",
      type: "text",
      value: data.first_name,
      onChange: handleChange,
      error: errorMsg.first_name,
      onBlur: handleBlur,
    },
    {
      placeholder: "Last Name",
      name: "last_name",
      type: "text",
      value: data.last_name,
      onChange: handleChange,
      error: errorMsg.last_name,
      onBlur: handleBlur,
    },
    {
      placeholder: "Username",
      name: "username",
      type: "text",
      value: data.username,
      onChange: handleChange,
      error: errorMsg.username,
      onBlur: handleBlur,
    },
    {
      placeholder: "Email",
      name: "email",
      type: "email",
      value: data.email,
      onChange: handleChange,
      error: errorMsg.email,
      onBlur: handleBlur,
    },
    {
      placeholder: "Password",
      name: "password",
      type: !toggle ? "password" : "text",
      value: data.password,
      onChange: handleChange,
      error: errorMsg.password,
      onBlur: handleBlur,
    },
    {
      placeholder: "Re-type Password",
      name: "password2",
      type: !toggle ? "password" : "text",
      value: data.password2,
      onChange: handleChange,
      error: errorMsg.password2,
      onBlur: handleBlur,
    },
  ];
};
