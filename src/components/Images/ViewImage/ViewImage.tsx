import React from "react";
import { useModalProps } from "../../../hooks/modalHooks";
import { ModalOverlay } from "../../../UI";
import { CloseModalButton } from "../../global";
import style from "./viewImage.module.scss";

export default function ViewImage() {
  const { imageSrc } = useModalProps() as { imageSrc: string };

  return (
    <ModalOverlay backButtonComponent={CloseModalButton} hasBackButton={true}>
      <img className={style["view-image-img"]} src={imageSrc} alt="" />
    </ModalOverlay>
  );
}
