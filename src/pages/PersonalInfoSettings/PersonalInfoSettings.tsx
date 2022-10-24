import React from "react";
import {
  AccountSettings,
  DeactivateAccountSettings,
} from "../../components/Settings";
import style from "./personalInfoSettings.module.scss";

export default function PersonalInfoSettings() {
  return (
    <>
      <AccountSettings />
      <DeactivateAccountSettings />
    </>
  );
}
