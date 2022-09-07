import { createSlice } from "@reduxjs/toolkit";
import { UserProfile } from "../models/User";

interface UserState {
  user: UserProfile;
}

const initialState: UserState = {
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
