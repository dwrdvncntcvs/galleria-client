import React from "react";
import { Dropdown } from "../../../UI";
import style from "./imageAction.module.scss";

export default function ImageAction() {
  const buttons = [
    {
      label: "View",
      action: () => {
        console.log("View");
      },
    },
    {
      label: "Update",
      action: () => {
        console.log("Update");
      },
    },
  ];

  return (
    <Dropdown>
      <div className={style["image-action"]}>
        {buttons.map(({ label, action }, i) => (
          <button onClick={action} key={i}>
            {label}
          </button>
        ))}
      </div>
    </Dropdown>
  );
}
