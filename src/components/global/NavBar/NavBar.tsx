import React from "react";
import { signOutRequest } from "../../../api/userRequest";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { BsDoorOpenFill, BsPlusLg } from "react-icons/bs";
import "./navBar.scss";
import NavLinks from "../NavLinks/NavLinks";

export default function NavBar() {
  const { userState } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  return userState.isAuth ? (
    <div className="nb__main-container">
      <section className="nb__content-container">
        <section className="nb__title-container">
          <h1>Galleria</h1>
        </section>
        <input type="text" placeholder="Galleria Search ..." />
        <section className="nb__button-group">
          <button onClick={async (e) => await dispatch(signOutRequest())}>
            <BsPlusLg size={15} />
          </button>
          <NavLinks user={userState.userData!} />
          <button onClick={async (e) => await dispatch(signOutRequest())}>
            <BsDoorOpenFill size={15} />
          </button>
        </section>
      </section>
    </div>
  ) : null;
}
