import React from "react";
import { ModalOverlay } from "../../../UI";
import { CloseModalButton } from "../../global";
import { EditProfileForm } from "..";
import style from "./editProfile.module.scss";
import { useModalProps } from "../../../hooks/modalHooks";

export default function EditProfile() {
  const props = useModalProps();

  return (
    <ModalOverlay hasBackButton={true} backButtonComponent={CloseModalButton}>
      <div className={style["edit-profile"]}>
        <h1>Edit Profile</h1>
        <EditProfileForm userId={(props as { userId: string }).userId} />
      </div>
    </ModalOverlay>
  );
}
