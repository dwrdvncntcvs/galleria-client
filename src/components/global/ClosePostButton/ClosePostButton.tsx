import React from "react";
import { HiX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import style from "./closePostButton.module.scss";

export default function BackButton() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <button id={style["close"]} onClick={goBack}>
      <HiX />
    </button>
  );
}
