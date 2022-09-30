import React from "react";
import { Image } from "../../../../models/ImageGallery";
import style from "./imageItem.module.scss";

interface ImageItemProps {
  count: number;
  images: Image[];
  postImageUrl: string;
  imageId: string;
  index: number;
}

export default function ImageItem({
  count,
  imageId,
  images,
  postImageUrl,
  index,
}: ImageItemProps) {
  return (
    <div className={style["image-container"]}>
      {5 === index && (
        <div className={style.last}>
          <button>{count - images.length}</button>
        </div>
      )}
      <img src={postImageUrl} alt={imageId} />
    </div>
  );
}
