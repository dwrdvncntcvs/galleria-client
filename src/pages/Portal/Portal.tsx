import React, { useEffect } from "react";
import { Footer } from "../../components/global";
import { Outlet, useNavigate } from "react-router-dom";
import "./portal.scss";
import { MainImage } from "../../components/Portal";
import { useAppSelector } from "../../hooks/reduxHook";
import { useRefreshToken } from "../../hooks/useRefreshToken";

const Portal = () => {
  const { userState } = useAppSelector((state) => state);
  const navigate = useNavigate();
  const refresh = useRefreshToken();

  useEffect(() => {
    const getAccessToken = async () => await refresh();
    getAccessToken();

    if (userState.isAuth) navigate("/home");
  }, [userState.isAuth]);

  return (
    <div className="p__main-container">
      <div className="p__content-container">
        <section>
          <MainImage />
        </section>
        <section>
          <Outlet />
        </section>
      </div>
      <section className="p__footer-container">
        <Footer />
      </section>
    </div>
  );
};

export default Portal;
