import React, { PropsWithChildren } from "react";
import style from "./dropdown.module.scss";
import { stopPropagation } from "../../utils/helper";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useAppDispatch } from "../../hooks/reduxHook";
import { closeAllToggles, closeToggle } from "../../features/toggleSlice";

export default function Dropdown({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();

  const clickHandler = () => {
    dispatch(closeAllToggles());
  };

  const ref = useOutsideClick(clickHandler);

  return (
    <div ref={ref} className={style.dropdown} >
      {children}
    </div>
  );
}
