import { createSlice } from "@reduxjs/toolkit";
import {
  getUserRefresherBuilder,
  signOutRequestBuilder,
  userSignInBuilder,
  userSignUpRequestBuilder,
} from "../builders/userBuilders";
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
    userSignInBuilder(builder);

    //Getting New Access Token Reducer
    getUserRefresherBuilder(builder);

    //Sign Out Reducer
    signOutRequestBuilder(builder);

    //Sign Up Request Reducer
    userSignUpRequestBuilder(builder);
  },
});

export default userSlice.reducer;
