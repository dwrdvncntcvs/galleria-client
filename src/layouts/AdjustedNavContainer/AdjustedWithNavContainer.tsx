import React, { PropsWithChildren } from "react";
import "./adjustedWithNavContainer.scss";

export default function AdjustedNavContainer({ children }: PropsWithChildren) {
  return <div className="anc__main-container">{children}</div>;
}
