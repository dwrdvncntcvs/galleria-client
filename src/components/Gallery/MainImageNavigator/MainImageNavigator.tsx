import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Image } from "../../../models/ImageGallery";
import style from "./mainImageNavigator.module.scss";

interface MainImageNavigatorProps {
  previousImages: Image[];
  nextImages: Image[];
  onNavigateLeft: () => void;
  onNavigateRight: () => void;
}

export default function MainImageNavigator({
  nextImages,
  onNavigateLeft,
  onNavigateRight,
  previousImages,
}: MainImageNavigatorProps) {
  return (
    <>
      {previousImages.length > 0 && (
        <button
          className={style["action-button"]}
          id={style["btn-left"]}
          onClick={onNavigateLeft}
        >
          <HiChevronLeft />
        </button>
      )}
      {nextImages.length > 0 && (
        <button
          className={style["action-button"]}
          id={style["btn-right"]}
          onClick={onNavigateRight}
        >
          <HiChevronRight />
        </button>
      )}
    </>
  );
}
