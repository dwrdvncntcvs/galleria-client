import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SettingsNav } from "../../components/Settings";
import { SettingsLayout, SettingsPageLayout } from "../../layout";
import style from "./settings.module.scss";

export default function Settings() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("personal");
  }, []);

  const mainPanel = (
    <SettingsLayout>
      <Outlet />
    </SettingsLayout>
  );

  const settingsNav = <SettingsNav />;

  return <SettingsPageLayout mainPanel={mainPanel} settingsNav={settingsNav} />;
}
