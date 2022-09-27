import React from "react";
import { HiOutlineChat } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { defaultAvatar } from "../../assets/images";
import { PostHeader } from "../../components/global";
import PostContent from "../../components/global/PostContent/PostContent";
import ActionsComponent from "../../components/Home/PostCard/ActionsComponent/ActionsComponent";
import { useAppSelector } from "../../hooks/reduxHook";
import ModalOverlay from "../../layouts/ModalOverlay/ModalOverlay";
import style from "./postDetails.module.scss";

export default function PostDetails() {
  const { userState } = useAppSelector((state) => state);

  const navigate = useNavigate();

  const commentVisibilityHandler = () => {
    navigate(`/home/post/1`, { replace: true });
  };

  const buttons = [
    {
      Icon: HiOutlineChat,
      label: "Comment",
      id: v4(),
      action: commentVisibilityHandler,
      count: 20,
    },
  ];

  return (
    <ModalOverlay className={style["post-details"]}>
      <button id={style.close}>Close</button>
      <section>
        <img className={style["post-images"]} src={defaultAvatar} alt="" />
      </section>
      <section>
        <PostHeader
          user={userState.userData!}
          postDate={userState.userData?.createdAt!}
        />
        <PostContent content="Hello World" />
        <ActionsComponent buttons={buttons} />
      </section>
    </ModalOverlay>
  );
}
