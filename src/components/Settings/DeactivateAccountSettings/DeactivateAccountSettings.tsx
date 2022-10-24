import React from "react";
import { SettingsSection } from "../../../layout";
import style from "./deactivateAccountSettings.module.scss";

export default function DeactivateAccountSettings() {
  return (
    <SettingsSection
      title="Deactivate Account"
      description="This will remove all of your existing data and account information from the entire application. This will effect upon clicking the button."
    >
      <button id={style.deactivate}>Deactivate</button>
    </SettingsSection>
  );
}
