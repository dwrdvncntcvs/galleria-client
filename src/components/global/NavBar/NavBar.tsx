import React from "react";
import { useAppSelector } from "../../../hooks/reduxHook";
import "./navBar.scss";

export default function NavBar() {
  const { userState } = useAppSelector((state) => state);

  return userState.isAuth ? <div>NavBar</div> : null;
}
