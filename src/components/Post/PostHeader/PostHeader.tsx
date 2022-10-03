import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { defaultAvatar } from "../../../assets/images";
import { UserProfile } from "../../../models/User";
import { convertDate } from "../../../utils/helper";
import { RoundedAvatar } from "../../global";
import { HiDotsHorizontal } from "react-icons/hi";
import style from "./postHeader.module.scss";
import { useAppSelector } from "../../../hooks/reduxHook";
import { PostActionDropDown } from "..";

interface PostHeaderProps {
  user: UserProfile;
  postDate: Date;
  postId: string;
}

export default function PostHeader({
  user,
  postDate,
  postId,
}: PostHeaderProps) {
  const { userState } = useAppSelector((state) => state);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate(`/${user.username}`);
  };

  const postActionDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <header className={style.header}>
      <div className={style["details"]}>
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
      </div>
      {userState.userData?.id === user.id && (
        <button onClick={postActionDropdown}>
          <HiDotsHorizontal />
        </button>
      )}
      {showDropdown && (
        <PostActionDropDown postId={postId} onClose={closeDropdown} />
      )}
    </header>
  );
}
