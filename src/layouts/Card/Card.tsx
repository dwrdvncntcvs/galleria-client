import React, { PropsWithChildren } from "react";
import style from "./card.module.scss";

interface CardProps extends PropsWithChildren {
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return <div className={`${style.card} ${className}`}>{children}</div>;
}
