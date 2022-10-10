import { UserProfile } from "./User";

export interface FollowerState {
  suggestedPeople: UserProfile[];
  userFollowers: Followers;
  userFollowing: Following;
}

export interface Followers {
  count: number;
  followers: UserProfile[];
}

export interface Following {
  count: number;
  following: UserProfile[];
}
