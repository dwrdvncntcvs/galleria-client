import React, { useState } from "react";
import { closeModal } from "../../../features/modalSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { Backdrop, ButtonContainer } from "../../global";
import { HiX, HiPhotograph } from "react-icons/hi";
import "./createPostModal.scss";
import { createTextPost } from "../../../api/postRequest";
import { ImageBlob, Post } from "../../../models/Post";
import { v4 } from "uuid";
import AddImages from "../AddImages/AddImages";

export default function CreatePostModal() {
  const [post, setPost] = useState("");
  const [images, setImages] = useState<ImageBlob[]>([]);
  const [hasImage, setHasImage] = useState(false);
  const [show, setShow] = useState(false);

  const { userData } = useAppSelector((state) => state.userState);
  const dispatch = useAppDispatch();

  const createPostAction = async (e: any) => {
    const newDate = new Date();

    const data: Post = {
      id: v4(),
      content: post,
      createdAt: newDate,
      ImagePost: [],
      updatedAt: newDate,
      User: userData!,
      userId: userData?.id!,
    };

    let value: any;
    console.log(images);

    if (!hasImage) value = await dispatch(createTextPost(data));

    if (value.meta.requestStatus === "fulfilled") {
      dispatch(closeModal());
    }
  };

  return (
    <Backdrop>
      <div className="cpm__main-container">
        <section className="cpm__header-container">
          <h1>What's on your mind?</h1>
          <button onClick={() => dispatch(closeModal())}>
            <HiX />
          </button>
        </section>
        <section className="cpm__content-container">
          <textarea
            placeholder="Write something ..."
            value={post}
            rows={1}
            onChange={(e) => {
              e.currentTarget.style.height = "auto";
              e.currentTarget.style.height = `${e.target.scrollHeight}px`;
              setPost(e.target.value);
            }}
          ></textarea>
          {show && <AddImages setImages={setImages} />}
          <ButtonContainer>
            <button onClick={createPostAction!}>Post</button>
            <button
              onClick={() => {
                setShow((prev) => (prev = !prev));
                setImages([]);
                setHasImage((prev) => !prev);
              }}
            >
              {show ? <HiX size={20} /> : <HiPhotograph size={20} />}
            </button>
          </ButtonContainer>
        </section>
      </div>
    </Backdrop>
  );
}
