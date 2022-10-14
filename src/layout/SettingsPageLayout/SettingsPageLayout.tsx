import React, { ReactElement } from "react";
import { AdjustedNavContainer, ContentContainer, MainPanel } from "../../UI";
import style from "./settingsPageLayout.module.scss";

interface SettingsPageLayoutProps {
  settingsNav: ReactElement;
  mainPanel: ReactElement;
}

export default function SettingsPageLayout({
  mainPanel,
  settingsNav,
}: SettingsPageLayoutProps) {
  return (
    <AdjustedNavContainer>
      <div className={style["settings-page-layout"]}>
        <ContentContainer>
          {settingsNav}
          <MainPanel>{mainPanel}</MainPanel>
        </ContentContainer>
      </div>
    </AdjustedNavContainer>
  );
}
