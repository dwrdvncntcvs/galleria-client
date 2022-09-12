import React from "react";
import { Post } from "../../../models/Post";
import "./postCard.scss";

interface PostProps {
  post: Post;
}

export default function PostCard({ post }: PostProps) {
  const { content, User, ImagePost, updatedAt } = post;

  console.log(ImagePost);

  const convertDate = (date: Date) => new Date(date).toDateString();

  return (
    <div className="pc__main-container">
      <div className="pc__header-container">
        <img
          src={User.Profile?.profileImage}
          alt={`${User.first_name}'s avatar`}
        />
        <div>
          <p>
            {User.first_name} {User.last_name}
          </p>
          <p>{convertDate(updatedAt)}</p>
        </div>
      </div>
      <p>{content}</p>
      {ImagePost.map(({ id, postImageUrl }) => (
        <img src={postImageUrl} alt={`${User.first_name}'s post`} />
      ))}
    </div>
  );
}
