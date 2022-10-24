import React from "react";
import { SettingsSection } from "../../../layout";
import style from "./changePasswordSettings.module.scss";

export default function ChangePasswordSettings() {
  return (
    <SettingsSection
      title="Change Password"
      description="To change your password at any time."
    ></SettingsSection>
  );
}
