import { AppDispatch, RootState } from "../config/store";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
