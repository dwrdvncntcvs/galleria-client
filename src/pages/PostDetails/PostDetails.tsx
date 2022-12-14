import React, { useEffect, useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getAllComments } from "../../api/commentRequest";
import { getPostDetails } from "../../api/postRequest";
import { AddComment, CommentList } from "../../components/Comments";
import { SuggestPeople } from "../../components/global";
import {
  PostActionsComponent,
  PostContent,
  PostHeader,
  PreviewPostImage,
} from "../../components/Post";
import { MiniProfile } from "../../components/Profile";
import { setToggle } from "../../features/toggleSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { MainPageLayout } from "../../layout";
import { Card } from "../../UI";
import style from "./postDetails.module.scss";

export default function PostDetails() {
  const { postState, commentState, userState } = useAppSelector(
    (state) => state
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getPostDetailsData = async () => {
      setLoading(true);
      const postsMeta = await dispatch(getPostDetails({ postId: params.id! }));
      const commentsMeta = await dispatch(
        getAllComments({ postId: params.id! })
      );

      if (
        postsMeta.meta.requestStatus === "fulfilled" &&
        commentsMeta.meta.requestStatus === "fulfilled"
      ) {
        setLoading(false);
      }
    };

    getPostDetailsData();
  }, [params.id]);

  const { id, User, ImagePost, commentsCount, content, updatedAt } =
    postState.post!;

  const goBack = () => {
    const path = location.state
      ? (location.state as { from: string }).from
      : "/";

    navigate(path, {
      state: { username: User.username },
    });
  };

  const mainPanel = loading ? (
    <p>Loading...</p>
  ) : (
    <>
      <header className={style["post-header"]}>
        {userState.isAuth && (
          <button onClick={goBack}>
            <HiArrowLeft />
          </button>
        )}
        <h1>{User.first_name}'s Post</h1>
      </header>
      <Card>
        <PostHeader postDate={updatedAt} user={User} postId={id} />
        <PostContent content={content} />
        {ImagePost.length > 0 && (
          <PreviewPostImage imagePost={ImagePost} userData={User} />
        )}
        <PostActionsComponent commentsCount={commentsCount} postId={id} />
        <AddComment postId={id} />
        {commentState.comments.length > 0 && (
          <CommentList comments={commentState.comments} />
        )}
      </Card>
    </>
  );

  const sidePanel = (
    <>
      <MiniProfile profile={User} />
      <SuggestPeople />
    </>
  );

  return (
    <MainPageLayout mainPanelContent={mainPanel} sidePanelContent={sidePanel} />
  );
}
