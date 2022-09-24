import React, { useState } from "react";
import moment from "moment";
import { Post } from "../../../models/Post";
import { PreviewPostImage } from "..";
import style from "./postCard.module.scss";
import { RoundedAvatar } from "../../global";
import { useNavigate } from "react-router-dom";
import Card from "../../../layouts/Card/Card";
import ActionsComponent from "./ActionsComponent/ActionsComponent";
import { CommentList } from "../../Comments";

interface PostProps {
  post: Post;
}

export default function PostCard({ post }: PostProps) {
  const { content, User, ImagePost, updatedAt } = post;
  const [showComments, setShowComments] = useState(false);
  const navigate = useNavigate();

  const convertDate = (date: Date) =>
    moment(date).format("MMMM D, YYYY | h:mm A");

  const goToProfile = () => {
    navigate(`/${User.username}`);
  };

  const commentVisibilityHandler = () => setShowComments((prev) => !prev);

  return (
    <Card>
      <header className={style.header}>
        <RoundedAvatar
          src={User.Profile?.profileImage!}
          alt={`${User.first_name}'s avatar`}
          onClickAction={goToProfile}
        />
        <div className={style["header-content"]}>
          <p>
            {User.first_name} {User.last_name}
          </p>
          <p>{convertDate(updatedAt)}</p>
        </div>
      </header>
      <div className={style.content}>
        <p>{content}</p>
      </div>
      {ImagePost.length > 0 && (
        <PreviewPostImage imagePost={ImagePost} userData={User} />
      )}
      <ActionsComponent onComment={commentVisibilityHandler} />
      {showComments && <CommentList />}
    </Card>
  );
}
