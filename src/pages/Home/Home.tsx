import React from "react";
import { getAllPosts } from "../../api/postRequest";
import { InfiniteScroll, SuggestPeople } from "../../components/global";
import { CreatePost, Posts } from "../../components/Home";
import { useAppSelector } from "../../hooks/reduxHook";
import {
  AdjustedNavContainer,
  ContentContainer,
  StickyPanel,
} from "../../layouts";
import MainPanel from "../../layouts/MainPanel/MainPanel";
import SidePanel from "../../layouts/SidePanel/SidePanel";
import style from "./home.module.scss";

const Home = () => {
  const { userState, postState } = useAppSelector((state) => state);

  return (
    <InfiniteScroll
      dataRequest={getAllPosts}
      userId={userState.userData?.id!}
      limit={+postState.postsInfo.limit}
      page={+postState.postsInfo.page}
      hasMore={postState.postsInfo.hasMore}
      numberOfItems={postState.postsInfo.count!}
    >
      <AdjustedNavContainer>
        <div className={style.home}>
          <ContentContainer>
            <MainPanel>
              <CreatePost
                userId={userState.userData?.id!}
                imageUrl={userState.userData?.Profile?.profileImage!}
                firstName={userState.userData?.first_name!}
                username={userState.userData?.username!}
              />
              <Posts posts={postState.posts} />
            </MainPanel>
            <SidePanel>
              <StickyPanel>
                <SuggestPeople />
              </StickyPanel>
            </SidePanel>
          </ContentContainer>
        </div>
      </AdjustedNavContainer>
    </InfiniteScroll>
  );
};

export default Home;
