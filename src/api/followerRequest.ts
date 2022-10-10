import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateInstance } from "../config/axios";
import { RootState } from "../config/store";
import {
  updateFollowingPeople,
  updateSuggestedPeople,
} from "../features/followerSlice";
import { privateHttpService } from "../services/httpService";

export const getSuggestedPeopleRequest = createAsyncThunk(
  "follower/suggestedPeople",
  async (
    { privateInstance }: { privateInstance: any },
    { rejectWithValue }
  ) => {
    try {
      const responseData = await privateHttpService(privateInstance).get(
        "/suggested/people"
      );

      return responseData;
    } catch (error: any) {
      rejectWithValue(error.response.data.msg);
    }
  }
);

export const followUserRequest = createAsyncThunk(
  "follower/followUserRequest",
  async (
    { username }: { username: string },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const responseData = await privateHttpService(privateInstance).post(
        `/follow/${username}`
      );

      const state = getState() as RootState;

      dispatch(
        updateSuggestedPeople(
          state.followerState.suggestedPeople.filter(
            (user) => user.username !== username
          )
        )
      );

      return responseData();
    } catch (error: any) {
      rejectWithValue(error.response.data.msg);
    }
  }
);

export const getUserFollowers = createAsyncThunk(
  "follower/getUserFollowers",
  async (
    {
      username,
      privateAxiosInstance,
    }: { username: string; privateAxiosInstance: any },
    { rejectWithValue }
  ) => {
    try {
      const responseData = await privateHttpService(privateAxiosInstance).get(
        `/${username}/follower`
      );

      return responseData;
    } catch (error: any) {
      rejectWithValue(error.response.data.msg);
    }
  }
);

export const getUserFollowing = createAsyncThunk(
  "follower/getUserFollowing",
  async (
    {
      username,
      privateAxiosInstance,
    }: { username: string; privateAxiosInstance: any },
    { rejectWithValue }
  ) => {
    try {
      const responseData = await privateHttpService(privateAxiosInstance).get(
        `/${username}/following`
      );

      return responseData;
    } catch (error: any) {
      rejectWithValue(error.response.data.msg);
    }
  }
);

export const unfollowUser = createAsyncThunk(
  "follower/unfollowUser",
  async (
    {
      username,
      privateAxiosInstance,
    }: {
      username: string;
      privateAxiosInstance: any;
    },
    { rejectWithValue, dispatch }
  ) => {
    console.log("Username", username);
    try {
      const responseData = await privateHttpService(privateAxiosInstance).put(
        `/unfollow/${username}`
      );

      return { responseData, username };
    } catch (error: any) {
      console.log(error);
      rejectWithValue(error.response.data.msg);
    }
  }
);
