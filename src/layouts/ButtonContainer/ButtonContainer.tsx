import React, { PropsWithChildren } from "react";
import "./buttonContainer.scss";

export default function ButtonContainer({ children }: PropsWithChildren) {
  return <div className="btnC__mainContainer">{children}</div>;
}
