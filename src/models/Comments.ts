import { UserProfile } from "./User";

export interface Comment {
  id: string;
  text: string;
  imageUrl?: string;
  createdAt: Date;
  User: UserProfile;
  postId: string;
}

export interface CommentState {
  comments: Comment[];
}
