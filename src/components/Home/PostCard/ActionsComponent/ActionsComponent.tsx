import React from "react";
import style from "./actionsComponent.module.scss";
import { HiOutlineChat } from "react-icons/hi";
import { v4 } from "uuid";
import { IconType } from "react-icons/lib";

interface ActionsComponentProps {
  buttons: { Icon: IconType; label: string; id: string; action: () => void }[];
}

export default function ActionsComponent({ buttons }: ActionsComponentProps) {
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
