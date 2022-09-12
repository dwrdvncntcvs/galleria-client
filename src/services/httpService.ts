import { instance } from "../config/axios";

export interface Http {
  get: <T>(
    path: string,
    params?: Record<string, any>,
    config?: any
  ) => Promise<T | any>;
  post: <T>(
    path: string,
    params?: Record<string, any>,
    config?: any
  ) => Promise<T | any>;
}

const headers = {
  "Content-Type": "application/json",
};

export const httpService: Http = {
  get: async <T>(path: string, params?: Record<string, any>, config?: any) => {
    const response = await instance.get(path, { ...config, params, headers });
    return response.data as T;
  },
  post: async <T>(path: string, params?: Record<string, any>, config?: any) => {
    const response = await instance.post(
      path,
      { ...params },
      { ...config, headers }
    );
    return response.data as T;
  },
};
