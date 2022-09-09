import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { instance } from "../config/axios";
import { setAuth } from "../features/userSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";

export default function RestrictedRoutes() {
  const { userState } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const response = await instance.get("/user/refresh");
        const data = response.data;

        dispatch(setAuth({ accessToken: data.accessToken, isAuth: true }));
      } catch (e: any) {
        if (e.response.status === 403) navigate("/");
      }
    };

    if (userState.accessToken === "") getAccessToken();
  }, []);

  // return <Outlet />;
  return userState.isAuth ? (
    <>
      <Outlet />
    </>
  ) : (
    <p>Loading...</p>
  );
}
