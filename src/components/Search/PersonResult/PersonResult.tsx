import React from "react";
import { defaultAvatar } from "../../../assets/images";
import { UserProfile } from "../../../models/User";
import style from "./personResult.module.scss";

interface PersonalResult {
  first_name: string;
  last_name: string;
  Profile: { profileImage: string };
  username: string;
  userData: UserProfile;
  onNavigateUser: (username: string) => () => void;
}

export default function PersonResult({
  first_name,
  last_name,
  Profile,
  username,
  userData,
  onNavigateUser,
}: PersonalResult) {
  return (
    <button className={style["person"]} onClick={onNavigateUser(username!)}>
      <img
        src={
          Profile?.profileImage !== "" ? Profile?.profileImage : defaultAvatar
        }
        alt={`${first_name} ${last_name}`}
      />
      <div className={style["profile-details"]}>
        <p>
          {first_name} {last_name}
        </p>
        <p>{userData?.username === username ? "You" : username}</p>
      </div>
    </button>
  );
}
