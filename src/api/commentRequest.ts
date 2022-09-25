import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpService } from "../services/httpService";

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
