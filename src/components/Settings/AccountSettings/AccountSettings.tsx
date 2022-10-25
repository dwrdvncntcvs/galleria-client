import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/reduxHook";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { SettingsSection } from "../../../layout";
import style from "./accountSettings.module.scss";
import { inputFields } from "./inputFields";

interface InputData {
  username: string;
  contact_number: string;
  email: string;
}

export default function AccountSettings() {
  const A_P_LS = useLocalStorage("a_p");

  const { userData } = useAppSelector((state) => state.userState);

  useEffect(() => {
    const ls_data: InputData & { userId: string } = {
      username: userData!.username!,
      email: userData!.email!,
      contact_number: userData!.Profile?.contactNumber!,
      userId: userData!.id!,
    };

    A_P_LS.addItem(ls_data);
  }, [userData, A_P_LS]);

  const { contact_number, email, username, userId } = A_P_LS.getItemJSON<
    InputData & { userId: string }
  >()!;

  const [data, setData] = useState<InputData>({
    username,
    email,
    contact_number,
  });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;

    setData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const submitAction = (e: FormEvent) => {
    e.preventDefault();

    const body = {
      ...data,
      userId,
    };
    console.log("Body: ", body);
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
