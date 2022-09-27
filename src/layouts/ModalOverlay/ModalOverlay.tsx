import React, { PropsWithChildren } from "react";
import { DOMPortal } from "../../components/helpers";
import Backdrop from "../Backdrop/Backdrop";
import Modal from "../Modal/Modal";
import style from "./modalOverlay.module.scss";

interface ModalOverlayProps extends PropsWithChildren {
  className?: string;
}

export default function ModalOverlay({
  children,
  className,
}: ModalOverlayProps) {
  document.body.style.overflowY = "hidden";

  return (
    <DOMPortal
      element={
        // <div className={style["modal-overlay"]}>
        <Backdrop>
          <Modal className={className}>{children}</Modal>
        </Backdrop>
        // </div>
      }
      elementId="overlay-root"
    />
  );
}
