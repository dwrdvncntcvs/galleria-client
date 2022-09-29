import { createSlice } from "@reduxjs/toolkit";
import { imageGalleryBuilder } from "../builders/imageGalleryBuilder";
import { ImageGalleryState } from "../models/ImageGallery";

const initialState: ImageGalleryState = {
  images: [],
  imageInfo: {
    limit: 6,
    page: 1,
    count: 0,
  },
};

const imageGallerySlice = createSlice({
  name: "imageGallery",
  initialState,
  reducers: {},
  extraReducers(builder) {
    imageGalleryBuilder(builder).getAllPostImagesRequest();
  },
});

export default imageGallerySlice.reducer;
