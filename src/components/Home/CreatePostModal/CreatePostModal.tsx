import React from "react";
import { setModal } from "../../../features/modalSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { Backdrop } from "../../global";
import "./createPostModal.scss";

export default function CreatePostModal() {
  const { userData } = useAppSelector((state) => state.userState);
  const dispatch = useAppDispatch();

  return (
    <Backdrop>
      <div className="cpm__main-container">
        <h1>Create Post Modal</h1>
        <button onClick={() => dispatch(setModal({ status: false, name: "" }))}>
          CLose
        </button>
        <p>{userData?.id}</p>
      </div>
    </Backdrop>
  );
}
