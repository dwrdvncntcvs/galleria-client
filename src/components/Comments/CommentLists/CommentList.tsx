import React from "react";
import { Comment } from "../../../models/Comments";
import CommentItem from "../CommentItem/CommentItem";
import style from "./commentList.module.scss";

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  return (
    <div className={style.comments}>
      {comments.map((comment, i) => (
        <CommentItem key={i} comment={comment} />
      ))}
    </div>
  );
}
