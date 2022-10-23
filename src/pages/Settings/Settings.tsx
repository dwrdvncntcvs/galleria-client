import React from "react";
import { Outlet } from "react-router-dom";
import { SettingsNav } from "../../components/Settings";
import { SettingsPageLayout } from "../../layout";
import style from "./settings.module.scss";

export default function Settings() {
  const mainPanel = <Outlet />;

  const settingsNav = <SettingsNav />;

  return <SettingsPageLayout mainPanel={mainPanel} settingsNav={settingsNav} />;
}
