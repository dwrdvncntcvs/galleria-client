import React from "react";
import style from "./postActionDropdown.module.scss";
import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";
import { useAppDispatch } from "../../../hooks/reduxHook";
import { deletePostRequest } from "../../../api/postRequest";
import { useLocation, useNavigate } from "react-router-dom";
import { setModal } from "../../../features/modalSlice";
import { modalName } from "../../../variables";

interface PostActionDropdownProps {
  postId: string;
  onClose: () => void;
}

export default function PostActionDropdown({
  postId,
  onClose,
}: PostActionDropdownProps) {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const actionButtons = [
    {
      label: "Edit",
      Icon: HiOutlinePencil,
      action: async () => {
        onClose();
        console.log("Editing Post: ", postId);
        dispatch(
          setModal({
            name: modalName.EDIT_POST_MODAL,
            status: true,
            props: { postId },
          })
        );
      },
    },
    {
      label: "Delete",
      Icon: HiOutlineTrash,
      action: async () => {
        console.log("Deleting Post: ", postId);
        const { meta } = await dispatch(deletePostRequest({ postId }));
        if (
          meta.requestStatus === "fulfilled" &&
          location.pathname === `/post/${postId}`
        ) {
          onClose();
          navigate((location.state as { from: string }).from);
        }
      },
    },
  ];

  return (
    <>
      <div className={style["dropdown-container"]}>
        {actionButtons.map(({ Icon, label, action }, i) => (
          <button className={style["action-button"]} key={i} onClick={action}>
            {label} <Icon />
          </button>
        ))}
      </div>
    </>
  );
}
