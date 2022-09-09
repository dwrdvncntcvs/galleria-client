import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHook";
import { useRefreshToken } from "../hooks/useRefreshToken";

export default function RestrictedRoutes() {
  const { userState } = useAppSelector((state) => state);

  const refresh = useRefreshToken();

  useEffect(() => {
    const getAccessToken = async () => {
      await refresh();
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
