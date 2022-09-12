import React from "react";
import "./createPost.scss";
import { BsPersonFill } from "react-icons/bs";

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
  return (
    <div className="cp__main-container">
      <div className="cp__avatar-container">
        {imageUrl === "" ? (
          <BsPersonFill size={20} />
        ) : (
          <img src={imageUrl} alt={`${firstName}'s avatar`} />
        )}
      </div>
      <button className="cp__text-input">
        <p>Post Something ...</p>
      </button>
    </div>
  );
}
