import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getInitialPostImages } from "../../../api/imageGalleryRequest";
import { resetImages } from "../../../features/imageGallerySlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import style from "./imageGallery.module.scss";
import ImageItem from "./ImageItem/ImageItem";

interface ImageGalleryProps {
  username: string;
}

export default function ImageGallery({ username }: ImageGalleryProps) {
  const { imageInfo, initialImages } = useAppSelector(
    (state) => state.imageGalleryState
  );
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    const getData = async () => {
      await dispatch(
        getInitialPostImages({
          username,
        })
      );
    };

    getData();

    return () => {
      dispatch(resetImages());
    };
  }, [username]);

  const resetGalleryImages = () => dispatch(resetImages());

  return initialImages.length > 0 ? (
    <section className={style["image-gallery"]}>
      <h1>My Gallery</h1>
      <div className={style["images-container"]}>
        {initialImages.map(({ postImageUrl, updatedAt, id }, i) => (
          <ImageItem
            count={imageInfo.count}
            imageId={id}
            images={initialImages}
            postImageUrl={postImageUrl}
            index={i}
            key={id}
          />
        ))}
      </div>
      <Link
        className={style.link}
        to="gallery"
        state={{ from: location.pathname, username }}
        onClick={resetGalleryImages}
      >
        See all . . .
      </Link>
    </section>
  ) : null;
}
