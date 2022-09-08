import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import {
  getUserRefresher,
  signOutRequest,
  userSignIn,
  userSignUpRequest,
} from "../api/userRequest";
import { UserState } from "../features/userSlice";

export const userSignInBuilder = (
  builder: ActionReducerMapBuilder<UserState>
) => {
  return builder
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
};

export const getUserRefresherBuilder = (
  builder: ActionReducerMapBuilder<UserState>
) => {
  return builder
    .addCase(getUserRefresher.pending, () => {
      console.log("User sign in pending...");
    })
    .addCase(getUserRefresher.fulfilled, (state, action) => {
      console.log("User sign in succeeded");
      if (action.payload.accessToken !== "")
        return { ...state, ...action.payload, isAuth: true };
    })
    .addCase(getUserRefresher.rejected, (state) => {
      console.log("Sign in rejected");
    });
};

export const signOutRequestBuilder = (
  builder: ActionReducerMapBuilder<UserState>
) => {
  return builder
    .addCase(signOutRequest.pending, () => {
      console.log("User sign in pending...");
    })
    .addCase(signOutRequest.fulfilled, (state, action) => {
      console.log("User sign in succeeded");
      if (action.payload.accessToken !== "")
        return { ...state, ...action.payload, isAuth: true };
    })
    .addCase(signOutRequest.rejected, (state) => {
      console.log("Sign in rejected");
    });
};

export const userSignUpRequestBuilder = (
  builder: ActionReducerMapBuilder<UserState>
) => {
  return builder
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
};
