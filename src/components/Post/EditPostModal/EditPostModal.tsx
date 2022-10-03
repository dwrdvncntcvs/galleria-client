import React from "react";
import { useAppSelector } from "../../../hooks/reduxHook";
import { ModalOverlay } from "../../../layouts";
import style from "./editPostModal.module.scss";

export default function EditPostModal() {
  const { posts } = useAppSelector((state) => state.postState);
  const { props } = useAppSelector((state) => state.modalState);

  const { postId } = props as { postId: string };

  const post = posts.filter((post) => post.id === postId)[0];

  console.log("Post: ", post);

  return (
    <ModalOverlay>
      <div>EditPostModal</div>
    </ModalOverlay>
  );
}
