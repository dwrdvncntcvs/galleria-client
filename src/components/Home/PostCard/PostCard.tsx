import React, { useState } from "react";
import moment from "moment";
import { Post } from "../../../models/Post";
import { PreviewPostImage } from "..";
import style from "./postCard.module.scss";
import { RoundedAvatar } from "../../global";
import { useNavigate } from "react-router-dom";
import Card from "../../../layouts/Card/Card";
import ActionsComponent from "./ActionsComponent/ActionsComponent";
import { AddComment, CommentList } from "../../Comments";
import { HiOutlineChat } from "react-icons/hi";
import { v4 } from "uuid";
import { defaultAvatar } from "../../../assets/images";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { setToggle } from "../../../features/toggleSlice";

interface PostProps {
  post: Post;
}

export default function PostCard({ post }: PostProps) {
  const { content, User, ImagePost, updatedAt, id } = post;
  // const [showComments, setShowComments] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toggleState } = useAppSelector((state) => state);

  const convertDate = (date: Date) =>
    moment(date).format("MMMM D, YYYY | h:mm A");

  const goToProfile = () => {
    navigate(`/${User.username}`);
  };

  const commentVisibilityHandler = () => {
    dispatch(setToggle({ status: !toggleState.status, name: `post-${id}` }));
    // setShowComments((prev) => !prev);
  };

  const buttons = [
    {
      Icon: HiOutlineChat,
      label: "Comment",
      id: v4(),
      action: commentVisibilityHandler,
    },
  ];

  return (
    <Card>
      <header className={style.header}>
        <RoundedAvatar
          src={
            User.Profile?.profileImage! !== ""
              ? User.Profile?.profileImage!
              : defaultAvatar
          }
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
      <ActionsComponent buttons={buttons} />
      <AddComment />
    </Card>
  );
}
