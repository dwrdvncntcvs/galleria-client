import React from "react";
import { ModalOverlay } from "../../../UI";
import { CloseModalButton } from "../../global";
import style from "./updateProfileImage.module.scss";

export default function UpdateProfileImage() {
  return (
    <ModalOverlay hasBackButton={true} backButtonComponent={CloseModalButton}>
      UpdateProfileImage
    </ModalOverlay>
  );
}
