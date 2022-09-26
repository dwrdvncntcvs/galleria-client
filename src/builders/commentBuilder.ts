import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { getAllComments } from "../api/commentRequest";
import { Comment, CommentState } from "../models/Comments";

export const commentBuilder = (
  builder: ActionReducerMapBuilder<CommentState>
) => ({
  getAllComments() {
    builder
      .addCase(getAllComments.pending, (state, action) => {
        console.log("Pending ...");
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        console.log("Payload: ", action.payload);
        const data: Comment[] = action.payload.data; 
        return { ...state, comments: [...state.comments, ...data] };
      })
      .addCase(getAllComments.rejected, () => {
        console.log("Rejected ...");
      });
    return this;
  },
});
