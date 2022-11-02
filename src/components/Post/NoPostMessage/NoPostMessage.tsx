import React from "react";
import { Post } from "../../../models/Post";
import style from "./noPostMessage.module.scss";

interface NoPostMessageProps {
  posts: Post[];
  message: string;
}

export default function NoPostMessage({ message, posts }: NoPostMessageProps) {
  return posts.length < 1 ? (
    <div className={style["no-post-msg"]}>
      <p>{message}</p>
    </div>
  ) : null;
}
