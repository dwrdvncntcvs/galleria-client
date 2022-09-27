import React, { PropsWithChildren, useEffect } from "react";
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
  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <DOMPortal
      element={
        <Backdrop>
          <Modal className={className}>{children}</Modal>
        </Backdrop>
      }
      elementId="overlay-root"
    />
  );
}
