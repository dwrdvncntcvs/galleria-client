import { configureStore } from "@reduxjs/toolkit";
import { modalReducer, postReducer, toggleReducer, userReducer } from "../features";

export const store = configureStore({
  reducer: {
    userState: userReducer,
    postState: postReducer,
    modalState: modalReducer,
    toggleState: toggleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
