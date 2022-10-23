import React, { PropsWithChildren } from "react";
import style from "./settingsLayout.module.scss";

export default function SettingsLayout({ children }: PropsWithChildren) {
  return <div className={style["settings-layout"]}>{children}</div>;
}
