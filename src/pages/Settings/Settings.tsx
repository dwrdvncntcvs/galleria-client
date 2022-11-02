import React from "react";
import { Outlet } from "react-router-dom";
import { SettingsNav } from "../../components/Settings";

import { SettingsLayout, SettingsPageLayout } from "../../layout";

export default function Settings() {
  const mainPanel = <SettingsLayout>{<Outlet />}</SettingsLayout>;

  const settingsNav = <SettingsNav />;

  return <SettingsPageLayout mainPanel={mainPanel} settingsNav={settingsNav} />;
}
