import React from "react";
import style from "./postContent.module.scss";

interface PostContentProps {
  content: string;
}

export default function PostContent({ content }: PostContentProps) {
  return (
    <div className={style.content}>
      <p>{content}</p>
    </div>
  );
}
