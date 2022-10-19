import React from "react";
import style from "./profileInfoCard.module.scss";
import { UserProfile } from "../../../models/User";
import { useNavigate } from "react-router-dom";
import {
  HiCake,
  HiCalendar,
  HiInformationCircle,
  HiLocationMarker,
  HiPhone,
  HiUser,
} from "react-icons/hi";
import { convertDateOfBirth } from "../../../utils/helper";

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

  const details = [
    { content: profile.Profile?.bio, Icon: HiInformationCircle },
    { content: `@${profile.username}`, Icon: HiUser },
    {
      content: convertDateOfBirth(profile.Profile?.dateOfBirth!),
      Icon: HiCake,
    },
    { content: profile.Profile?.contactNumber, Icon: HiPhone },
    { content: profile.Profile?.address, Icon: HiLocationMarker },
    { content: convertDateOfBirth(profile?.createdAt!), Icon: HiCalendar },
  ];

  console.log(convertDateOfBirth(profile?.createdAt!));

  return (
    <div className={style["profile-info"]}>
      <p className={style["name"]}>
        {profile.first_name} {profile.last_name}
      </p>

      <div className={style["details-container"]}>
        {details.map(
          ({ Icon, content }, i) =>
            content?.length! > 0 && (
              <p className={style["details-txt"]} key={i}>
                <span>
                  <Icon />
                </span>{" "}
                {content}
              </p>
            )
        )}
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
