import React from "react";
import { getAllPosts } from "../../api/postRequest";
import { InfiniteScroll, SuggestPeople } from "../../components/global";
import { CreatePost, Posts } from "../../components/Post";
import { useAppSelector } from "../../hooks/reduxHook";
import {
  AdjustedNavContainer,
  ContentContainer,
  MainPanel,
  SidePanel,
  StickyPanel,
} from "../../UI";
import style from "./home.module.scss";

const Home = () => {
  const { userState, postState } = useAppSelector((state) => state);

  return (
    <InfiniteScroll
      dataRequest={getAllPosts}
      param={userState.userData?.id!}
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
