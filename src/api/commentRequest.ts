import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateInstance } from "../config/axios";
import { CreateCommentData } from "../models/Comments";
import { httpService, privateHttpService } from "../services/httpService";

export const getAllComments = createAsyncThunk(
  "comment/getAllComments",
  async ({ postId }: { postId: string }, { rejectWithValue }) => {
    try {
      const responseData = await httpService.get(`/comment/${postId}`);

      return responseData;
    } catch (e: any) {
      return rejectWithValue(e.response.data.msg);
    }
  }
);

export const createComment = createAsyncThunk(
  "comment/createComment",
  async ({ text, postId }: CreateCommentData, { rejectWithValue }) => {
    try {
      const responseData = await privateHttpService(privateInstance).post(
        `/comment/text/${postId}`,
        { text }
      );

      return responseData;
    } catch (e: any) {
      return rejectWithValue(e.response.data.msg);
    }
  }
);
