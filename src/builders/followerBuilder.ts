import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import {
  followUserRequest,
  getSuggestedPeopleRequest,
  getUserFollowers,
  getUserFollowing,
} from "../api/followerRequest";
import { FollowerState } from "../models/Follower";

type FollowerBuilder = ActionReducerMapBuilder<FollowerState>;

export const followerBuilder = (builder: FollowerBuilder) => ({
  getSuggestedPeopleRequest() {
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

  followUserRequest() {
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

  getUserFollowersRequest() {
    builder
      .addCase(getUserFollowers.pending, () => {
        console.log("Pending...");
      })
      .addCase(getUserFollowers.fulfilled, (state, action) => {
        console.log("Fulfilled...");
        const { userData, count } = action.payload.followers;
        return {
          ...state,
          userFollowers: { followers: userData, count },
        };
      })
      .addCase(getUserFollowers.rejected, (state, action) => {
        console.log("Rejected...");
        console.log(action.payload);
      });
    return this;
  },

  getUserFollowingRequest() {
    builder
      .addCase(getUserFollowing.pending, () => {
        console.log("Pending...");
      })
      .addCase(getUserFollowing.fulfilled, (state, action) => {
        console.log("Fulfilled...");
        const { userData, count } = action.payload.following;
        return {
          ...state,
          userFollowing: { following: userData, count },
        };
      })
      .addCase(getUserFollowing.rejected, (state, action) => {
        console.log("Rejected...");
        console.log(action.payload);
      });
    return this;
  },
});
