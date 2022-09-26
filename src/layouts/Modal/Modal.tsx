import React, { PropsWithChildren } from "react";
import style from "./modal.module.scss";

interface ModalProps extends PropsWithChildren {
  className?: string;
}

export default function Modal({ children, className }: ModalProps) {
  return <div className={`${className} ${style.modal}`}>{children}</div>;
}
