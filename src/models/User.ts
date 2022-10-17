import { Profile } from "./Profile";

export interface User {
  id?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  email?: string;
  refreshToken?: string;
  verified?: boolean;
  createdAt?: Date;
}

export interface UserProfile extends User {
  Profile?: Profile;
  followingCount?: number;
  followersCount?: number;
}

export interface UserAuth {
  email: string;
  password: string;
}

export interface UserRegistration {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  password2?: string;
}

export interface UserAuth {
  email: string;
  password: string;
}

export interface UserState {
  refreshToken?: string;
  accessToken?: string;
  userData?: UserProfile;
  isAuth?: boolean;
  status?: "error" | "success" | "none";
  message?: string;
  userProfile: UserProfile;
  foundUsers: FoundUsers;
}

export interface OTP {
  email: string;
  otp: string;
}

export interface UserToken {
  token: string;
}

export interface FoundUsers {
  data: UserProfile[];
  count: number;
}

export interface UpdateUserData {
  first_name: string;
  last_name: string;
  address: string;
  dateOfBirth: string | Date | null;
  bio: string;
}
