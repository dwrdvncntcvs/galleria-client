import React from "react";
import { GalleryMainImage, ImageSelector } from "../../components/Gallery";
import { AppTitle } from "../../components/global";
import { useAppSelector } from "../../hooks/reduxHook";
import style from "./gallery.module.scss";

export default function Gallery() {
  const { imageInfo, images } = useAppSelector(
    (state) => state.imageGalleryState
  );

  return images.length > 0 ? (
    <div className={style.gallery}>
      <header>
        <AppTitle titleColor="white" homePath="/home" />
      </header>
      <GalleryMainImage images={images} />
    </div>
  ) : null;
}
