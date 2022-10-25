import React from "react";
import { setModal, closeModal } from "../../../features/modalSlice";
import { useActiveModal } from "../../../hooks/modalHooks";
import { useAppDispatch } from "../../../hooks/reduxHook";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { SettingsSection } from "../../../layout";
import { Card, ModalOverlay } from "../../../UI";
import { modalName } from "../../../variables";
import { CloseModalButton } from "../../global";
import style from "./deactivateAccountSettings.module.scss";

export default function DeactivateAccountSettings() {
  const dispatch = useAppDispatch();
  const checkIfModalActive = useActiveModal();
  const A_P_LS = useLocalStorage("a_p");
  const { userId } = A_P_LS.getItemJSON<{ userId: string }>();

  const deactivateAccountAction = () => {
    console.log("Deactivating account with user ID: ", userId);
  };

  const activateModal = () => {
    dispatch(
      setModal({ name: modalName.DEACTIVATE_ACCOUNT_MODAL, status: true })
    );
  };

  const removeModal = () => {
    dispatch(closeModal());
  };

  const modal = checkIfModalActive(modalName.DEACTIVATE_ACCOUNT_MODAL) && (
    <ModalOverlay hasBackButton={true} backButtonComponent={CloseModalButton}>
      <Card style={{ padding: 20, gap: 10 }}>
        <p>Are you sure you want to deactivate this account?</p>
        <div className={style["modal-btns"]}>
          <button id={style.deactivate} onClick={deactivateAccountAction}>Yes</button>
          <button onClick={removeModal}>No</button>
        </div>
      </Card>
    </ModalOverlay>
  );

  return (
    <SettingsSection
      title="Deactivate Account"
      description="This will remove all of your existing data and account information from the entire application. This will effect upon clicking the button."
    >
      <button id={style.deactivate} onClick={activateModal}>
        Deactivate
      </button>
      {modal}
    </SettingsSection>
  );
}
