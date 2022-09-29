import React, { useEffect } from "react";
import { getAllPostImages } from "../../../api/imageGalleryRequest";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import "./imageGallery.module.scss";

interface ImageGalleryProps {
  username: string;
}

export default function ImageGallery({ username }: ImageGalleryProps) {
  const { imageInfo } = useAppSelector((state) => state.imageGalleryState);
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
  }, []);

  return (
    <div>
      <h1>Images</h1>
      <section></section>
    </div>
  );
}
