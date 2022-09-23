import React, { PropsWithChildren } from "react";
import style from "./buttonContainer.module.scss";

export default function ButtonContainer({ children }: PropsWithChildren) {
  return <div className={style["button-container"]}>{children}</div>;
}
