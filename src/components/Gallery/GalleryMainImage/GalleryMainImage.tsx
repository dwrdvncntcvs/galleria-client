import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Image } from "../../../models/ImageGallery";
import { convertDate } from "../../../utils/helper";
import style from "./galleryMainImage.module.scss";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import { SideImages, MainImageNavigator, MainImage } from "..";
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
      {leftList.length > 0 && <SideImages.PreviousImages images={leftList} />}
      <div className={style["main-image-container"]}>
        <MainImage image={previewImage} onViewPost={viewPostAction} />
        <MainImageNavigator
          nextImages={rightList}
          previousImages={leftList}
          onNavigateLeft={navigateLeft}
          onNavigateRight={navigateRight}
        />
      </div>
      {rightList.length > 0 && <SideImages.NextImages images={rightList} />}
    </div>
  );
}
