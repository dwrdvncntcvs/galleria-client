import { configureStore } from "@reduxjs/toolkit";
import {
  commentReducer,
  followerReducer,
  imageGalleryReducer,
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
    commentState: commentReducer,
    imageGalleryState: imageGalleryReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
