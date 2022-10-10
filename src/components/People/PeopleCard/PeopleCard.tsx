import React from "react";
import { useNavigate } from "react-router-dom";
import { defaultAvatar } from "../../../assets/images";
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

  const goToProfile = (username: string) => () => {
    navigate(`/${username}`);
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
      {type === "following" && <button>Unfollow</button>}
    </div>
  );
}
