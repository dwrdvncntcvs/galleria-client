import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { getAllPostImages } from "../api/imageGalleryRequest";
import { ImageGalleryState } from "../models/ImageGallery";

export const imageGalleryBuilder = (
  builder: ActionReducerMapBuilder<ImageGalleryState>
) => ({
  getAllPostImagesRequest() {
    builder
      .addCase(getAllPostImages.pending, () => {
        console.log("Getting images...");
      })
      .addCase(getAllPostImages.fulfilled, (state, action) => {
        const { images, imageInfo } = action.payload;

        console.log("Images Fetched");

        return {
          ...state,
          images,
          imageInfo,
        };
      })
      .addCase(getAllPostImages.rejected, () => {
        console.log("Getting images request rejected");
      });
  },
});
