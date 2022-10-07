import React from "react";
import { HiX } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import style from "./closePostButton.module.scss";

export default function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const prevLocation = (location.state as { from: string })?.from;
  const username = (location.state as { username: string })?.username;

  const goBack = () => {
    if (!prevLocation && !username) {
      navigate(-1);
      return;
    }

    if (username) {
      navigate(`/${username}`);
      return;
    }

    navigate(prevLocation);
  };

  return (
    <button id={style["close"]} onClick={goBack}>
      <HiX />
    </button>
  );
}
