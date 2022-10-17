import React, { useState, ChangeEvent, FormEvent } from "react";
import { updateUserProfile } from "../../../api/userRequest";
import { closeModal } from "../../../features/modalSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { UpdateUserData } from "../../../models/User";
import style from "./editProfileForm.module.scss";
import { inputFields } from "./inputFields";

interface EditProfileFormProps {
  userId: string;
}

export default function EditProfileForm({ userId }: EditProfileFormProps) {
  const dispatch = useAppDispatch();
  const { userProfile } = useAppSelector((state) => state.userState);
  // const { address, dateOfBirth, first_name, last_name, username, bio } =
  //   profile!;

  const [data, setData] = useState<UpdateUserData>({
    address: userProfile.Profile?.address!,
    dateOfBirth: userProfile.Profile?.dateOfBirth!,
    first_name: userProfile.first_name!,
    last_name: userProfile.last_name!,
    bio: userProfile.Profile?.bio!,
  });

  const bioHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = "auto";
    e.currentTarget.style.height = `${e.target.scrollHeight}px`;
    setData((prev) => ({ ...prev, bio: e.target.value }));
  };

  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;

    setData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    data.dateOfBirth =
      data.dateOfBirth !== "" ? new Date(data.dateOfBirth!) : null;
    const { meta } = await dispatch(updateUserProfile({ data, id: userId }));

    if (meta.requestStatus === "fulfilled") {
      dispatch(closeModal());
    }
  };

  return (
    <form onSubmit={submitForm}>
      {inputFields(data, changeValue).map(
        ({ label, type, name, value, changeValue }, i) => (
          <div key={i} className={style["form-control"]}>
            <label htmlFor={name}>{label}</label>
            <input
              name={name}
              type={type}
              value={value! as string}
              onChange={changeValue}
            ></input>
          </div>
        )
      )}
      <div className={style["form-control"]}>
        <label>Bio</label>
        <textarea
          placeholder="Write something ..."
          rows={1}
          onChange={bioHandler}
          value={data.bio}
          onFocus={bioHandler}
        ></textarea>
      </div>

      <button type="submit">Save</button>
    </form>
  );
}
