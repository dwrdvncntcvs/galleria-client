import { createAsyncThunk } from "@reduxjs/toolkit";
import { OTP, UserAuth, UserRegistration, UserState } from "../models/User";
import { httpService } from "../services/httpService";

export const userSignIn = createAsyncThunk(
  "user/signIn",
  async (data: UserAuth) => {
    const responseData = await httpService.post<UserState>(
      "/user/sign-in",
      data
    );
    return responseData;
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
  async (data: UserRegistration) => {
    const responseData = await httpService.post<UserRegistration>(
      "/user/sign-up",
      data
    );
    return responseData;
  }
);

export const userOtpRequest = createAsyncThunk(
  "user/otp",
  async (data: OTP) => {
    const responseData = await httpService.post<OTP>("/user/verify", data);
    return responseData;
  }
);
