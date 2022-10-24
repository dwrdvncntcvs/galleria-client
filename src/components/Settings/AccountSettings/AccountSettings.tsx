import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/reduxHook";
import { SettingsSection } from "../../../layout";
import style from "./accountSettings.module.scss";
import { inputFields } from "./inputFields";

interface InputData {
  username: string;
  contact_number: string;
  email: string;
}

export default function AccountSettings() {
  const { userData } = useAppSelector((state) => state.userState);
  const { contact_number, email, username } = JSON.parse(
    localStorage.getItem("a_p")!
  ) as {
    username: string;
    email: string;
    contact_number: string;
  };

  const [data, setData] = useState<InputData>({
    username,
    email,
    contact_number,
  });

  useEffect(() => {
    const ls_data = {
      username: userData!.username!,
      email: userData!.email!,
      contact_number: userData!.Profile?.contactNumber!,
    };
    localStorage.setItem("a_p", JSON.stringify(ls_data));
  }, [userData]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;

    setData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const submitAction = (e: FormEvent) => {
    e.preventDefault();

    console.log(data);
  };

  return (
    <SettingsSection
      title="Account Information"
      description="To fully manage your account information that presented on your profile."
    >
      <form className={style["settings-form"]} onSubmit={submitAction}>
        {inputFields(data, changeHandler).map(
          ({ label, name, type, value, changeAction }) => (
            <div className={style["form-control"]} key={name}>
              <label htmlFor={name}>{label}</label>
              <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={changeAction}
              />
            </div>
          )
        )}
        <button type="submit">Save</button>
      </form>
    </SettingsSection>
  );
}
