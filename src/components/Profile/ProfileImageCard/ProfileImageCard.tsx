import React from "react";
import style from "./profileImageCard.module.scss";
import { UserProfile } from "../../../models/User";
import { defaultAvatar } from "../../../assets/images";
import { useAppSelector } from "../../../hooks/reduxHook";

interface ProfileImageCardProps {
  profile: UserProfile;
  isFollowing: boolean;
}

export default function ProfileImageCard({
  profile,
  isFollowing,
}: ProfileImageCardProps) {
  const { userData } = useAppSelector((state) => state.userState);
  console.log(isFollowing);

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
      {userData?.id !== profile.id && !isFollowing && (
        <button className={style["follow-btn"]}>Follow</button>
      )}
    </div>
  );
}
