import React, { useEffect, useState } from "react";
import {
  HiArrowLeft,
  HiOutlineChat,
  HiOutlineHeart,
  HiX,
} from "react-icons/hi";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { v4 } from "uuid";
import { getAllComments } from "../../api/commentRequest";
import { getPostDetails } from "../../api/postRequest";
import { AddComment, CommentList } from "../../components/Comments";
import {
  PostHeader,
  PreviewPostImage,
  SuggestPeople,
} from "../../components/global";
import PostContent from "../../components/global/PostContent/PostContent";
import ActionsComponent from "../../components/Home/PostCard/ActionsComponent/ActionsComponent";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import {
  AdjustedNavContainer,
  ContentContainer,
  StickyPanel,
} from "../../layouts";
import Card from "../../layouts/Card/Card";
import MainPanel from "../../layouts/MainPanel/MainPanel";
import SidePanel from "../../layouts/SidePanel/SidePanel";
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

  console.log(location);

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

  const goBack = () => {
    navigate((location.state as { from: string }).from);
  };

  const { id, User, ImagePost, commentsCount, content, updatedAt } =
    postState.post!;

  return (
    <AdjustedNavContainer>
      <div className={style["post-details"]}>
        <ContentContainer>
          <MainPanel>
            <header className={style["post-header"]}>
              <button onClick={goBack}>
                <HiArrowLeft />
              </button>
              <h1>{User.first_name}'s Post</h1>
            </header>
            <Card>
              <PostHeader postDate={updatedAt} user={User} />
              <PostContent content={content} />
              {ImagePost.length > 0 && (
                <PreviewPostImage imagePost={ImagePost} userData={User} />
              )}
              <ActionsComponent commentsCount={commentsCount} postId={id} />
              <AddComment postId={id} />
              {commentState.comments.length > 0 && (
                <CommentList comments={commentState.comments} />
              )}
            </Card>
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
}
