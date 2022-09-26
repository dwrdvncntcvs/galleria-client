import React, { PropsWithChildren } from "react";
import style from "./modal.module.scss";
import { DOMPortal } from "../../components/helpers";

interface ModalProps extends PropsWithChildren {
  className?: string;
}

export default function Modal({ children, className }: ModalProps) {
  return (
    <DOMPortal
      element={<div className={`${className} ${style.modal}`}>{children}</div>}
      elementId="overlay-root"
    />
  );
}
