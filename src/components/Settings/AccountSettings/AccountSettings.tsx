import React, { ChangeEvent, FormEvent, useState } from "react";
import { SettingsSection } from "../../../layout";
import style from "./accountSettings.module.scss";

type InputField = {
  type: string;
  label: string;
  name: string;
  value: string;
  changeAction: (e: ChangeEvent<HTMLInputElement>) => void;
};

interface InputData {
  username: string;
  contact_number: string;
  email: string;
}

export default function AccountSettings() {
  const [data, setData] = useState<InputData>({
    username: "",
    email: "",
    contact_number: "",
  });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;

    setData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const inputFields: InputField[] = [
    {
      label: "Username",
      name: "username",
      type: "text",
      value: data.username as string,
      changeAction: changeHandler,
    },
    {
      label: "Contact Number",
      name: "contact_number",
      type: "text",
      value: data.contact_number,
      changeAction: changeHandler,
    },
    {
      label: "Email Address",
      name: "email",
      type: "text",
      value: data.email,
      changeAction: changeHandler,
    },
  ];

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
        {inputFields.map(({ label, name, type, value, changeAction }) => (
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
        ))}
        <button type="submit">Save</button>
      </form>
    </SettingsSection>
  );
}
