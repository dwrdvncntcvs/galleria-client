import React from "react";
import { useNavigate } from "react-router-dom";
import { resetPostState } from "../../../features/postSlice";
import { useAppDispatch } from "../../../hooks/reduxHook";
import style from "./appTitle.module.scss";

interface AppTitleProps {
  titleColor?: "white" | "default";
  homePath?: string;
}

export default function AppTitle({
  titleColor = "default",
  homePath = "/",
}: AppTitleProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const goToHome = () => {
    dispatch(resetPostState())
    navigate(homePath);
  };

  return (
    <h1 className={`${style.title} ${style[titleColor]}`} onClick={goToHome}>
      Galleria
    </h1>
  );
}
