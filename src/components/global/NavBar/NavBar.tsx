import React, { MouseEvent } from "react";
import { signOutRequest } from "../../../api/userRequest";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { HiPlus, HiLogout } from "react-icons/hi";
import "./navBar.scss";
import NavLinks from "../NavLinks/NavLinks";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const { userState } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signOutAction = async (e: MouseEvent<HTMLButtonElement>) => {
    await dispatch(signOutRequest());
    navigate("/");
  };

  return userState.isAuth ? (
    <div className="nb__main-container">
      <section className="nb__content-container">
        <section className="nb__title-container">
          <h1>Galleria</h1>
        </section>
        <input type="text" placeholder="Galleria Search ..." />
        <section className="nb__button-group">
          <button onClick={async (e) => await dispatch(signOutRequest())}>
            <HiPlus size={15} />
          </button>
          <NavLinks user={userState.userData!} />
          <button onClick={signOutAction}>
            <HiLogout size={15} />
          </button>
        </section>
      </section>
    </div>
  ) : null;
}
