import React, { PropsWithChildren } from "react";
import style from "./mainPanel.module.scss";

export default function MainPanel({ children }: PropsWithChildren) {
  return <section className={style["main-panel"]}>{children}</section>;
}
