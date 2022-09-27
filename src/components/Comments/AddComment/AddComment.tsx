import React, { ChangeEvent, useState } from "react";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { v4 } from "uuid";
import { createComment } from "../../../api/commentRequest";
import { addComment } from "../../../features/commentSlice";
import { updatePostCount } from "../../../features/postSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { Comment } from "../../../models/Comments";
import style from "./addComments.module.scss";

interface AddCommentProps {
  postId: string;
}

export default function AddComment({ postId }: AddCommentProps) {
  const [comment, setComment] = useState("");

  const dispatch = useAppDispatch();
  const { userState, postState } = useAppSelector((state) => state);

  const { userData } = userState;

  const commentAction = async (e: any) => {
    e.preventDefault();

    const data = {
      text: comment,
      postId,
    };

    const commentData: Comment = {
      createdAt: new Date(),
      User: userData!,
      text: comment,
      postId,
      id: v4(),
      imageUrl: "",
    };

    console.log("Comment Data: ", data);
    const response = await dispatch(createComment(data));

    if (response.meta.requestStatus === "fulfilled") {
      dispatch(addComment(commentData));
      dispatch(updatePostCount(postState.post?.commentsCount! + 1));
      setComment("");
    }
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
