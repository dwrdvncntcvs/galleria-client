import React, { PropsWithChildren } from "react";
import "./stickyPanel.scss";

export default function StickyPanel({ children }: PropsWithChildren) {
  return <div className="sp__main-container">{children}</div>;
}
