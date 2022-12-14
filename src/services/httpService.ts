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
  delete: <T>(
    path: string,
    params?: Record<string, any>,
    config?: any
  ) => Promise<T | any>;
  put: <T>(
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
    const response = await instance.post(path, params, { ...config, headers });
    return response.data as T;
  },
  delete: async <T>(
    path: string,
    params?: Record<string, any>,
    config?: any
  ) => {
    const response = await instance.delete(path, {
      ...config,
      params,
      headers,
    });
    return response.data as T;
  },
  put: async <T>(path: string, params?: Record<string, any>, config?: any) => {
    const response = await instance.put(path, params, { ...config, headers });
    return response.data as T;
  },
};

export const privateHttpService = (privateInstance: any): Http => ({
  get: async <T>(path: string, params?: Record<string, any>, config?: any) => {
    const response = await privateInstance.get(path, {
      ...config,
      params,
    });
    return response.data as T;
  },
  post: async <T>(path: string, params?: Record<string, any>, config?: any) => {
    const response = await privateInstance.post(path, params, { ...config });
    return response.data as T;
  },
  delete: async <T>(
    path: string,
    params?: Record<string, any>,
    config?: any
  ) => {
    const response = await privateInstance.delete(path, {
      ...config,
      params,
      headers,
    });
    return response.data as T;
  },
  put: async <T>(path: string, params?: Record<string, any>, config?: any) => {
    const response = await privateInstance.put(path, params, { ...config, headers });
    return response.data as T;
  },
});
