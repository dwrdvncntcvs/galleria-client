import { createAsyncThunk } from "@reduxjs/toolkit";
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
