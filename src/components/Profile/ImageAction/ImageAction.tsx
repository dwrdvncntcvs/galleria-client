import React from "react";
import { HiEye, HiPencilAlt } from "react-icons/hi";
import { IconType } from "react-icons/lib";
import { setModal } from "../../../features/modalSlice";
import { closeToggle } from "../../../features/toggleSlice";
import { useAppDispatch } from "../../../hooks/reduxHook";
import { Dropdown } from "../../../UI";
import { modalName } from "../../../variables";
import style from "./imageAction.module.scss";

type ImageActionButtons = {
  Icon: IconType;
  label: string;
  action: () => void;
};

interface ImageActionProps {
  imageSrc: string;
}

export default function ImageAction({ imageSrc }: ImageActionProps) {
  const dispatch = useAppDispatch();

  const buttons: ImageActionButtons[] = [
    {
      Icon: HiEye,
      label: "View",
      action: () => {
        dispatch(
          setModal({
            status: true,
            name: modalName.VIEW_PROFILE_IMAGE_MODAL,
            props: { imageSrc },
          })
        );
        dispatch(closeToggle());
      },
    },
    {
      Icon: HiPencilAlt,
      label: "Update",
      action: () => {
        dispatch(
          setModal({
            status: true,
            name: modalName.UPDATE_PROFILE_IMAGE_MODAL,
            props: { imageSrc },
          })
        );
        dispatch(closeToggle());
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
