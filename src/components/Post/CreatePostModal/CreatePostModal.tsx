import React, { useState } from "react";
import "./createPostModal.scss";
import ModalOverlay from "../../../layouts/ModalOverlay/ModalOverlay";
import { CreatePostHeader, PostForm } from "..";

export default function CreatePostModal() {
  const [loading, setLoading] = useState(false);

  return (
    <ModalOverlay>
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
    </ModalOverlay>
  );
}
