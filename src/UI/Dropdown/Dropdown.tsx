import React, { PropsWithChildren } from "react";
import style from "./dropdown.module.scss";
import { stopPropagation } from "../../utils/helper";

export default function Dropdown({ children }: PropsWithChildren) {
  return (
    <div className={style.dropdown} onClick={stopPropagation}>
      {children}
    </div>
  );
}
