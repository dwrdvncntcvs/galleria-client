import React from "react";
import style from "./profileInfoCard.module.scss";
import { UserProfile } from "../../../models/User";

interface ProfileInfoCardProps {
  profile: UserProfile;
}
export default function ProfileInfoCard({ profile }: ProfileInfoCardProps) {
  return (
    <div className={style["profile-info"]}>
      <div className={style["profile-body"]}>
        <h4>
          {profile.first_name}&nbsp;
          {profile.last_name}
        </h4>
        <p className={style["username-txt"]}>{profile.username}</p>
      </div>
      <div className={style["bio-container"]}>
        <p className={style["bio-txt"]}>{profile.Profile?.bio}</p>
      </div>
      <div className={style["follow-container"]}>
        <p className={style["follow-txt"]}>
          {profile.followingCount!} <span> Following </span>
        </p>
        &nbsp;&nbsp;&nbsp;
        <p className={style["follow-txt"]}>
          {profile.followersCount!} <span> Followers </span>
        </p>
      </div>
    </div>
  );
}
