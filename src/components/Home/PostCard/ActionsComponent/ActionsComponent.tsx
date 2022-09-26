import React from "react";
import style from "./actionsComponent.module.scss";
import { IconType } from "react-icons/lib";

interface ActionsComponentProps {
  buttons: {
    Icon: IconType;
    label: string;
    id: string;
    action: () => void;
    count: number;
  }[];
}

export default function ActionsComponent({ buttons }: ActionsComponentProps) {
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
