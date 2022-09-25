import { createSlice } from "@reduxjs/toolkit";
import { commentBuilder } from "../builders/commentBuilder";
import { CommentState } from "../models/Comments";

const initialState: CommentState = {
  comments: [],
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers(builder) {
    commentBuilder(builder).getAllComments();
  },
});

export default commentSlice.reducer;
