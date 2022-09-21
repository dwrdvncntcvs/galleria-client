import { createSlice } from "@reduxjs/toolkit";
import {
  followUserRequestBuilder,
  getSuggestedPeopleRequestBuilder,
} from "../builders/followerBuilder";
import { FollowerState } from "../models/Follower";

const initialState: FollowerState = {
  suggestedPeople: [],
};

const followerSlice = createSlice({
  name: "follower",
  initialState,
  reducers: {
    updateSuggestedPeople: (state, action) => {
      return { ...state, suggestedPeople: [...action.payload] };
    },
  },
  extraReducers(builder) {
    getSuggestedPeopleRequestBuilder(builder);

    followUserRequestBuilder(builder);
  },
});

export const { updateSuggestedPeople } = followerSlice.actions;

export default followerSlice.reducer;
