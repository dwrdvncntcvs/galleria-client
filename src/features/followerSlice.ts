import { createSlice } from "@reduxjs/toolkit";
import { getSuggestedPeopleRequestBuilder } from "../builders/followerBuilder";
import { FollowerState } from "../models/Follower";

const initialState: FollowerState = {
  suggestedPeople: [],
};

const followerSlice = createSlice({
  name: "follower",
  initialState,
  reducers: {},
  extraReducers(builder) {
    getSuggestedPeopleRequestBuilder(builder);
  },
});

export default followerSlice.reducer;
