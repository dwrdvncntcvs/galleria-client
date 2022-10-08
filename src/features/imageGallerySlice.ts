import { createSlice } from "@reduxjs/toolkit";
import { imageGalleryBuilder } from "../builders/imageGalleryBuilder";
import { ImageGalleryState } from "../models/ImageGallery";

const initialState: ImageGalleryState = {
  images: [],
  initialImages: [],
  imageInfo: {
    limit: 6,
    page: 1,
    count: 0,
    hasMore: true,
  },
};

const imageGallerySlice = createSlice({
  name: "imageGallery",
  initialState,
  reducers: {
    resetImages: (state) => {
      return { ...state, images: [], imageInfo: { ...initialState.imageInfo } };
    },
    setHasMoreImages: (state, action) => {
      return {
        ...state,
        imageInfo: { ...state.imageInfo, hasMore: action.payload },
      };
    },
  },
  extraReducers(builder) {
    imageGalleryBuilder(builder)
      .getAllPostImagesRequest()
      .getInitialPostImagesRequest();
  },
});

export const { resetImages, setHasMoreImages } = imageGallerySlice.actions;

export default imageGallerySlice.reducer;
