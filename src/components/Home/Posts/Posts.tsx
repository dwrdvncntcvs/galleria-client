import React from "react";
import { Post } from "../../../models/Post";
import PostCard from "../PostCard/PostCard";
import "./posts.scss";

interface PostsProps {
  posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      {posts.map((post, i) => (
        <PostCard post={post} key={post.id} />
      ))}
    </>
  );
}
