import React from "react";
import { SideFooter } from "../../global";
import style from "./settingsNav.module.scss";

export default function SettingsNav() {
  return (
    <div className={style["settings-nav"]}>
      <h1>Nav</h1>
      <SideFooter />
    </div>
  );
}
