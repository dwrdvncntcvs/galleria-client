import React, { PropsWithChildren } from "react";
import style from "./settingsSection.module.scss";

interface SettingsSectionProps extends PropsWithChildren {
  title: string;
  description: string;
}

export default function SettingsSection({
  title,
  description,
  children,
}: SettingsSectionProps) {
  return (
    <section className={style["settings-section"]}>
      <div className={style["section-header"]}>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className={style["section-content"]}>{children}</div>
    </section>
  );
}
