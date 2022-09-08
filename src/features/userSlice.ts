import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, UserAuth, UserRegistration } from "../models/User";
import { httpService } from "../services/httpService";

interface UserState {
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

//Asynchronous Functionalities
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
