import React from "react";
import { getAllPosts } from "../../api/postRequest";
import { InfiniteScroll, SuggestPeople } from "../../components/global";
import { CreatePost, Posts } from "../../components/Post";
import { useImageSrc } from "../../hooks/imageHooks";
import { useAppSelector } from "../../hooks/reduxHook";
import { MainPageLayout } from "../../layout";
import style from "./home.module.scss";

const Home = () => {
  const { userState, postState } = useAppSelector((state) => state);

  const mainPanelContent = (
    <>
      <CreatePost
        userId={userState.userData?.id!}
        imageUrl={userState.userData?.Profile?.profileImage!}
        firstName={userState.userData?.first_name!}
        username={userState.userData?.username!}
      />
      <Posts posts={postState.posts} />
    </>
  );

  const sidePanelContent = (
    <>
      <SuggestPeople />
    </>
  );

  return (
    <InfiniteScroll
      dataRequest={getAllPosts}
      param={userState.userData?.id!}
      limit={+postState.postsInfo.limit}
      page={+postState.postsInfo.page}
      hasMore={postState.postsInfo.hasMore}
      numberOfItems={postState.postsInfo.count!}
    >
      <MainPageLayout
        mainPanelContent={mainPanelContent}
        sidePanelContent={sidePanelContent}
      />
    </InfiniteScroll>
  );
};

export default Home;
