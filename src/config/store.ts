import { configureStore } from "@reduxjs/toolkit";
import { postReducer, userReducer } from "../features";

export const store = configureStore({
  reducer: {
    userState: userReducer,
    postState: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
