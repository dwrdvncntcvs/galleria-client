import React from "react";
import { UserProfile } from "../../../models/User";
import style from "./emptyPeopleMessage.module.scss";

interface EmptyPeopleMessageProps {
  users: UserProfile[];
  message: string;
}

export default function EmptyPeopleMessage({
  users,
  message,
}: EmptyPeopleMessageProps) {
  return users.length < 1 ? <div>{message}</div> : null;
}
