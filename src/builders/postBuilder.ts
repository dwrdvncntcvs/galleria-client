import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import {
  createPost,
  deletePostRequest,
  getAllPosts,
  getAllUserPosts,
  getPostDetails,
  updatePostContent,
} from "../api/postRequest";
import { PostState } from "../models/Post";

export const postBuilder = (builder: ActionReducerMapBuilder<PostState>) => ({
  getAllPosts() {
    builder
      .addCase(getAllPosts.pending, () => {
        console.log("Pending...");
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        console.log("Getting posts Fulfilled...");

        return {
          ...state,
          posts: [...state.posts, ...action.payload.posts],
          postsInfo: action.payload.info,
          status: "success",
        };
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        console.log(action);
        return {
          ...state,
          status: "error",
          message: action.payload as string,
        };
      });
    return this;
  },

  getAllUserPosts() {
    builder
      .addCase(getAllUserPosts.pending, () => {
        console.log("Pending...");
      })
      .addCase(getAllUserPosts.fulfilled, (state, action) => {
        console.log("Getting User Posts Fulfilled...");

        console.log(action.payload);

        return {
          ...state,
          posts: [...state.posts, ...action.payload.posts],
          postsInfo: action.payload.info,
          status: "success",
        };
      })
      .addCase(getAllUserPosts.rejected, (state, action) => {
        console.log(action);
        return {
          ...state,
          status: "error",
          message: action.payload as string,
        };
      });
    return this;
  },

  createPost() {
    builder
      .addCase(createPost.pending, () => {
        console.log("Pending...");
      })
      .addCase(createPost.fulfilled, (state, action) => {
        console.log("Getting posts Fulfilled...");

        return {
          ...state,
          status: "success",
        };
      })
      .addCase(createPost.rejected, (state, action) => {
        console.log(action);
        return {
          ...state,
          status: "error",
          message: action.payload as string,
        };
      });
    return this;
  },

  getPostDetails() {
    builder
      .addCase(getPostDetails.pending, () => {
        console.log("Pending...");
      })
      .addCase(getPostDetails.fulfilled, (state, action) => {
        console.log("Getting post Fulfilled...");
        console.log("Post Action Payload: ", action.payload.post);
        return {
          ...state,
          post: action.payload.post,
        };
      })
      .addCase(getPostDetails.rejected, (state, action) => {
        console.log(action);
        return {
          ...state,
          status: "error",
          message: action.payload as string,
        };
      });
    return this;
  },

  deletePost() {
    builder
      .addCase(deletePostRequest.pending, () => {
        console.log("Deleting post pending...");
      })
      .addCase(deletePostRequest.fulfilled, (state, action) => {
        console.log("Deleting post Fulfilled...");
      })
      .addCase(deletePostRequest.rejected, (state, action) => {
        console.log("Deleting post rejected...");
      });
    return this;
  },

  updatePost() {
    builder
      .addCase(updatePostContent.pending, () => {
        console.log("Updating post pending...");
      })
      .addCase(updatePostContent.fulfilled, (state, action) => {
        console.log("Updating post Fulfilled...");
      })
      .addCase(updatePostContent.rejected, (state, action) => {
        console.log("Updating post rejected...");
      });
    return this;
  },
});
