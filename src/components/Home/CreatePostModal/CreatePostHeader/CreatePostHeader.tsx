import React from "react";
import { HiX } from "react-icons/hi";
import { closeModal } from "../../../../features/modalSlice";
import { useAppDispatch } from "../../../../hooks/reduxHook";
import style from "./createPostHeader.module.scss";

export default function CreatePostHeader() {
  const dispatch = useAppDispatch();

  return (
    <section className={style.header}>
      <h1>What's on your mind?</h1>
      <button onClick={() => dispatch(closeModal())}>
        <HiX />
      </button>
    </section>
  );
}
