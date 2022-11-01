import React, { ChangeEvent, FormEvent, SyntheticEvent, useState } from "react";
import { useFormInput } from "../../../hooks/formInputHooks";
import { SettingsSection } from "../../../layout";
import style from "./changePasswordSettings.module.scss";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { InputError } from "../../global";

interface InputField {
  type: string;
  placeholder: string;
  value: string;
  changeAction: (e: ChangeEvent<HTMLInputElement>) => void;
  error: string;
  name: string;
  blurAction: (e: SyntheticEvent<HTMLInputElement>) => void;
}

const initialInputValues = { oldPassword: "", password: "", password2: "" };

export default function ChangePasswordSettings() {
  const [showPass, setShowPass] = useState(false);
  const { data, errors, handleChange, isFormValid, setData, handleBlur } =
    useFormInput<{
      oldPassword: string;
      password: string;
      password2: string;
    }>(initialInputValues);

  const inputFields: InputField[] = [
    {
      placeholder: "Old Password",
      type: showPass ? "text" : "password",
      value: data.oldPassword,
      changeAction: handleChange,
      error: errors.oldPassword,
      name: "oldPassword",
      blurAction: handleBlur,
    },
    {
      placeholder: "New Password",
      type: showPass ? "text" : "password",
      value: data.password,
      changeAction: handleChange,
      error: errors.password,
      name: "password",
      blurAction: handleBlur,
    },
    {
      placeholder: "Re-type New Password",
      type: showPass ? "text" : "password",
      value: data.password2,
      changeAction: handleChange,
      error: errors.password2,
      name: "password2",
      blurAction: handleBlur,
    },
  ];

  const submitForm = (e: FormEvent) => {
    e.preventDefault();

    if (isFormValid) {
      return;
    }

    console.log("Data: ", data);

    setData(initialInputValues);
  };

  const showPasswordAction = () => {
    setShowPass((prev) => !prev);
  };

  return (
    <SettingsSection
      title="Change Password"
      description="To change your password at any time."
    >
      <form className={style["settings-form"]} onSubmit={submitForm}>
        {inputFields.map(
          (
            { placeholder, type, changeAction, value, error, name, blurAction },
            i
          ) => (
            <div className={style["form-control"]} key={i}>
              <input
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={changeAction}
                name={name}
                onBlur={blurAction}
              />
              {error.length > 0 && <InputError errorMessage={error}/>}
            </div>
          )
        )}
        <div className={style["action-buttons"]}>
          <button type="submit" disabled={isFormValid}>
            Change Password
          </button>
          <button type="button" onClick={showPasswordAction}>
            {showPass ? <HiEyeOff /> : <HiEye />}
          </button>
        </div>
      </form>
    </SettingsSection>
  );
}
