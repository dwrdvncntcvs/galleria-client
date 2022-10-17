import React, { ChangeEvent, FormEvent, useState } from "react";
import { useAppSelector } from "../../../hooks/reduxHook";
import { UpdateUserData } from "../../../models/User";
import { ModalOverlay } from "../../../UI";
import { CloseModalButton } from "../../global";
import style from "./editProfile.module.scss";

export default function EditProfile() {
  const { props } = useAppSelector((state) => state.modalState);
  const { address, dateOfBirth, first_name, last_name, username } = (
    props as { profileData: UpdateUserData }
  ).profileData;
  const [data, setData] = useState<UpdateUserData>({
    address,
    dateOfBirth,
    first_name,
    last_name,
    username,
  });
  const [bio, setBio] = useState("");

  const bioHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = "auto";
    e.currentTarget.style.height = `${e.target.scrollHeight}px`;
    setBio(e.target.value);
  };

  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;

    setData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const submitForm = (e: FormEvent) => {
    e.preventDefault();
    console.log("Data to be edited: ", { ...data, bio });
  };

  const inputFields = [
    {
      label: "First Name",
      type: "text",
      name: "first_name",
      value: data.first_name,
      changeValue,
    },
    {
      label: "Last Name",
      type: "text",
      name: "last_name",
      value: data.last_name,
      changeValue,
    },
    {
      label: "Username",
      type: "text",
      name: "username",
      value: data.username,
      changeValue,
    },
    {
      label: "Address",
      type: "text",
      name: "address",
      value: data.address,
      changeValue,
    },
    {
      label: "Date of Birth",
      type: "date",
      name: "dateOfBirth",
      value: data.dateOfBirth,
      changeValue,
    },
  ];

  return (
    <ModalOverlay hasBackButton={true} backButtonComponent={CloseModalButton}>
      <div className={style["edit-profile"]}>
        <h1>Edit Profile</h1>
        <form onSubmit={submitForm}>
          {inputFields.map(({ label, type, name, value, changeValue }, i) => (
            <div key={i} className={style["form-control"]}>
              <label htmlFor={name}>{label}</label>
              <input
                name={name}
                type={type}
                value={value}
                onChange={changeValue}
              ></input>
            </div>
          ))}
          <div className={style["form-control"]}>
            <label>Bio</label>
            <textarea
              placeholder="Write something ..."
              rows={1}
              onChange={bioHandler}
              value={bio}
            ></textarea>
          </div>

          <button type="submit">Save</button>
        </form>
      </div>
    </ModalOverlay>
  );
}
