import React from "react";
import { Post } from "../../../models/Post";
import Card from "../../../layouts/Card/Card";
import { AddComment } from "../../Comments";
import { useAppSelector } from "../../../hooks/reduxHook";
import {
  PostActionsComponent,
  PreviewPostImage,
  PostContent,
  PostHeader,
} from "..";

interface PostProps {
  post: Post;
}

export default function PostCard({ post }: PostProps) {
  const { content, User, ImagePost, updatedAt, id, commentsCount } = post;

  const { isAuth } = useAppSelector((state) => state.userState);

  return (
    <Card>
      <PostHeader user={User} postDate={updatedAt} postId={id} />
      <PostContent content={content} />
      {ImagePost.length > 0 && (
        <PreviewPostImage imagePost={ImagePost} userData={User} />
      )}
      <PostActionsComponent postId={id} commentsCount={commentsCount} />
      {isAuth && <AddComment postId={id} />}
    </Card>
  );
}
