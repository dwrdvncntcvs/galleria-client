import React, { useEffect, useState } from "react";
import { HiX } from "react-icons/hi";
import { closeModal } from "../../../features/modalSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { ModalOverlay } from "../../../UI";
import { Post } from "../../../models/Post";
import { EditPostForm } from "..";
import style from "./editPostModal.module.scss";
import useLocalStorage from "../../../hooks/useLocalStorage";

export default function EditPostModal() {
  const [curPost, setCurPost] = useState<Post>();
  const { posts } = useAppSelector((state) => state.postState);
  const { props } = useAppSelector((state) => state.modalState);
  const dispatch = useAppDispatch();
  const P_E_LS = useLocalStorage("p_e");

  const { postId } = props as { postId: string };

  useEffect(() => {
    const post: Post = posts.filter((post) => post.id === postId)[0];
    if (!post) {
      const post = P_E_LS.getItemJSON<Post>();
      setCurPost((prev) => ({ ...prev, ...post }));
    } else {
      console.log("Saving to local storage...");
      P_E_LS.addItem(post);
      setCurPost(post);
    }
  }, [postId, posts, P_E_LS]);

  const closeModalAction = () => {
    dispatch(closeModal());
  };

  return curPost ? (
    <ModalOverlay>
      <div className={style["edit-post"]}>
        <header>
          <h1>Edit Post</h1>
          <button type="button" onClick={closeModalAction}>
            <HiX />
          </button>
        </header>
        <EditPostForm post={curPost} />
      </div>
    </ModalOverlay>
  ) : null;
}
