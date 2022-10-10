import React from "react";
import { useNavigate } from "react-router-dom";
import { unfollowUser } from "../../../api/followerRequest";
import { defaultAvatar } from "../../../assets/images";
import { useAppDispatch } from "../../../hooks/reduxHook";
import { usePrivateAxios } from "../../../hooks/usePrivateAxios";
import { PeopleType } from "../../../models/GenericTypes";
import { UserProfile } from "../../../models/User";
import style from "./peopleCard.module.scss";

interface PeopleCardProps {
  userProfile: UserProfile;
  type?: PeopleType;
}

export default function PeopleCard({
  userProfile,
  type = "followers",
}: PeopleCardProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const privateAxiosInstance = usePrivateAxios();

  const goToProfile = (username: string) => (e: any) => {
    e.stopPropagation();
    navigate(`/${username}`);
  };

  const unfollowAction = async (e: any) => {
    e.stopPropagation();

    await dispatch(
      unfollowUser({ username: userProfile.username!, privateAxiosInstance })
    );
  };

  return (
    <div
      className={style["person-container"]}
      onClick={goToProfile(userProfile.username!)}
    >
      <div className={style["person-details"]}>
        <img
          src={
            userProfile.Profile?.profileImage === ""
              ? defaultAvatar
              : userProfile.Profile?.profileImage
          }
          alt={`${userProfile.first_name}'s avatar`}
        />
        <div>
          <p>
            {userProfile.first_name} {userProfile.last_name}
          </p>
          <p>{userProfile.username}</p>
        </div>
      </div>
      {type === "following" && (
        <button onClick={unfollowAction}>Unfollow</button>
      )}
    </div>
  );
}
