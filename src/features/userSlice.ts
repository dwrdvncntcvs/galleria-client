import { createSlice } from "@reduxjs/toolkit";
import {
  getUserRefresher,
  signOutRequest,
  userSignIn,
  userSignUpRequest,
} from "../api/userRequest";
import { User } from "../models/User";

export interface UserState {
  refreshToken?: string;
  accessToken?: string;
  user?: User;
  isAuth?: boolean;
  successMessage?: string;
}

const userState: UserState = {
  refreshToken: "",
  accessToken: "",
  user: {},
  isAuth: false,
  successMessage: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: userState,
  reducers: {
    defaultSuccessMsg: (state, action) => {
      return { ...state, successMessage: action.payload };
    },
  },
  extraReducers(builder) {
    //User Sign In Reducer
    builder
      .addCase(userSignIn.pending, () => {
        console.log("User sign in pending...");
      })
      .addCase(userSignIn.fulfilled, (state, action) => {
        console.log("User sign in succeeded");
        if (action.payload.accessToken !== "")
          return { ...state, ...action.payload, isAuth: true };
      })
      .addCase(userSignIn.rejected, (state) => {
        console.log("Sign in rejected");
      });

    //Getting New Access Token Reducer
    builder
      .addCase(getUserRefresher.pending, () => {
        console.log("Pending...");
      })
      .addCase(getUserRefresher.fulfilled, (state, action) => {
        console.log("Fulfilled...");
        return { ...state, refreshToken: action.payload };
      })
      .addCase(getUserRefresher.rejected, (state) => {
        console.log("Rejected...");
      });

    //Sign Out Reducer
    builder
      .addCase(signOutRequest.pending, () => {
        console.log("Pending...");
      })
      .addCase(signOutRequest.fulfilled, (state, action) => {
        console.log("Fulfilled...");
        return { ...state, refreshToken: "" };
      })
      .addCase(signOutRequest.rejected, (state) => {
        console.log("Rejected...");
      });

    //Sign Up Request Reducer
    builder
      .addCase(userSignUpRequest.pending, () => {
        console.log("Pending...");
      })
      .addCase(userSignUpRequest.fulfilled, (state, action) => {
        console.log("Fulfilled...");
        return { ...state, successMessage: "" };
      })
      .addCase(userSignUpRequest.rejected, (state) => {
        console.log("Rejected...");
      });
  },
});

export default userSlice.reducer;
