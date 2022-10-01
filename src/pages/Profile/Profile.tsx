import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllUserPosts } from "../../api/postRequest";
import { getUserProfileRequest } from "../../api/userRequest";
import { ImageGallery } from "../../components/Gallery";
import { InfiniteScroll, SuggestPeople } from "../../components/global";
import { CreatePost, Posts } from "../../components/Home";
import { ProfileCard } from "../../components/Profile";
import { resetPostState } from "../../features/postSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import {
  AdjustedNavContainer,
  ContentContainer,
  StickyPanel,
} from "../../layouts";
import MainPanel from "../../layouts/MainPanel/MainPanel";
import SidePanel from "../../layouts/SidePanel/SidePanel";
import style from "./profile.module.scss";

export default function Profile() {
  const { userState, postState } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const params = useParams();
  const username = params.username!;

  const { posts, postsInfo } = postState;
  const { userProfile } = userState;

  useEffect(() => {
    dispatch(resetPostState());
    const getData = async () => {
      await dispatch(getUserProfileRequest({ username }));
    };

    getData();
  }, [params.username]);

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
              <ProfileCard profile={userProfile} />
              <CreatePost
                firstName={userProfile.first_name!}
                imageUrl={userProfile.Profile?.profileImage!}
                userId={userProfile.id!}
                username={userProfile.username!}
              />
              <Posts posts={posts} />
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
