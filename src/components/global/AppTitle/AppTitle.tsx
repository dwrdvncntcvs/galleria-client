import React from "react";
import style from "./appTitle.module.scss";

interface AppTitleProps {
  titleColor?: "white" | "default";
}

export default function AppTitle({ titleColor = "default" }: AppTitleProps) {
  return <h1 className={`${style.title} ${style[titleColor]}`}>Galleria</h1>;
}
