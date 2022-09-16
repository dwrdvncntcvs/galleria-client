import React, { PropsWithChildren } from "react";
import { closeToggle } from "../../../features/toggleSlice";
import { useAppDispatch } from "../../../hooks/reduxHook";
import "./mainContainer.scss";

export default function MainContainer({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();

  return (
    <div className="mc__main-container" onClick={() => dispatch(closeToggle())}>
      {children}
    </div>
  );
}
