import { createSlice } from "@reduxjs/toolkit";
import { User } from "../models/User";

interface UserState {
  refreshToken?: string;
  accessToken?: string;
  user: User;
  isAuth: boolean;
}

const userState: UserState = {
  refreshToken: "",
  accessToken: "",
  user: {},
  isAuth: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: userState,
  reducers: {},
});

export default userSlice.reducer;
