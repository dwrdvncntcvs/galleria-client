import React, { PropsWithChildren } from "react";
import { closeToggle } from "../../features/toggleSlice";
import { useAppDispatch } from "../../hooks/reduxHook";

import style from "./mainContainer.module.scss";

export default function MainContainer({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();

  return (
    <div className={style['main-container']} onClick={() => dispatch(closeToggle())}>
      {children}
    </div>
  );
}
