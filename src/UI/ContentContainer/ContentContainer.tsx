import React, { PropsWithChildren } from "react";
import style from "./contentContainer.module.scss";

export default function ContentContainer({ children }: PropsWithChildren) {
  return <div className={style["content-container"]}>{children}</div>;
}
