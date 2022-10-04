import React, { useState } from "react";
import { ImagePost } from "../../../models/Post";
import { User } from "../../../models/User";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import style from "./previewPostImage.module.scss";

interface PreviewImageProps {
  imagePost: ImagePost[];
  userData: User;
}

export default function PreviewImage({
  imagePost,
  userData,
}: PreviewImageProps) {
  const [imageId, setImageId] = useState(0);

  const goLeft = () => {
    console.log("Going Left");
    if (imageId === 0) return;
    setImageId((prev) => prev - 1);
  };

  const goRight = () => {
    if (imageId === imagePost.length - 1) return;
    setImageId((prev) => prev + 1);
  };

  return (
    <div className={style["preview-post-image"]}>
      <img
        src={imagePost[imageId].postImageUrl}
        alt={`${userData?.first_name}'s post`}
        key={imagePost[imageId].id}
      />
      {imagePost.length > 1 && (
        <>
          {imageId !== 0 && (
            <button type="button" id={style.left} onClick={goLeft}>
              <HiChevronLeft />
            </button>
          )}
          {imageId !== imagePost.length - 1 && (
            <button type="button" id={style.right} onClick={goRight}>
              <HiChevronRight />
            </button>
          )}
        </>
      )}
    </div>
  );
}
