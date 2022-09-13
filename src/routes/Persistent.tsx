import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getUserRequest } from "../api/userRequest";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { usePrivateAxios } from "../hooks/usePrivateAxios";
import { useRefreshToken } from "../hooks/useRefreshToken";

export default function RestrictedRoutes() {
  const [isLoading, setIsLoading] = useState(true);
  const { userState } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const privateInstance = usePrivateAxios();

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

    if (userState.accessToken === "") {
      getAccessToken();
    } else {
      dispatch(getUserRequest({ privateInstance }));
      setIsLoading(false);
    }

    // userState.accessToken === "" ? getAccessToken() : setIsLoading(false);
  }, [userState.accessToken]);

  // return <Outlet />;
  return isLoading ? <p>Loading...</p> : <Outlet />;
}
