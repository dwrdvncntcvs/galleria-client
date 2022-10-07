import React from "react";
import { Image } from "../../../models/ImageGallery";
import { convertDate } from "../../../utils/helper";
import style from "./mainImage.module.scss";

interface MainImageProps {
  image: Image;
  onViewPost: (postId: string) => () => void;
}

export default function MainImage({ image, onViewPost }: MainImageProps) {
  return (
    <>
      <img className={style['main-image']} src={image?.postImageUrl} alt={`gallery-item-${image?.id}`} />
      <div className={style["image-details"]}>
        <p>Posted at {convertDate(image?.updatedAt!)}</p>
        <button
          className={style["view-post"]}
          onClick={onViewPost(image?.postId!)}
        >
          View Post
        </button>
      </div>
    </>
  );
}
