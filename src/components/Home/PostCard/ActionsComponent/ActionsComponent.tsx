import React from "react";
import style from "./actionsComponent.module.scss";
import { HiOutlineChat } from "react-icons/hi";
import { v4 } from "uuid";

interface ActionsComponentProps {
  onComment: () => void;
}

export default function ActionsComponent({ onComment }: ActionsComponentProps) {
  const buttons = [
    { Icon: HiOutlineChat, label: "Comment", id: v4(), action: onComment },
  ];

  return (
    <section className={style.actions}>
      {buttons.map(({ Icon, label, id, action }) => (
        <button type="button" key={id} onClick={action}>
          <Icon size={20} /> {label}
        </button>
      ))}
    </section>
  );
}
