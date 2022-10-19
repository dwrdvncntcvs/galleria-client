import React from "react";
import style from "./createPost.module.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { setModal } from "../../../features/modalSlice";
import { RoundedAvatar } from "../../global";
import { useNavigate } from "react-router-dom";
import Card from "../../../UI/Card/Card";
import CreatePostModal from "../CreatePostModal/CreatePostModal";
import { useImageSrc } from "../../../hooks/imageHooks";
import { modalName } from "../../../variables";
import { useActiveModal } from "../../../hooks/modalHooks";

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
  const imageSrc = useImageSrc();
  const checkIfModalActive = useActiveModal();

  const goToProfile = () => {
    console.log("Going to profile");
    navigate(`/${username}`);
  };

  return (
    <Card>
      <div className={style["create-post"]}>
        <div className={style.avatar}>
          <RoundedAvatar
            src={imageSrc(imageUrl)}
            alt={`${firstName}'s avatar`}
            onClickAction={goToProfile}
          />
        </div>
        <button
          className={style["text-input"]}
          onClick={() =>
            dispatch(
              setModal({ status: true, name: modalName.CREATE_POST_MODAL })
            )
          }
        >
          <p>What's on your mind, {firstName}?</p>
        </button>
        {checkIfModalActive(modalName.CREATE_POST_MODAL) && <CreatePostModal />}
      </div>
    </Card>
  );
}
