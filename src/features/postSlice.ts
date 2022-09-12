import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetAllPosts, Post, PostState } from "../models/Post";
import { privateHttpService } from "../services/httpService";

const initialState: PostState = {
  status: "",
  message: "",
  posts: [],
};

export const getAllPosts = createAsyncThunk(
  "post/getAllPosts",
  async (
    { privateInstance, userId, limit, page }: GetAllPosts,
    { rejectWithValue }
  ) => {
    try {
      const responseData = await privateHttpService(privateInstance).get<
        Post[]
      >(`/post/?limit=${limit}&page=${page}&id=${userId}`);

      return responseData;
    } catch (error: any) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllPosts.pending, () => {
        console.log("Pending...");
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        console.log("Getting posts Fulfilled...");

        return {
          ...state,
          posts: action.payload.posts,
          status: "success",
        };
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        console.log(action);
        return {
          ...state,
          status: "error",
          message: action.payload as string,
        };
      });
  },
});

export default postSlice.reducer;
