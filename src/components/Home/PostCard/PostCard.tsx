import React from "react";
import { Post } from "../../../models/Post";
import style from "./postCard.module.scss";
import { PostHeader, PreviewPostImage } from "../../global";
import { useNavigate } from "react-router-dom";
import Card from "../../../layouts/Card/Card";
import ActionsComponent from "./ActionsComponent/ActionsComponent";
import { AddComment } from "../../Comments";
import { HiOutlineChat } from "react-icons/hi";
import { v4 } from "uuid";
import PostContent from "../../global/PostContent/PostContent";

interface PostProps {
  post: Post;
}

export default function PostCard({ post }: PostProps) {
  const { content, User, ImagePost, updatedAt, id, commentsCount } = post;

  const navigate = useNavigate();

  const commentVisibilityHandler = () => {
    navigate(`post/${id}`);
  };

  const buttons = [
    {
      Icon: HiOutlineChat,
      label: "Comment",
      id: v4(),
      action: commentVisibilityHandler,
      count: commentsCount,
    },
  ];

  return (
    <Card>
      <PostHeader user={User} postDate={updatedAt} />
      <PostContent content={content} />
      {ImagePost.length > 0 && (
        <PreviewPostImage imagePost={ImagePost} userData={User} />
      )}
      <ActionsComponent buttons={buttons} />
      <AddComment />
    </Card>
  );
}
