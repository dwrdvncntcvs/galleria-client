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
        console.log("Images Fetched");

        return {
          ...state,
          images: action.payload?.images,
          imageInfo: action.payload?.imageInfo,
        };
      })
      .addCase(getAllPostImages.rejected, () => {
        console.log("Getting images request rejected");
      });
  },
});
