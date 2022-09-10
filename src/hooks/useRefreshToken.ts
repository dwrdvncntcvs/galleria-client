import { instance } from "../config/axios";
import { setAuth } from "../features/userSlice";
import { useAppDispatch } from "./reduxHook";

export const useRefreshToken = () => {
  const dispatch = useAppDispatch();

  const getRefreshToken = async () => {
    const response = await instance.get("/user/refresh");
    const data = response.data;

    dispatch(setAuth({ accessToken: data.accessToken, isAuth: true }));
  };

  return getRefreshToken;
};
