import { useLocation, useNavigate } from "react-router-dom";
import { instance } from "../config/axios";
import { setAuth } from "../features/userSlice";
import { useAppDispatch } from "./reduxHook";

export const useRefreshToken = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const getRefreshToken = async () => {
    try {
      const response = await instance.get("/user/refresh");
      const data = response.data;

      dispatch(setAuth({ accessToken: data.accessToken, isAuth: true }));
    } catch (e: any) {
      if (e.response.status === 403)
        navigate("/", { replace: true, state: { from: location.pathname } });
    }
  };

  return getRefreshToken;
};
