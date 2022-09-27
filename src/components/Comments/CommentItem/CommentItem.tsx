import React from "react";
import { useNavigate } from "react-router-dom";
import { Comment } from "../../../models/Comments";
import { convertDate } from "../../../utils/helper";
import { RoundedAvatar } from "../../global";
import style from "./comment.module.scss";

interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  const { text, imageUrl, postId, createdAt, User, id } = comment;
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate(`/${User.username}`);
  };

  return (
    <div>
      <RoundedAvatar
        src={User.Profile?.profileImage!}
        alt={`${User.first_name}'s avatar`}
        onClickAction={goToProfile}
      />
      <h1>
        {User.first_name} {User.last_name}
      </h1>
      <p>{convertDate(createdAt)}</p>
      <p>{text}</p>
      {imageUrl !== "" && <img src={imageUrl} alt={`comment-${id}`} />}
    </div>
  );
}
