import React from "react";
import style from "./profileInfoCard.module.scss";
import { UserProfile } from "../../../models/User";
import { useNavigate } from "react-router-dom";

interface ProfileInfoCardProps {
  profile: UserProfile;
}
export default function ProfileInfoCard({ profile }: ProfileInfoCardProps) {
  const navigate = useNavigate();

  const goToFollowers = () => {
    navigate("followers");
  };

  const goToFollowing = () => {
    navigate("following");
  };

  const followButtons = [
    {
      count: profile.followingCount!,
      spanText: "Following",
      action: goToFollowing,
    },
    {
      count: profile.followersCount!,
      spanText: "Followers",
      action: goToFollowers,
    },
  ];

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
        {followButtons.map(({ action, count, spanText }, i) => (
          <button className={style["follow-txt"]} key={i} onClick={action}>
            {count} <span> {spanText} </span>
          </button>
        ))}
      </div>
    </div>
  );
}
