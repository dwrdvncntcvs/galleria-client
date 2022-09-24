import { createSlice } from "@reduxjs/toolkit";
import {
  createTextPostBuilder,
  getAllPostsBuilder,
} from "../builders/postBuilder";
import { PostState } from "../models/Post";

const initialState: PostState = {
  status: "",
  message: "",
  posts: [],
  postsInfo: {
    limit: 5,
    page: 0,
    count: 0,
  },
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state, action) => {
      return { ...state, posts: [{ ...action.payload! }, ...state.posts] };
    },
    resetPosts: (state) => {
      return { ...state, posts: [] };
    },
    changePage: (state, action) => {
      return {
        ...state,
        postsInfo: { ...state.postsInfo, page: action.payload },
      };
    },
  },
  extraReducers(builder) {
    getAllPostsBuilder(builder);

    createTextPostBuilder(builder);
  },
});

export const { addPost, resetPosts, changePage } = postSlice.actions;

export default postSlice.reducer;
