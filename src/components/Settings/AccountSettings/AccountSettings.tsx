import React, { ChangeEvent, FormEvent, useState } from "react";
import { updateUserAccount } from "../../../api/userRequest";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { SettingsSection } from "../../../layout";
import style from "./accountSettings.module.scss";
import { inputFields } from "./inputFields";

interface InputData {
  username: string;
  contact_number: string;
  email: string;
}

const isDataValid = (data: any) => {
  delete data.email;
  let bool = true;

  for (let key in data) {
    if (data[key] === "") bool = false;
  }

  return bool;
};

export default function AccountSettings() {
  const dispatch = useAppDispatch();

  const { Profile, id, username, email } = useAppSelector(
    (state) => state.userState.userData!
  );

  const defaultValues = {
    contact_number: Profile?.contactNumber!,
    userId: id!,
    username: username!,
    email: email!,
  };

  const [data, setData] = useState<InputData>({
    username: "",
    email: "",
    contact_number: "",
  });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;

    setData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const submitAction = async (e: FormEvent) => {
    e.preventDefault();

    const body = {
      ...data,
      userId: id!,
    };
    console.log("Body: ", body);
    await dispatch(updateUserAccount(body));
  };

  return (
    <SettingsSection
      title="Account Information"
      description="Manage your account information that displayed on your profile and used to login to your account."
    >
      <form className={style["settings-form"]} onSubmit={submitAction}>
        {inputFields(defaultValues, changeHandler).map(
          ({ label, name, type, value, changeAction, disabled, Icon }) => (
            <div className={style["form-control"]} key={name}>
              <label htmlFor={name}>
                <Icon /> {label}
              </label>
              <input
                type={type}
                name={name}
                id={name}
                defaultValue={value!}
                onChange={changeAction}
                disabled={disabled}
              />
            </div>
          )
        )}
        <button type="submit" disabled={!isDataValid(data)}>
          Save
        </button>
      </form>
    </SettingsSection>
  );
}
