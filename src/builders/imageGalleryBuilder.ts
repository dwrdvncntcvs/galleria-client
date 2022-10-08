import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import {
  getAllPostImages,
  getInitialPostImages,
} from "../api/imageGalleryRequest";
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
    return this;
  },

  getInitialPostImagesRequest() {
    builder
      .addCase(getInitialPostImages.pending, () => {
        console.log("Getting images...");
      })
      .addCase(getInitialPostImages.fulfilled, (state, action) => {
        console.log("Images Fetched");

        return {
          ...state,
          initialImages: action.payload?.images,
          imageInfo: action.payload?.imageInfo,
        };
      })
      .addCase(getInitialPostImages.rejected, () => {
        console.log("Getting images request rejected");
      });
    return this;
  },
});
