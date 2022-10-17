import { UpdateUserData } from "../../../models/User";
import { ChangeEvent } from "react";

export const inputFields = (
  data: UpdateUserData,
  changeValue: (e: ChangeEvent<HTMLInputElement>) => void
) => [
  {
    label: "First Name",
    type: "text",
    name: "first_name",
    value: data.first_name,
    changeValue,
  },
  {
    label: "Last Name",
    type: "text",
    name: "last_name",
    value: data.last_name,
    changeValue,
  },
  {
    label: "Username",
    type: "text",
    name: "username",
    value: data.username,
    changeValue,
  },
  {
    label: "Address",
    type: "text",
    name: "address",
    value: data.address,
    changeValue,
  },
  {
    label: "Date of Birth",
    type: "date",
    name: "dateOfBirth",
    value: data.dateOfBirth,
    changeValue,
  },
];
