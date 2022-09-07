import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../features";

export const store = configureStore({
  reducer: {
    userState: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
