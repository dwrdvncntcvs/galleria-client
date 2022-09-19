import React, { PropsWithChildren } from "react";
import "./backdrop.scss";

export default function Backdrop({ children }: PropsWithChildren) {
  return <div className="bd__main-container">{children}</div>;
}
