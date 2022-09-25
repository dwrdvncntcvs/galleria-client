import { createSlice } from "@reduxjs/toolkit";
import { CommentState } from "../models/Comments";

const initialState: CommentState = {
  comments: [],
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
});

export default commentSlice.reducer;
