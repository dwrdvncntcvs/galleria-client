import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { postBuilder } from "../builders/postBuilder";
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
  post: {
    commentsCount: 0,
    content: "",
    createdAt: "",
    id: v4(),
    ImagePost: [],
    updatedAt: "",
    User: {},
    userId: v4(),
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
    updatePostCount: (state, action) => {
      return {
        ...state,
        post: { ...state.post!, commentsCount: action.payload },
      };
    },
    removePost: (state, action) => {
      const { postId } = action.payload;
      const updatedPosts = state.posts.filter((post) => post.id !== postId);

      return { ...state, posts: [...updatedPosts] };
    },
    updateContent: (state, action) => {
      return { ...state, post: { ...state.post!, content: action.payload } };
    },
    resetPostState: () => {
      return initialState;
    },
  },
  extraReducers(builder) {
    postBuilder(builder)
      .createPost()
      .getAllPosts()
      .getPostDetails()
      .getAllUserPosts()
      .deletePost()
      .updatePost();
  },
});

export const {
  addPost,
  changePage,
  setHasMore,
  updatePostCount,
  resetPostState,
  removePost,
  updateContent,
} = postSlice.actions;

export default postSlice.reducer;
