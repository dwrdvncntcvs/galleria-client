import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { updatePostContent } from "../../../api/postRequest";
import { closeModal } from "../../../features/modalSlice";
import { useAppDispatch } from "../../../hooks/reduxHook";
import { Post } from "../../../models/Post";
import PreviewImage from "../PreviewPostImage/PreviewPostImage";
import style from "./editPostForm.module.scss";

interface EditPostFormProps {
  post: Post;
}

export default function EditPostForm({ post }: EditPostFormProps) {
  const [content, setContent] = useState("");
  const dispatch = useAppDispatch();

  const submitEditedPost = async (e: SyntheticEvent) => {
    e.preventDefault();

    const { meta } = await dispatch(
      updatePostContent({ postId: post.id, content })
    );

    if (meta.requestStatus === "fulfilled") {
      setContent("");
      dispatch(closeModal());
    }
  };

  const contentHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = "auto";
    e.currentTarget.style.height = `${e.target.scrollHeight}px`;
    setContent(e.target.value);
  };

  return (
    <form onSubmit={submitEditedPost}>
      <textarea
        placeholder="Write something ..."
        rows={1}
        onChange={contentHandler}
        value={content}
      ></textarea>
      <div>
        <PreviewImage imagePost={post?.ImagePost!} userData={post?.User!} />
      </div>
      <button id={style.save} type="submit">
        Save Changes
      </button>
    </form>
  );
}
