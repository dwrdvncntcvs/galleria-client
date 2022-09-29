import React, { useEffect } from "react";
import { getAllPostImages } from "../../../api/imageGalleryRequest";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import "./imageGallery.module.scss";

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

  return (
    <div>
      <h1>Gallery</h1>
      <div>
        {images.map(({ postImageUrl, updatedAt, id }) => {
          return (
            <img
              style={{ height: "100px", width: "50%", objectFit: "cover" }}
              src={postImageUrl}
              alt={id}
              key={id}
            />
          );
        })}
      </div>
    </div>
  );
}
