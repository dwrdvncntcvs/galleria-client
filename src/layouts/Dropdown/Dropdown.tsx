import React, { PropsWithChildren } from "react";
import "./dropdown.scss";
import { stopPropagation } from "../../utils/helper";

export default function Dropdown({ children }: PropsWithChildren) {
  return (
    <div className="drp__main-container" onClick={stopPropagation}>
      {children}
    </div>
  );
}
