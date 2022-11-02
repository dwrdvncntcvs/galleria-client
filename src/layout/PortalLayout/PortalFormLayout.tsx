import React from "react";
import { Link } from "react-router-dom";
import style from "./portalFormLayout.module.scss";

interface PortalFormLayoutProps {
  header: string;
  errorMessage: React.ReactElement | null;
  formComponent: React.ReactNode;
  links: { to: string; label: string }[];
}

export default function PortalFormLayout({
  header,
  errorMessage,
  formComponent,
  links,
}: PortalFormLayoutProps) {
  return (
    <div className={style["main-container"]}>
      {errorMessage}
      <h1>{header}</h1>
      {formComponent}
      <div className={style["links"]}>
        {links.length > 0 &&
          links.map(({ to, label }) => <Link to={to}>{label}</Link>)}
      </div>
    </div>
  );
}
