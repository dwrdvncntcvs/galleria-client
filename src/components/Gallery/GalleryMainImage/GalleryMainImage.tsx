import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Image } from "../../../models/ImageGallery";
import style from "./galleryMainImage.module.scss";
import { SideImages, MainImageNavigator, MainImage } from "..";
import { useImageNavigate } from "../../../hooks/imageHooks";
interface GalleryMainImageProps {
  images: Image[];
  request: ({ page }: { page: number }) => void;
  page: number;
  hasMore: boolean;
  numberOfItems: number;
  limit: number;
}

export default function GalleryMainImage({
  images,
  request,
  page,
  numberOfItems,
  limit,
}: GalleryMainImageProps) {
  const [previewImage, leftImages, rightImages] = useImageNavigate(
    images,
    limit,
    page,
    numberOfItems,
    request
  );
  const { leftList, navigateLeft } = leftImages;
  const { navigateRight, rightList } = rightImages;

  const navigate = useNavigate();
  const location = useLocation();

  const viewPostAction = (postId: string) => () => {
    navigate(`/post/${postId}`, { state: { from: location.pathname } });
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
