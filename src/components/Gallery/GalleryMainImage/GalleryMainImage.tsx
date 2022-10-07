import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Image } from "../../../models/ImageGallery";
import { convertDate } from "../../../utils/helper";
import style from "./galleryMainImage.module.scss";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";

interface GalleryMainImageProps {
  images: Image[];
}

export default function GalleryMainImage({ images }: GalleryMainImageProps) {
  const [previewImage, setPreviewImage] = useState<Image>(images[0]);
  const [leftList, setLeftList] = useState<Image[]>([]);
  const [rightList, setRightList] = useState<Image[]>([
    ...images.filter((image) => image.id !== images[0].id),
  ]);
  const navigate = useNavigate();
  const location = useLocation();

  const viewPostAction = (postId: string) => () => {
    navigate(`/post/${postId}`, { state: { from: location.pathname } });
  };

  const navigateLeft = () => {
    const previousElement = leftList[leftList.length - 1];
    setLeftList((prev) =>
      prev.filter((image) => image.id !== previousElement.id)
    );
    setPreviewImage(previousElement);
    setRightList((prev) => [previewImage, ...prev]);
  };

  const navigateRight = () => {
    const nextElement = rightList[0];
    setRightList((prev) => prev.filter((image) => image.id !== nextElement.id));
    setPreviewImage(nextElement);
    setLeftList((prev) => [...prev, previewImage]);
  };

  return (
    <div className={style["main-container"]}>
      {leftList.length > 0 && (
        <section className={style.left}>
          {leftList.slice(-2).map((image) => (
            <div className={`${style["sub-image-container"]} ${style["left"]}`}>
              <img src={image.postImageUrl} alt={`gallery-item-${image.id}`} />
            </div>
          ))}
        </section>
      )}
      <div className={style["main-image-container"]}>
        <img
          src={previewImage?.postImageUrl}
          alt={`gallery-item-${previewImage?.id}`}
        />
        <div className={style["image-details"]}>
          <p>Posted at {convertDate(previewImage?.updatedAt!)}</p>
          <button
            className={style["view-post"]}
            onClick={viewPostAction(previewImage?.postId!)}
          >
            View Post
          </button>
        </div>
        {leftList.length > 0 && (
          <button id={style["btn-left"]} onClick={navigateLeft}>
            <HiChevronLeft />
          </button>
        )}
        {rightList.length > 0 && (
          <button id={style["btn-right"]} onClick={navigateRight}>
            <HiChevronRight />
          </button>
        )}
      </div>
      {rightList.length > 0 && (
        <section className={style.right}>
          {rightList.map((image) => (
            <div className={style["sub-image-container"]}>
              <img src={image.postImageUrl} alt={`gallery-item-${image.id}`} />
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
