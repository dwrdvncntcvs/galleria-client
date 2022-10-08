import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Image } from "../../../models/ImageGallery";
import style from "./galleryMainImage.module.scss";
import { SideImages, MainImageNavigator, MainImage } from "..";
import { canRequest } from "../../../utils/helper";
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
  const [previewImage, setPreviewImage] = useState<Image>(images[0]);
  const [leftList, setLeftList] = useState<Image[]>([]);
  const [rightList, setRightList] = useState<Image[]>([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setRightList((prev) => [
      ...images.filter((image) => image.id !== previewImage.id),
    ]);
  }, [images]);

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
    if (!canRequest(limit, page, numberOfItems))
      if (rightList.length === 2) request({ page: page + 1 });

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
