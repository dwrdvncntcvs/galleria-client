import React from "react";
import style from "./profileCard.module.scss";
import { UserProfile } from "../../../models/User";
import { defaultAvatar } from "../../../assets/images";

interface ProfileCardProps {
  profile: UserProfile;
}

// On this component, it could be used to fetch or get data from the backend and other components will be receiving
// those data as props.
export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <div className={style["main-container"]}>
      {/* We could create another component that will hold this component from here. */}
      <div
        className={
          style.profilebg /* You could name this as "profileBg" or profile-bg */
        }
      >
        {/* img src background here */}
      </div>
      {/* to here */}

      {/* We could create another component that will hold this component from here. */}
      <div className={style["profile-container"]}>
        <div
          className={
            style.profilelink /* You could name this as "profileLink" or profile-link */
          }
        >
          <img
            src={
              profile.Profile?.profileImage === ""
                ? defaultAvatar
                : profile.Profile?.profileImage
            }
            alt={`${profile.first_name}'s avatar'`}
          />
        </div>
        <button className={style["follow-btn"]}>Follow</button>
      </div>
      {/* to here */}

      {/* We could create another component that will hold this component from here. */}
      <div className={style["profile-info"]}>
        <h4>
          {profile.first_name}&nbsp;
          {profile.last_name}
        </h4>
        <p className={style["username-txt"]}>{profile.username}</p>
        <div className={style["follow-container"]}>
          <p className={style["follow-txt"]}>
            30 <span> Following </span>
          </p>
          &nbsp;&nbsp;
          <p className={style["follow-txt"]}>
            28 <span> Followers </span>
          </p>
        </div>
      </div>
      {/* to here */}
    </div>
  );
}
