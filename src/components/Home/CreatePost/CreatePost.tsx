import React from "react";
import "./createPost.scss";
import { BsPersonFill } from "react-icons/bs";

export default function CreatePost() {
  return (
    <div className="cp__main-container">
      <div className="cp__avatar-container">
        <BsPersonFill size={20} />
      </div>
      <button className="cp__text-input">
        <p>Post Something ...</p>
      </button>
    </div>
  );
}
