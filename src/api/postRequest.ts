import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllPosts, Post } from "../models/Post";
import { privateHttpService } from "../services/httpService";

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
