import React from "react";
import "./createPost.scss";
import { BsPersonFill } from "react-icons/bs";
import { useAppDispatch } from "../../../hooks/reduxHook";
import { setModal } from "../../../features/modalSlice";

interface CreatePostProps {
  userId: string;
  imageUrl: string;
  firstName: string;
}

export default function CreatePost({
  userId,
  imageUrl = "",
  firstName,
}: CreatePostProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="cp__main-container">
      <div className="cp__avatar-container">
        {imageUrl === "" ? (
          <BsPersonFill size={20} />
        ) : (
          <img src={imageUrl} alt={`${firstName}'s avatar`} />
        )}
      </div>
      <button
        className="cp__text-input"
        onClick={() =>
          dispatch(setModal({ status: true, name: "createPostModal" }))
        }
      >
        <p>What's on your mind {firstName}?</p>
      </button>
    </div>
  );
}
