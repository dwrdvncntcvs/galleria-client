import React from "react";
import { useAppSelector } from "../../../hooks/reduxHook";
import style from "./navBar.module.scss";
import { stopPropagation } from "../../../utils/helper";
import { useLocation, useNavigate } from "react-router-dom";
import { NavLinks } from "..";

export default function NavBar() {
  const { userState } = useAppSelector((state) => state);
  const location = useLocation();
  const navigate = useNavigate();

  const noNavLocations = [
    "/",
    "/sign-up",
    `/${location.pathname.split("/")[1]}/otp`,
  ];

  for (let i = 0; i < noNavLocations.length; i++) {
    console.log(location.pathname === noNavLocations[i]);
    if (location.pathname === noNavLocations[i]) return null;
  }

  const goToSignIn = () => {
    navigate("/");
  };

  const createAccount = () => {
    navigate("/sign-up");
  };

  return (
    <div className={style["nav-container"]}>
      <section className={style["nav-content"]}>
        <section className={style["title-container"]}>
          <h1>Galleria</h1>
        </section>
        {userState.isAuth ? (
          <>
            <input type="text" placeholder="Galleria Search ..." />
            <section
              className={style["nav-btn-group"]}
              onClick={stopPropagation}
            >
              <NavLinks user={userState.userData!} />
            </section>
          </>
        ) : (
          <section className={style["nav-unAuth-btn-group"]}>
            <button onClick={goToSignIn}>Sign In</button>
            <button onClick={createAccount}>Create Account</button>
          </section>
        )}
      </section>
    </div>
  );
}
