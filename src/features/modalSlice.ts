import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  status: boolean;
  name: string;
  props?: {};
}

const initialState: ModalState = {
  status: false,
  name: "",
  props: {},
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state, { payload }: { payload: ModalState; type: string }) => {
      return { ...state, ...payload };
    },
    closeModal: () => {
      return {
        status: false,
        name: "",
        props: {},
      };
    },
  },
});

export const { setModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
