import React from "react";
import { useParams } from "react-router-dom";
import { CreatePost, Posts } from "../../components/Post";
import { ProfileCard } from "../../components/Profile";
import { useAppSelector } from "../../hooks/reduxHook";
import style from "./profileDetails.module.scss";

export default function ProfileDetails() {
  const { userState, postState, followerState } = useAppSelector(
    (state) => state
  );
  const params = useParams();

  const username = params.username!;

  const { posts } = postState;
  const { userProfile } = userState;

  const myProfile = userProfile.id === userState.userData?.id;

  const isFollowing =
    followerState.userFollowers.followers.filter(
      ({ id }) => id === userState.userData?.id
    ).length > 0;

  return (
    <>
      <ProfileCard
        profile={userProfile}
        isFollowing={isFollowing}
        username={username}
      />
      {myProfile && (
        <CreatePost
          firstName={userState.userData?.first_name!}
          imageUrl={userState.userData?.Profile?.profileImage!}
          userId={userState.userData?.id!}
          username={userState.userData?.username!}
        />
      )}

      <Posts
        posts={posts}
        type="user"
        canView={userState.isAuth ? true : false}
      />
    </>
  );
}
