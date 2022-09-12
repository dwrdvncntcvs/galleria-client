import { privateInstance } from "../config/axios";
import { useEffect } from "react";
import { useRefreshToken } from "./useRefreshToken";
import { useAppSelector } from "./reduxHook";

export const usePrivateAxios = () => {
  const refresh = useRefreshToken();
  const { isAuth, accessToken } = useAppSelector((state) => state.userState);

  useEffect(() => {
    const reqInterceptor = privateInstance.interceptors.request.use(
      (config) => {
        if (!config?.headers?.Authorization) {
          config.headers = { Authorization: `Bearer ${accessToken}` };
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const resInterceptor = privateInstance.interceptors.response.use(
      (response) => response,
      async (err) => {
        const previousReq = err?.config;

        if (err.response.status === 403 && !previousReq?.sent) {
          previousReq.sent = true;
          const newAccessToken = await refresh();
          previousReq.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return privateInstance(previousReq);
        }
        return Promise.reject(err);
      }
    );

    return () => {
      privateInstance.interceptors.request.eject(reqInterceptor);
      privateInstance.interceptors.response.eject(resInterceptor);
    };
  }, [isAuth, refresh]);

  return privateInstance;
};
