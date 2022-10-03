import React from "react";
import style from "./postActionDropdown.module.scss";
import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";

interface PostActionDropdownProps {
  postId: string;
}

export default function PostActionDropdown({
  postId,
}: PostActionDropdownProps) {
  const actionButtons = [
    {
      label: "Edit",
      Icon: HiOutlinePencil,
      action: () => {
        console.log("Editing Post: ", postId);
      },
    },
    {
      label: "Delete",
      Icon: HiOutlineTrash,
      action: () => {
        console.log("Deleting Post: ", postId);
      },
    },
  ];

  return (
    <div className={style["dropdown-container"]}>
      {actionButtons.map(({ Icon, label, action }, i) => (
        <button className={style["action-button"]} key={i} onClick={action}>
          {label} <Icon /> 
        </button>
      ))}
    </div>
  );
}
