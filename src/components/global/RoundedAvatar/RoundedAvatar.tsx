import React from "react";
import style from "./roundedAvatar.module.scss";

interface RoundedAvatarProps {
  src: string;
  alt: string;
  onClickAction?: (e: any) => void;
}

export default function RoundedAvatar({
  src,
  alt,
  onClickAction,
}: RoundedAvatarProps) {
  return (
    <div className={style["rounded-avatar"]} onClick={onClickAction}>
      <img src={src} alt={alt} />
    </div>
  );
}
