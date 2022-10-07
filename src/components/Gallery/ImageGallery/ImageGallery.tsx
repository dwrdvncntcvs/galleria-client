import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getAllPostImages } from "../../../api/imageGalleryRequest";
import { resetImages } from "../../../features/imageGallerySlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import style from "./imageGallery.module.scss";
import ImageItem from "./ImageItem/ImageItem";

interface ImageGalleryProps {
  username: string;
}

export default function ImageGallery({ username }: ImageGalleryProps) {
  const { imageInfo, images } = useAppSelector(
    (state) => state.imageGalleryState
  );
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    const getData = async () => {
      await dispatch(
        getAllPostImages({
          username,
          limit: imageInfo.limit,
          page: imageInfo.page,
        })
      );
    };

    getData();

    return () => {
      dispatch(resetImages());
    };
  }, [username]);

  return images.length > 0 ? (
    <section className={style["image-gallery"]}>
      <h1>My Gallery</h1>
      <div className={style["images-container"]}>
        {images.map(({ postImageUrl, updatedAt, id }, i) => (
          <ImageItem
            count={imageInfo.count}
            imageId={id}
            images={images}
            postImageUrl={postImageUrl}
            index={i}
            key={id}
          />
        ))}
      </div>
      <Link to="gallery" state={{ from: location.pathname, username }}>
        See all
      </Link>
    </section>
  ) : null;
}
