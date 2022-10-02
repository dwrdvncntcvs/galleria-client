import React from "react";
import style from "./createPost.module.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { setModal } from "../../../features/modalSlice";
import { defaultAvatar } from "../../../assets/images";
import { RoundedAvatar } from "../../global";
import { useNavigate } from "react-router-dom";
import Card from "../../../layouts/Card/Card";
import CreatePostModal from "../CreatePostModal/CreatePostModal";

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
  const { status, name } = useAppSelector((state) => state.modalState);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const goToProfile = () => {
    console.log("Going to profile");
    navigate(`/${username}`);
  };

  return (
    <Card>
      <div className={style["create-post"]}>
        <div className={style.avatar}>
          <RoundedAvatar
            src={imageUrl === "" ? defaultAvatar : imageUrl}
            alt={`${firstName}'s avatar`}
            onClickAction={goToProfile}
          />
        </div>
        <button
          className={style["text-input"]}
          onClick={() =>
            dispatch(setModal({ status: true, name: "createPostModal" }))
          }
        >
          <p>What's on your mind, {firstName}?</p>
        </button>
        {status && name === "createPostModal" && <CreatePostModal />}
      </div>
    </Card>
  );
}
