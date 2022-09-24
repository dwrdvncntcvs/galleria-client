import React, { useEffect } from "react";
import { getAllPosts } from "../../api/postRequest";
import { SuggestPeople } from "../../components/global";
import { CreatePost, Posts } from "../../components/Home";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
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
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getPostsData = async () => {
      await dispatch(
        getAllPosts({
          // privateInstance,
          userId: userState.userData?.id!,
          // limit: 10,
          page: 0,
        })
      );
    };
    getPostsData();
  }, [userState.userData]);

  return (
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
  );
};

export default Home;
