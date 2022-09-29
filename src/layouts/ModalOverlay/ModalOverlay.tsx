import React, { PropsWithChildren, useEffect, FC } from "react";
import { DOMPortal } from "../../components/helpers";
import Backdrop from "../Backdrop/Backdrop";
import Modal from "../Modal/Modal";
import style from "./modalOverlay.module.scss";

interface ModalOverlayProps extends PropsWithChildren {
  className?: string;
  hasBackButton?: boolean;
  backButtonComponent?: FC;
}

export default function ModalOverlay({
  children,
  className,
  backButtonComponent,
  hasBackButton = false,
}: ModalOverlayProps) {
  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  const BackButton = backButtonComponent!;

  return (
    <DOMPortal
      element={
        <Backdrop>
          <Modal className={`${className} ${style["modal-overlay"]}`}>
            {hasBackButton && <BackButton />}
            {children}
          </Modal>
        </Backdrop>
      }
      elementId="overlay-root"
    />
  );
}
