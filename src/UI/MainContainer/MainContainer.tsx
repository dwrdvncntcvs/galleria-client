import React, { PropsWithChildren } from "react";
import style from "./mainContainer.module.scss";

export default function MainContainer({ children }: PropsWithChildren) {
  return <div className={style["main-container"]}>{children}</div>;
}
