import React from "react";
import { useAppSelector } from "../../../hooks/reduxHook";
import "./navBar.scss";
import NavLinks from "../NavLinks/NavLinks";

import { stopPropagation } from "../../../utils/helper";
import NavDropdown from "../NavDropdown/NavDropdown";

export default function NavBar() {
  const { userState, toggleState } = useAppSelector((state) => state);

  return userState.isAuth ? (
    <div className="nb__main-container">
      <section className="nb__content-container">
        <section className="nb__title-container">
          <h1>Galleria</h1>
        </section>
        <input type="text" placeholder="Galleria Search ..." />
        <section className="nb__button-group" onClick={stopPropagation}>
          <NavLinks user={userState.userData!} />
        </section>
      </section>
    </div>
  ) : null;
}
