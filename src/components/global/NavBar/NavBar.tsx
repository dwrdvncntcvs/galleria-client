import React from "react";
import { signOutRequest } from "../../../api/userRequest";
import { appIcon } from "../../../assets/icons";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { BsBoxArrowRight } from "react-icons/bs";
import "./navBar.scss";

export default function NavBar() {
  const { userState } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  return userState.isAuth ? (
    <div className="nb__main-container">
      <section className="nb__content-container">
        <section className="nb__title-container">
          <img
            style={{ objectFit: "contain", height: "100%" }}
            src={appIcon}
            alt=""
          />
          <input type="text" placeholder="Galleria" />
        </section>
        <nav></nav>
        <section className="nb__button-group">
          <button onClick={async (e) => await dispatch(signOutRequest())}>
            <BsBoxArrowRight />
          </button>
        </section>
      </section>
    </div>
  ) : null;
}
