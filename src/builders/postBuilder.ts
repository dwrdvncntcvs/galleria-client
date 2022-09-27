import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { createPost, getAllPosts, getPostDetails } from "../api/postRequest";
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
});
