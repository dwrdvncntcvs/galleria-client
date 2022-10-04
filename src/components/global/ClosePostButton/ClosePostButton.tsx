import React from "react";
import { HiX } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import style from "./closePostButton.module.scss";

export default function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const prevLocation = (location.state as { from: string })?.from;

  const goBack = () => {
    if (!prevLocation) {
      navigate(-1);
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
