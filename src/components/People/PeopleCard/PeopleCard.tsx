import React from "react";
import { useNavigate } from "react-router-dom";
import { unfollowUser } from "../../../api/followerRequest";
import { useImageSrc } from "../../../hooks/imageHooks";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { usePrivateAxios } from "../../../hooks/usePrivateAxios";
import { PeopleType } from "../../../models/GenericTypes";
import { UserProfile } from "../../../models/User";
import style from "./peopleCard.module.scss";

interface PeopleCardProps {
  user: UserProfile;
  type?: PeopleType;
}

export default function PeopleCard({
  user,
  type = "followers",
}: PeopleCardProps) {
  const { userData, userProfile } = useAppSelector((state) => state.userState);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const privateAxiosInstance = usePrivateAxios();
  const imageSrc = useImageSrc();

  const goToProfile = (username: string) => (e: any) => {
    e.stopPropagation();
    navigate(`/${username}`);
  };

  const unfollowAction = async (e: any) => {
    e.stopPropagation();

    await dispatch(
      unfollowUser({ username: user.username!, privateAxiosInstance })
    );
  };

  console.log(userData?.id === user.id);

  return (
    <div
      className={style["person-container"]}
      onClick={goToProfile(user.username!)}
    >
      <div className={style["person-details"]}>
        <img
          src={imageSrc(user.Profile?.profileImage!)}
          alt={`${user.first_name}'s avatar`}
        />
        <div>
          <p>
            {user.first_name} {user.last_name}
          </p>
          <p>{user.username}</p>
        </div>
      </div>
      {type === "following" && userData?.id! === userProfile?.id! && (
        <button onClick={unfollowAction}>Unfollow</button>
      )}
    </div>
  );
}
