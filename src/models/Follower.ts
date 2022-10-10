import { UserProfile } from "./User";

export interface FollowerState {
  suggestedPeople: UserProfile[];
  userFollowers: Followers;
}

export interface Followers {
  count: number;
  followers: UserProfile[];
}
