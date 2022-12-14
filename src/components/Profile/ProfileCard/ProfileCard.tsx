import React from "react";
import style from "./profileCard.module.scss";
import { UserProfile } from "../../../models/User";
import ProfileImageCard from "../ProfileImageCard/ProfileImageCard";
import ProfileInfoCard from "../ProfileInfoCard/ProfileInforCard";
import ProfileCoverPhoto from "../ProfileCoverPhoto/ProfileCoverPhoto";

interface ProfileCardProps {
  profile: UserProfile;
  isFollowing: boolean;
  username: string;
}

// On this component, it could be used to fetch or get data from the backend and other components will be receiving
// those data as props.
export default function ProfileCard({
  profile,
  isFollowing,
  username,
}: ProfileCardProps) {
  return (
    <div className={style["main-container"]}>
      <div className={style["content-container"]}>
        <ProfileCoverPhoto />
        <ProfileImageCard
          profile={profile}
          isFollowing={isFollowing}
          username={username}
        />
        <ProfileInfoCard profile={profile} />
      </div>
    </div>
  );
}
