import React, { Fragment } from "react";
import AppVersion from "../AppVersion/AppVersion";
import style from "./sideFooter.module.scss";

type Link = {
  label: string;
  link: string;
};

export default function SideFooter() {
  const links: Link[] = [
    { link: "#", label: "Terms of Service" },
    { link: "#", label: "Privacy Policy" },
    { link: "#", label: "Cookie Policy" },
    { link: "#", label: "About" },
  ];

  return (
    <div className={style["side-footer"]}>
      {links.map(({ label, link }, i) => (
        <Fragment key={i}>
          <a href={link}>{label}</a> {links.length - 1 !== i ? "|" : ""}{" "}
        </Fragment>
      ))}
      ...
      <p>@2022 Galleria - All Rights Reserved.</p>
      <AppVersion />
    </div>
  );
}
