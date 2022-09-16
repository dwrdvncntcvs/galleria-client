import React, { useEffect } from "react";
import { getAllPosts } from "../../../api/postRequest";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { usePrivateAxios } from "../../../hooks/usePrivateAxios";
import PostCard from "../PostCard/PostCard";
import "./posts.scss";

export default function Posts() {
  const { userState, postState } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const privateInstance = usePrivateAxios();

  useEffect(() => {
    const getPostsData = async () => {
      await dispatch(
        getAllPosts({
          privateInstance,
          userId: userState.userData?.id!,
          limit: 9,
          page: 1,
        })
      );
    };
    getPostsData();
  }, [userState.userData]);

  return (
    <>
      {postState.posts.map((post, i) => (
        <PostCard post={post} key={post.id} />
      ))}
    </>
  );
}
