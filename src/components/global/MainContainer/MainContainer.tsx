import React, { PropsWithChildren } from "react";
import "./mainContainer.scss";

export default function MainContainer({ children }: PropsWithChildren) {
  return <div className="mc__main-container">{children}</div>;
}
