import React from "react";
import "./roundedAvatar.scss";

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
    <div className="rAva__main-container" onClick={onClickAction}>
      <img src={src} alt={alt} />
    </div>
  );
}
