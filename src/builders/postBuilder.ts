import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { createPost, getAllPosts } from "../api/postRequest";
import { PostState } from "../models/Post";

export const getAllPostsBuilder = (
  builder: ActionReducerMapBuilder<PostState>
) => {
  builder
    .addCase(getAllPosts.pending, () => {
      console.log("Pending...");
    })
    .addCase(getAllPosts.fulfilled, (state, action) => {
      console.log("Getting posts Fulfilled...");

      return {
        ...state,
        posts: action.payload.posts,
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
};

export const createTextPostBuilder = (
  builder: ActionReducerMapBuilder<PostState>
) => {
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
};
