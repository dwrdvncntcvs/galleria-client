import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllPostImages } from "../../api/imageGalleryRequest";
import { GalleryMainImage } from "../../components/Gallery";
import { AppTitle } from "../../components/global";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { Image } from "../../models/ImageGallery";
import style from "./gallery.module.scss";

export default function Gallery() {
  const [galleryImages, setGalleryImages] = useState<Image[]>([]);
  const { imageInfo, images } = useAppSelector(
    (state) => state.imageGalleryState
  );

  const dispatch = useAppDispatch();
  const params = useParams();

  const getGalleryImagesRequest = async ({ page }: { page: number }) => {
    await dispatch(
      getAllPostImages({
        username: params.username!,
        limit: 6,
        page,
      })
    );
  };

  useEffect(() => {
    getGalleryImagesRequest({ page: +imageInfo.page });
  }, []);

  useEffect(() => {
    console.log("Getting New Images...");
    setGalleryImages(images);
  }, [images]);

  return images.length > 0 ? (
    <div className={style.gallery}>
      <header>
        <AppTitle titleColor="white" homePath="/home" />{" "}
        <span>| {params.username}'s Gallery</span>
      </header>
      {galleryImages.length > 0 && (
        <GalleryMainImage
          images={galleryImages}
          request={getGalleryImagesRequest}
          page={+imageInfo.page}
          hasMore={imageInfo.hasMore}
          limit={+imageInfo.limit}
          numberOfItems={+imageInfo.count}
        />
      )}
    </div>
  ) : null;
}
