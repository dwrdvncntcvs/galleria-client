import React from "react";
import { useAppSelector } from "../../../hooks/reduxHook";
import { ModalOverlay } from "../../../UI";
import { CloseModalButton } from "../../global";
import { EditProfileForm } from "..";
import style from "./editProfile.module.scss";

export default function EditProfile() {
  const { props } = useAppSelector((state) => state.modalState);

  return (
    <ModalOverlay hasBackButton={true} backButtonComponent={CloseModalButton}>
      <div className={style["edit-profile"]}>
        <h1>Edit Profile</h1>
        <EditProfileForm userId={(props as { userId: string }).userId} />
      </div>
    </ModalOverlay>
  );
}
