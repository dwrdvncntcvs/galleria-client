import { v4 } from "uuid";
// import { privateInstance } from "../config/axios";
import { User, UserProfile } from "./User";

export interface Post {
  id: string;
  content: string;
  userId: string;
  createdAt: Date | any;
  updatedAt: Date | any;
  User: UserProfile;
  ImagePost: ImagePost[];
  commentsCount: number;
}

export type ImagePost = {
  id: string;
  postImageUrl: any;
};

export interface PostState {
  status?: string;
  message?: string;
  posts: Post[];
  postsInfo: PostInfo;
  post?: Post;
}

export interface PostInfo {
  count?: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface GetAllPosts {
  param: string;
  limit?: number;
  page?: number;
  // privateInstance: typeof privateInstance;
}

export interface TextPost {
  content: string;
}

export interface ImageData {
  id: string;
  src: any;
  alt: any;
}

export interface ImageBlob {
  value: Blob | null;
  id: string;
}

export interface PostData {
  content: string;
  imagePost: ImageBlob[];
  hasImage: boolean;
}

export const generatePostFromUserInput = (
  post: PostData,
  images: ImagePost[],
  user: User
): Post => {
  return {
    id: v4(),
    content: post.content,
    createdAt: new Date(),
    ImagePost: images,
    updatedAt: new Date(),
    User: user,
    userId: user.id!,
    commentsCount: 0,
  };
};
