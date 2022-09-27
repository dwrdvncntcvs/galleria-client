import React, { ChangeEvent, useState } from "react";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { createComment } from "../../../api/commentRequest";
import { useAppDispatch } from "../../../hooks/reduxHook";
import style from "./addComments.module.scss";

interface AddCommentProps {
  postId: string;
}

export default function AddComment({ postId }: AddCommentProps) {
  const [comment, setComment] = useState("");

  const dispatch = useAppDispatch();

  const commentAction = async (e: any) => {
    e.preventDefault();

    const data = {
      postId,
      text: comment,
    };

    console.log("Comment Data: ", data);
    await dispatch(createComment(data));

    setComment("");
  };

  const postInputHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = "auto";
    e.currentTarget.style.height = `${e.target.scrollHeight}px`;
    setComment(e.target.value);
  };

  return (
    <form className={style["add-comment"]} onSubmit={commentAction}>
      <textarea
        placeholder="Comment here..."
        value={comment}
        rows={1}
        onChange={postInputHandler}
      />
      <button type="submit">
        <HiOutlinePaperAirplane id={style["btn-logo"]} />
      </button>
    </form>
  );
}
