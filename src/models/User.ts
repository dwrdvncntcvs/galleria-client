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

export interface UserState {
  refreshToken?: string;
  accessToken?: string;
  userData?: UserProfile;
  isAuth?: boolean;
  status?: "error" | "success" | "none";
  message?: string;
}

export interface OTP {
  email: string;
  otp: string;
}

export interface UserToken {
  token: string;
}
