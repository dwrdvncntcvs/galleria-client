import React from "react";
import { Post } from "../../../models/Post";
import style from "./postCard.module.scss";
import { PostHeader, PreviewPostImage } from "../../global";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "../../../layouts/Card/Card";
import ActionsComponent from "./ActionsComponent/ActionsComponent";
import { AddComment } from "../../Comments";
import { HiOutlineChat, HiOutlineHeart } from "react-icons/hi";
import { v4 } from "uuid";
import PostContent from "../../global/PostContent/PostContent";
import { useAppSelector } from "../../../hooks/reduxHook";

interface PostProps {
  post: Post;
}

export default function PostCard({ post }: PostProps) {
  const { content, User, ImagePost, updatedAt, id, commentsCount } = post;

  const { isAuth } = useAppSelector((state) => state.userState);

  return (
    <Card>
      <PostHeader user={User} postDate={updatedAt} />
      <PostContent content={content} />
      {ImagePost.length > 0 && (
        <PreviewPostImage imagePost={ImagePost} userData={User} />
      )}
      <ActionsComponent postId={id} commentsCount={commentsCount} />
      {isAuth && <AddComment postId={id} />}
    </Card>
  );
}
