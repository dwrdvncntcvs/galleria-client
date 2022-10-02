import React from "react";
import { useNavigate } from "react-router-dom";
import { defaultAvatar } from "../../../assets/images";
import { Card } from "../../../layouts";
import { UserProfile } from "../../../models/User";
import { RoundedAvatar } from "../../global";
import style from "./miniProfile.module.scss";

interface MiniProfileProps {
  profile: UserProfile;
}

export default function MiniProfile({ profile }: MiniProfileProps) {
  const navigate = useNavigate();

  const { first_name, last_name, username, Profile } = profile;

  const navigateToProfile = () => {
    navigate(`/${username}`);
  };

  return (
    <Card>
      <section className={style["mini-profile"]}>
        <h1>Relevant Profile</h1>
        <div className={style["profile-header"]}>
          <RoundedAvatar
            src={
              Profile?.profileImage !== ""
                ? Profile?.profileImage!
                : defaultAvatar
            }
            alt={`${first_name}'s avatar`}
            onClickAction={navigateToProfile}
          />
          <div className={style["profile-header-content"]}>
            <p id={style["name"]}>
              {first_name} {last_name}
            </p>
            <p id={style["username"]}>{username}</p>
          </div>
        </div>
        <p id={style.content}>{Profile?.bio}</p>
      </section>
    </Card>
  );
}
