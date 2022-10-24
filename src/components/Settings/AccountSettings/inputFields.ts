import { ChangeEvent } from "react";

type InputField = {
  type: string;
  label: string;
  name: string;
  value: string;
  changeAction: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const inputFields = (
  data: {
    username: string;
    contact_number: string;
    email: string;
  },
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void
): InputField[] => [
  {
    label: "Username",
    name: "username",
    type: "text",
    value: data.username,
    changeAction: changeHandler,
  },
  {
    label: "Contact Number",
    name: "contact_number",
    type: "text",
    value: data.contact_number,
    changeAction: changeHandler,
  },
  {
    label: "Email Address",
    name: "email",
    type: "text",
    value: data.email,
    changeAction: changeHandler,
  },
];
