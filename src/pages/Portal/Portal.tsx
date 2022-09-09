import React, { useEffect } from "react";
import { Footer } from "../../components/global";
import { Outlet, useNavigate } from "react-router-dom";
import "./portal.scss";
import { MainImage } from "../../components/Portal";
import { httpService } from "../../services/httpService";

const Portal = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getAccessToken = async () => {
      const response = await httpService.get("/user/refresh");
      if (response.accessToken! !== "") navigate("/home");
      return response;
    };
    getAccessToken();
  }, []);

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
