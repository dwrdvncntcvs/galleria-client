import React, { PropsWithChildren } from "react";
import style from "./backdrop.module.scss";

interface BackdropProps extends PropsWithChildren {
  isBlur?: boolean;
}

export default function Backdrop({ children, isBlur }: BackdropProps) {
  return (
    <div className={`${style.backdrop} ${isBlur ? style.blur : style.solid}`}>
      {children}
    </div>
  );
}
