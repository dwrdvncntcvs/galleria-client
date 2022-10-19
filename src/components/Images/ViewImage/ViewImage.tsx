import React from "react";
import { useModalProps } from "../../../hooks/modalHooks";
import { ModalOverlay } from "../../../UI";
import { CloseModalButton } from "../../global";
import style from "./viewImage.module.scss";

export default function ViewImage() {
  const props = useModalProps();

  return (
    <ModalOverlay backButtonComponent={CloseModalButton} hasBackButton={true}>
      Image
    </ModalOverlay>
  );
}
