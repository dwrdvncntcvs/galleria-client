import React, { PropsWithChildren } from "react";
import style from "./sidePanel.module.scss";

export default function SidePanel({ children }: PropsWithChildren) {
  return <section className={style["side-panel"]}>{children}</section>;
}
