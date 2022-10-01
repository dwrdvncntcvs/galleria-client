import React from "react";
import style from "./profileImageCard.module.scss";
import { UserProfile } from "../../../models/User";
import { defaultAvatar } from "../../../assets/images";

interface ProfileImageCardProps {
  profile: UserProfile;
}

export default function ProfileImageCard({ profile }: ProfileImageCardProps) {
  return (
    <div className={style["profile-container"]}>
      <div className={style["profile-link"]}>
        <img
          src={
            profile.Profile?.profileImage === ""
              ? defaultAvatar
              : profile.Profile?.profileImage
          }
          alt={`${profile.first_name}'s avatar'`}
        />
      </div>
      {/* 
      This "follow" button should be dynamically displayed if certain conditions were met. 
      Condition: 
          If currently logged in user id is equal to this user profile's id, then don't display this button.
          Else display this button
      */}
      <button className={style["follow-btn"]}>Follow</button>{" "}
    </div>
  );
}
