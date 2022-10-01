import React from "react";
import { useAppSelector } from "../../../hooks/reduxHook";
import style from "./navBar.module.scss";
import NavLinks from "../NavLinks/NavLinks";

import { stopPropagation } from "../../../utils/helper";
import { useLocation } from "react-router-dom";

export default function NavBar() {
  const { userState } = useAppSelector((state) => state);
  const location = useLocation();

  if (location.pathname === "/") return null;

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
          <>Hello </>
        )}
      </section>
    </div>
  );
}
