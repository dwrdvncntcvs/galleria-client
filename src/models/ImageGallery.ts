export interface ImageGalleryState {
  images: Image[];
  imageInfo: ImageInfo;
}

export interface Image {
  id: string;
  postId: string;
  postImageUrl: string;
  updatedAt: Date;
}

export interface ImageInfo {
  limit: number;
  page: number;
  count: number;
  hasMore: boolean;
}
