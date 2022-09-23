import React, { PropsWithChildren } from "react";
import style from "./backdrop.module.scss";

export default function Backdrop({ children }: PropsWithChildren) {
  return <div className={style.backdrop}>{children}</div>;
}
