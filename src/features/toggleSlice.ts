import { createSlice } from "@reduxjs/toolkit";

interface ToggleState {
  status: boolean;
  name: string;
}

const initialState: ToggleState = {
  status: false,
  name: "",
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {},
});

export default toggleSlice.reducer;
