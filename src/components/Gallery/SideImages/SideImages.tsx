import React from "react";
import { Image } from "../../../models/ImageGallery";
import style from "./sideImages.module.scss";

interface ComponentProps {
  images: Image[];
}

function PreviousImages({ images }: ComponentProps) {
  return (
    <section className={`${style.left} ${style['side-image']}`}>
      {images.slice(-2).map((image) => (
        <div className={`${style["sub-image-container"]} ${style["left"]}`}>
          <img className={style.image} src={image.postImageUrl} alt={`gallery-item-${image.id}`} />
        </div>
      ))}
    </section>
  );
}

function NextImages({ images }: ComponentProps) {
  return (
    <section className={`${style.right} ${style['side-image']}`}>
      {images.map((image) => (
        <div className={style["sub-image-container"]}>
          <img className={style.image} src={image.postImageUrl} alt={`gallery-item-${image.id}`} />
        </div>
      ))}
    </section>
  );
}

const components = { PreviousImages, NextImages };

export default components;
