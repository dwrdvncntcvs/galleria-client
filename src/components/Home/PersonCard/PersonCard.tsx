import React from "react";
import { useNavigate } from "react-router-dom";
import { followUserRequest } from "../../../api/followerRequest";
import { defaultAvatar } from "../../../assets/images";
import { useAppDispatch } from "../../../hooks/reduxHook";
import { UserProfile } from "../../../models/User";
import "./personCard.scss";

interface PersonCardProps {
  user: UserProfile;
}

export default function PersonCard({ user }: PersonCardProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const goToUserProfile = () => {
    navigate(`/${user.username}`);
  };

  const followUser = async () => {
    await dispatch(followUserRequest({ username: user.username! }));
  };

  return (
    <div className="perC__main-container">
      <button className="perC__profile-container" onClick={goToUserProfile}>
        <img
          src={
            user.Profile?.profileImage !== ""
              ? user.Profile?.profileImage
              : defaultAvatar
          }
          alt={`${user.first_name}'s avatar`}
        />
        <p>
          {user.first_name} {user.last_name}
        </p>
      </button>
      <button id="perC__follow-btn" onClick={followUser}>
        Follow
      </button>
    </div>
  );
}
