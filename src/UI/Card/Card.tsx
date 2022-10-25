import React, { PropsWithChildren, CSSProperties } from "react";
import classes from "./card.module.scss";

interface CardProps extends PropsWithChildren {
  className?: string;
  style?: CSSProperties;
}

export default function Card({
  children,
  className = "",
  style = {},
}: CardProps) {
  return (
    <div className={`${classes.card} ${className}`} style={style}>
      {children}
    </div>
  );
}
