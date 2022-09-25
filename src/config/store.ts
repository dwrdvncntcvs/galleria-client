import { configureStore } from "@reduxjs/toolkit";
import {
  commentReducer,
  followerReducer,
  modalReducer,
  postReducer,
  toggleReducer,
  userReducer,
} from "../features";

export const store = configureStore({
  reducer: {
    userState: userReducer,
    postState: postReducer,
    modalState: modalReducer,
    toggleState: toggleReducer,
    followerState: followerReducer,
    commentState: commentReducer
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
