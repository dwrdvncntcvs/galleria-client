import React, { useEffect } from "react";
import { getAllPostImages } from "../../../api/imageGalleryRequest";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import style from "./imageGallery.module.scss";

interface ImageGalleryProps {
  username: string;
}

export default function ImageGallery({ username }: ImageGalleryProps) {
  const { imageInfo, images } = useAppSelector(
    (state) => state.imageGalleryState
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getData = async () =>
      await dispatch(
        getAllPostImages({
          username,
          limit: imageInfo.limit,
          page: imageInfo.page,
        })
      );

    getData();
  }, [username]);

  return images.length > 0 ? (
    <section className={style["image-gallery"]}>
      <h1>My Gallery</h1>
      <div className={style["images-container"]}>
        {images.map(({ postImageUrl, updatedAt, id }, i) => {
          console.log(images.length - 1 === i);

          return (
            <div className={style["image-container"]}>
              {5 === i && (
                <div className={style.last}>
                  <button>{imageInfo.count - images.length}</button>
                </div>
              )}
              <img src={postImageUrl} alt={id} key={id} />
            </div>
          );
        })}
      </div>
    </section>
  ) : null;
}
