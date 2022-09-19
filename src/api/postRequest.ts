import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateInstance } from "../config/axios";
import { addPost } from "../features/postSlice";
import { GetAllPosts, Post } from "../models/Post";
import { privateHttpService } from "../services/httpService";
import { serializeDate } from "../utils/helper";

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

export const createTextPost = createAsyncThunk(
  "post/createTextPost",
  async (data: Post, { rejectWithValue, dispatch }) => {
    const body = {
      content: data.content,
    };
    try {
      const responseData = await privateHttpService(privateInstance).post(
        "/post/text",
        body
      );

      dispatch(addPost(serializeDate(data)));
      return responseData;
    } catch (error: any) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);
