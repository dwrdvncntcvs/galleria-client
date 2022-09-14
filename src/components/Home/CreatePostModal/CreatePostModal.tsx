import React, { useState } from "react";
import { closeModal } from "../../../features/modalSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { Backdrop, ButtonContainer } from "../../global";
import { HiX, HiPhotograph } from "react-icons/hi";
import "./createPostModal.scss";

export default function CreatePostModal() {
  const [post, setPost] = useState("");

  const { userData } = useAppSelector((state) => state.userState);
  const dispatch = useAppDispatch();

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
          <ButtonContainer>
            <button>Post</button>
            <button>
              <HiPhotograph size={20}/>
            </button>
          </ButtonContainer>
        </section>
      </div>
    </Backdrop>
  );
}
