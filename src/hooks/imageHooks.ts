import { defaultAvatar } from "../assets/images";
import { Image } from "../models/ImageGallery";
import { canRequest } from "../utils/helper";
import { useState, useEffect } from "react";
import { ImageService } from "../services/imageServices";

type LeftImages = { leftList: Image[]; navigateLeft: () => void };

type RightImages = { rightList: Image[]; navigateRight: () => void };

export const useImageSrc = () => {
  return (imageSrc: string) => {
    return imageSrc === "" ? defaultAvatar : imageSrc;
  };
};

export const useImageNavigate = (
  images: Image[],
  limit: number,
  page: number,
  numberOfItems: number,
  request: ({ page }: { page: number }) => void
) => {
  const [previewImage, setPreviewImage] = useState<Image>(images[0]);
  const [leftList, setLeftList] = useState<Image[]>([]);
  const [rightList, setRightList] = useState<Image[]>([]);

  useEffect(() => {
    setRightList((prev) => [
      ...images.filter((image) => image.id !== previewImage.id),
    ]);
  }, [images]);

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

  const leftImages: LeftImages = { leftList, navigateLeft };
  const rightImages: RightImages = { rightList, navigateRight };

  const imagesInfo: [
    previewImage: Image,
    leftImages: LeftImages,
    rightImages: RightImages
  ] = [previewImage, leftImages, rightImages];

  return imagesInfo;
};

export const useImageUrl = (imageBlob: Blob) => {
  const [imageUrl, setImageUrl] = useState("");

  if (!imageBlob) return "";

  if (imageBlob) {
    const fileReader = new FileReader();

    fileReader.onerror = () => {
      fileReader.abort();
    };

    fileReader.readAsDataURL(imageBlob);
    fileReader.addEventListener("load", (e) => {
      const viewedFile = e.target?.result;
      const fileData = viewedFile!;
      setImageUrl(fileData as string);
    });
  }

  return imageUrl;
};
