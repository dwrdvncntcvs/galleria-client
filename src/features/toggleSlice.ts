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
  reducers: {
    setToggle: (state, action) => {
      return {
        ...state,
        status: action.payload.status,
        name: action.payload.name,
      };
    },
    closeToggle: () => ({
      status: false,
      name: "",
    }),
  },
});

export const { closeToggle, setToggle } = toggleSlice.actions;

export default toggleSlice.reducer;
