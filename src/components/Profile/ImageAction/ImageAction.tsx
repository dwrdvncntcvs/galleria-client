import React from "react";
import { HiEye, HiPencilAlt } from "react-icons/hi";
import { IconType } from "react-icons/lib";
import { setModal } from "../../../features/modalSlice";
import { useActiveModal } from "../../../hooks/modalHooks";
import { useAppDispatch } from "../../../hooks/reduxHook";
import { Dropdown } from "../../../UI";
import { ViewImage } from "../../Images";
import style from "./imageAction.module.scss";

type ImageActionButtons = {
  Icon: IconType;
  label: string;
  action: () => void;
};

export default function ImageAction() {
  const dispatch = useAppDispatch();
  const checkIfModalActive = useActiveModal();

  const buttons: ImageActionButtons[] = [
    {
      Icon: HiEye,
      label: "View",
      action: () => {
        dispatch(
          setModal({ status: true, name: "viewImageProfileModal", props: {} })
        );
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
      {checkIfModalActive("viewImageProfileModal") && <ViewImage />}
    </Dropdown>
  );
}
