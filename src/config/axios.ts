import axios from "axios";

const BASE_URL = process.env.REACT_APP_GALLERIA_API_URL;

export const instance = axios.create({
  baseURL: BASE_URL,
});

export const privateInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  // headers: { "Content-Type": "application/json" },
});

instance.defaults.withCredentials = true;
