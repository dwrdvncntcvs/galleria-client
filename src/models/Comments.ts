import { UserProfile } from "./User";

export interface Comment extends UserProfile {
  id: string;
  text: string;
  imageUrl?: string;
  createdAt: Date;
}
