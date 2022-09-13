import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  status: boolean;
  name: string;
}

const initialState: ModalState = {
  status: false,
  name: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state, action) => {
      return {
        ...state,
        status: action.payload.status,
        name: action.payload.name,
      };
    },
  },
});

export const { setModal } = modalSlice.actions;

export default modalSlice.reducer;
