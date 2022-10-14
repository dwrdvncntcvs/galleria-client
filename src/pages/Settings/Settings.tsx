import React from "react";
import { SettingsNav } from "../../components/Settings";
import {
  AdjustedNavContainer,
  ContentContainer,
  MainPanel,
} from "../../UI";
import style from "./settings.module.scss";

export default function Settings() {
  return (
    <AdjustedNavContainer>
      <div className={style.settings}>
        <ContentContainer>
          <SettingsNav />
          <MainPanel>
            <h1>Hello</h1>
          </MainPanel>
        </ContentContainer>
      </div>
    </AdjustedNavContainer>
  );
}
