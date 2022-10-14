import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { getAllUserPosts } from "../../api/postRequest";
import { ImageGallery } from "../../components/Gallery";
import { InfiniteScroll, SuggestPeople } from "../../components/global";
import { useAppSelector } from "../../hooks/reduxHook";
import {
  AdjustedNavContainer,
  ContentContainer,
  MainPanel,
  SidePanel,
  StickyPanel,
} from "../../UI";

import style from "./profile.module.scss";

export default function Profile() {
  const { postState } = useAppSelector((state) => state);
  const params = useParams();
  const username = params.username!;

  const { postsInfo } = postState;

  return (
    <InfiniteScroll
      dataRequest={getAllUserPosts}
      param={username}
      hasMore={postsInfo.hasMore}
      limit={+postsInfo.limit}
      numberOfItems={+postsInfo.count!}
      page={+postsInfo.page}
    >
      <AdjustedNavContainer>
        <div className={style.profile}>
          <ContentContainer>
            <MainPanel>
              <Outlet />
            </MainPanel>
            <SidePanel>
              <StickyPanel>
                <ImageGallery username={params.username!} />
                <SuggestPeople />
              </StickyPanel>
            </SidePanel>
          </ContentContainer>
        </div>
      </AdjustedNavContainer>
    </InfiniteScroll>
  );
}
