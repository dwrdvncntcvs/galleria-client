import React from "react";
import { Post } from "../../../models/Post";
import { PostCard, NoPostMessage } from "..";
import "./posts.scss";

interface PostsProps {
  posts: Post[];
  type?: "user" | "public";
}

export default function Posts({ posts, type = "public" }: PostsProps) {
  let message: string;

  if (type === "user") {
    message = "This person hasn't posted anything yet.";
  } else if (type === "public") {
    message = "There are no posts on your feed.";
  }

  return (
    <>
      {posts.map((post, i) => (
        <PostCard post={post} key={post.id} />
      ))}
      <NoPostMessage
        posts={posts}
        message={message!}
      />
    </>
  );
}
