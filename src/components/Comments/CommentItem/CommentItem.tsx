import React from "react";
import { useNavigate } from "react-router-dom";
import { defaultAvatar } from "../../../assets/images";
import { useImageSrc } from "../../../hooks/imageHooks";
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
  const imageSrc = useImageSrc();

  const goToProfile = () => {
    navigate(`/${User.username}`);
  };

  return (
    <div className={style.comment}>
      <div className={style.header}>
        <RoundedAvatar
          src={imageSrc(User.Profile?.profileImage!)}
          alt={`${User.first_name}'s avatar`}
          onClickAction={goToProfile}
        />
        <div>
          <p>
            {User.first_name} {User.last_name}
          </p>
          <p>{convertDate(createdAt)}</p>
        </div>
      </div>
      <p>{text}</p>
      {imageUrl !== "" && <img src={imageUrl} alt={`comment-${id}`} />}
    </div>
  );
}
