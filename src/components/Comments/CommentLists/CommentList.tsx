import React from "react";
import AddComment from "../AddComment/AddComment";
import Comment from "../Comment/Comment";
import style from "./commentList.module.scss";

export default function CommentList() {
  const commentArr: any[] = [];

  return (
    <div className={style.comments}>
      {commentArr.map(() => (
        <Comment />
      ))}
      <AddComment />
    </div>
  );
}