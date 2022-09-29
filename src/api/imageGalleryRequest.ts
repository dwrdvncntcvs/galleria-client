import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpService } from "../services/httpService";

export const getAllPostImages = createAsyncThunk(
  "imageGallery/getAllPostImages",
  async (
    {
      username,
      limit = 6,
      page = 1,
    }: { username: string; limit: number; page: number },
    { rejectWithValue }
  ) => {
    try {
      const responseData = await httpService.get(
        `/gallery/${username}?limit=${limit}&page=${page}`
      );

      return responseData;
    } catch (err: any) {
      rejectWithValue(err.response.data.msg);
    }
  }
);
