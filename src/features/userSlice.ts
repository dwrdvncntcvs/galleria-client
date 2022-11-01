import { createSlice } from "@reduxjs/toolkit";
import { userBuilder } from "../builders/userBuilders";
import { UserState } from "../models/User";

const userState: UserState = {
  refreshToken: "",
  accessToken: "",
  userData: {},
  isAuth: false,
  status: "none",
  message: "",
  userProfile: {},
  foundUsers: {
    count: 0,
    data: [],
  },
};

const userSlice = createSlice({
  name: "user",
  initialState: userState,
  reducers: {
    defaultSuccessMsg: (state, action) => {
      return { ...state, successMessage: action.payload };
    },
    setAuth: (state, action) => {
      return {
        ...state,
        isAuth: action.payload.isAuth,
        accessToken: action.payload.accessToken,
      };
    },
    setAccessToken: (state, action) => {
      return { ...state, accessToken: action.payload };
    },
    setStatus: (
      state,
      action: { type: string; payload: "none" | "error" | "success" }
    ) => {
      return { ...state, status: action.payload };
    },
    setMessage: (state, action) => {
      return { ...state, message: action.payload };
    },
    resetUserState: () => {
      console.log("User State Reset ...");
      return userState;
    },
    resetSearchResults: (state) => {
      return { ...state, foundUsers: userState.foundUsers };
    },
  },
  extraReducers(builder) {
    //User Sign In Reducer
    userBuilder(builder)
      .getUserProfileRequest()
      .getUserRefresher()
      .getUserRequest()
      .signOutRequest()
      .userOtpRequest()
      .userSignIn()
      .userSignUpRequest()
      .searchUserProfileRequest()
      .updateUserProfileRequest()
      .updateUserAvatarRequest()
      .updateUserAccountRequest();
  },
});

export const {
  defaultSuccessMsg,
  setAuth,
  setAccessToken,
  setStatus,
  setMessage,
  resetUserState,
  resetSearchResults,
} = userSlice.actions;

export default userSlice.reducer;
