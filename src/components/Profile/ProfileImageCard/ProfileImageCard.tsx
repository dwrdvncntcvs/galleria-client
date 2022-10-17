import React from "react";
import style from "./profileImageCard.module.scss";
import { UserProfile } from "../../../models/User";
import { defaultAvatar } from "../../../assets/images";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { followUserRequest } from "../../../api/followerRequest";

interface ProfileImageCardProps {
  profile: UserProfile;
  isFollowing: boolean;
  username: string;
}

export default function ProfileImageCard({
  profile,
  isFollowing,
  username,
}: ProfileImageCardProps) {
  const { userData } = useAppSelector((state) => state.userState);
  const dispatch = useAppDispatch();

  const buttonsArr = [
    {
      condition: userData?.id !== profile.id && !isFollowing,
      label: "Follow",
      action: async () => {
        await dispatch(followUserRequest({ username }));
      },
    },
    {
      condition: userData?.id === profile.id,
      label: "Edit Profile",
      action: () => console.log("Edit Profile"),
    },
  ];

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
      {buttonsArr.map(
        ({ action, condition, label }, i) =>
          condition && (
            <button className={style["follow-btn"]} onClick={action} key={i}>
              {label}
            </button>
          )
      )}
    </div>
  );
}
