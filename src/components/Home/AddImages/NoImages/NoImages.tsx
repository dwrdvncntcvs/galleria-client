import React from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import style from "./noImages.module.scss";

export default function NoImages() {
  return (
    <div className={style.empty}>
      <p>Add Image</p>
      <p>
        <HiOutlinePhotograph size={30} />
      </p>
    </div>
  );
}
