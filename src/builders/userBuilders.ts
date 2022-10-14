import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import {
  getUserProfileRequest,
  getUserRefresher,
  getUserRequest,
  searchUserProfile,
  signOutRequest,
  userOtpRequest,
  userSignIn,
  userSignUpRequest,
} from "../api/userRequest";
import { UserState } from "../models/User";

export const userBuilder = (builder: ActionReducerMapBuilder<UserState>) => ({
  userSignIn() {
    builder
      .addCase(userSignIn.pending, () => {
        console.log("User sign in pending...");
      })
      .addCase(userSignIn.fulfilled, (state, action) => {
        console.log("User sign in succeeded");
        if (action.payload.accessToken !== "")
          return {
            ...state,
            ...action.payload,
            isAuth: true,
            status: "success",
          };
      })
      .addCase(userSignIn.rejected, (state, action) => {
        console.log("Sign in rejected");
        return { ...state, status: "error", message: action.payload as string };
      });
    return this;
  },

  getUserRefresher() {
    builder
      .addCase(getUserRefresher.pending, () => {
        console.log("User Refresh in pending...");
      })
      .addCase(getUserRefresher.fulfilled, (state, action) => {
        console.log("User Refresh in succeeded");
        console.log(action.payload);
        return {
          ...state,
          ...action.payload,
          isAuth: true,
        };
      })
      .addCase(getUserRefresher.rejected, (state) => {
        console.log("Refresh in rejected");
      });
    return this;
  },

  signOutRequest() {
    builder
      .addCase(signOutRequest.pending, () => {
        console.log("pending...");
      })
      .addCase(signOutRequest.fulfilled, (state, action) => {
        console.log("succeeded");
        console.log("ACTION PAYLOAD: ", { ...action.payload });
        return { ...state, accessToken: "", isAuth: false };
      })
      .addCase(signOutRequest.rejected, (state) => {
        console.log("rejected");
      });
    return this;
  },

  userSignUpRequest() {
    builder
      .addCase(userSignUpRequest.pending, () => {
        console.log("Pending...");
      })
      .addCase(userSignUpRequest.fulfilled, (state, action) => {
        console.log("Fulfilled...");
        return { ...state, status: "success" };
      })
      .addCase(userSignUpRequest.rejected, (state, action) => {
        console.log("Rejected...");
        return { ...state, status: "error", message: action.payload as string };
      });
    return this;
  },

  userOtpRequest() {
    builder
      .addCase(userOtpRequest.pending, () => {
        console.log("Pending...");
      })
      .addCase(userOtpRequest.fulfilled, (state, action) => {
        console.log("Fulfilled...");
        return { ...state, status: "success" };
      })
      .addCase(userOtpRequest.rejected, (state, action) => {
        console.log("Rejected...");
        return { ...state, status: "error", message: action.payload as string };
      });
    return this;
  },

  getUserRequest() {
    builder
      .addCase(getUserRequest.pending, () => {
        console.log("Pending...");
      })
      .addCase(getUserRequest.fulfilled, (state, action) => {
        console.log("Fulfilled...");
        return {
          ...state,
          userData: action.payload.profile,
          status: "success",
        };
      })
      .addCase(getUserRequest.rejected, (state, action) => {
        console.log("Rejected...");
        console.log(action);
        return { ...state, status: "error", message: action.payload as string };
      });
    return this;
  },

  getUserProfileRequest() {
    builder
      .addCase(getUserProfileRequest.pending, () => {
        console.log("Pending...");
      })
      .addCase(getUserProfileRequest.fulfilled, (state, action) => {
        console.log("Fulfilled...");

        const { profile, followersCount, followingCount } = action.payload;

        return {
          ...state,
          userProfile: { ...profile, followersCount, followingCount },
          status: "success",
        };
      })
      .addCase(getUserProfileRequest.rejected, (state, action) => {
        console.log("Rejected...");
        console.log(action);
        return { ...state, status: "error", message: action.payload as string };
      });
    return this;
  },

  searchUserProfileRequest() {
    builder
      .addCase(searchUserProfile.pending, () => {
        console.log("Pending...");
      })
      .addCase(searchUserProfile.fulfilled, (state, action) => {
        console.log("Fulfilled...");

        const { data, count } = action.payload;

        return {
          ...state,
          foundUsers: { data, count },
        };
      })
      .addCase(searchUserProfile.rejected, (state, action) => {
        console.log("Rejected...");
        console.log(action);
        return { ...state, status: "error", message: action.payload as string };
      });
    return this;
  },
});
