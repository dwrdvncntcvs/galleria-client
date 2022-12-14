import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { createComment, getAllComments } from "../api/commentRequest";
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
        const data: Comment[] = action.payload.data;

        return { ...state, comments: data };
      })
      .addCase(getAllComments.rejected, () => {
        console.log("Rejected ...");
      });
    return this;
  },

  createComment: () => {
    builder
      .addCase(createComment.pending, (state, action) => {
        console.log("Pending ...");
      })
      .addCase(createComment.fulfilled, (state, action) => {
        console.log("Fulfilled ...");
      })
      .addCase(createComment.rejected, () => {
        console.log("Rejected ...");
      });
    return this;
  },
});
