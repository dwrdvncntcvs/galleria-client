import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserProfileRequest } from "../../api/userRequest";
import { CreatePost, Posts } from "../../components/Post";
import { ProfileCard } from "../../components/Profile";
import { resetPostState } from "../../features/postSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { usePrivateAxios } from "../../hooks/usePrivateAxios";
import { privateHttpService } from "../../services/httpService";
import style from "./profileDetails.module.scss";

export default function ProfileDetails() {
  const [isFollowing, setIsFollowing] = useState(true);
  const { userState, postState } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const params = useParams();
  const privateInstance = usePrivateAxios();

  const username = params.username!;

  const { posts } = postState;
  const { userProfile } = userState;

  useEffect(() => {
    dispatch(resetPostState());
    const getData = async () => {
      await dispatch(getUserProfileRequest({ username }));
      const { isFollowed } = await privateHttpService(privateInstance).get(
        `/is-following/${username}`
      );

      setIsFollowing(isFollowed);
    };

    getData();
  }, [params.username]);

  const myProfile = userProfile.id === userState.userData?.id;

  return (
    <>
      <ProfileCard profile={userProfile} isFollowing={isFollowing} username={username}/>
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
