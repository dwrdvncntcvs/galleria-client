import { createSlice } from "@reduxjs/toolkit";
import {
  getUserRefresherBuilder,
  signOutRequestBuilder,
  userSignInBuilder,
  userSignUpRequestBuilder,
} from "../builders/userBuilders";
import { UserState } from "../models/User";

const userState: UserState = {
  refreshToken: "",
  accessToken: "",
  userData: {},
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
  },
  extraReducers(builder) {
    //User Sign In Reducer
    userSignInBuilder(builder);

    //Getting New Access Token Reducer
    getUserRefresherBuilder(builder);

    //Sign Out Reducer
    signOutRequestBuilder(builder);

    //Sign Up Request Reducer
    userSignUpRequestBuilder(builder);
  },
});

export const { defaultSuccessMsg, setAuth, setAccessToken } = userSlice.actions;

export default userSlice.reducer;
