import React, { useState } from "react";

import "./createPostModal.scss";

import CreatePostHeader from "./CreatePostHeader/CreatePostHeader";
import PostForm from "./PostForm/PostForm";
import { Backdrop } from "../../../layouts";

export default function CreatePostModal() {
  const [loading, setLoading] = useState(false);

  return (
    <Backdrop>
      {loading ? (
        <div className="cpm__main-container">
          <h1>Posting...</h1>
        </div>
      ) : (
        <div className="cpm__main-container">
          <CreatePostHeader />
          <PostForm setLoading={setLoading} />
        </div>
      )}
    </Backdrop>
  );
}
