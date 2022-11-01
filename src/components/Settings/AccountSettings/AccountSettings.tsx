import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { updateUserAccount } from "../../../api/userRequest";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { SettingsSection } from "../../../layout";
import { SettingsData } from "../../../models/Settings";
import style from "./accountSettings.module.scss";
import { inputFields } from "./inputFields";

interface InputData {
  username: string;
  contact_number: string;
  email: string;
}

export default function AccountSettings() {
  const { addItem: accountAddItem, getItemJSON: getAccountData } =
    useLocalStorage("accountInfo");
  const dispatch = useAppDispatch();

  const { contact_number, email, userId, username } =
    getAccountData<SettingsData>();

  const [data, setData] = useState<InputData>({
    username,
    email,
    contact_number,
  });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;

    setData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const submitAction = async (e: FormEvent) => {
    e.preventDefault();

    const body = {
      ...data,
      userId,
    };
    console.log("Body: ", body);
    const { meta } = await dispatch(updateUserAccount(body));

    if (meta.requestStatus === "fulfilled") {
      accountAddItem(body);
    }
  };

  return (
    <SettingsSection
      title="Account Information"
      description="Manage your account information that displayed on your profile and used to login to your account."
    >
      <form className={style["settings-form"]} onSubmit={submitAction}>
        {inputFields(data, changeHandler).map(
          ({ label, name, type, value, changeAction, disabled, Icon }) => (
            <div className={style["form-control"]} key={name}>
              <label htmlFor={name}>
                <Icon /> {label}
              </label>
              <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={changeAction}
                disabled={disabled}
              />
            </div>
          )
        )}
        <button type="submit">Save</button>
      </form>
    </SettingsSection>
  );
}
