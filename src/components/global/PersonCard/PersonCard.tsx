import React from "react";
import { useNavigate } from "react-router-dom";
import { followUserRequest } from "../../../api/followerRequest";
import { useImageSrc } from "../../../hooks/imageHooks";
import { useAppDispatch } from "../../../hooks/reduxHook";
import { UserProfile } from "../../../models/User";
import style from "./personCard.module.scss";

interface PersonCardProps {
  user: UserProfile;
}

export default function PersonCard({ user }: PersonCardProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const imageSrc = useImageSrc();

  const goToUserProfile = (e: any) => {
    e.stopPropagation();
    navigate(`/${user.username}`);
  };

  const followUser = async (e: any) => {
    e.stopPropagation();

    await dispatch(followUserRequest({ username: user.username! }));
  };

  return (
    <div className={style.person} onClick={goToUserProfile}>
      <div className={style.profile}>
        <img
          src={imageSrc(user.Profile?.profileImage!)}
          alt={`${user.first_name}'s avatar`}
        />
        <p>
          {user.first_name} {user.last_name}
        </p>
      </div>
      <button id={style["follow-action"]} onClick={followUser}>
        Follow
      </button>
    </div>
  );
}
