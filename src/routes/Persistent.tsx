import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHook";
import { useRefreshToken } from "../hooks/useRefreshToken";

export default function RestrictedRoutes() {
  const [isLoading, setIsLoading] = useState(true);
  const { userState } = useAppSelector((state) => state);

  const refresh = useRefreshToken();

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    userState.accessToken === "" ? getAccessToken() : setIsLoading(false);
  }, [userState]);

  // return <Outlet />;
  return isLoading ? <p>Loading...</p> : <Outlet />;
}
