import React from "react";
import "./createPost.scss";
import { useAppDispatch } from "../../../hooks/reduxHook";
import { setModal } from "../../../features/modalSlice";
import { defaultAvatar } from "../../../assets/images";
import { RoundedAvatar } from "../../global";
import { useNavigate } from "react-router-dom";

interface CreatePostProps {
  userId: string;
  imageUrl: string;
  firstName: string;
  username: string;
}

export default function CreatePost({
  userId,
  imageUrl = "",
  firstName,
  username,
}: CreatePostProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const goToProfile = () => {
    console.log("Goind to profile");
    navigate(`/${username}`);
  };

  return (
    <div className="cp__main-container">
      <div className="cp__avatar-container">
        <RoundedAvatar
          src={imageUrl === "" ? defaultAvatar : imageUrl}
          alt={`${firstName}'s avatar`}
          onClickAction={goToProfile}
        />
      </div>
      <button
        className="cp__text-input"
        onClick={() =>
          dispatch(setModal({ status: true, name: "createPostModal" }))
        }
      >
        <p>What's on your mind, {firstName}?</p>
      </button>
    </div>
  );
}
