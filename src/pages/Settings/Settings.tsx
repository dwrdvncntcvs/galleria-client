import React from "react";
import { SettingsNav } from "../../components/Settings";
import { SettingsPageLayout } from "../../layout";
import style from "./settings.module.scss";

export default function Settings() {
  const mainPanel = (
    <>
      <h1>Settings Main Panel</h1>
    </>
  );

  const settingsNav = <SettingsNav />;

  return <SettingsPageLayout mainPanel={mainPanel} settingsNav={settingsNav} />;
}
