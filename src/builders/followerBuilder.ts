import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import {
  followUserRequest,
  getSuggestedPeopleRequest,
} from "../api/followerRequest";
import { FollowerState } from "../models/Follower";

type FollowerBuilder = ActionReducerMapBuilder<FollowerState>;

export const followerBuilder = (builder: FollowerBuilder) => ({
  getSuggestedPeopleRequest: function () {
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
    return this;
  },
  followUserRequest: function () {
    builder
      .addCase(followUserRequest.pending, () => {
        console.log("Pending...");
      })
      .addCase(followUserRequest.fulfilled, (state, action) => {
        console.log("Fulfilled...");
        return { ...state, suggestedPeople: action.payload.users };
      })
      .addCase(followUserRequest.rejected, (state, action) => {
        console.log("Rejected...");
        console.log(action.payload);
      });
    return this;
  },
});

export const followUserRequestBuilder = (builder: FollowerBuilder) => {};
