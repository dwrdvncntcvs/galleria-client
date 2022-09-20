import React, { useState } from "react";
import { closeModal } from "../../../features/modalSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { HiX, HiPhotograph } from "react-icons/hi";
import "./createPostModal.scss";
import {
  generatePostFromUserInput,
  ImageBlob,
  ImagePost,
  PostData,
} from "../../../models/Post";
import AddImages from "../AddImages/AddImages";
import { createPost } from "../../../api/postRequest";
import { Backdrop, ButtonContainer } from "../../../layouts";
import { addPost } from "../../../features/postSlice";

export default function CreatePostModal() {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState("");
  const [images, setImages] = useState<ImageBlob[]>([]);
  const [imageUrls, setImageUrls] = useState<ImagePost[]>([]);
  const [hasImage, setHasImage] = useState(false);
  const [show, setShow] = useState(false);
  const { userState } = useAppSelector((state) => state);
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

  return (
    <Backdrop>
      {loading ? (
        <div className="cpm__main-container">
          <h1>Posting...</h1>
        </div>
      ) : (
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
            {show && (
              <AddImages setImages={setImages} setImageUrls={setImageUrls} />
            )}
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
      )}
    </Backdrop>
  );
}
