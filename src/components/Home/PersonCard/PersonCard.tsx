import React from "react";
import { useNavigate } from "react-router-dom";
import { defaultAvatar } from "../../../assets/images";
import { UserProfile } from "../../../models/User";
import "./personCard.scss";

interface PersonCardProps {
  user: UserProfile;
}

export default function PersonCard({ user }: PersonCardProps) {
  const navigate = useNavigate();

  return (
    <div className="perC__main-container">
      <button
        className="perC__profile-container"
        onClick={() => navigate(`/${user.username}`)}
      >
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
      <button
        id="perC__follow-btn"
        onClick={() => console.log("Follow ", user.first_name)}
      >
        Follow
      </button>
    </div>
  );
}
