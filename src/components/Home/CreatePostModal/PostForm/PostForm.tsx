import React, { useState, ChangeEvent } from "react";
import { HiPhotograph, HiX } from "react-icons/hi";
import { createPost } from "../../../../api/postRequest";
import { closeModal } from "../../../../features/modalSlice";
import { useAppDispatch } from "../../../../hooks/reduxHook";
import { ButtonContainer } from "../../../../layouts";
import { ImageBlob, ImagePost, PostData } from "../../../../models/Post";
import AddImages from "../../AddImages/AddImages";
import style from "./postForm.module.scss";

interface PostFormProp {
  setLoading: (value: boolean) => void;
}

export default function PostForm({ setLoading }: PostFormProp) {
  const [post, setPost] = useState("");
  const [show, setShow] = useState(false);
  const [imageUrls, setImageUrls] = useState<ImagePost[]>([]);
  const [images, setImages] = useState<ImageBlob[]>([]);
  const [hasImage, setHasImage] = useState(false);
  const dispatch = useAppDispatch();

  const createPostAction = async (e: any) => {
    const data: PostData = {
      content: post,
      imagePost: images,
      hasImage,
    };

    setLoading(true);
    const value = await dispatch(createPost({ postData: data, imageUrls }));

    if (value.meta.requestStatus === "fulfilled") {
      setLoading(false);
      dispatch(closeModal());
    }
  };

  const postInputHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = "auto";
    e.currentTarget.style.height = `${e.target.scrollHeight}px`;
    setPost(e.target.value);
  };

  const imagesAction = () => {
    setShow((prev) => (prev = !prev));
    setImages([]);
    setHasImage((prev) => !prev);
  };

  return (
    <section className={style["post-form"]}>
      <textarea
        placeholder="Write something ..."
        value={post}
        rows={1}
        onChange={postInputHandler}
      ></textarea>
      {show && <AddImages setImages={setImages} setImageUrls={setImageUrls} />}
      <ButtonContainer>
        <button onClick={createPostAction}>Post</button>
        <button onClick={imagesAction}>
          {show ? <HiX size={20} /> : <HiPhotograph size={20} />}
        </button>
      </ButtonContainer>
    </section>
  );
}
