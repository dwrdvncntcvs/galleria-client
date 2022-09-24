import React from "react";
import Comment from "../Comment/Comment";
import style from "./commentList.module.scss";

export default function CommentList() {
  const commentArr = [1, 2, 3];

  return (
    <div className={style.comments}>
      {commentArr.map(() => (
        <Comment />
      ))}
    </div>
  );
}
