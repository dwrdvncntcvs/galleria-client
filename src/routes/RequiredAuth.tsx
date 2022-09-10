import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHook";

export default function RequiredAuth() {
  const { userState } = useAppSelector((state) => state);

  return userState.isAuth ? <Outlet /> : <Navigate to="/" />;
}
