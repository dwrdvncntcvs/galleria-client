import React, { PropsWithChildren } from "react";
import style from "./stickyPanel.module.scss";

export default function StickyPanel({ children }: PropsWithChildren) {
  return <div className={style["sticky-panel"]}>{children}</div>;
}
