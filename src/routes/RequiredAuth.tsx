import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUserRequest } from "../api/userRequest";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { usePrivateAxios } from "../hooks/usePrivateAxios";

export default function RequiredAuth() {
  const { userState } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const privateInstance = usePrivateAxios();

  useEffect(() => {
    const getUser = async () => {
      console.log("Getting User");
      await dispatch(getUserRequest({ privateInstance }));
    };

    if (userState.accessToken !== "") {
      console.log("Getting user");
      getUser();
    }
  }, []);

  return userState.isAuth ? <Outlet /> : <Navigate to="/" />;
}
