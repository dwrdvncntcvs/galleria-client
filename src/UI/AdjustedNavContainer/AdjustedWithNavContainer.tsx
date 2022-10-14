import React, { PropsWithChildren } from "react";
import style from  "./adjustedWithNavContainer.module.scss";

export default function AdjustedNavContainer({ children }: PropsWithChildren) {
  return <div className={style['adjusted-nav']}>{children}</div>;
}
