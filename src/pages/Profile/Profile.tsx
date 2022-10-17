import React, { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { getUserFollowers, getUserFollowing } from "../../api/followerRequest";
import { getAllUserPosts } from "../../api/postRequest";
import { getUserProfileRequest } from "../../api/userRequest";
import { ImageGallery } from "../../components/Gallery";
import { InfiniteScroll, SuggestPeople } from "../../components/global";
import { resetPostState } from "../../features/postSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { usePrivateAxios } from "../../hooks/usePrivateAxios";
import { MainPageLayout } from "../../layout";
import style from "./profile.module.scss";

export default function Profile() {
  const { postState } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const privateInstance = usePrivateAxios();
  const params = useParams();
  const username = params.username!;
  const { postsInfo } = postState;

  useEffect(() => {
    dispatch(resetPostState());
    const getData = async () => {
      console.log("Getting Data...");
      await dispatch(getUserProfileRequest({ username }));
      await dispatch(
        getUserFollowers({
          username: params.username!,
          privateAxiosInstance: privateInstance,
        })
      );
      await dispatch(
        getUserFollowing({
          username: params.username!,
          privateAxiosInstance: privateInstance,
        })
      );
    };

    getData();
  }, [params.username]);

  const mainPanelContent = (
    <>
      <Outlet />
    </>
  );

  const sidePanelContent = (
    <>
      <ImageGallery username={params.username!} />
      <SuggestPeople />
    </>
  );

  return (
    <InfiniteScroll
      dataRequest={getAllUserPosts}
      param={username}
      hasMore={postsInfo.hasMore}
      limit={+postsInfo.limit}
      numberOfItems={+postsInfo.count!}
      page={+postsInfo.page}
    >
      <MainPageLayout
        mainPanelContent={mainPanelContent}
        sidePanelContent={sidePanelContent}
      />
    </InfiniteScroll>
  );
}
