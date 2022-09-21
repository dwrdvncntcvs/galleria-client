import moment from "moment";
import React from "react";
import { Post } from "../../../models/Post";
import { PreviewPostImage } from "..";
import "./postCard.scss";
import { RoundedAvatar } from "../../global";
import { useNavigate } from "react-router-dom";

interface PostProps {
  post: Post;
}

export default function PostCard({ post }: PostProps) {
  const { content, User, ImagePost, updatedAt } = post;
  const navigate = useNavigate();

  const convertDate = (date: Date) =>
    moment(date).format("MMMM Do, YYYY | h:mm A");

  const goToProfile = () => {
    navigate(`/${User.username}`);
  };

  return (
    <div className="pc__main-container">
      <div className="pc__header-container">
        <RoundedAvatar
          src={User.Profile?.profileImage!}
          alt={`${User.first_name}'s avatar`}
          onClickAction={goToProfile}
        />
        <div>
          <p>
            {User.first_name} {User.last_name}
          </p>
          <p>{convertDate(updatedAt)}</p>
        </div>
      </div>
      <div className="pc__content-container">
        <p>{content}</p>
      </div>
      {ImagePost.length > 0 && (
        <PreviewPostImage imagePost={ImagePost} userData={User} />
      )}
    </div>
  );
}
