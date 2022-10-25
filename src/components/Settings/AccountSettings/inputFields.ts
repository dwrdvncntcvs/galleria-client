import { ChangeEvent } from "react";
import { HiAtSymbol, HiPhone, HiUser } from "react-icons/hi";
import { IconType } from "react-icons/lib";

type InputField = {
  Icon: IconType;
  type: string;
  label: string;
  name: string;
  value: string;
  changeAction: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
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
    Icon: HiUser,
    label: "Username",
    name: "username",
    type: "text",
    value: data.username,
    changeAction: changeHandler,
    disabled: false,
  },
  {
    Icon: HiPhone,
    label: "Contact Number",
    name: "contact_number",
    type: "text",
    value: data.contact_number,
    changeAction: changeHandler,
    disabled: false,
  },
  {
    Icon: HiAtSymbol,
    label: "Email Address",
    name: "email",
    type: "text",
    value: data.email,
    changeAction: changeHandler,
    disabled: true,
  },
];
