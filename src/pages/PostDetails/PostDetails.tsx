import React, { useEffect } from "react";
import { HiOutlineChat, HiX } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { v4 } from "uuid";
import { getAllComments } from "../../api/commentRequest";
import { getPostDetails } from "../../api/postRequest";
import { AddComment, CommentList } from "../../components/Comments";
import { PostHeader, PreviewPostImage } from "../../components/global";
import PostContent from "../../components/global/PostContent/PostContent";
import ActionsComponent from "../../components/Home/PostCard/ActionsComponent/ActionsComponent";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import ModalOverlay from "../../layouts/ModalOverlay/ModalOverlay";
import style from "./postDetails.module.scss";

export default function PostDetails() {
  const { postState, commentState } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getPostDetailsData = async () => {
      await dispatch(getPostDetails({ postId: params.id! }));
      await dispatch(getAllComments({ postId: params.id! }));
    };

    getPostDetailsData();
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  const { id, User, ImagePost, commentsCount, content, updatedAt } =
    postState.post!;

  const commentVisibilityHandler = () => {
    navigate(`/home/post/${id}`, { replace: true });
  };

  const buttons = [
    {
      Icon: HiOutlineChat,
      label: "Comment",
      id: v4(),
      action: commentVisibilityHandler,
      count: commentsCount,
    },
  ];

  return (
    <ModalOverlay className={style["post-details"]}>
      <button id={style.close} onClick={goBack}>
        <HiX />
      </button>
      {ImagePost.length > 0 && (
        <section className={style["images-container"]}>
          <PreviewPostImage imagePost={ImagePost} userData={User} />
        </section>
      )}
      <section className={style["details-container"]}>
        <div className={style["details-content"]}>
          <div>
            <PostHeader user={User!} postDate={updatedAt} />
            <PostContent content={content} />
          </div>
          <div>
            <ActionsComponent buttons={buttons} />
            <CommentList comments={commentState.comments} />
          </div>
        </div>

        <AddComment />
      </section>
    </ModalOverlay>
  );
}
