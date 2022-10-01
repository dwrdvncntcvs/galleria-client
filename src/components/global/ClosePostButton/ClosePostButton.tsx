import React from "react";
import { HiX } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import style from "./closePostButton.module.scss";

export default function BackButton() {
  const navigate = useNavigate();
  const params = useParams();

  console.log("Params", params);

  const goBack = () => {
    if (params.username !== undefined) {
      navigate(`/${params.username}`);
    } else {
      navigate("/home");
    }
  };

  return (
    <button id={style["close"]} onClick={goBack}>
      <HiX />
    </button>
  );
}
