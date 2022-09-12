import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const instance = axios.create({
  baseURL: BASE_URL,
});

export const privateInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

instance.defaults.withCredentials = true;


