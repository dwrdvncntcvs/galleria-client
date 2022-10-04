import React from "react";
import style from "./postActionsComponent.module.scss";
import { HiOutlineChat, HiOutlineHeart } from "react-icons/hi";
import { v4 } from "uuid";
import { useLocation, useNavigate } from "react-router-dom";

interface ActionsComponentProps {
  commentsCount: number;
  postId: string;
}

export default function PostActionsComponent({
  commentsCount,
  postId,
}: ActionsComponentProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const commentVisibilityHandler = () => {
    if (location.pathname !== `/post/${postId}`)
      navigate(`/post/${postId}`, {
        replace: true,
        state: { from: location.pathname },
      });
  };

  const buttons = [
    {
      Icon: HiOutlineHeart,
      label: "Like",
      id: v4(),
      action: () => {
        console.log("Liked");
      },
      count: 0,
    },
    {
      Icon: HiOutlineChat,
      label: "Comment",
      id: v4(),
      action: commentVisibilityHandler,
      count: commentsCount,
    },
  ];

  return (
    <section className={style.actions}>
      {buttons.map(({ Icon, label, id, action, count }) => (
        <button type="button" key={id} onClick={action}>
          <Icon size={20} />
          {count > 0 ? <span>{count.toLocaleString()}</span> : ""}
        </button>
      ))}
    </section>
  );
}
