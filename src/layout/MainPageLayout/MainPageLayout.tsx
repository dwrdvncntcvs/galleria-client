import React, { ReactElement } from "react";
import style from "./mainPageLayout.module.scss";
import {
  AdjustedNavContainer,
  ContentContainer,
  MainPanel,
  SidePanel,
  StickyPanel,
} from "../../UI";
import { SideFooter } from "../../components/global";

interface MainPageLayoutProps {
  mainPanelContent: ReactElement;
  sidePanelContent: ReactElement;
}

export default function MainPageLayout({
  mainPanelContent,
  sidePanelContent,
}: MainPageLayoutProps) {
  return (
    <AdjustedNavContainer>
      <div className={style["main-page-layout"]}>
        <ContentContainer>
          <MainPanel>{mainPanelContent}</MainPanel>
          <SidePanel>
            <StickyPanel>
              {sidePanelContent}
              <SideFooter />
            </StickyPanel>
          </SidePanel>
        </ContentContainer>
      </div>
    </AdjustedNavContainer>
  );
}
