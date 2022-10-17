import React from "react";
import { useAppSelector } from "../../../hooks/reduxHook";
import { ModalOverlay } from "../../../UI";
import { CloseModalButton } from "../../global";
import { EditProfileForm } from "..";
import style from "./editProfile.module.scss";
import { UpdateUserData } from "../../../models/User";

export default function EditProfile() {
  const { props } = useAppSelector((state) => state.modalState);

  return (
    <ModalOverlay hasBackButton={true} backButtonComponent={CloseModalButton}>
      <div className={style["edit-profile"]}>
        <h1>Edit Profile</h1>
        <EditProfileForm
          profile={(props as { profileData: UpdateUserData }).profileData!}
          userId={(props as { userId: string }).userId}
        />
      </div>
    </ModalOverlay>
  );
}
