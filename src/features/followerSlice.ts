import { createSlice } from "@reduxjs/toolkit";
import { followerBuilder } from "../builders/followerBuilder";
import { FollowerState } from "../models/Follower";

const initialState: FollowerState = {
  suggestedPeople: [],
  userFollowers: {
    count: 0,
    followers: [],
  },
  userFollowing: {
    count: 0,
    following: [],
  },
};

const followerSlice = createSlice({
  name: "follower",
  initialState,
  reducers: {
    updateSuggestedPeople: (state, action) => {
      return { ...state, suggestedPeople: [...action.payload] };
    },
    updateFollowingPeople: (state, action) => {
      const username = action.payload;
      const filterFollowing = state.userFollowing.following.filter(
        (user) => user.username !== username
      );
      const followingCount = state.userFollowing.count--;
      return {
        ...state,
        userFollowing: { following: filterFollowing, count: followingCount },
      };
    },
  },
  extraReducers(builder) {
    followerBuilder(builder)
      .followUserRequest()
      .getSuggestedPeopleRequest()
      .getUserFollowersRequest()
      .getUserFollowingRequest()
      .unfollowUserRequest();
  },
});

export const { updateSuggestedPeople, updateFollowingPeople } =
  followerSlice.actions;

export default followerSlice.reducer;
