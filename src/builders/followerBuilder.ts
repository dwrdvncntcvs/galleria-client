import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { getSuggestedPeopleRequest } from "../api/followerRequest";
import { FollowerState } from "../models/Follower";

export const getSuggestedPeopleRequestBuilder = (
  builder: ActionReducerMapBuilder<FollowerState>
) => {
  builder
    .addCase(getSuggestedPeopleRequest.pending, () => {
      console.log("Pending...");
    })
    .addCase(getSuggestedPeopleRequest.fulfilled, (state, action) => {
      console.log("Fulfilled...");
      return { ...state, suggestedPeople: action.payload.users };
    })
    .addCase(getSuggestedPeopleRequest.rejected, (state, action) => {
      console.log("Rejected...");
      console.log(action.payload);
    });
};
