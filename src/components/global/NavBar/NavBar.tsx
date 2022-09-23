import React from "react";
import { useAppSelector } from "../../../hooks/reduxHook";
import style from "./navBar.module.scss";
import NavLinks from "../NavLinks/NavLinks";

import { stopPropagation } from "../../../utils/helper";

export default function NavBar() {
  const { userState } = useAppSelector((state) => state);

  return userState.isAuth ? (
    <div className={style["nav-container"]}>
      <section className={style["nav-content"]}>
        <section className={style["title-container"]}>
          <h1>Galleria</h1>
        </section>
        <input type="text" placeholder="Galleria Search ..." />
        <section className={style["nav-btn-group"]} onClick={stopPropagation}>
          <NavLinks user={userState.userData!} />
        </section>
      </section>
    </div>
  ) : null;
}
