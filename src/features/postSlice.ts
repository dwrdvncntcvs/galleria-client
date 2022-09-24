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
    hasMore: true,
  },
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state, action) => {
      return { ...state, posts: [{ ...action.payload! }, ...state.posts] };
    },

    changePage: (state, action) => {
      return {
        ...state,
        postsInfo: { ...state.postsInfo, page: action.payload },
      };
    },
    setHasMore: (state, action) => {
      return {
        ...state,
        postsInfo: { ...state.postsInfo, hasMore: action.payload },
      };
    },
  },
  extraReducers(builder) {
    getAllPostsBuilder(builder);

    createTextPostBuilder(builder);
  },
});

export const { addPost, changePage, setHasMore } = postSlice.actions;

export default postSlice.reducer;
