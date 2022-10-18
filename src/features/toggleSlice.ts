import { createSlice } from "@reduxjs/toolkit";

interface ToggleState {
  queue: { name: string; status: boolean }[];
}

const initialState: ToggleState = {
  queue: [],
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    setToggle: (state, action) => {
      return {
        ...state,
        queue: [
          { name: action.payload.name, status: action.payload.status },
          ...state.queue,
        ],
      };
    },
    closeToggle: (state, action) => {
      return {
        ...state,
        queue: state.queue.filter(
          ({ name, status }) => name !== action.payload
        ),
      };
    },
    closeAllToggles: () => {
      return initialState;
    },
  },
});

export const { closeToggle, setToggle, closeAllToggles } = toggleSlice.actions;

export default toggleSlice.reducer;
