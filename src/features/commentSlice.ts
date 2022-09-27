import { createSlice } from "@reduxjs/toolkit";
import { commentBuilder } from "../builders/commentBuilder";
import { CommentState } from "../models/Comments";

const initialState: CommentState = {
  comments: [],
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    addComment: (state, action) => {
      return { ...state, comments: [...state.comments, action.payload] };
    },
  },
  extraReducers(builder) {
    commentBuilder(builder).getAllComments().createComment();
  },
});

export const { addComment } = commentSlice.actions;

export default commentSlice.reducer;
