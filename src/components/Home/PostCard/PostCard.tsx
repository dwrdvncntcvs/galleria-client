import React from "react";
import { Post } from "../../../models/Post";
import { PostHeader, PreviewPostImage } from "../../global";
import Card from "../../../layouts/Card/Card";
import ActionsComponent from "./ActionsComponent/ActionsComponent";
import { AddComment } from "../../Comments";
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
