import React, { useEffect, useState } from "react";
import { HiOutlineChat, HiOutlineHeart, HiX } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { v4 } from "uuid";
import { getAllComments } from "../../api/commentRequest";
import { getPostDetails } from "../../api/postRequest";
import { AddComment, CommentList } from "../../components/Comments";
import { PostHeader, PreviewPostImage } from "../../components/global";
import PostContent from "../../components/global/PostContent/PostContent";
import ActionsComponent from "../../components/Home/PostCard/ActionsComponent/ActionsComponent";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import style from "./postDetails.module.scss";

export default function PostDetails() {
  const { postState, commentState } = useAppSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Post Details Params: ", params);

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

  const commentVisibilityHandler = () => {
    navigate(` `, { replace: true });
  };

  const buttons = [
    {
      Icon: HiOutlineHeart,
      label: "Like",
      id: v4(),
      action: () => {
        console.log("Liked");
      },
      count: 0,
    },
    {
      Icon: HiOutlineChat,
      label: "Comment",
      id: v4(),
      action: commentVisibilityHandler,
      count: commentsCount,
    },
  ];

  return (
    <div className={style["post-details"]}>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <>
          {ImagePost.length > 0 && (
            <section className={style["images-container"]}>
              <PreviewPostImage imagePost={ImagePost} userData={User} />
            </section>
          )}
          <section className={style["details-container"]}>
            <div className={style["details-content"]}>
              <div className={style.post}>
                <PostHeader user={User!} postDate={updatedAt} />
                <PostContent content={content} />
              </div>
              <div>
                <ActionsComponent buttons={buttons} />
                <CommentList comments={commentState.comments} />
              </div>
            </div>

            <AddComment postId={id} />
          </section>
        </>
      )}
    </div>
  );
}
