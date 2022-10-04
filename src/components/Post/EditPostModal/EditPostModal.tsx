import React, {
  ChangeEvent,
  FormEventHandler,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { HiX } from "react-icons/hi";
import { closeModal } from "../../../features/modalSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { ModalOverlay } from "../../../layouts";
import { Post } from "../../../models/Post";
import PreviewImage from "../PreviewPostImage/PreviewPostImage";
import style from "./editPostModal.module.scss";

export default function EditPostModal() {
  const [curPost, setCurPost] = useState<Post>();
  const [content, setContent] = useState("");
  const { posts } = useAppSelector((state) => state.postState);
  const { props } = useAppSelector((state) => state.modalState);
  const dispatch = useAppDispatch();

  const { postId } = props as { postId: string };

  useEffect(() => {
    const post: Post = posts.filter((post) => post.id === postId)[0];
    if (!post) {
      const post = JSON.parse(localStorage.getItem("p_e")!);
      setCurPost((prev) => ({ ...prev, ...post }));
    } else {
      console.log("Saving to local storage...");
      localStorage.setItem("p_e", JSON.stringify(post));
      setCurPost(post);
    }
  }, [postId]);

  const contentHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = "auto";
    e.currentTarget.style.height = `${e.target.scrollHeight}px`;
    setContent(e.target.value);
  };

  const closeModalAction = () => {
    dispatch(closeModal());
  };

  const submitEditedPost = (e: SyntheticEvent) => {
    e.preventDefault();
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
        <form onSubmit={submitEditedPost}>
          <textarea
            placeholder="Write something ..."
            rows={1}
            onChange={contentHandler}
            value={content}
          ></textarea>
          <div>
            <PreviewImage
              imagePost={curPost?.ImagePost!}
              userData={curPost?.User!}
            />
          </div>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </ModalOverlay>
  ) : null;
}
