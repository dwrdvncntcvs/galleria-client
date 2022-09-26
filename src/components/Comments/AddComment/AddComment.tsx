import React, { ChangeEvent, useState } from "react";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import style from "./addComments.module.scss";

export default function AddComment() {
  const [comment, setComment] = useState("");

  const commentAction = (e: any) => {
    e.preventDefault();
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
