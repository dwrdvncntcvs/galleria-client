import React from "react";
import { HiTrash } from "react-icons/hi";
import style from "./displayImage.module.scss";

interface DisplayImageProps {
  src: string;
  alt: string;
  onRemoveImage: (id: string) => void;
  id: string;
}

export default function DisplayImage({
  src,
  alt,
  onRemoveImage,
  id,
}: DisplayImageProps) {
  return (
    <div className={style["preview-images"]}>
      <button id={style["remove-btn"]} onClick={(e) => onRemoveImage(id)}>
        <HiTrash />
      </button>
      <img src={src} alt={alt} />
    </div>
  );
}
