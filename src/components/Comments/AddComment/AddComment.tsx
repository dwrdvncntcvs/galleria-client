import React from "react";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import style from "./addComments.module.scss";

export default function AddComment() {
  const commentAction = (e: any) => {
    e.preventDefault();
  };

  return (
    <form className={style["add-comment"]} onSubmit={commentAction}>
      <input placeholder="Comment here..." />
      <button type="submit">
        <HiOutlinePaperAirplane id={style["btn-logo"]} />
      </button>
    </form>
  );
}
