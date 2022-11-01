import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateInstance } from "../config/axios";
import {
  OTP,
  UpdateUserData,
  UserAuth,
  UserProfile,
  UserRegistration,
  UserState,
} from "../models/User";
import { httpService, privateHttpService } from "../services/httpService";
import { getImageData } from "../services/imageServices";

export const userSignIn = createAsyncThunk(
  "user/signIn",
  async (data: UserAuth, { rejectWithValue }) => {
    try {
      const responseData = await httpService.post<UserState>(
        "/user/sign-in",
        data
      );
      return responseData;
    } catch (err: any) {
      return rejectWithValue(err.response.data.msg);
    }
  }
);

export const getUserRefresher = createAsyncThunk(
  "user/getRefresher",
  async () => {
    const responseData = await httpService.get("/user/refresh");
    return responseData;
  }
);

export const signOutRequest = createAsyncThunk("user/sign-out", async () => {
  const responseData = await httpService.get("/user/sign-out");
  return responseData;
});

export const userSignUpRequest = createAsyncThunk(
  "user/sign-up",
  async (data: UserRegistration, { rejectWithValue }) => {
    try {
      const responseData = await httpService.post<UserRegistration>(
        "/user/sign-up",
        data
      );
      return responseData;
    } catch (err: any) {
      return rejectWithValue(err?.response.data.msg);
    }
  }
);

export const userOtpRequest = createAsyncThunk(
  "user/otp",
  async (data: OTP, { rejectWithValue }) => {
    try {
      const responseData = await httpService.post<OTP>("/user/verify", data);
      return responseData;
    } catch (err: any) {
      return rejectWithValue(err.response.data.msg);
    }
  }
);

export const getUserRequest = createAsyncThunk(
  "user/getUserRequest",
  async ({ privateInstance }: any, { rejectWithValue }) => {
    console.log("Getting");
    console.log(privateInstance);

    try {
      const responseData = await privateHttpService(
        privateInstance
      ).get<UserProfile>("/user");

      console.log("User Data: ", responseData);
      return responseData;
    } catch (err: any) {
      rejectWithValue(err.response.data.msg);
    }
  }
);

export const getUserProfileRequest = createAsyncThunk(
  "user/getUserProfileRequest",
  async ({ username }: { username: string }, { rejectWithValue }) => {
    try {
      const responseData = await httpService.get<UserProfile>(
        `/user/profile/${username}`
      );
      console.log("User Profile Data: ", responseData);

      return responseData;
    } catch (err: any) {
      rejectWithValue(err.response.data.msg);
    }
  }
);

export const searchUserProfile = createAsyncThunk(
  "user/searchUserProfile",
  async ({ str }: { str: string }, { rejectWithValue }) => {
    try {
      const responseData = await privateHttpService(privateInstance).get(
        `/user/find-user?search=${str}`
      );
      console.log(responseData);

      return responseData;
    } catch (err: any) {
      return rejectWithValue(err.response.data.msg);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (
    { data, id }: { data: UpdateUserData; id: string },
    { rejectWithValue }
  ) => {
    try {
      const responseData = await privateHttpService(privateInstance).put(
        `/user/update/profile/${id}`,
        data
      );

      return { responseData, data: JSON.stringify(data) };
    } catch (err: any) {
      rejectWithValue(err.response.data.msg);
    }
  }
);

export const updateUserAvatar = createAsyncThunk(
  "user/updateUserAvatar",
  async (
    { imageData, userId }: { imageData: Blob; userId: string },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("avatar", imageData);

      const responseData = await privateHttpService(privateInstance).post(
        `/avatar/${userId}`,
        formData
      );

      const imageUrl = await getImageData(imageData);

      return { responseData, imageUrl };
    } catch (error: any) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

interface UpdateUserAccountData {
  userId?: string;
  username: string;
  email: string;
  contact_number: string;
}

export const updateUserAccount = createAsyncThunk(
  "user/updateUserAccount",
  async (data: UpdateUserAccountData, { rejectWithValue }) => {
    console.log("Data passed: ");

    try {
      const responseData = await privateHttpService(privateInstance).put(
        `/user/account/${data.userId}`,
        data
      );

      return responseData;
    } catch (error: any) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);
