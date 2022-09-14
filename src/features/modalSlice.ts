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
        status: action.payload.status,
        name: action.payload.name,
      };
    },
    closeModal: () => {
      return {
        status: false,
        name: "",
      };
    },
  },
});

export const { setModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
