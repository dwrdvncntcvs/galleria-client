import { Profile } from "./Profile";

export interface User {
  id?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  email?: string;
  password?: string;
  refreshToken?: string;
  verified?: boolean;
  createdAt?: Date;
}

export interface UserProfile extends User {
  Profile?: Profile;
}

export interface UserAuth {
  email: string;
  password: string;
}