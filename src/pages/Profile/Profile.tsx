import React, { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
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

  const myProfile = userProfile.id === userState.userData?.id;

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
              {myProfile && (
                <CreatePost
                  firstName={userState.userData?.first_name!}
                  imageUrl={userState.userData?.Profile?.profileImage!}
                  userId={userState.userData?.id!}
                  username={userState.userData?.username!}
                />
              )}
              {userState.isAuth ? <Posts posts={posts} /> : <p>This account's posts are hidden...</p>}
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
