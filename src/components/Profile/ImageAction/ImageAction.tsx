import React from "react";
import { Dropdown } from "../../../UI";
import style from "./imageAction.module.scss";

export default function ImageAction() {
  return (
    <Dropdown>
      <div className={style["image-action"]}>
        <button>View</button>
        <button>Update</button>
      </div>
    </Dropdown>
  );
}
