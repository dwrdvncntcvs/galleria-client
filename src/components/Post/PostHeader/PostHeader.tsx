import React from "react";
import { useNavigate } from "react-router-dom";
import { defaultAvatar } from "../../../assets/images";
import { UserProfile } from "../../../models/User";
import { convertDate } from "../../../utils/helper";
import { RoundedAvatar } from "../../global";
import style from "./postHeader.module.scss";

interface PostHeaderProps {
  user: UserProfile;
  postDate: Date;
}

export default function PostHeader({ user, postDate }: PostHeaderProps) {
  const navigate = useNavigate()
 
  const goToProfile = () => {
    navigate(`/${user.username}`);
  };

  return (
    <header className={style.header}>
      <RoundedAvatar
        src={
          user.Profile?.profileImage! !== ""
            ? user.Profile?.profileImage!
            : defaultAvatar
        }
        alt={`${user.first_name}'s avatar`}
        onClickAction={goToProfile}
      />
      <div className={style["header-content"]}>
        <p>
          {user.first_name} {user.last_name}
        </p>
        <p>{convertDate(postDate)}</p>
      </div>
    </header>
  );
}
