import React from "react";
import { Post } from "../../../models/Post";
import { PostCard, NoPostMessage } from "..";
import "./posts.scss";

interface PostsProps {
  posts: Post[];
  type?: "user" | "public";
  canView?: boolean;
}

export default function Posts({
  posts,
  type = "public",
  canView = true,
}: PostsProps) {
  let message: string;

  if (type === "user") {
    message = "This person hasn't posted anything yet.";
  } else if (type === "public") {
    message = "There are no posts on your feed.";
  }

  return canView ? (
    <>
      {posts.map((post, i) => (
        <PostCard post={post} key={post.id} />
      ))}
      <NoPostMessage posts={posts} message={message!} />
    </>
  ) : (
    <p>This account's posts are hidden...</p>
  );
}
