import { createSlice } from "@reduxjs/toolkit";
import { getAllPostsBuilder } from "../builders/postBuilder";
import { PostState } from "../models/Post";

const initialState: PostState = {
  status: "",
  message: "",
  posts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers(builder) {
    getAllPostsBuilder(builder);
  },
});

export default postSlice.reducer;
