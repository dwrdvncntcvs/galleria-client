import React from "react";
import { useNavigate } from "react-router-dom";
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

  const goToHome = () => {
    navigate(homePath);
  };

  return (
    <h1 className={`${style.title} ${style[titleColor]}`} onClick={goToHome}>
      Galleria
    </h1>
  );
}
