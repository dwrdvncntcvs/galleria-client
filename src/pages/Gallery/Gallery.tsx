import React, { useEffect } from "react";
import { getAllPostImages } from "../../api/imageGalleryRequest";
import { AppTitle } from "../../components/global";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import style from "./gallery.module.scss";

export default function Gallery() {
  const dispatch = useAppDispatch();
  const { userState, imageGalleryState } = useAppSelector((state) => state);

  const { userProfile } = userState;
  const { imageInfo, images } = imageGalleryState;

  useEffect(() => {
    dispatch(
      getAllPostImages({
        username: userProfile.username!,
        limit: imageInfo.limit,
        page: imageInfo.page,
      })
    );
  }, [userProfile.username, imageInfo.limit, imageInfo.page]);

  if (images.length > 0) console.log(images);

  return (
    <div>
      <AppTitle titleColor="white" />
    </div>
  );
}
