import React from "react";
import { SettingsSection } from "../../../layout";
import style from "./changePasswordSettings.module.scss";

interface InputField {
  type: string;
  placeholder: string;
}

export default function ChangePasswordSettings() {
  const inputFields: InputField[] = [
    { placeholder: "Old Password", type: "password" },
    { placeholder: "New Password", type: "password" },
    { placeholder: "Re-type New Password", type: "password" },
  ];

  return (
    <SettingsSection
      title="Change Password"
      description="To change your password at any time."
    >
      <form className={style["settings-form"]}>
        {inputFields.map(({ placeholder, type }, i) => (
          <div className={style["form-control"]} key={i}>
            <input placeholder={placeholder} type={type} />
          </div>
        ))}
        <button>Change Password</button>
      </form>
    </SettingsSection>
  );
}
