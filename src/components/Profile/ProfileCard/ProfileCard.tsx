import React from "react";
import style from "./profileCard.module.scss";
import { UserProfile } from "../../../models/User";
import { defaultAvatar } from "../../../assets/images";

interface ProfileCardProps {
  profile: UserProfile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <div className={style.content}>
      <img
        src={
          profile.Profile?.profileImage === ""
            ? defaultAvatar
            : profile.Profile?.profileImage
        }
        alt={`${profile.first_name}'s avatar'`}
      />
      <h1>
        {profile.first_name}
        {profile.last_name}
      </h1>
      <h3>{profile.email}</h3>
      <h3>{profile.username}</h3>
    </div>
  );
}
