import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserProfileRequest } from "../../api/userRequest";
import { CreatePost, Posts } from "../../components/Post";
import { ProfileCard } from "../../components/Profile";
import { resetPostState } from "../../features/postSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import style from "./profileDetails.module.scss";

export default function ProfileDetails() {
  const { userState, postState } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const params = useParams();
  const username = params.username!;

  const { posts } = postState;
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
    <>
      <ProfileCard profile={userProfile} />
      {myProfile && (
        <CreatePost
          firstName={userState.userData?.first_name!}
          imageUrl={userState.userData?.Profile?.profileImage!}
          userId={userState.userData?.id!}
          username={userState.userData?.username!}
        />
      )}
      {userState.isAuth ? (
        <Posts posts={posts} type="user" />
      ) : (
        <p>This account's posts are hidden...</p>
      )}
    </>
  );
}
