import React, { PropsWithChildren } from "react";
import "./contentContainer.scss"

export default function ContentContainer({ children }: PropsWithChildren) {
  return <div className="cc__main-container">{children}</div>;
}
