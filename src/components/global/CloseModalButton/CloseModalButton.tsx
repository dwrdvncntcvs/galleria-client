import React from "react";
import { HiX } from "react-icons/hi";
import { closeModal } from "../../../features/modalSlice";
import { useAppDispatch } from "../../../hooks/reduxHook";
import style from "./closeModalButton.module.scss";

export default function CloseModalButton() {
  const dispatch = useAppDispatch();

  const goBack = () => {
    dispatch(closeModal());
  };

  return (
    <button id={style["close"]} onClick={goBack}>
      <HiX />
    </button>
  );
}
