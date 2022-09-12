import { privateInstance } from "../config/axios";
import { UserProfile } from "./User";

export interface Post {
  id: string;
  content: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  User: UserProfile;
  ImagePost: ImagePost[];
}

export type ImagePost = {
  id: string;
  postImageUrl: string;
};

export interface PostState {
  status?: string;
  message?: string;
  posts: Post[];
}

export interface GetAllPosts {
  userId: string;
  limit: number;
  page: number;
  privateInstance: typeof privateInstance;
}
