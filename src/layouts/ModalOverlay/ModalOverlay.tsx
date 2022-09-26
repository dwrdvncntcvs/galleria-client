import React, { PropsWithChildren } from "react";
import { DOMPortal } from "../../components/helpers";
import Backdrop from "../Backdrop/Backdrop";
import Modal from "../Modal/Modal";
import style from "./modalOverlay.module.scss";

export default function ModalOverlay({ children }: PropsWithChildren) {
  return (
    <DOMPortal
      element={
        <div className={style["modal-overlay"]}>
          <Backdrop />
          <Modal>{children}</Modal>
        </div>
      }
      elementId="overlay-root"
    />
  );
}
