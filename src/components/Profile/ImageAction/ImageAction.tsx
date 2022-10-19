import React from "react";
import { HiEye, HiPencilAlt } from "react-icons/hi";
import { IconType } from "react-icons/lib";
import { Dropdown } from "../../../UI";
import style from "./imageAction.module.scss";

type ImageActionButtons = {
  Icon: IconType;
  label: string;
  action: () => void;
};

export default function ImageAction() {
  const buttons: ImageActionButtons[] = [
    {
      Icon: HiEye,
      label: "View",
      action: () => {
        console.log("View");
      },
    },
    {
      Icon: HiPencilAlt,
      label: "Update",
      action: () => {
        console.log("Update");
      },
    },
  ];

  return (
    <Dropdown>
      <div className={style["image-action"]}>
        {buttons.map(({ label, action, Icon }, i) => (
          <button onClick={action} key={i}>
            <Icon />
            {label}
          </button>
        ))}
      </div>
    </Dropdown>
  );
}
